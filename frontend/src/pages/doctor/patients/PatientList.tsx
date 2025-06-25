import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, User } from "lucide-react"
import StatsCard from "@/components/doctor/dashboard/StatsCard"
import PatientTable from "@/components/doctor/patients/PatientTable"

// Mock data
const patients = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    age: 32,
    phone: "0901234567",
    email: "lan.nguyen@email.com",
    address: "Quận 1, TP.HCM",
    treatmentPlan: "IVF - Giai đoạn 2",
    status: "active",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-15",
  },
  {
    id: 2,
    name: "Trần Văn Nam",
    age: 35,
    phone: "0912345678",
    email: "nam.tran@email.com",
    address: "Quận 3, TP.HCM",
    treatmentPlan: "IUI - Giai đoạn 1",
    status: "active",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-12",
  },
  {
    id: 3,
    name: "Lê Thị Hoa",
    age: 28,
    phone: "0923456789",
    email: "hoa.le@email.com",
    address: "Quận 7, TP.HCM",
    treatmentPlan: "Tư vấn ban đầu",
    status: "new",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-01-14",
  },
  {
    id: 4,
    name: "Phạm Minh Tuấn",
    age: 40,
    phone: "0934567890",
    email: "tuan.pham@email.com",
    address: "Quận 2, TP.HCM",
    treatmentPlan: "IVF - Hoàn thành",
    status: "completed",
    lastVisit: "2023-12-20",
    nextAppointment: null,
  },
  {
    id: 5,
    name: "Võ Thị Mai",
    age: 29,
    phone: "0945678901",
    email: "mai.vo@email.com",
    address: "Quận 5, TP.HCM",
    treatmentPlan: "IUI - Tạm dừng",
    status: "paused",
    lastVisit: "2023-12-15",
    nextAppointment: null,
  },
]

export default function PatientList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang điều trị"
      case "new":
        return "Bệnh nhân mới"
      case "completed":
        return "Hoàn thành"
      case "paused":
        return "Tạm dừng"
      default:
        return status
    }
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Bệnh nhân" },
    { label: "Tất cả bệnh nhân" },
  ]

  const statsData = [
    {
      title: "Tổng bệnh nhân",
      value: 23,
      icon: User,
      iconColor: "text-blue-600",
    },
    {
      title: "Đang điều trị",
      value: 15,
      icon: User,
      iconColor: "text-green-600",
    },
    {
      title: "Bệnh nhân mới",
      value: 3,
      icon: User,
      iconColor: "text-blue-600",
    },
    {
      title: "Hoàn thành",
      value: 5,
      icon: User,
      iconColor: "text-gray-600",
    },
  ]

  return (
    <DoctorLayout title="Danh sách bệnh nhân" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-10 w-80" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang điều trị</SelectItem>
                <SelectItem value="new">Bệnh nhân mới</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="paused">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm bệnh nhân
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách bệnh nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientTable patients={patients} getStatusColor={getStatusColor} getStatusText={getStatusText} />
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
