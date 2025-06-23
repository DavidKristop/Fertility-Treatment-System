import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, Activity, CheckCircle, Download, Eye } from "lucide-react"
import StatsCard from "@/components/doctor/dashboard/StatsCard"
import AppointmentCard from "@/components/doctor/dashboard/AppointmentCard"
import ContractCard from "@/components/doctor/dashboard/ContractCard"
import QuickActions from "@/components/doctor/dashboard/QuickActions"

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

  const statsData = [
    {
      title: "Lịch hôm nay",
      value: todayStats.appointments,
      subtitle: `${todayStats.completedAppointments} hoàn thành`,
      icon: Calendar,
      iconColor: "text-blue-600",
    },
    {
      title: "Tổng bệnh nhân",
      value: todayStats.totalPatients,
      subtitle: `+${todayStats.newPatients} mới hôm nay`,
      icon: Users,
      iconColor: "text-green-600",
    },
    {
      title: "Hợp đồng",
      value: todayStats.totalContracts,
      subtitle: `${todayStats.activeContracts} đang điều trị`,
      icon: FileText,
      iconColor: "text-purple-600",
    },
    {
      title: "Đang điều trị",
      value: todayStats.activeContracts,
      subtitle: "Hợp đồng hoạt động",
      icon: Activity,
      iconColor: "text-green-600",
    },
    {
      title: "Hoàn thành",
      value: todayStats.completedContracts,
      subtitle: "Điều trị thành công",
      icon: CheckCircle,
      iconColor: "text-blue-600",
    },
  ]

  return (
    <DoctorLayout title="Tổng quan" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
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
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    getStatusColor={getAppointmentStatusColor}
                    getStatusText={getAppointmentStatusText}
                  />
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
                  <ContractCard
                    key={contract.id}
                    contract={contract}
                    getTreatmentStatusColor={getTreatmentStatusColor}
                    getTreatmentStatusText={getTreatmentStatusText}
                  />
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
        <QuickActions />
      </div>
    </DoctorLayout>
  )
}
