"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  FileText,
  User,
  CalendarDays,
  ThumbsUp,
  ThumbsDown,
  ClipboardList,
} from "lucide-react"
import { useState } from "react"

interface Patient {
  id: string
  name: string
  age: number
  phone: string
  email: string
  address: string
  avatar: string
}

interface PendingAppointment {
  id: string
  requestDate: string
  requestTime: string
  appointmentDate: string
  appointmentTime: string
  duration: number
  status: "Pending" | "Approved" | "Denied"
  patient: {
    id: string
    name: string
    age: number
    phone: string
    email: string
    address: string
    avatar: string
  }
  treatmentType: "IVF" | "IUI" // This is the key fix - strictly typing the treatment types
  requestedService: string
  reason: string
  medicalHistory: string
  previousTreatments: string
  urgency: "Normal" | "Urgent" | "Emergency"
  preferredDoctor: string
  notes: string
}

interface PendingApprovalsProps {
  appointments?: PendingAppointment[]
  onApprove?: (appointmentId: string, note?: string) => void
  onDeny?: (appointmentId: string, reason: string) => void
  onBulkApprove?: (appointmentIds: string[]) => void
  onBulkDeny?: (appointmentIds: string[]) => void
}

// Mock data cho các lịch hẹn chờ duyệt
const pendingAppointments: PendingAppointment[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    requestDate: "14-01-2024",
    requestTime: "08:30",
    appointmentDate: "16-01-2024",
    appointmentTime: "09:00",
    duration: 60,
    status: "Pending" as const, // Pending, Approved, Denied
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      avatar: "",
    },
    treatmentType: "IVF" as const,
    requestedService: "Tư vấn ban đầu và khám sàng lọc",
    reason:
      "Vợ chồng tôi đã cố gắng có con được 2 năm nhưng chưa thành công. Chúng tôi muốn được tư vấn về các phương pháp hỗ trợ sinh sản.",
    medicalHistory: "Không có tiền sử bệnh lý đặc biệt. Đã làm xét nghiệm cơ bản tại bệnh viện địa phương.",
    previousTreatments: "Chưa từng điều trị hiếm muộn ở đâu",
    urgency: "Normal", // Normal, Urgent, Emergency
    preferredDoctor: "Bất kỳ bác sĩ nào có kinh nghiệm",
    notes: "Mong được tư vấn chi tiết về quy trình và chi phí",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    requestDate: "14-01-2024",
    requestTime: "10:15",
    appointmentDate: "17-01-2024",
    appointmentTime: "14:00",
    duration: 45,
    status: "Pending" as const,
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
      address: "456 Lê Lợi, Q3, TP.HCM",
      avatar: "",
    },
    treatmentType: "IUI" as const,
    requestedService: "Tái khám và theo dõi kết quả",
    reason: "Đã thực hiện IUI lần 1 cách đây 2 tuần, cần tái khám để kiểm tra kết quả và lên kế hoạch tiếp theo.",
    medicalHistory: "Đã điều trị hiếm muộn 6 tháng. Vợ có rối loạn nội tiết tố nhẹ.",
    previousTreatments: "1 lần IUI tại phòng khám (14 ngày trước)",
    urgency: "Normal",
    preferredDoctor: "BS. Nguyễn Văn A (đã điều trị trước đó)",
    notes: "Vợ có dấu hiệu mang thai nhưng chưa chắc chắn",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    requestDate: "15-01-2024",
    requestTime: "09:45",
    appointmentDate: "16-01-2024",
    appointmentTime: "10:30",
    duration: 30,
    status: "Pending" as const,
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
      address: "789 Võ Văn Tần, Q3, TP.HCM",
      avatar: "",
    },
    treatmentType: "IVF" as const,
    requestedService: "Khám cấp cứu - tư vấn về tác dụng phụ thuốc",
    reason: "Đang trong quá trình kích thích buồng trứng, xuất hiện đau bụng dữ dội và buồn nôn. Cần được khám ngay.",
    medicalHistory: "Đang trong chu kỳ IVF lần 2. Lần 1 thất bại do chất lượng phôi không tốt.",
    previousTreatments: "1 lần IVF thất bại (6 tháng trước), đang thực hiện IVF lần 2",
    urgency: "Urgent",
    preferredDoctor: "BS đang điều trị (BS. Trần Thị B)",
    notes: "KHẨN CẤP - Cần được khám trong ngày",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    requestDate: "15-01-2024",
    requestTime: "14:20",
    appointmentDate: "18-01-2024",
    appointmentTime: "15:30",
    duration: 90,
    status: "Pending" as const,
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
      address: "321 Điện Biên Phủ, Q1, TP.HCM",
      avatar: "",
    },
    treatmentType: "IVF" as const,
    requestedService: "Tư vấn chuyển đổi phương pháp điều trị",
    reason:
      "Đã thất bại 3 lần IVF tại các phòng khám khác. Muốn được tư vấn về các phương pháp mới hoặc thay đổi chiến lược điều trị.",
    medicalHistory: "Vợ 38 tuổi, AMH thấp (0.8). Chồng có tinh trùng yếu nhẹ. Đã điều trị 2 năm.",
    previousTreatments: "3 lần IVF thất bại tại 2 phòng khám khác nhau trong 18 tháng qua",
    urgency: "Normal",
    preferredDoctor: "Bác sĩ có kinh nghiệm với các trường hợp khó",
    notes: "Mong được tư vấn về khả năng thành công và các lựa chọn khác",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    requestDate: "15-01-2024",
    requestTime: "16:00",
    appointmentDate: "19-01-2024",
    appointmentTime: "09:30",
    duration: 45,
    status: "Pending" as const,
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440015",
      name: "Võ Thị Mai",
      age: 29,
      phone: "0945678901",
      email: "mai.vo@email.com",
      address: "654 Nguyễn Trãi, Q5, TP.HCM",
      avatar: "",
    },
    treatmentType: "IUI" as const,
    requestedService: "Khám đầu và lập kế hoạch điều trị",
    reason: "Cặp vợ chồng trẻ, kết hôn 1 năm, chưa có con. Muốn được khám và tư vấn về phương pháp phù hợp.",
    medicalHistory: "Cả hai đều khỏe mạnh, chưa có tiền sử bệnh lý. Chưa từng khám hiếm muộn.",
    previousTreatments: "Chưa từng điều trị hiếm muộn",
    urgency: "Normal",
    preferredDoctor: "Bác sĩ nữ (nếu có thể)",
    notes: "Lần đầu đến khám, cần tư vấn cơ bản",
  },
]

export default function PendingApprovals({
  appointments = pendingAppointments,
  onApprove,
  onDeny,
  onBulkApprove,
  onBulkDeny,
}: PendingApprovalsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [treatmentFilter, setTreatmentFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedAppointments, setSelectedAppointments] = useState<string[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [approvalNote, setApprovalNote] = useState("")
  const [denialReason, setDenialReason] = useState("")

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Cuộc hẹn" }, { label: "Chờ duyệt" }]

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient.phone.includes(searchTerm) ||
      appointment.requestedService.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && appointment.appointmentDate === "16-01-2024") ||
      (dateFilter === "tomorrow" && appointment.appointmentDate === "17-01-2024") ||
      (dateFilter === "custom" && selectedDate && appointment.appointmentDate === selectedDate)

    const matchesTreatment = treatmentFilter === "all" || appointment.treatmentType === treatmentFilter

    return matchesSearch && matchesDate && matchesTreatment
  })

  const getTreatmentBadgeColor = (type: string) => {
    switch (type) {
      case "IVF":
        return "bg-blue-100 text-blue-800"
      case "IUI":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Statistics
  const totalPending = appointments.length
  const todayRequests = appointments.filter((apt) => apt.appointmentDate === "16-01-2024").length
  const tomorrowRequests = appointments.filter((apt) => apt.appointmentDate === "17-01-2024").length

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAppointments(filteredAppointments.map((apt) => apt.id))
    } else {
      setSelectedAppointments([])
    }
  }

  const handleSelectAppointment = (appointmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAppointments([...selectedAppointments, appointmentId])
    } else {
      setSelectedAppointments(selectedAppointments.filter((id) => id !== appointmentId))
    }
  }

  // Action handlers
  const handleApprove = (appointmentId: string, note?: string) => {
    if (onApprove) {
      onApprove(appointmentId, note)
    } else {
      console.log("Approving appointment:", appointmentId, "with note:", note)
      // Here you would call your API to approve the appointment
    }
    setApprovalNote("")
  }

  const handleDeny = (appointmentId: string, reason: string) => {
    if (onDeny) {
      onDeny(appointmentId, reason)
    } else {
      console.log("Denying appointment:", appointmentId, "with reason:", reason)
      // Here you would call your API to deny the appointment
    }
    setDenialReason("")
  }

  const handleBulkApprove = () => {
    if (onBulkApprove) {
      onBulkApprove(selectedAppointments)
    } else {
      console.log("Bulk approving appointments:", selectedAppointments)
    }
    setSelectedAppointments([])
  }

  const handleBulkDeny = () => {
    if (onBulkDeny) {
      onBulkDeny(selectedAppointments)
    } else {
      console.log("Bulk denying appointments:", selectedAppointments)
    }
    setSelectedAppointments([])
  }

  const openDetailDialog = (appointment: any) => {
    setSelectedAppointment(appointment)
    setShowDetailDialog(true)
  }

  return (
    <DoctorLayout title="Lịch hẹn chờ duyệt" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bệnh nhân, dịch vụ, lý do..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo ngày hẹn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngày</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="tomorrow">Ngày mai</SelectItem>
                <SelectItem value="custom">Chọn ngày</SelectItem>
              </SelectContent>
            </Select>

            {dateFilter === "custom" && (
              <Input
                placeholder="dd-mm-yyyy"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
            )}

            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo loại điều trị" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="IVF">IVF</SelectItem>
                <SelectItem value="IUI">IUI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            {selectedAppointments.length > 0 ? (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Duyệt ({selectedAppointments.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận duyệt</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn duyệt {selectedAppointments.length} lịch hẹn đã chọn? Hành động này không
                        thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkApprove} className="bg-green-600 hover:bg-green-700">
                        Xác nhận
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Từ chối ({selectedAppointments.length})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Xác nhận từ chối</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bạn có chắc chắn muốn từ chối {selectedAppointments.length} lịch hẹn đã chọn? Hành động này
                        không thể hoàn tác.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBulkDeny} className="bg-red-600 hover:bg-red-700">
                        Xác nhận
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : null}
            
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng chờ duyệt</p>
                  <p className="text-2xl font-bold text-orange-600">{totalPending}</p>
                </div>
                <ClipboardList className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hẹn hôm nay</p>
                  <p className="text-2xl font-bold text-green-600">{todayRequests}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hẹn ngày mai</p>
                  <p className="text-2xl font-bold text-blue-600">{tomorrowRequests}</p>
                </div>
                <CalendarDays className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Danh sách lịch hẹn chờ duyệt ({filteredAppointments.length} yêu cầu)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedAppointments.length === filteredAppointments.length && filteredAppointments.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Thông tin yêu cầu</TableHead>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Dịch vụ & Lý do</TableHead>
                    <TableHead>Ngày hẹn</TableHead>
                    <TableHead>Loại điều trị</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedAppointments.includes(appointment.id)}
                          onCheckedChange={(checked) => handleSelectAppointment(appointment.id, checked as boolean)}
                        />
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Yêu cầu: {appointment.requestDate}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.requestTime}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {appointment.id.slice(-8)}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium">{appointment.patient.name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{appointment.patient.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.patient.age} tuổi</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {appointment.patient.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {appointment.patient.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1 max-w-xs">
                          <div className="font-medium text-sm">{appointment.requestedService}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{appointment.reason}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{appointment.appointmentDate}</span>
                            {appointment.appointmentDate === "16-01-2024" && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                Hôm nay
                              </Badge>
                            )}
                            {appointment.appointmentDate === "17-01-2024" && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                Ngày mai
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.appointmentTime}</span>
                            <span className="text-xs text-muted-foreground">({appointment.duration}p)</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getTreatmentBadgeColor(appointment.treatmentType)}>
                          {appointment.treatmentType}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDetailDialog(appointment)}
                          className="h-8"
                        >
                          <Eye className="h-4 w-4" />
                          Chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không có lịch hẹn chờ duyệt</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || dateFilter !== "all" || treatmentFilter !== "all"
                    ? "Thử thay đổi bộ lọc để xem thêm kết quả"
                    : "Tất cả lịch hẹn đã được xử lý"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Chi tiết yêu cầu lịch hẹn
              </DialogTitle>
              <DialogDescription>Thông tin chi tiết về yêu cầu lịch hẹn từ bệnh nhân</DialogDescription>
            </DialogHeader>

            {selectedAppointment && (
              <div className="space-y-6">
                {/* Patient Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Thông tin bệnh nhân
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Họ tên</label>
                        <p className="font-medium">{selectedAppointment.patient.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Tuổi</label>
                        <p>{selectedAppointment.patient.age} tuổi</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Số điện thoại</label>
                        <p>{selectedAppointment.patient.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p>{selectedAppointment.patient.email}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Địa chỉ</label>
                        <p>{selectedAppointment.patient.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Thông tin lịch hẹn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ngày yêu cầu</label>
                        <p>
                          {selectedAppointment.requestDate} lúc {selectedAppointment.requestTime}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Ngày hẹn mong muốn</label>
                        <p className="font-medium">
                          {selectedAppointment.appointmentDate} lúc {selectedAppointment.appointmentTime}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Thời lượng dự kiến</label>
                        <p>{selectedAppointment.duration} phút</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Thông tin y tế
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Loại điều trị</label>
                      <Badge className={getTreatmentBadgeColor(selectedAppointment.treatmentType)}>
                        {selectedAppointment.treatmentType}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Dịch vụ yêu cầu</label>
                      <p className="font-medium">{selectedAppointment.requestedService}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Lý do khám</label>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedAppointment.reason}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tiền sử bệnh</label>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedAppointment.medicalHistory}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Điều trị trước đây</label>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedAppointment.previousTreatments}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Bác sĩ mong muốn</label>
                      <p>{selectedAppointment.preferredDoctor}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                Đóng
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Duyệt lịch hẹn
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Duyệt lịch hẹn</DialogTitle>
                    <DialogDescription>
                      Xác nhận duyệt lịch hẹn cho bệnh nhân {selectedAppointment?.patient.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Ghi chú cho bệnh nhân (tùy chọn)</label>
                      <Textarea
                        placeholder="Ghi chú thêm cho bệnh nhân..."
                        value={approvalNote}
                        onChange={(e) => setApprovalNote(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Hủy</Button>
                    <Button
                      onClick={() => {
                        handleApprove(selectedAppointment?.id, approvalNote)
                        setShowDetailDialog(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Xác nhận duyệt
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <XCircle className="h-4 w-4 mr-2" />
                    Từ chối
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Từ chối lịch hẹn</DialogTitle>
                    <DialogDescription>
                      Từ chối lịch hẹn cho bệnh nhân {selectedAppointment?.patient.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Lý do từ chối *</label>
                      <Textarea
                        placeholder="Vui lòng nhập lý do từ chối..."
                        value={denialReason}
                        onChange={(e) => setDenialReason(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Hủy</Button>
                    <Button
                      onClick={() => {
                        handleDeny(selectedAppointment?.id, denialReason)
                        setShowDetailDialog(false)
                      }}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!denialReason.trim()}
                    >
                      Xác nhận từ chối
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DoctorLayout>
  )
}
