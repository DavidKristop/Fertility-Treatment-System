"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, RefreshCw } from "lucide-react"
import PatientLayout from "@/components/patient/PatientLayout"
import ContractCard from "@/components/contracts/ContractCard"
import ContractDetailModal from "@/components/contracts/ContractDetailModal"
import ContractSignModal from "@/components/contracts/ContractSignModal"
import { getPatientContracts, signContract } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function PatientContracts() {
  const [contracts, setContracts] = useState<ContractResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isSignModalOpen, setIsSignModalOpen] = useState(false)
  const [signingContract, setSigningContract] = useState<ContractResponse | null>(null)
  const [isSigningLoading, setIsSigningLoading] = useState(false)

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Hợp đồng chờ ký" },
  ]

  const fetchContracts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getPatientContracts({ page: 0, size: 20 })
      // Chỉ lấy hợp đồng chưa ký và chưa hết hạn
      const unsignedContracts = response.payload.content.filter(contract => 
        !contract.signed && new Date(contract.signDeadline) > new Date()
      )
      setContracts(unsignedContracts)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải danh sách hợp đồng")
      toast.error("Không thể tải danh sách hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  const handleViewContract = (contract: ContractResponse) => {
    setSelectedContract(contract)
    setIsDetailModalOpen(true)
  }

  const handleSignContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId)
    if (contract) {
      setSigningContract(contract)
      setIsSignModalOpen(true)
    }
  }

  const handleConfirmSign = async (contractId: string) => {
    setIsSigningLoading(true)
    try {
      await signContract(contractId)
      toast.success("Ký hợp đồng thành công!")
      setIsSignModalOpen(false)
      setSigningContract(null)
      await fetchContracts() // Refresh contracts
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi khi ký hợp đồng")
    } finally {
      setIsSigningLoading(false)
    }
  }

  const handleDownloadContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId)
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, '_blank')
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  return (
    <PatientLayout title="Hợp đồng chờ ký" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Hợp đồng chờ ký
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Danh sách hợp đồng điều trị cần được ký để bắt đầu quá trình điều trị
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

            {!loading && !error && contracts.length > 0 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Lưu ý:</strong> Bạn cần ký hợp đồng trước thời hạn để bắt đầu điều trị. 
                        Hợp đồng quá hạn sẽ bị hủy tự động.
                      </p>
                    </div>
                  </div>
                </div>

                {contracts.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    onView={handleViewContract}
                    onSign={handleSignContract}
                    onDownload={handleDownloadContract}
                  />
                ))}
              </div>
            )}

            {!loading && !error && contracts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có hợp đồng chờ ký
                </h3>
                <p className="text-gray-600">
                  Hiện tại không có hợp đồng nào cần ký. Hợp đồng mới sẽ xuất hiện sau khi bác sĩ tạo kế hoạch điều trị.
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
      />

      {/* Sign Modal */}
      <ContractSignModal
        contract={signingContract}
        isOpen={isSignModalOpen}
        onClose={() => {
          setIsSignModalOpen(false)
          setSigningContract(null)
        }}
        onConfirm={handleConfirmSign}
        isLoading={isSigningLoading}
      />
    </PatientLayout>
  )
}
