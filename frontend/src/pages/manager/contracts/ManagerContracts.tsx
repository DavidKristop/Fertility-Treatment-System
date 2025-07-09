import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, RefreshCw, Search } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import ContractCard from "@/components/contracts/ContractCard"
import ContractDetailModal from "@/components/contracts/ContractDetailModal"
import { getSignedContracts, getUnsignedContracts } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function ManagerContracts() {
  const [contracts, setContracts] = useState<ContractResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý hợp đồng" },
  ]

  const fetchContracts = async () => {
    setLoading(true)
    setError(null)
    try {
      let allContracts: ContractResponse[] = []
      
      if (statusFilter === "all") {
        // Gọi cả 2 API và merge
        const [signedResponse, unsignedResponse] = await Promise.all([
          getSignedContracts({ page: 0, size: 50 }),
          getUnsignedContracts({ page: 0, size: 50 })
        ])
        allContracts = [...signedResponse.payload.content, ...unsignedResponse.payload.content]
      } else if (statusFilter === "signed") {
        const response = await getSignedContracts({ page: 0, size: 50 })
        allContracts = response.payload.content
      } else {
        const response = await getUnsignedContracts({ page: 0, size: 50 })
        allContracts = response.payload.content
      }
      
      setContracts(allContracts)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải danh sách hợp đồng")
      toast.error("Không thể tải danh sách hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
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

  return (
    <ManagerLayout title="Quản lý hợp đồng" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Quản lý hợp đồng
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Quản lý tất cả hợp đồng điều trị của bệnh nhân
            </p>
          </div>
          <Button 
            onClick={fetchContracts} 
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="pending">Chờ ký</SelectItem>
                  <SelectItem value="signed">Đã ký</SelectItem>
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
                <Button onClick={fetchContracts} variant="outline">
                  Thử lại
                </Button>
              </div>
            )}

            {!loading && !error && filteredContracts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">
                    Hiển thị {filteredContracts.length} hợp đồng
                    {statusFilter !== "all" && (
                      <span className="ml-1">
                        - {statusFilter === "signed" ? "Đã ký" : "Chờ ký"}
                      </span>
                    )}
                  </p>
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
              </div>
            )}

            {!loading && !error && filteredContracts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm || statusFilter !== "all" ? "Không tìm thấy hợp đồng" : "Chưa có hợp đồng nào"}
                </h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all" 
                    ? "Thử thay đổi bộ lọc để xem thêm kết quả" 
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
      />
    </ManagerLayout>
  )
}