import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { ContractResponse } from "@/api/types"

interface ContractDetailModalProps {
  contract: ContractResponse | null
  isOpen: boolean
  onClose: () => void
  showPatientInfo?: boolean
}

export default function ContractDetailModal({ 
  contract, 
  isOpen, 
  onClose, 
  showPatientInfo = false 
}: ContractDetailModalProps) {
  if (!contract) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết hợp đồng</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về hợp đồng và điều trị
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contract Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Thông tin hợp đồng</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Mã hợp đồng:</span>
                <div className="font-medium">{contract.id}</div>
              </div>
              <div>
                <span className="text-gray-500">Hạn ký:</span>
                <div className="font-medium">
                  {new Date(contract.signDeadline).toLocaleString("vi-VN")}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Trạng thái:</span>
                <Badge className={contract.signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {contract.signed ? "Đã ký" : "Chờ ký"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          {showPatientInfo && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Thông tin bệnh nhân</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Họ tên:</span>
                  <div className="font-medium">{contract.treatment.patient.fullName}</div>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <div className="font-medium">{contract.treatment.patient.email}</div>
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
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Thông tin bác sĩ</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Họ tên:</span>
                <div className="font-medium">{contract.treatment.doctor.fullName}</div>
              </div>
              <div>
                <span className="text-gray-500">Chuyên khoa:</span>
                <div className="font-medium">{contract.treatment.doctor.specialty}</div>
              </div>
              <div>
                <span className="text-gray-500">Học vị:</span>
                <div className="font-medium">{contract.treatment.doctor.degree}</div>
              </div>
              <div>
                <span className="text-gray-500">Kinh nghiệm:</span>
                <div className="font-medium">{contract.treatment.doctor.yearsOfExperience} năm</div>
              </div>
            </div>
          </div>

          {/* Treatment Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Thông tin điều trị</h3>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Phác đồ:</span>
                <div className="font-medium">{contract.treatment.protocol.title}</div>
              </div>
              <div>
                <span className="text-gray-500">Giá dự kiến:</span>
                <div className="font-medium text-green-600">
                  {contract.treatment.protocol.estimatedPrice.toLocaleString("vi-VN")} VNĐ
                </div>
              </div>
              <div>
                <span className="text-gray-500">Ngày bắt đầu:</span>
                <div className="font-medium">
                  {new Date(contract.treatment.startDate).toLocaleDateString("vi-VN")}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Ngày kết thúc:</span>
                <div className="font-medium">
                  {new Date(contract.treatment.endDate).toLocaleDateString("vi-VN")}
                </div>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Mô tả:</span>
              <div className="font-medium mt-1">{contract.treatment.description}</div>
            </div>
          </div>

          {/* Protocol Phases */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Các giai đoạn điều trị</h3>
            <div className="space-y-3">
              {contract.treatment.protocol.phases.map((phase, index) => (
                <div key={phase.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="font-medium">
                    Giai đoạn {index + 1}: {phase.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {phase.description}
                  </div>
                  {phase.services && phase.services.length > 0 && (
                    <div className="mt-2">
                      <div className="text-sm font-medium text-gray-700">Dịch vụ:</div>
                      <div className="text-sm text-gray-600">
                        {phase.services.map(service => service.name).join(", ")}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}