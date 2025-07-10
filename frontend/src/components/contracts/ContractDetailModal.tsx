import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { getPatientContractById, getManagerContractById } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

interface ContractDetailModalProps {
  contract?: ContractResponse | null // Giữ lại prop cũ để backward compatible
  contractId?: string | null // Prop mới
  isOpen: boolean
  onClose: () => void
  showPatientInfo?: boolean
  userRole?: "patient" | "manager"
}

export default function ContractDetailModal({ 
  contract: initialContract,
  contractId, 
  isOpen, 
  onClose, 
  showPatientInfo = false,
  userRole = "patient"
}: ContractDetailModalProps) {
  const [contract, setContract] = useState<ContractResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Xử lý khi modal mở/đóng
  useEffect(() => {
    if (!isOpen) {
      // Reset state khi đóng modal
      setContract(null)
      setError(null)
      setLoading(false)
      return
    }

    // Khi modal mở
    if (initialContract) {
      // Trường hợp 1: Có contract object sẵn
      setContract(initialContract)
      setLoading(false)
      setError(null)
    } else if (contractId) {
      // Trường hợp 2: Chỉ có contractId, cần fetch
      fetchContractDetail()
    } else {
      // Trường hợp 3: Không có gì
      setContract(null)
      setLoading(false)
      setError("Không có thông tin hợp đồng")
    }
  }, [isOpen, contractId, initialContract])

  const fetchContractDetail = async () => {
    if (!contractId) {
      setError("Không có ID hợp đồng")
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      console.log("Fetching contract detail for ID:", contractId, "Role:", userRole)
      
      const response = userRole === "manager" 
        ? await getManagerContractById(contractId)
        : await getPatientContractById(contractId)
      
      console.log("Contract detail response:", response)
      
      if (response.payload) {
        setContract(response.payload)
      } else {
        setError("Không tìm thấy thông tin hợp đồng")
      }
    } catch (err) {
      console.error("Error fetching contract detail:", err)
      const errorMessage = err instanceof Error ? err.message : "Lỗi khi tải chi tiết hợp đồng"
      setError(errorMessage)
      toast.error("Không thể tải chi tiết hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết hợp đồng</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về hợp đồng và điều trị
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
              <p>Đang tải chi tiết hợp đồng...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <p>{error}</p>
            </div>
            {contractId && (
              <Button onClick={fetchContractDetail} variant="outline">
                Thử lại
              </Button>
            )}
          </div>
        )}

        {!loading && !error && contract && (
          <div className="space-y-6">
            {/* Contract Info */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Thông tin hợp đồng</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Mã hợp đồng:</span>
                  <div className="font-medium break-all">{contract.id}</div>
                </div>
                <div>
                  <span className="text-gray-500">Trạng thái:</span>
                  <div>
                    <Badge className={contract.signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {contract.signed ? "Đã ký" : "Chờ ký"}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Hạn ký:</span>
                  <div className="font-medium">
                    {new Date(contract.signDeadline).toLocaleString("vi-VN", {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">File hợp đồng:</span>
                  <div className="font-medium">
                    {contract.contractUrl ? (
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-blue-600"
                        onClick={() => window.open(contract.contractUrl, '_blank')}
                      >
                        Tải xuống
                      </Button>
                    ) : (
                      "Chưa có"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Info - Chỉ hiển thị cho Manager */}
            {showPatientInfo && contract.treatment?.patient && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Thông tin bệnh nhân</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Họ tên:</span>
                    <div className="font-medium">{contract.treatment.patient.fullName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="font-medium break-all">{contract.treatment.patient.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Số điện thoại:</span>
                    <div className="font-medium">{contract.treatment.patient.phone}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày sinh:</span>
                    <div className="font-medium">
                      {contract.treatment.patient.dateOfBirth ? 
                        new Date(contract.treatment.patient.dateOfBirth).toLocaleDateString("vi-VN") : 
                        "Chưa cập nhật"
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Doctor Info */}
            {contract.treatment?.doctor && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Thông tin bác sĩ</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Họ tên:</span>
                    <div className="font-medium">{contract.treatment.doctor.fullName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <div className="font-medium break-all">{contract.treatment.doctor.email}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Số điện thoại:</span>
                    <div className="font-medium">{contract.treatment.doctor.phone}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Chuyên khoa:</span>
                    <div className="font-medium">{contract.treatment.doctor.specialty || "Chưa cập nhật"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Treatment Info */}
            {contract.treatment && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Thông tin điều trị</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">Mô tả:</span>
                    <div className="font-medium">{contract.treatment.description}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Protocol:</span>
                    <div className="font-medium">{contract.treatment.protocol?.title}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Giá trị:</span>
                    <div className="font-medium text-green-600">
                      {contract.treatment.protocol?.estimatedPrice?.toLocaleString("vi-VN")} VNĐ
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Thời gian điều trị:</span>
                    <div className="font-medium">
                      {contract.treatment.startDate && contract.treatment.endDate ? 
                        `${new Date(contract.treatment.startDate).toLocaleDateString("vi-VN")} - ${new Date(contract.treatment.endDate).toLocaleDateString("vi-VN")}` :
                        "Chưa xác định"
                      }
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Trạng thái điều trị:</span>
                    <div className="font-medium">
                      <Badge variant="outline">{contract.treatment.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Protocol Phases - Hiển thị đầy đủ thông tin */}
            {contract.treatment?.protocol?.phases && contract.treatment.protocol.phases.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Các giai đoạn điều trị</h3>
                <div className="space-y-3">
                  {contract.treatment.protocol.phases
                    .sort((a, b) => a.position - b.position)
                    .map((phase) => (
                    <div key={phase.id} className="border rounded p-3 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          Giai đoạn {phase.position}: {phase.title}
                        </h4>
                        {phase.phaseModifierPercentage && phase.phaseModifierPercentage !== 1 && (
                          <Badge variant="outline" className="text-xs">
                            Modifier: {(phase.phaseModifierPercentage * 100)}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                      
                      {/* Services trong phase */}
                      {phase.services && phase.services.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-700 block mb-2">Dịch vụ:</span>
                          <div className="space-y-1">
                            {phase.services.map(service => (
                              <div key={service.id} className="flex justify-between items-center bg-white p-2 rounded border">
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{service.name}</div>
                                  <div className="text-xs text-gray-500">{service.description}</div>
                                </div>
                                <div className="text-sm font-medium text-green-600">
                                  {service.price?.toLocaleString("vi-VN")} VNĐ
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Drugs trong phase (nếu có) */}
                      {phase.drugs && phase.drugs.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-gray-700 block mb-2">Thuốc:</span>
                          <div className="space-y-1">
                            {phase.drugs.map(drug => (
                              <div key={drug.id} className="flex justify-between items-center bg-white p-2 rounded border">
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{drug.name}</div>
                                  <div className="text-xs text-gray-500">{drug.description}</div>
                                </div>
                                <div className="text-sm font-medium text-blue-600">
                                  {drug.price?.toLocaleString("vi-VN")} VNĐ
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tính tổng giá cho phase này */}
                      {((phase.services && phase.services.length > 0) || (phase.drugs && phase.drugs.length > 0)) && (
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Tổng giai đoạn:</span>
                            <span className="text-sm font-bold text-gray-900">
                              {(() => {
                                const servicesTotal = phase.services?.reduce((sum, service) => sum + (service.price || 0), 0) || 0;
                                const drugsTotal = phase.drugs?.reduce((sum, drug) => sum + (drug.price || 0), 0) || 0;
                                const phaseTotal = servicesTotal + drugsTotal;
                                const finalTotal = phase.phaseModifierPercentage ? phaseTotal * phase.phaseModifierPercentage : phaseTotal;
                                return finalTotal.toLocaleString("vi-VN");
                              })()} VNĐ
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Tổng cộng tất cả phases */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Tổng giá trị phác đồ:</span>
                    <span className="font-bold text-lg text-blue-900">
                      {contract.treatment.protocol.estimatedPrice?.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !error && !contract && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy thông tin hợp đồng</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}