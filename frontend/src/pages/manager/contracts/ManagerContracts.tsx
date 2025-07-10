import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, RefreshCw, Search } from "lucide-react"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  PaginationEllipsis 
} from "@/components/ui/pagination"
import ManagerLayout from "@/components/manager/ManagerLayout"
import ContractCard from "@/components/contracts/ContractCard"
import ContractDetailModal from "@/components/contracts/ContractDetailModal"
import { getContracts } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

type ContractStatusFilter = "all" | "pending" | "signed" | "expired"

export default function ManagerContracts() {
  const [contracts, setContracts] = useState<ContractResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ContractStatusFilter>("all")

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý hợp đồng" },
  ]

  // Helper function to get contract status
  const getContractStatus = (contract: ContractResponse): "pending" | "signed" | "expired" => {
    if (contract.signed) return "signed"
    if (new Date(contract.signDeadline) <= new Date()) return "expired"
    return "pending"
  }

  const fetchContracts = async (page = 0) => {
    setLoading(true)
    setError(null)
    try {
      // ✅ Lấy tất cả hợp đồng từ cả hai trạng thái
      const [signedResponse, unsignedResponse] = await Promise.all([
        getContracts({ page: 0, size: 100, isSigned: true }),
        getContracts({ page: 0, size: 100, isSigned: false })
      ])

      // Gộp tất cả contracts
      const allContracts = [
        ...signedResponse.payload.content,
        ...unsignedResponse.payload.content
      ]

      // Sort by creation date (newest first) 
      const sortedContracts = allContracts.sort((a, b) => 
        new Date(b.signDeadline).getTime() - new Date(a.signDeadline).getTime()
      )

      // ✅ Apply filter giống PatientContracts
      let filteredContracts = sortedContracts
      if (statusFilter !== "all") {
        filteredContracts = sortedContracts.filter(contract => 
          getContractStatus(contract) === statusFilter
        )
      }

      // Manual pagination
      const startIndex = page * pageSize
      const endIndex = startIndex + pageSize
      const paginatedContracts = filteredContracts.slice(startIndex, endIndex)

      setContracts(paginatedContracts)
      setTotalElements(filteredContracts.length)
      setTotalPages(Math.ceil(filteredContracts.length / pageSize))
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải danh sách hợp đồng")
      toast.error("Không thể tải danh sách hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts(0)
  }, [statusFilter])

  const handleViewContract = (contract: ContractResponse) => {
    setSelectedContract(contract)
    setIsDetailModalOpen(true)
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, '_blank')
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchContracts(newPage)
    }
  }

  const filteredContracts = contracts.filter(contract => {
    if (searchTerm === "") return true
    
    const searchLower = searchTerm.toLowerCase()
    return (
      contract.treatment?.patient?.fullName?.toLowerCase().includes(searchLower) ||
      contract.treatment?.doctor?.fullName?.toLowerCase().includes(searchLower) ||
      contract.treatment?.protocol?.title?.toLowerCase().includes(searchLower) ||
      contract.treatment?.description?.toLowerCase().includes(searchLower)
    )
  })

  const getPageTitle = () => {
    switch (statusFilter) {
      case "pending":
        return "Hợp đồng chờ ký"
      case "signed":
        return "Hợp đồng đã ký"
      case "expired":
        return "Hợp đồng hết hạn"
      default:
        return "Tất cả hợp đồng"
    }
  }

  const getPageDescription = () => {
    switch (statusFilter) {
      case "pending":
        return "Danh sách hợp đồng điều trị đang chờ bệnh nhân ký"
      case "signed":
        return "Danh sách tất cả hợp đồng điều trị đã được ký"
      case "expired":
        return "Danh sách hợp đồng đã hết hạn ký"
      default:
        return "Quản lý tất cả hợp đồng điều trị của bệnh nhân"
    }
  }

  return (
    <ManagerLayout title={getPageTitle()} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {getPageDescription()}
            </p>
          </div>
          <Button 
            onClick={() => fetchContracts(currentPage)} 
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm theo tên bệnh nhân, bác sĩ, hoặc phác đồ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={(value: ContractStatusFilter) => setStatusFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ ký</SelectItem>
                  <SelectItem value="signed">Đã ký</SelectItem>
                  <SelectItem value="expired">Hết hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contracts List */}
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
                <Button onClick={() => fetchContracts(currentPage)} variant="outline">
                  Thử lại
                </Button>
              </div>
            )}

            {!loading && !error && filteredContracts.length > 0 && (
              <div className="space-y-4">
                {/* Warning for pending contracts */}
                {statusFilter === "pending" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Lưu ý:</strong> Các hợp đồng này đang chờ bệnh nhân ký. 
                          Hợp đồng quá hạn sẽ bị hủy tự động.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info for expired contracts */}
                {statusFilter === "expired" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-800">
                          <strong>Thông báo:</strong> Các hợp đồng này đã hết hạn ký. 
                          Có thể cần tạo hợp đồng mới cho bệnh nhân.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pagination Info */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Hiển thị {filteredContracts.length} trên {totalElements} hợp đồng
                    {statusFilter !== "all" && (
                      <span className="ml-1">
                        - {statusFilter === "signed" ? "Đã ký" : 
                           statusFilter === "pending" ? "Chờ ký" : "Hết hạn"}
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
                    onView={handleViewContract}
                    onDownload={handleDownloadContract}
                    showPatientInfo={true}
                  />
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={currentPage === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {/* First page */}
                        {currentPage > 2 && (
                          <>
                            <PaginationItem>
                              <PaginationLink 
                                onClick={() => handlePageChange(0)}
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
                                onClick={() => handlePageChange(page)}
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
                                onClick={() => handlePageChange(totalPages - 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
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
                  {searchTerm 
                    ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc" 
                    : statusFilter === "pending" 
                      ? "Hợp đồng mới sẽ xuất hiện khi có điều trị được tạo"
                      : statusFilter === "signed"
                        ? "Chưa có hợp đồng nào được ký"
                        : statusFilter === "expired"
                          ? "Không có hợp đồng nào hết hạn"
                          : "Các hợp đồng sẽ xuất hiện tại đây"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detail Modal */}
      <ContractDetailModal
        contract={selectedContract}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedContract(null)
        }}
        showPatientInfo={true}
        userRole="manager"
      />
    </ManagerLayout>
  )
}