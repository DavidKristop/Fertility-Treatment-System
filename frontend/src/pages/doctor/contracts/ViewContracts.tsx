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

// Mock data - Chỉ hợp đồng đã được xác nhận
const contracts = [
  {
    id: 1,
    contractNumber: "HD001-2024",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
    },
    treatmentType: "IVF",
    totalAmount: 85000000,
    confirmedDate: "2024-01-10",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "active",
    progress: 75,
    currentStage: "Giai đoạn 3: Lấy trứng và thụ tinh",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "completed" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", status: "completed" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", status: "in-progress" },
      { name: "Giai đoạn 4: Chuyển phôi", status: "pending" },
    ],
  },
  {
    id: 2,
    contractNumber: "HD002-2024",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
    },
    treatmentType: "IUI",
    totalAmount: 25000000,
    confirmedDate: "2024-01-08",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "completed",
    progress: 100,
    currentStage: "Hoàn thành - Thành công",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "completed" },
      { name: "Giai đoạn 2: Kích thích rụng trứng", status: "completed" },
      { name: "Giai đoạn 3: Thụ tinh nhân tạo", status: "completed" },
    ],
  },
  {
    id: 3,
    contractNumber: "HD003-2024",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
    },
    treatmentType: "IVF",
    totalAmount: 95000000,
    confirmedDate: "2024-01-05",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "active",
    progress: 25,
    currentStage: "Giai đoạn 1: Khám và tư vấn",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "in-progress" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", status: "pending" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", status: "pending" },
      { name: "Giai đoạn 4: Chuyển phôi", status: "pending" },
    ],
  },
  {
    id: 4,
    contractNumber: "HD004-2024",
    patient: {
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
    },
    treatmentType: "IUI",
    totalAmount: 30000000,
    confirmedDate: "2024-01-03",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "stopped",
    progress: 50,
    currentStage: "Đã dừng điều trị - Chờ xử lý hoàn tiền",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "completed" },
      { name: "Giai đoạn 2: Kích thích rụng trứng", status: "partially_completed" },
      { name: "Giai đoạn 3: Thụ tinh nhân tạo", status: "cancelled" },
    ],
  },
  {
    id: 5,
    contractNumber: "HD005-2024",
    patient: {
      name: "Võ Thị Mai",
      age: 29,
      phone: "0945678901",
      email: "mai.vo@email.com",
    },
    treatmentType: "IVF",
    totalAmount: 85000000,
    confirmedDate: "2023-12-20",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "completed",
    progress: 100,
    currentStage: "Hoàn thành - Có thai thành công",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "completed" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", status: "completed" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", status: "completed" },
      { name: "Giai đoạn 4: Chuyển phôi", status: "completed" },
    ],
  },
  {
    id: 6,
    contractNumber: "HD006-2024",
    patient: {
      name: "Hoàng Thị Bình",
      age: 31,
      phone: "0956789012",
      email: "binh.hoang@email.com",
    },
    treatmentType: "IVF",
    totalAmount: 90000000,
    confirmedDate: "2024-01-12",
    signingMethod: "Ký điện tử online",
    treatmentStatus: "active",
    progress: 60,
    currentStage: "Giai đoạn 2: Kích thích buồng trứng",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", status: "completed" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", status: "in-progress" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", status: "pending" },
      { name: "Giai đoạn 4: Chuyển phôi", status: "pending" },
    ],
  },
]

export default function ViewContracts() {
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

  const getTreatmentStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-4 w-4 text-green-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "stopped":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Hợp đồng điều trị" }]

  // Tính toán thống kê
  const totalContracts = contracts.length
  const activeContracts = contracts.filter((c) => c.treatmentStatus === "active").length
  const completedContracts = contracts.filter((c) => c.treatmentStatus === "completed").length
  const stoppedContracts = contracts.filter((c) => c.treatmentStatus === "stopped").length

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
                <SelectItem value="active">Đang điều trị</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="stopped">Đã dừng</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo loại điều trị" />
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
                  <p className="text-sm text-muted-foreground">Đã dừng</p>
                  <p className="text-2xl font-bold text-red-600">{stoppedContracts}</p>
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
                    <TableHead>Loại điều trị</TableHead>
                    <TableHead>Trạng thái điều trị</TableHead>
                    <TableHead>Tiến độ điều trị</TableHead>
                    <TableHead>Giai đoạn hiện tại</TableHead>
                    <TableHead>Ngày xác nhận</TableHead>
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
                            <div className="text-xs text-muted-foreground">{contract.signingMethod}</div>
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
                        <Badge variant="outline">{contract.treatmentType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTreatmentStatusIcon(contract.treatmentStatus)}
                          <Badge className={getTreatmentStatusColor(contract.treatmentStatus)}>
                            {getTreatmentStatusText(contract.treatmentStatus)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                contract.treatmentStatus === "completed"
                                  ? "bg-blue-600"
                                  : contract.treatmentStatus === "stopped"
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
                        {contract.treatmentStatus === "stopped" && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-orange-600">Chờ xử lý hoàn tiền</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {contract.confirmedDate}
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
                            {contract.treatmentStatus === "active" && (
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
