import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pill, RefreshCw } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import DrugCard from "@/components/manager/drugs/DrugCard"
import SearchAndFilter from "@/components/manager/drugs/SearchAndFilter"
import Pagination from "@/components/layout/Pagination"
import { getDrugs } from "@/api/drug"
import type { DrugResponse } from "@/api/types"
import { toast } from "react-toastify"

type DrugStatusFilter = "active" | "inactive"

export default function DrugsManagement() {
  const navigate = useNavigate()
  const [drugs, setDrugs] = useState<DrugResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<DrugStatusFilter>("active")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý thuốc" },
  ]

  const fetchDrugs = async () => {
    setLoading(true)
    try {
      const response = await getDrugs({ 
        page, 
        size: 6,
        name: searchTerm.trim(), 
        isActive: statusFilter === "active"
      })
      setDrugs(response.payload.content)
      setTotalPages(response.payload.totalPages)
      setTotalElements(response.payload.totalElements)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lỗi khi tải danh sách thuốc")
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setPage(0)
  }

  const handleStatusFilterChange = (value: DrugStatusFilter) => {
    setStatusFilter(value)
    setPage(0)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1)
  }

  // Drug actions - Cập nhật để navigate đến trang riêng
  const handleViewDrug = (drugId: string) => {
    navigate(`/manager/drugs/${drugId}`)
  }

  const handleEditDrug = (drugId: string) => {
    navigate(`/manager/drugs/edit/${drugId}`)
  }

  const handleDeactivateDrug = async (drugId: string) => {
    setActionLoading(drugId)
    try {
      // TODO: Implement deactivate API call
      toast.info(`Vô hiệu hóa thuốc ${drugId} - Chức năng sẽ được phát triển`)
      // After successful deactivation, refresh the list
      // await fetchDrugs()
    } catch (error) {
      toast.error("Lỗi khi vô hiệu hóa thuốc")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReactivateDrug = async (drugId: string) => {
    setActionLoading(drugId)
    try {
      // TODO: Implement reactivate API call
      toast.info(`Kích hoạt lại thuốc ${drugId} - Chức năng sẽ được phát triển`)
      // After successful reactivation, refresh the list
      // await fetchDrugs()
    } catch (error) {
      toast.error("Lỗi khi kích hoạt lại thuốc")
    } finally {
      setActionLoading(null)
    }
  }

  const handleRefresh = () => {
    fetchDrugs()
  }

  useEffect(() => {
    fetchDrugs()
  }, [page, statusFilter])

  // ✅ Auto search với debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        setPage(0)
        fetchDrugs()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const { paginatedDrugs } = useMemo(() => {
    return {
      paginatedDrugs: drugs
    }
  }, [drugs])

  return (
    <ManagerLayout title="Quản lý thuốc" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Danh sách thuốc</h2>
            <p className="text-gray-600">Quản lý và theo dõi thông tin các loại thuốc</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Làm mới
            </Button>
            <Button onClick={() => navigate("/manager/drugs/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Tạo thuốc mới
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          searchPlaceholder="Tìm kiếm thuốc..."
        />

        {/* Results Summary */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Hiển thị {paginatedDrugs.length} trong tổng số {totalElements} thuốc
          </span>
          {totalPages > 1 && (
            <span>
              Trang {page + 1} / {totalPages}
            </span>
          )}
        </div>

        {/* Drugs Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Danh sách thuốc ({totalElements} kết quả)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Đang tải...</p>
              </div>
            ) : paginatedDrugs.length === 0 ? (
              <div className="text-center py-12">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có thuốc nào
                </h3>
                <p className="text-gray-500">
                  {searchTerm.trim() ? "Thử tìm kiếm với tên khác" : 
                   statusFilter === "active" ? "Chưa có thuốc hoạt động nào" : "Chưa có thuốc vô hiệu hóa nào"}
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate("/manager/drugs/create")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo thuốc đầu tiên
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Drugs Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {paginatedDrugs.map((drug) => (
                    <DrugCard
                      key={drug.id}
                      drug={drug}
                      onView={handleViewDrug}
                      onEdit={handleEditDrug}
                      onDeactivate={handleDeactivateDrug}
                      onReactivate={handleReactivateDrug}
                      actionLoading={actionLoading}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6">
                    <Pagination 
                      currentPage={page + 1} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ManagerLayout>
  )
}