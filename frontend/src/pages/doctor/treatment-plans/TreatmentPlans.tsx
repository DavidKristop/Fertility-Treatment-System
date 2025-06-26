"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Stethoscope, Eye, Calendar, FileText, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Simplified treatment data - minimal view
const treatments = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
    },
    protocol: {
      title: "IVF Long Protocol",
      type: "IVF",
    },
    startDate: "10-01-2024",
    diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
    status: "In Progress",
    currentPhase: "Giai đoạn 2: Kích thích buồng trứng",
    progress: 75,
    phases: [
      {
        id: "550e8400-e29b-41d4-a716-446655440030",
        title: "Giai đoạn 1: Khám và tư vấn",
        description: "Khám sàng lọc ban đầu và tư vấn phác đồ điều trị",
        position: 1,
        isComplete: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440031",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
        position: 2,
        isComplete: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440032",
        title: "Giai đoạn 3: Lấy trứng và thụ tinh",
        description: "Thu thập trứng và thực hiện thụ tinh trong phòng thí nghiệm",
        position: 3,
        isComplete: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440033",
        title: "Giai đoạn 4: Chuyển phôi",
        description: "Chuyển phôi chất lượng tốt vào tử cung",
        position: 4,
        isComplete: false,
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
    },
    protocol: {
      title: "IUI Natural Protocol",
      type: "IUI",
    },
    startDate: "15-01-2024",
    diagnosis: "Vô sinh thứ phát do yếu tố nam giới nhẹ",
    status: "In Progress",
    currentPhase: "Giai đoạn 1: Theo dõi chu kỳ tự nhiên",
    progress: 50,
    phases: [
      {
        id: "550e8400-e29b-41d4-a716-446655440041",
        title: "Giai đoạn 1: Theo dõi chu kỳ tự nhiên",
        description: "Theo dõi chu kỳ kinh nguyệt và chuẩn bị tinh trùng",
        position: 1,
        isComplete: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440042",
        title: "Giai đoạn 2: Thụ tinh nhân tạo",
        description: "Thực hiện thụ tinh nhân tạo trong tử cung",
        position: 2,
        isComplete: false,
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
    },
    protocol: {
      title: "IVF Short Protocol",
      type: "IVF",
    },
    startDate: "05-01-2024",
    diagnosis: "Vô sinh nguyên phát do rối loạn phóng noãn",
    status: "Complete",
    currentPhase: "Hoàn thành",
    progress: 100,
    phases: [
      {
        id: "550e8400-e29b-41d4-a716-446655440050",
        title: "Giai đoạn 1: Khám và tư vấn",
        description: "Khám sàng lọc ban đầu và tư vấn phác đồ điều trị",
        position: 1,
        isComplete: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440051",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
        position: 2,
        isComplete: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440052",
        title: "Giai đoạn 3: Lấy trứng và thụ tinh",
        description: "Thu thập trứng và thực hiện thụ tinh trong phòng thí nghiệm",
        position: 3,
        isComplete: true,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440053",
        title: "Giai đoạn 4: Chuyển phôi",
        description: "Chuyển phôi chất lượng tốt vào tử cung",
        position: 4,
        isComplete: true,
      },
    ],
  },
]

export default function TreatmentPlans() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [expandedTreatments, setExpandedTreatments] = useState<string[]>([])

  const toggleExpanded = (treatmentId: string) => {
    setExpandedTreatments((prev) =>
      prev.includes(treatmentId) ? prev.filter((id) => id !== treatmentId) : [...prev, treatmentId],
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Cancel":
        return "bg-red-100 text-red-800"
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
      case "Cancel":
        return "Đã hủy"
      default:
        return status
    }
  }

  const getProtocolBadgeColor = (type: string) => {
    switch (type) {
      case "IVF":
        return "bg-purple-100 text-purple-800"
      case "IUI":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredTreatments = treatments.filter((treatment) => {
    const matchesStatus = statusFilter === "all" || treatment.status === statusFilter
    const matchesType = typeFilter === "all" || treatment.protocol.type === typeFilter
    return matchesStatus && matchesType
  })

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Kế hoạch điều trị" }]

  return (
    <DoctorLayout title="Kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-10 w-80" />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="IVF">IVF</SelectItem>
                <SelectItem value="IUI">IUI</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="In Progress">Đang điều trị</SelectItem>
                <SelectItem value="Complete">Hoàn thành</SelectItem>
                <SelectItem value="Cancel">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link to="/doctor/treatment-plans/create-plans">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo kế hoạch mới
            </Button>
          </Link>
        </div>

        {/* Minimized Treatment Plans List */}
        <div className="space-y-4">
          {filteredTreatments.map((treatment) => (
            <Card key={treatment.id}>
              <Collapsible
                open={expandedTreatments.includes(treatment.id)}
                onOpenChange={() => toggleExpanded(treatment.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Stethoscope className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{treatment.patient.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getProtocolBadgeColor(treatment.protocol.type)}>
                              {treatment.protocol.type}
                            </Badge>
                            <Badge className={getStatusColor(treatment.status)}>
                              {getStatusText(treatment.status)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {treatment.patient.age} tuổi • {treatment.startDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  treatment.status === "Complete"
                                    ? "bg-green-600"
                                    : treatment.status === "Cancel"
                                      ? "bg-red-600"
                                      : "bg-blue-600"
                                }`}
                                style={{ width: `${treatment.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{treatment.progress}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{treatment.currentPhase}</p>
                        </div>
                        {expandedTreatments.includes(treatment.id) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Treatment Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Calendar className="h-4 w-4" />
                            <span>Ngày bắt đầu:</span>
                          </div>
                          <p className="font-medium">{treatment.startDate}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <FileText className="h-4 w-4" />
                            <span>Chẩn đoán:</span>
                          </div>
                          <p className="font-medium">{treatment.diagnosis}</p>
                        </div>
                      </div>

                      {/* Treatment Phases */}
                      <div>
                        <h4 className="font-semibold mb-3">Các giai đoạn điều trị</h4>
                        <div className="space-y-2">
                          {treatment.phases.map((phase) => (
                            <div
                              key={phase.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border ${
                                phase.isComplete
                                  ? "bg-green-50 border-green-200"
                                  : treatment.currentPhase.includes(phase.title.split(":")[0])
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-gray-50 border-gray-200"
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  phase.isComplete
                                    ? "bg-green-600 text-white"
                                    : treatment.currentPhase.includes(phase.title.split(":")[0])
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-300 text-gray-600"
                                }`}
                              >
                                {phase.position}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{phase.title}</p>
                                <p className="text-sm text-muted-foreground">{phase.description}</p>
                              </div>
                              <div>
                                {phase.isComplete ? (
                                  <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                                ) : treatment.currentPhase.includes(phase.title.split(":")[0]) ? (
                                  <Badge className="bg-blue-100 text-blue-800">Đang thực hiện</Badge>
                                ) : (
                                  <Badge variant="outline">Chờ thực hiện</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Tạo lịch hẹn
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Xem hợp đồng
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {filteredTreatments.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Không có kế hoạch điều trị nào</h3>
              <p className="text-sm text-muted-foreground">Thử thay đổi bộ lọc hoặc tạo kế hoạch điều trị mới</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DoctorLayout>
  )
}
