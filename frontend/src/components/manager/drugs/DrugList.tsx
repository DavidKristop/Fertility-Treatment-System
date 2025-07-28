import { Button } from "@/components/ui/button"
import { Pill } from "lucide-react"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination"
import DrugCard from "./DrugCard"
import type { DrugResponse } from "@/api/types"

type DrugStatusFilter = "active" | "inactive"

interface DrugListProps {
  drugs: DrugResponse[]
  loading: boolean
  error?: string | null
  statusFilter: DrugStatusFilter
  searchTerm: string
  currentPage: number
  totalPages: number
  totalElements: number
  onViewDrug: (drugId: string) => void
  onEditDrug: (drugId: string) => void
  onDeactivateDrug: (drugId: string) => void
  onReactivateDrug: (drugId: string) => void
  onPageChange: (page: number) => void
  onRefresh: () => void
  actionLoading: string | null
}

export default function DrugList({
  drugs,
  loading,
  error,
  statusFilter,
  searchTerm,
  currentPage,
  totalPages,
  onViewDrug,
  onEditDrug,
  onDeactivateDrug,
  onReactivateDrug,
  onPageChange,
  onRefresh,
  actionLoading
}: DrugListProps) {
  // Filter drugs by search term
  const filteredDrugs = drugs.filter(drug => {
    if (!searchTerm.trim()) return true
    
    const searchLower = searchTerm.toLowerCase()
    return drug.name.toLowerCase().includes(searchLower) ||
           drug.description.toLowerCase().includes(searchLower) ||
           drug.unit.toLowerCase().includes(searchLower)
  })

  const getEmptyMessage = () => {
    if (searchTerm.trim()) {
      return "Thử tìm kiếm với từ khóa khác"
    }
    
    switch (statusFilter) {
      case "active":
        return "Chưa có thuốc hoạt động nào"
      case "inactive":
        return "Chưa có thuốc vô hiệu hóa nào"
      default:
        return "Các thuốc sẽ xuất hiện tại đây"
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Đang tải danh sách thuốc...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <Pill className="h-12 w-12 mx-auto mb-2" />
          <p>{error}</p>
        </div>
        <Button onClick={onRefresh} variant="outline">
          Thử lại
        </Button>
      </div>
    )
  }

  if (filteredDrugs.length === 0) {
    return (
      <div className="text-center py-12">
        <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {searchTerm.trim() ? "Không tìm thấy thuốc phù hợp" : "Chưa có thuốc nào"}
        </h3>
        <p className="text-gray-600">
          {getEmptyMessage()}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      {/* Drug Cards */}
      <div className="space-y-4">
        {filteredDrugs.map((drug) => (
          <DrugCard
            key={drug.id}
            drug={drug}
            onView={onViewDrug}
            onEdit={onEditDrug}
            onDeactivate={onDeactivateDrug}
            onReactivate={onReactivateDrug}
            actionLoading={actionLoading}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => onPageChange(1)}
                      isActive={currentPage === 1}
                      className="cursor-pointer"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {currentPage > 4 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}
              
              {/* Visible pages */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => 
                  page >= Math.max(1, currentPage - 2) && 
                  page <= Math.min(totalPages, currentPage + 2)
                )
                .map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              
              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => onPageChange(totalPages)}
                      isActive={currentPage === totalPages}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}