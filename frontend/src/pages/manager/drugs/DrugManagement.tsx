import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Pill } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import DrugCard from "@/components/manager/drugs/DrugCard"
import SearchAndFilter from "@/components/manager/drugs/SearchAndFilter"
import DrugDetailModal from "@/components/manager/drugs/DrugDetailModal"
import Pagination from "@/components/layout/Pagination"
import { getDrugs, getDrugDetail } from "@/api/drug"
import type { DrugResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function DrugsManagement() {
  const navigate = useNavigate()
  const [drugs, setDrugs] = useState<DrugResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<boolean>(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  
  // Detail modal states
  const [selectedDrug, setSelectedDrug] = useState<DrugResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý thuốc" },
  ]

  const fetchDrugs = async () => {
    setLoading(true)
    try {
      const response = await getDrugs({ 
        page, 
        size: 6, // 6 items per page for better grid layout
        name: searchTerm.trim(), 
        isActive: activeFilter 
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

  const fetchDrugDetail = async (drugId: string) => {
    setDetailLoading(true)
    try {
      const response = await getDrugDetail(drugId)
      setSelectedDrug(response.payload || null)
      setIsDetailModalOpen(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lỗi khi tải chi tiết thuốc")
    } finally {
      setDetailLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(0)
    fetchDrugs()
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setPage(0)
  }

  const handleActiveFilterChange = (value: boolean) => {
    setActiveFilter(value)
    setPage(0)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setActiveFilter(true)
    setPage(0)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1) // Pagination component uses 1-based indexing
  }

  // Drug actions
  const handleViewDrug = (drugId: string) => {
    fetchDrugDetail(drugId)
  }

  const handleEditDrug = (drugId: string) => {
    navigate(`/manager/drugs/edit/${drugId}`)
  }

  const handleDeactivateDrug = async (drugId: string) => {
    toast.info(`Vô hiệu hóa thuốc ${drugId} - Chức năng sẽ được phát triển`)
  }

  const handleReactivateDrug = async (drugId: string) => {
    toast.info(`Kích hoạt lại thuốc ${drugId} - Chức năng sẽ được phát triển`)
  }

  const handleRefresh = () => {
    fetchDrugs()
  }

  useEffect(() => {
    fetchDrugs()
  }, [page, activeFilter])

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
            <h2 className="text-2xl font-bold text-gray-900">Quản lý thuốc</h2>
            <p className="text-gray-600">Quản lý danh sách thuốc trong hệ thống</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={loading}>
              <span className="mr-2">🔄</span>
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
          activeFilter={activeFilter}
          onSearchChange={handleSearchChange}
          onActiveFilterChange={handleActiveFilterChange}
          onSearch={handleSearch}
          onClearFilters={handleClearFilters}
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
                  {searchTerm.trim() ? "Thử tìm kiếm với tên khác" : "Chưa có thuốc nào trong hệ thống"}
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

      {/* Detail Modal */}
      <DrugDetailModal
        drug={selectedDrug}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedDrug(null)
        }}
        loading={detailLoading}
        onEdit={handleEditDrug}
        onDeactivate={handleDeactivateDrug}
        onReactivate={handleReactivateDrug}
        actionLoading={actionLoading}
      />
    </ManagerLayout>
  )
}