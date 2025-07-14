import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import DrugList from "@/components/manager/drugs/DrugList"
import SearchAndFilter from "@/components/manager/drugs/SearchAndFilter"
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

  const handleViewDrug = (drugId: string) => {
    navigate(`/manager/drugs/${drugId}`)
  }

  const handleEditDrug = (drugId: string) => {
    navigate(`/manager/drugs/edit/${drugId}`)
  }

  const handleDeactivateDrug = async (drugId: string) => {
    setActionLoading(drugId)
    try {
      toast.info(`Vô hiệu hóa thuốc ${drugId} - Chức năng sẽ được phát triển`)
    } catch (error) {
      toast.error("Lỗi khi vô hiệu hóa thuốc")
    } finally {
      setActionLoading(null)
    }
  }

  const handleReactivateDrug = async (drugId: string) => {
    setActionLoading(drugId)
    try {
      toast.info(`Kích hoạt lại thuốc ${drugId} - Chức năng sẽ được phát triển`)
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== undefined) {
        setPage(0)
        fetchDrugs()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

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

        {/* ✅ Drug List Component - Bỏ Card wrapper */}
        <DrugList
          drugs={drugs}
          loading={loading}
          statusFilter={statusFilter}
          searchTerm={searchTerm}
          currentPage={page + 1}
          totalPages={totalPages}
          totalElements={totalElements}
          onViewDrug={handleViewDrug}
          onEditDrug={handleEditDrug}
          onDeactivateDrug={handleDeactivateDrug}
          onReactivateDrug={handleReactivateDrug}
          onPageChange={handlePageChange}
          onRefresh={handleRefresh}
          actionLoading={actionLoading}
        />
      </div>
    </ManagerLayout>
  )
}