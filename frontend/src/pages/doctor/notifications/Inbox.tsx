"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { InboxIcon, Search, Eye, Mail, MailOpen, Star, Trash2, Reply } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  subject: string
  content: string
  sender: {
    id: string
    name: string
    email: string
    role: string
  }
  receivedDate: string
  receivedTime: string
  isRead: boolean
  isStarred: boolean
  priority: "low" | "normal" | "high"
  type: "patient_inquiry" | "system_notification" | "appointment_request" | "general"
}

const mockMessages: Message[] = [
  {
    id: "1",
    subject: "Yêu cầu đặt lịch khám",
    content:
      "Chào bác sĩ, tôi muốn đặt lịch khám để tư vấn về phương pháp IVF. Tôi có thể đặt lịch vào tuần tới được không?",
    sender: {
      id: "patient1",
      name: "Nguyễn Thị Lan",
      email: "lan.nguyen@email.com",
      role: "patient",
    },
    receivedDate: "2024-01-15",
    receivedTime: "14:30",
    isRead: false,
    isStarred: true,
    priority: "high",
    type: "appointment_request",
  },
  {
    id: "2",
    subject: "Thông báo hệ thống: Cập nhật lịch khám",
    content: "Lịch khám của bạn vào ngày 16/01/2024 đã được cập nhật. Vui lòng kiểm tra lại thông tin.",
    sender: {
      id: "system",
      name: "Hệ thống UCARE",
      email: "system@ucare.com",
      role: "system",
    },
    receivedDate: "2024-01-15",
    receivedTime: "09:15",
    isRead: true,
    isStarred: false,
    priority: "normal",
    type: "system_notification",
  },
  {
    id: "3",
    subject: "Câu hỏi về thuốc điều trị",
    content: "Bác sĩ ơi, tôi đang sử dụng thuốc Gonal-F theo đơn. Tôi có thể uống cùng với vitamin không ạ?",
    sender: {
      id: "patient2",
      name: "Trần Văn Nam",
      email: "nam.tran@email.com",
      role: "patient",
    },
    receivedDate: "2024-01-14",
    receivedTime: "16:45",
    isRead: false,
    isStarred: false,
    priority: "normal",
    type: "patient_inquiry",
  },
  {
    id: "4",
    subject: "Báo cáo tác dụng phụ",
    content: "Sau khi tiêm thuốc hôm qua, tôi cảm thấy hơi buồn nôn và đau đầu nhẹ. Điều này có bình thường không ạ?",
    sender: {
      id: "patient3",
      name: "Lê Thị Hoa",
      email: "hoa.le@email.com",
      role: "patient",
    },
    receivedDate: "2024-01-14",
    receivedTime: "08:20",
    isRead: true,
    isStarred: true,
    priority: "high",
    type: "patient_inquiry",
  },
]

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState("")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all")

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Thông báo", path: "/doctor/notifications" },
    { label: "Hộp thư đến" },
  ]

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "all" || (filter === "unread" && !message.isRead) || (filter === "starred" && message.isStarred)

    return matchesSearch && matchesFilter
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Cao"
      case "normal":
        return "Bình thường"
      case "low":
        return "Thấp"
      default:
        return "Bình thường"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "appointment_request":
        return "bg-blue-100 text-blue-800"
      case "patient_inquiry":
        return "bg-green-100 text-green-800"
      case "system_notification":
        return "bg-orange-100 text-orange-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "appointment_request":
        return "Yêu cầu lịch khám"
      case "patient_inquiry":
        return "Câu hỏi bệnh nhân"
      case "system_notification":
        return "Thông báo hệ thống"
      case "general":
        return "Chung"
      default:
        return "Khác"
    }
  }

  const markAsRead = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isRead: true } : msg)))
  }

  const toggleStar = (messageId: string) => {
    setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg)))
  }

  const unreadCount = messages.filter((m) => !m.isRead).length
  const starredCount = messages.filter((m) => m.isStarred).length

  return (
    <DoctorLayout title="Hộp thư đến" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm tin nhắn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Tìm theo tiêu đề, người gửi, nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
                  Tất cả ({messages.length})
                </Button>
                <Button variant={filter === "unread" ? "default" : "outline"} onClick={() => setFilter("unread")}>
                  Chưa đọc ({unreadCount})
                </Button>
                <Button variant={filter === "starred" ? "default" : "outline"} onClick={() => setFilter("starred")}>
                  Đã đánh dấu ({starredCount})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <InboxIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{messages.length}</p>
                  <p className="text-sm text-muted-foreground">Tổng tin nhắn</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                  <p className="text-sm text-muted-foreground">Chưa đọc</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{starredCount}</p>
                  <p className="text-sm text-muted-foreground">Đã đánh dấu</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <InboxIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{messages.filter((m) => m.priority === "high").length}</p>
                  <p className="text-sm text-muted-foreground">Ưu tiên cao</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tin nhắn ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Người gửi</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Ưu tiên</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className={!message.isRead ? "bg-blue-50" : ""}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {!message.isRead && <Mail className="h-4 w-4 text-blue-600" />}
                          {message.isRead && <MailOpen className="h-4 w-4 text-gray-400" />}
                          <div>
                            <div className={`font-medium ${message.isRead ? "text-gray-600" : "text-gray-900"}`}>
                              {message.subject}
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{message.content}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{message.sender.name}</div>
                          <div className="text-sm text-muted-foreground">{message.sender.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(message.type)}>{getTypeText(message.type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(message.priority)}>
                          {getPriorityText(message.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{message.receivedDate}</div>
                          <div className="text-muted-foreground">{message.receivedTime}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleStar(message.id)}
                            className={message.isStarred ? "text-yellow-600" : ""}
                          >
                            <Star className={`h-4 w-4 ${message.isStarred ? "fill-current" : ""}`} />
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => markAsRead(message.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Chi tiết tin nhắn</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Từ:</Label>
                                    <p>{message.sender.name}</p>
                                    <p className="text-sm text-muted-foreground">{message.sender.email}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Thời gian:</Label>
                                    <p>
                                      {message.receivedDate} lúc {message.receivedTime}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="font-semibold">Tiêu đề:</Label>
                                  <p>{message.subject}</p>
                                </div>

                                <div className="flex gap-2">
                                  <Badge className={getTypeColor(message.type)}>{getTypeText(message.type)}</Badge>
                                  <Badge className={getPriorityColor(message.priority)}>
                                    {getPriorityText(message.priority)}
                                  </Badge>
                                </div>

                                <div>
                                  <Label className="font-semibold">Nội dung:</Label>
                                  <p className="mt-1 p-3 bg-gray-50 rounded">{message.content}</p>
                                </div>

                                <div className="flex gap-2">
                                  <Button>
                                    <Reply className="h-4 w-4 mr-2" />
                                    Trả lời
                                  </Button>
                                  <Button variant="outline">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Xóa
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
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
