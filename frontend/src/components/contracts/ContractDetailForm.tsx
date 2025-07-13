import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText, User, Stethoscope, Calendar, DollarSign } from "lucide-react"
import { getPatientContractById, getManagerContractById } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

interface ContractDetailFormProps {
  contract?: ContractResponse | null // Backward compatible
  contractId?: string | null // New prop
  showPatientInfo?: boolean
  userRole?: "patient" | "manager"
  onRefresh?: () => void
}

export default function ContractDetailForm({ 
  contract: initialContract,
  contractId, 
  showPatientInfo = false,
  userRole = "patient",
  onRefresh
}: ContractDetailFormProps) {
  const [contract, setContract] = useState<ContractResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialContract) {
      // Trường hợp có contract object sẵn
      setContract(initialContract)
      setLoading(false)
      setError(null)
    } else if (contractId) {
      // Trường hợp chỉ có contractId, cần fetch
      fetchContractDetail()
    } else {
      // Không có gì
      setContract(null)
      setLoading(false)
      setError("Không có thông tin hợp đồng")
    }
  }, [contractId, initialContract])

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

  const handleRefresh = () => {
    if (contractId) {
      fetchContractDetail()
    }
    if (onRefresh) {
      onRefresh()
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p>Đang tải chi tiết hợp đồng...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-500 mb-4">
            <p>{error}</p>
          </div>
          {contractId && (
            <Button onClick={fetchContractDetail} variant="outline">
              Thử lại
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (!contract) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy thông tin hợp đồng</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Contract Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Thông tin hợp đồng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Mã hợp đồng</label>
              <p className="font-medium text-gray-900 break-all">{contract.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Trạng thái</label>
              <div className="mt-1">
                <Badge className={contract.signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {contract.signed ? "Đã ký" : "Chờ ký"}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Hạn ký</label>
              <p className="font-medium text-gray-900">
                {new Date(contract.signDeadline).toLocaleString("vi-VN", {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">File hợp đồng</label>
              <div className="mt-1">
                {contract.contractUrl ? (
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-blue-600"
                    onClick={() => window.open(contract.contractUrl, '_blank')}
                  >
                    Tải xuống
                  </Button>
                ) : (
                  <span className="text-gray-500">Chưa có</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Info - Chỉ hiển thị cho Manager */}
      {showPatientInfo && contract.treatment?.patient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin bệnh nhân
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Họ tên</label>
                <p className="font-medium text-gray-900">{contract.treatment.patient.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="font-medium text-gray-900 break-all">{contract.treatment.patient.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                <p className="font-medium text-gray-900">{contract.treatment.patient.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Ngày sinh</label>
                <p className="font-medium text-gray-900">
                  {contract.treatment.patient.dateOfBirth ? 
                    new Date(contract.treatment.patient.dateOfBirth).toLocaleDateString("vi-VN") : 
                    "Chưa cập nhật"
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Doctor Info */}
      {contract.treatment?.doctor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Thông tin bác sĩ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Họ tên</label>
                <p className="font-medium text-gray-900">{contract.treatment.doctor.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="font-medium text-gray-900 break-all">{contract.treatment.doctor.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                <p className="font-medium text-gray-900">{contract.treatment.doctor.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Chuyên khoa</label>
                <p className="font-medium text-gray-900">{contract.treatment.doctor.specialty || "Chưa cập nhật"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Treatment Info */}
      {contract.treatment && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thông tin điều trị
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Mô tả</label>
                <p className="font-medium text-gray-900">{contract.treatment.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Protocol</label>
                <p className="font-medium text-gray-900">{contract.treatment.protocol?.title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Giá trị</label>
                <p className="font-medium text-green-600 text-lg">
                  {contract.treatment.protocol?.estimatedPrice?.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Thời gian điều trị</label>
                <p className="font-medium text-gray-900">
                  {contract.treatment.startDate && contract.treatment.endDate ? 
                    `${new Date(contract.treatment.startDate).toLocaleDateString("vi-VN")} - ${new Date(contract.treatment.endDate).toLocaleDateString("vi-VN")}` :
                    "Chưa xác định"
                  }
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Trạng thái điều trị</label>
                <div className="mt-1">
                  <Badge variant="outline">{contract.treatment.status}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Protocol Phases */}
      {contract.treatment?.protocol?.phases && contract.treatment.protocol.phases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Các giai đoạn điều trị
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contract.treatment.protocol.phases
                .sort((a, b) => a.position - b.position)
                .map((phase) => (
                <div key={phase.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-900">
                      Giai đoạn {phase.position}: {phase.title}
                    </h4>
                    {phase.phaseModifierPercentage && phase.phaseModifierPercentage !== 1 && (
                      <Badge variant="outline" className="text-xs">
                        Modifier: {(phase.phaseModifierPercentage * 100)}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                  
                  {/* Services */}
                  {phase.services && phase.services.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 block mb-2">Dịch vụ:</span>
                      <div className="space-y-2">
                        {phase.services.map(service => (
                          <div key={service.id} className="flex justify-between items-center bg-white p-3 rounded border">
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

                  {/* Drugs */}
                  {phase.drugs && phase.drugs.length > 0 && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700 block mb-2">Thuốc:</span>
                      <div className="space-y-2">
                        {phase.drugs.map(drug => (
                          <div key={drug.id} className="flex justify-between items-center bg-white p-3 rounded border">
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

                  {/* Phase Total */}
                  {((phase.services && phase.services.length > 0) || (phase.drugs && phase.drugs.length > 0)) && (
                    <div className="pt-3 border-t border-gray-200">
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

              {/* Total */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-900">Tổng giá trị phác đồ:</span>
                  <span className="font-bold text-xl text-blue-900">
                    {contract.treatment.protocol.estimatedPrice?.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}