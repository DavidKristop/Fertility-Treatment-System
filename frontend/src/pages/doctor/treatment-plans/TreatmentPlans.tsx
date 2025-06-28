"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye } from "lucide-react"

interface TreatmentPlan {
  id: string
  patientName: string
  patientEmail: string
  protocolTitle: string
  diagnosis: string
  status: "In Progress" | "Complete" | "Pending"
  startDate: string
  currentPhase: string
  nextAppointment?: string
}

// Mock data
const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "1",
    patientName: "Nguyễn Thị Lan",
    patientEmail: "lan.nguyen@email.com",
    protocolTitle: "IVF Protocol Standard",
    diagnosis: "Vô sinh nguyên phát",
    status: "In Progress",
    startDate: "2024-01-15",
    currentPhase: "Kích thích buồng trứng",
    nextAppointment: "2024-06-28",
  },
  {
    id: "2",
    patientName: "Trần Văn Minh",
    patientEmail: "minh.tran@email.com",
    protocolTitle: "IUI Protocol Basic",
    diagnosis: "Vô sinh thứ phát",
    status: "Complete",
    startDate: "2023-12-01",
    currentPhase: "Hoàn thành",
  },
  {
    id: "3",
    patientName: "Lê Thị Hoa",
    patientEmail: "hoa.le@email.com",
    protocolTitle: "IVF Protocol Advanced",
    diagnosis: "Vô sinh do tuổi cao",
    status: "In Progress",
    startDate: "2024-02-01",
    currentPhase: "Chuẩn bị nội mạc tử cung",
    nextAppointment: "2024-07-02",
  },
  {
    id: "4",
    patientName: "Phạm Thị Mai",
    patientEmail: "mai.pham@email.com",
    protocolTitle: "IVF Protocol Standard",
    diagnosis: "Vô sinh nguyên phát",
    status: "Pending",
    startDate: "2024-03-10",
    currentPhase: "Chờ xét nghiệm",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Complete":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "In Progress":
      return "Đang điều trị"
    case "Complete":
      return "Hoàn thành"
    case "Pending":
      return "Chờ xử lý"
    default:
      return status
  }
}

export default function TreatmentPlans() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [treatmentPlans] = useState<TreatmentPlan[]>(mockTreatmentPlans)

  const filteredPlans = treatmentPlans.filter((plan) => {
    const matchesSearch =
      plan.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.protocolTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || plan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const breadcrumbs = [{ label: "Dashboard", path: "/doctor/dashboard" }, { label: "Kế hoạch điều trị" }]

  return (
    <DoctorLayout title="Kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bệnh nhân, giao thức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="In Progress">Đang điều trị</SelectItem>
                <SelectItem value="Complete">Hoàn thành</SelectItem>
                <SelectItem value="Pending">Chờ xử lý</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => navigate("/doctor/treatment-plans/create")} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Tạo kế hoạch mới
          </Button>
        </div>

        {/* Treatment Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách kế hoạch điều trị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Giao thức điều trị</TableHead>
                    <TableHead>Chẩn đoán</TableHead>
                    <TableHead>Giai đoạn hiện tại</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Lịch hẹn tiếp theo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPlans.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        Không tìm thấy kế hoạch điều trị nào
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPlans.map((plan) => (
                      <TableRow key={plan.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{plan.patientName}</p>
                            <p className="text-sm text-gray-500">{plan.patientEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{plan.protocolTitle}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{plan.diagnosis}</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{plan.currentPhase}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(plan.status)}>{getStatusText(plan.status)}</Badge>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{new Date(plan.startDate).toLocaleDateString("vi-VN")}</p>
                        </TableCell>
                        <TableCell>
                          {plan.nextAppointment ? (
                            <p className="text-sm">{new Date(plan.nextAppointment).toLocaleDateString("vi-VN")}</p>
                          ) : (
                            <span className="text-gray-400 text-sm">Chưa có</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/doctor/treatment-plans/treatment-details/${plan.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Xem chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
