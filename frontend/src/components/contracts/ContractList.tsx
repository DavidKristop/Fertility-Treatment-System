import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, RefreshCw } from "lucide-react"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination"
import ContractCard from "./ContractCard"
import ContractStatusWarnings from "./ContractStatusWarnings"
import type { ContractResponse } from "@/api/types"

type ContractStatusFilter = "all" | "pending" | "signed"
interface ContractListProps {
  contracts: ContractResponse[]
  loading: boolean
  error: string | null
  statusFilter: ContractStatusFilter
  searchTerm: string
  currentPage: number
  totalPages: number
  totalElements: number
  onViewContract: (contract: ContractResponse) => void
  onSignContract?: (contractId: string) => void
  onDownloadContract: (contractId: string) => void
  onPageChange: (page: number) => void
  onRefresh: () => void
  showPatientInfo?: boolean
  userRole?: "patient" | "manager"
}

export default function ContractList({
  contracts,
  loading,
  error,
  statusFilter,
  searchTerm,
  currentPage,
  totalPages,
  totalElements,
  onViewContract,
  onSignContract,
  onDownloadContract,
  onPageChange,
  onRefresh,
  showPatientInfo = false,
  userRole = "patient"
}: ContractListProps) {
  // Filter contracts by search term
  const filteredContracts = contracts.filter(contract => {
    if (searchTerm === "") return true
    
    const searchLower = searchTerm.toLowerCase()
    const searchFields = [
      contract.treatment?.description,
      contract.treatment?.protocol?.title,
      contract.treatment?.doctor?.fullName,
      ...(showPatientInfo ? [contract.treatment?.patient?.fullName] : [])
    ]
    
    return searchFields.some(field => 
      field?.toLowerCase().includes(searchLower)
    )
  })

  const getEmptyMessage = () => {
    if (searchTerm) {
      return "Không tìm thấy hợp đồng phù hợp"
    }
    
    switch (statusFilter) {
      case "pending":
        return userRole === "patient" 
          ? "Hợp đồng mới sẽ xuất hiện sau khi bác sĩ tạo kế hoạch điều trị"
          : "Hợp đồng mới sẽ xuất hiện khi có điều trị được tạo"
      case "signed":
        return userRole === "patient" 
          ? "Bạn chưa ký hợp đồng nào"
          : "Chưa có hợp đồng nào được ký"
      default:
        return "Các hợp đồng sẽ xuất hiện tại đây"
    }
  }

  const getEmptyDescription = () => {
    return searchTerm 
      ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc"
      : getEmptyMessage()
  }

  return (
    <Card className="min-h-[600px]">
      <CardContent className="p-6">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p>Đang tải danh sách hợp đồng...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <p>{error}</p>
            </div>
            <Button onClick={onRefresh} variant="outline">
              Thử lại
            </Button>
          </div>
        )}

        {!loading && !error && filteredContracts.length > 0 && (
          <div className="space-y-4">
            <ContractStatusWarnings statusFilter={statusFilter} userRole={userRole} />
            
            {/* Pagination Info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Hiển thị {filteredContracts.length} trên {totalElements} hợp đồng
                {statusFilter !== "all" && (
                  <span className="ml-1">
                    - {statusFilter === "signed" ? "Đã ký" : "Chờ ký"}
                  </span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-gray-600">
                  Trang {currentPage + 1} / {totalPages}
                </p>
              )}
            </div>

            {filteredContracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onView={onViewContract}
                onSign={onSignContract}
                onDownload={onDownloadContract}
                showPatientInfo={showPatientInfo}
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => onPageChange(currentPage - 1)}
                        className={currentPage === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {/* First page */}
                    {currentPage > 2 && (
                      <>
                        <PaginationItem>
                          <PaginationLink 
                            onClick={() => onPageChange(0)}
                            isActive={currentPage === 0}
                            className="cursor-pointer"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        {currentPage > 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}
                    
                    {/* Visible pages */}
                    {Array.from({ length: totalPages }, (_, i) => i)
                      .filter(page => 
                        page >= Math.max(0, currentPage - 2) && 
                        page <= Math.min(totalPages - 1, currentPage + 2)
                      )
                      .map(page => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            onClick={() => onPageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    
                    {/* Last page */}
                    {currentPage < totalPages - 3 && (
                      <>
                        {currentPage < totalPages - 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <PaginationLink 
                            onClick={() => onPageChange(totalPages - 1)}
                            isActive={currentPage === totalPages - 1}
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
                        className={currentPage === totalPages - 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}

        {!loading && !error && filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "Không tìm thấy hợp đồng phù hợp" : "Chưa có hợp đồng nào"}
            </h3>
            <p className="text-gray-600">
              {getEmptyDescription()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}