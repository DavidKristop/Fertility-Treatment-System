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
  DollarSign,
  User,
  Calendar,
  Download,
  Activity,
  CheckCircle,
} from "lucide-react"

// Mock data - Tất cả hợp đồng đã được bệnh nhân xác nhận
const contracts = [
  {
    id: 1,
    contractNumber: "HD001-2024",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
    },
    treatmentType: "IVF",
    totalAmount: 85000000,
    confirmedDate: "2024-01-10",
    status: "active",
    progress: 75,
    currentStage: "Giai đoạn 3: Lấy trứng và thụ tinh",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", amount: 5000000, status: "completed" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", amount: 25000000, status: "completed" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", amount: 35000000, status: "in-progress" },
      { name: "Giai đoạn 4: Chuyển phôi", amount: 20000000, status: "pending" },
    ],
  },
  {
    id: 2,
    contractNumber: "HD002-2024",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
    },
    treatmentType: "IUI",
    totalAmount: 25000000,
    confirmedDate: "2024-01-08",
    status: "completed",
    progress: 100,
    currentStage: "Hoàn thành",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", amount: 3000000, status: "completed" },
      { name: "Giai đoạn 2: Kích thích rụng trứng", amount: 12000000, status: "completed" },
      { name: "Giai đoạn 3: Thụ tinh nhân tạo", amount: 10000000, status: "completed" },
    ],
  },
  {
    id: 3,
    contractNumber: "HD003-2024",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
    },
    treatmentType: "IVF",
    totalAmount: 95000000,
    confirmedDate: "2024-01-05",
    status: "active",
    progress: 25,
    currentStage: "Giai đoạn 1: Khám và tư vấn",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", amount: 5000000, status: "in-progress" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", amount: 30000000, status: "pending" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", amount: 40000000, status: "pending" },
      { name: "Giai đoạn 4: Chuyển phôi", amount: 20000000, status: "pending" },
    ],
  },
  {
    id: 4,
    contractNumber: "HD004-2024",
    patient: {
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
    },
    treatmentType: "IUI",
    totalAmount: 30000000,
    confirmedDate: "2024-01-03",
    status: "paused",
    progress: 50,
    currentStage: "Tạm dừng theo yêu cầu",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", amount: 5000000, status: "completed" },
      { name: "Giai đoạn 2: Kích thích rụng trứng", amount: 15000000, status: "paused" },
      { name: "Giai đoạn 3: Thụ tinh nhân tạo", amount: 10000000, status: "pending" },
    ],
  },
  {
    id: 5,
    contractNumber: "HD005-2023",
    patient: {
      name: "Võ Thị Mai",
      age: 29,
      phone: "0945678901",
    },
    treatmentType: "IVF",
    totalAmount: 85000000,
    confirmedDate: "2023-12-20",
    status: "completed",
    progress: 100,
    currentStage: "Hoàn thành - Có thai thành công",
    stages: [
      { name: "Giai đoạn 1: Khám và tư vấn", amount: 5000000, status: "completed" },
      { name: "Giai đoạn 2: Kích thích buồng trứng", amount: 25000000, status: "completed" },
      { name: "Giai đoạn 3: Lấy trứng và thụ tinh", amount: 35000000, status: "completed" },
      { name: "Giai đoạn 4: Chuyển phôi", amount: 20000000, status: "completed" },
    ],
  },
]

export default function ViewContracts() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang thực hiện"
      case "completed":
        return "Hoàn thành"
      case "paused":
        return "Tạm dừng"
      default:
        return status
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Xem hợp đồng" }]

  return (
    <DoctorLayout title="Xem hợp đồng" breadcrumbs={breadcrumbs}>
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
                <SelectItem value="active">Đang thực hiện</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="paused">Tạm dừng</SelectItem>
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
                  <p className="text-2xl font-bold">5</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đang thực hiện</p>
                  <p className="text-2xl font-bold text-green-600">2</p>
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
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng giá trị</p>
                  <p className="text-2xl font-bold text-green-600">320M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách hợp đồng đã xác nhận</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Số hợp đồng</TableHead>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Loại điều trị</TableHead>
                    <TableHead>Tổng giá trị</TableHead>
                    <TableHead>Tiến độ</TableHead>
                    <TableHead>Giai đoạn hiện tại</TableHead>
                    <TableHead>Ngày xác nhận</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {contract.contractNumber}
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
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{contract.treatmentType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-green-600">{formatCurrency(contract.totalAmount)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${contract.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{contract.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="text-sm">{contract.currentStage}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {contract.confirmedDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(contract.status)}>{getStatusText(contract.status)}</Badge>
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
