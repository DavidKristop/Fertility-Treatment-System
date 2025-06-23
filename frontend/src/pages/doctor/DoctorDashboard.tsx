import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, FileText, Clock, Eye, Phone, Activity, CheckCircle, Download } from "lucide-react"

// Mock data - Đơn giản hóa, bỏ payment và refund
const todayStats = {
  appointments: 8,
  completedAppointments: 5,
  pendingAppointments: 3,
  totalPatients: 156,
  newPatients: 3,
  totalContracts: 6,
  activeContracts: 3,
  completedContracts: 2,
  stoppedContracts: 1,
}

const todayAppointments = [
  {
    id: 1,
    time: "08:00",
    patient: "Nguyễn Thị Lan",
    type: "Tái khám",
    status: "completed",
    phone: "0901234567",
  },
  {
    id: 2,
    time: "09:30",
    patient: "Trần Văn Nam",
    type: "Khám đầu tiên",
    status: "completed",
    phone: "0912345678",
  },
  {
    id: 3,
    time: "10:15",
    patient: "Lê Thị Hoa",
    type: "Theo dõi điều trị",
    status: "in-progress",
    phone: "0923456789",
  },
  {
    id: 4,
    time: "11:00",
    patient: "Phạm Minh Tuấn",
    type: "Tư vấn",
    status: "pending",
    phone: "0934567890",
  },
  {
    id: 5,
    time: "14:00",
    patient: "Võ Thị Mai",
    type: "Khám đầu tiên",
    status: "pending",
    phone: "0945678901",
  },
]

const recentContracts = [
  {
    id: 1,
    contractNumber: "HD001-2024",
    patient: "Nguyễn Thị Lan",
    treatmentType: "IVF",
    treatmentStatus: "active",
    progress: 75,
    currentStage: "Giai đoạn 3: Lấy trứng và thụ tinh",
    confirmedDate: "2024-01-10",
  },
  {
    id: 2,
    contractNumber: "HD002-2024",
    patient: "Lê Thị Hoa",
    treatmentType: "IVF",
    treatmentStatus: "active",
    progress: 25,
    currentStage: "Giai đoạn 1: Khám và tư vấn",
    confirmedDate: "2024-01-05",
  },
  {
    id: 3,
    contractNumber: "HD003-2024",
    patient: "Trần Văn Nam",
    treatmentType: "IUI",
    treatmentStatus: "completed",
    progress: 100,
    currentStage: "Hoàn thành - Thành công",
    confirmedDate: "2024-01-08",
  },
]

const recentConfirmations = [
  {
    id: 1,
    contractNumber: "HD001-2024",
    patient: "Nguyễn Thị Lan",
    confirmedDate: "2024-01-10",
    confirmedTime: "14:30",
  },
  {
    id: 2,
    contractNumber: "HD002-2024",
    patient: "Trần Văn Nam",
    confirmedDate: "2024-01-08",
    confirmedTime: "09:15",
  },
]

export default function DoctorDashboard() {
  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAppointmentStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang khám"
      case "pending":
        return "Chờ khám"
      default:
        return status
    }
  }

  const getTreatmentStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "stopped":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTreatmentStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang điều trị"
      case "completed":
        return "Hoàn thành"
      case "stopped":
        return "Đã dừng"
      default:
        return status
    }
  }

  const breadcrumbs = [{ label: "Trang chủ" }]

  return (
    <DoctorLayout title="Tổng quan" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lịch hôm nay</p>
                  <p className="text-2xl font-bold">{todayStats.appointments}</p>
                  <p className="text-xs text-muted-foreground">{todayStats.completedAppointments} hoàn thành</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng bệnh nhân</p>
                  <p className="text-2xl font-bold">{todayStats.totalPatients}</p>
                  <p className="text-xs text-muted-foreground">+{todayStats.newPatients} mới hôm nay</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hợp đồng</p>
                  <p className="text-2xl font-bold">{todayStats.totalContracts}</p>
                  <p className="text-xs text-muted-foreground">{todayStats.activeContracts} đang điều trị</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đang điều trị</p>
                  <p className="text-2xl font-bold text-green-600">{todayStats.activeContracts}</p>
                  <p className="text-xs text-muted-foreground">Hợp đồng hoạt động</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hoàn thành</p>
                  <p className="text-2xl font-bold text-blue-600">{todayStats.completedContracts}</p>
                  <p className="text-xs text-muted-foreground">Điều trị thành công</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lịch khám hôm nay</CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Xem tất cả
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{appointment.time}</span>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {appointment.phone}
                        </p>
                      </div>
                    </div>
                    <Badge className={getAppointmentStatusColor(appointment.status)}>
                      {getAppointmentStatusText(appointment.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Contracts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Hợp đồng điều trị gần đây</CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Xem tất cả
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContracts.map((contract) => (
                  <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">{contract.contractNumber}</span>
                      </div>
                      <div>
                        <p className="font-medium">{contract.patient}</p>
                        <p className="text-sm text-muted-foreground">{contract.treatmentType}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-12 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${
                                contract.treatmentStatus === "completed"
                                  ? "bg-blue-600"
                                  : contract.treatmentStatus === "stopped"
                                    ? "bg-red-600"
                                    : "bg-green-600"
                              }`}
                              style={{ width: `${contract.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{contract.progress}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{contract.currentStage}</p>
                        <Badge className={getTreatmentStatusColor(contract.treatmentStatus)} variant="secondary">
                          {getTreatmentStatusText(contract.treatmentStatus)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{contract.confirmedDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Confirmations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Hợp đồng được xác nhận gần đây
            </CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentConfirmations.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium">{contract.contractNumber}</span>
                    </div>
                    <div>
                      <p className="font-medium">{contract.patient}</p>
                      <p className="text-sm text-green-600">Đã xác nhận hợp đồng online</p>
                      <p className="text-xs text-muted-foreground">
                        {contract.confirmedDate} lúc {contract.confirmedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Tải PDF
                    </Button>
                    <Button size="sm">Chi tiết</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Xem lịch khám</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Danh sách bệnh nhân</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Hợp đồng điều trị</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Activity className="h-6 w-6" />
                <span>Tiến độ điều trị</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
