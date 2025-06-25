import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  FileText,
  Eye,
  User,
  Calendar,
  Download,
  Activity,
  XCircle,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

// Mock data - Chỉ hợp đồng đã được xác nhận (aligned with ERD)
const contracts = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    contractNumber: "HD001-2024",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
    },
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      protocol: "IVF Protocol Standard",
      status: "In Progress",
      startDate: "10-01-2024",
      diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
    },
    isSigned: true,
    signDeadline: "15-01-2024",
    contractUrl: "/contracts/HD001-2024.pdf",
    progress: 75,
    currentStage: "Giai đoạn 3: Lấy trứng và thụ tinh",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    contractNumber: "HD002-2024",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
    },
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      protocol: "IUI Protocol Basic",
      status: "Complete",
      startDate: "08-01-2024",
      diagnosis: "Vô sinh thứ phát do yếu tố nam giới nhẹ",
    },
    isSigned: true,
    signDeadline: "12-01-2024",
    contractUrl: "/contracts/HD002-2024.pdf",
    progress: 100,
    currentStage: "Hoàn thành - Thành công",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    contractNumber: "HD003-2024",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
    },
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      protocol: "IVF Protocol Standard",
      status: "In Progress",
      startDate: "05-01-2024",
      diagnosis: "Vô sinh nguyên phát do rối loạn phóng noãn",
    },
    isSigned: true,
    signDeadline: "10-01-2024",
    contractUrl: "/contracts/HD003-2024.pdf",
    progress: 25,
    currentStage: "Giai đoạn 1: Khám và tư vấn",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    contractNumber: "HD004-2024",
    patient: {
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
    },
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440014",
      protocol: "IUI Protocol Basic",
      status: "Cancel",
      startDate: "03-01-2024",
      diagnosis: "Vô sinh thứ phát do yếu tố nam giới",
    },
    isSigned: true,
    signDeadline: "08-01-2024",
    contractUrl: "/contracts/HD004-2024.pdf",
    progress: 50,
    currentStage: "Đã dừng điều trị theo yêu cầu bệnh nhân",
  },
]

export default function ViewContracts() {
  const getTreatmentStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-green-100 text-green-800"
      case "Complete":
        return "bg-blue-100 text-blue-800"
      case "Cancel":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTreatmentStatusText = (status: string) => {
    switch (status) {
      case "In Progress":
        return "Đang điều trị"
      case "Complete":
        return "Hoàn thành"
      case "Cancel":
        return "Đã hủy"
      default:
        return status
    }
  }

  const getTreatmentStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Activity className="h-4 w-4 text-green-600" />
      case "Complete":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "Cancel":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Hợp đồng điều trị" }]

  // Tính toán thống kê
  const totalContracts = contracts.length
  const activeContracts = contracts.filter((c) => c.treatment.status === "In Progress").length
  const completedContracts = contracts.filter((c) => c.treatment.status === "Complete").length
  const cancelledContracts = contracts.filter((c) => c.treatment.status === "Cancel").length

  return (
    <DoctorLayout title="Hợp đồng điều trị" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Tìm kiếm hợp đồng..." className="pl-10 w-80" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="In Progress">Đang điều trị</SelectItem>
                <SelectItem value="Complete">Hoàn thành</SelectItem>
                <SelectItem value="Cancel">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo phác đồ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="IVF">IVF</SelectItem>
                <SelectItem value="IUI">IUI</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng hợp đồng</p>
                  <p className="text-2xl font-bold">{totalContracts}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đang điều trị</p>
                  <p className="text-2xl font-bold text-green-600">{activeContracts}</p>
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
                  <p className="text-2xl font-bold text-blue-600">{completedContracts}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đã hủy</p>
                  <p className="text-2xl font-bold text-red-600">{cancelledContracts}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách hợp đồng điều trị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hợp đồng</TableHead>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Phác đồ điều trị</TableHead>
                    <TableHead>Trạng thái điều trị</TableHead>
                    <TableHead>Tiến độ điều trị</TableHead>
                    <TableHead>Giai đoạn hiện tại</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{contract.contractNumber}</div>
                            <div className="text-xs text-muted-foreground">
                              {contract.isSigned ? "Đã ký" : "Chưa ký"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">{contract.patient.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{contract.patient.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {contract.patient.age} tuổi • {contract.patient.phone}
                            </div>
                            <div className="text-xs text-muted-foreground">{contract.patient.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{contract.treatment.protocol}</Badge>
                        <div className="text-xs text-muted-foreground mt-1">{contract.treatment.diagnosis}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTreatmentStatusIcon(contract.treatment.status)}
                          <Badge className={getTreatmentStatusColor(contract.treatment.status)}>
                            {getTreatmentStatusText(contract.treatment.status)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                contract.treatment.status === "Complete"
                                  ? "bg-blue-600"
                                  : contract.treatment.status === "Cancel"
                                    ? "bg-red-600"
                                    : "bg-green-600"
                              }`}
                              style={{ width: `${contract.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{contract.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{contract.currentStage}</div>
                        {contract.treatment.status === "Cancel" && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-orange-600">Đã dừng điều trị</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {contract.treatment.startDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết hợp đồng
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Tải xuống PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="mr-2 h-4 w-4" />
                              Xem tiến độ điều trị
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Xem hồ sơ bệnh nhân
                            </DropdownMenuItem>
                            {contract.treatment.status === "In Progress" && (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Dừng điều trị
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
