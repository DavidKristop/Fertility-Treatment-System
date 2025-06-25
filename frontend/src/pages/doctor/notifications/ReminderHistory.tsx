"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Eye, User } from "lucide-react"
import { useState } from "react"

interface Reminder {
  id: string
  title: string
  content: string
  sentTo: {
    id: string
    name: string
    email: string
  }
  sentDate: string
  sentTime: string
  type: "appointment" | "medication" | "followup" | "general"
  status: "sent" | "delivered" | "read"
}

const mockReminders: Reminder[] = [
  {
    id: "1",
    title: "Nhắc nhở lịch khám",
    content: "Bạn có lịch khám vào ngày mai lúc 9:00 AM. Vui lòng đến đúng giờ và mang theo các giấy tờ cần thiết.",
    sentTo: {
      id: "patient1",
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
    },
    sentDate: "2024-01-15",
    sentTime: "08:00",
    type: "appointment",
    status: "read",
  },
  {
    id: "2",
    title: "Nhắc nhở uống thuốc",
    content: "Đã đến giờ uống thuốc Gonal-F. Vui lòng tiêm theo đúng hướng dẫn của bác sĩ.",
    sentTo: {
      id: "patient2",
      name: "Trần Văn Nam",
      email: "nam.tran@email.com",
    },
    sentDate: "2024-01-15",
    sentTime: "19:00",
    type: "medication",
    status: "delivered",
  },
  {
    id: "3",
    title: "Theo dõi sau điều trị",
    content: "Vui lòng theo dõi tình trạng sức khỏe và báo cáo bất kỳ triệu chứng bất thường nào.",
    sentTo: {
      id: "patient3",
      name: "Lê Thị Hoa",
      email: "hoa.le@email.com",
    },
    sentDate: "2024-01-14",
    sentTime: "10:30",
    type: "followup",
    status: "sent",
  },
]

export default function ReminderHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [reminders] = useState<Reminder[]>(mockReminders)

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Thông báo", path: "/doctor/notifications" },
    { label: "Lịch sử nhắc nhở" },
  ]

  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.sentTo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-800"
      case "medication":
        return "bg-green-100 text-green-800"
      case "followup":
        return "bg-orange-100 text-orange-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "appointment":
        return "Lịch khám"
      case "medication":
        return "Thuốc"
      case "followup":
        return "Theo dõi"
      case "general":
        return "Chung"
      default:
        return "Khác"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-yellow-100 text-yellow-800"
      case "delivered":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "sent":
        return "Đã gửi"
      case "delivered":
        return "Đã nhận"
      case "read":
        return "Đã đọc"
      default:
        return "Không xác định"
    }
  }

  return (
    <DoctorLayout title="Lịch sử nhắc nhở" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm nhắc nhở
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Tìm theo tiêu đề, tên bệnh nhân, nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Reminders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử nhắc nhở ({filteredReminders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Người nhận</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Thời gian gửi</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                      <TableCell>
                        <div className="font-medium">{reminder.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{reminder.content}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{reminder.sentTo.name}</div>
                            <div className="text-sm text-muted-foreground">{reminder.sentTo.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(reminder.type)}>{getTypeText(reminder.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{reminder.sentDate}</div>
                          <div className="text-muted-foreground">{reminder.sentTime}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reminder.status)}>{getStatusText(reminder.status)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Chi tiết nhắc nhở</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">Tiêu đề:</Label>
                                  <p>{reminder.title}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">Loại:</Label>
                                  <Badge className={getTypeColor(reminder.type)}>{getTypeText(reminder.type)}</Badge>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-semibold">Người nhận:</Label>
                                  <p>{reminder.sentTo.name}</p>
                                  <p className="text-sm text-muted-foreground">{reminder.sentTo.email}</p>
                                </div>
                                <div>
                                  <Label className="font-semibold">Thời gian gửi:</Label>
                                  <p>
                                    {reminder.sentDate} lúc {reminder.sentTime}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <Label className="font-semibold">Nội dung:</Label>
                                <p className="mt-1 p-3 bg-gray-50 rounded">{reminder.content}</p>
                              </div>

                              <div>
                                <Label className="font-semibold">Trạng thái:</Label>
                                <div className="mt-1">
                                  <Badge className={getStatusColor(reminder.status)}>
                                    {getStatusText(reminder.status)}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
