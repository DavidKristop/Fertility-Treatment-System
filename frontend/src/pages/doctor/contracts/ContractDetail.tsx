import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  User,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  Download,
  Edit,
  FilePenLineIcon as Signature,
} from "lucide-react"
import { useParams } from "react-router-dom"

// Mock contract data based on ERD
const contractData = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  contractNumber: "HD001-2024",
  isSigned: true,
  signDeadline: "2024-01-15T23:59:59",
  contractUrl: "/contracts/HD001-2024.pdf",
  treatment: {
    id: "550e8400-e29b-41d4-a716-446655440011",
    startDate: "2024-01-10",
    diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
    status: "In Progress",
    paymentMode: "phase", // full or phase
    protocol: {
      title: "IVF Long Protocol",
      type: "IVF",
    },
    patient: {
      fullName: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      phone: "0901234567",
      dateOfBirth: "1992-03-15",
      address: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
    },
    doctor: {
      fullName: "BS. Trần Văn Minh",
      specialty: "Sản phụ khoa",
      degree: "Thạc sĩ Y khoa",
    },
    phases: [
      {
        id: "1",
        title: "Giai đoạn 1: Khám và tư vấn",
        description: "Khám sàng lọc ban đầu, tư vấn phác đồ điều trị và ký hợp đồng",
        totalAmount: 5000000,
        isComplete: true,
        position: 1,
      },
      {
        id: "2",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
        totalAmount: 15000000,
        isComplete: false,
        position: 2,
      },
      {
        id: "3",
        title: "Giai đoạn 3: Lấy trứng và thụ tinh",
        description: "Thu thập trứng và thực hiện thụ tinh trong phòng thí nghiệm",
        totalAmount: 25000000,
        isComplete: false,
        position: 3,
      },
      {
        id: "4",
        title: "Giai đoạn 4: Chuyển phôi",
        description: "Chuyển phôi chất lượng tốt vào tử cung",
        totalAmount: 10000000,
        isComplete: false,
        position: 4,
      },
    ],
  },
}

export default function ContractDetail() {
  const { id } = useParams()
  const contract = contractData // In real app, fetch by id

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Hợp đồng", path: "/doctor/contracts" },
    { label: contract.contractNumber },
  ]

  const totalAmount = contract.treatment.phases.reduce((sum, phase) => sum + phase.totalAmount, 0)
  const completedAmount = contract.treatment.phases
    .filter((phase) => phase.isComplete)
    .reduce((sum, phase) => sum + phase.totalAmount, 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <DoctorLayout title={`Hợp đồng ${contract.contractNumber}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Contract Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{contract.contractNumber}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    {contract.isSigned ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Đã ký
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Chờ ký
                      </Badge>
                    )}
                    <Badge className="bg-purple-100 text-purple-800">{contract.treatment.protocol.type}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contract Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Thông tin bệnh nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Họ và tên</label>
                    <p className="font-medium">{contract.treatment.patient.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ngày sinh</label>
                    <p className="font-medium">{contract.treatment.patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                    <p className="font-medium">{contract.treatment.patient.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{contract.treatment.patient.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Địa chỉ</label>
                    <p className="font-medium">{contract.treatment.patient.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin điều trị</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phác đồ điều trị</label>
                    <p className="font-medium">{contract.treatment.protocol.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bác sĩ điều trị</label>
                    <p className="font-medium">{contract.treatment.doctor.fullName}</p>
                    <p className="text-sm text-muted-foreground">{contract.treatment.doctor.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ngày bắt đầu</label>
                    <p className="font-medium">{contract.treatment.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hình thức thanh toán</label>
                    <p className="font-medium">
                      {contract.treatment.paymentMode === "phase" ? "Thanh toán theo giai đoạn" : "Thanh toán một lần"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Chẩn đoán</label>
                    <p className="font-medium">{contract.treatment.diagnosis}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Treatment Phases */}
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết các giai đoạn điều trị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contract.treatment.phases.map((phase, index) => (
                    <div key={phase.id}>
                      <div
                        className={`flex items-start gap-4 p-4 rounded-lg border ${
                          phase.isComplete ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            phase.isComplete ? "bg-green-600 text-white" : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {phase.position}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{phase.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-lg">{formatCurrency(phase.totalAmount)}</p>
                              {phase.isComplete && (
                                <Badge className="bg-green-100 text-green-800 mt-1">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Đã thanh toán
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < contract.treatment.phases.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Summary */}
          <div className="space-y-6">
            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tổng quan tài chính
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tổng chi phí:</span>
                    <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đã thanh toán:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(completedAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Còn lại:</span>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(totalAmount - completedAmount)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Tiến độ thanh toán:</span>
                    <span className="font-bold">{Math.round((completedAmount / totalAmount) * 100)}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(completedAmount / totalAmount) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Trạng thái hợp đồng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Trạng thái ký</label>
                    <div className="flex items-center gap-2 mt-1">
                      {contract.isSigned ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Đã ký
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Chờ ký
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Hạn ký hợp đồng</label>
                    <p className="font-medium mt-1">{new Date(contract.signDeadline).toLocaleDateString("vi-VN")}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Ngày tạo</label>
                    <p className="font-medium mt-1">{contract.treatment.startDate}</p>
                  </div>
                </div>

                {!contract.isSigned && (
                  <Button className="w-full" variant="outline">
                    <Signature className="h-4 w-4 mr-2" />
                    Gửi yêu cầu ký
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Xem hồ sơ bệnh nhân
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Xem lịch điều trị
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Xem kết quả xét nghiệm
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}
