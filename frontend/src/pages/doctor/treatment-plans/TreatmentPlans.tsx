"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Stethoscope, Eye, Calendar, FileText } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

// Mock data aligned with ERD - Treatment table with correct protocols
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
      id: "550e8400-e29b-41d4-a716-446655440021",
      title: "IVF Long Protocol",
      description: "Phác đồ IVF dài với ức chế GnRH trước khi kích thích",
      type: "IVF",
      subtype: "long",
    },
    startDate: "10-01-2024",
    endDate: null,
    diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
    status: "In Progress",
    currentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440031",
      title: "Giai đoạn 2: Kích thích buồng trứng",
      description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
      position: 2,
      isComplete: false,
    },
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
      id: "550e8400-e29b-41d4-a716-446655440022",
      title: "IUI Natural Protocol",
      description: "Phác đồ IUI tự nhiên theo dõi chu kỳ kinh nguyệt",
      type: "IUI",
      subtype: "natural",
    },
    startDate: "15-01-2024",
    endDate: null,
    diagnosis: "Vô sinh thứ phát do yếu tố nam giới nhẹ",
    status: "In Progress",
    currentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440041",
      title: "Giai đoạn 1: Theo dõi chu kỳ tự nhiên",
      description: "Theo dõi chu kỳ kinh nguyệt và chuẩn bị tinh trùng",
      position: 1,
      isComplete: false,
    },
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
      id: "550e8400-e29b-41d4-a716-446655440023",
      title: "IVF Short Protocol",
      description: "Phác đồ IVF ngắn với kích thích trực tiếp",
      type: "IVF",
      subtype: "short",
    },
    startDate: "05-01-2024",
    endDate: "28-02-2024",
    diagnosis: "Vô sinh nguyên phát do rối loạn phóng noãn",
    status: "Complete",
    currentPhase: null,
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
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Phạm Thị Mai",
      age: 30,
      phone: "0934567890",
    },
    protocol: {
      id: "550e8400-e29b-41d4-a716-446655440024",
      title: "IUI Stimulated Protocol",
      description: "Phác đồ IUI có kích thích buồng trứng nhẹ",
      type: "IUI",
      subtype: "stimulated",
    },
    startDate: "20-01-2024",
    endDate: null,
    diagnosis: "Vô sinh thứ phát do rối loạn phóng noãn nhẹ",
    status: "In Progress",
    currentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440061",
      title: "Giai đoạn 1: Kích thích nhẹ",
      description: "Kích thích buồng trứng nhẹ và theo dõi nang trứng",
      position: 1,
      isComplete: false,
    },
    phases: [
      {
        id: "550e8400-e29b-41d4-a716-446655440061",
        title: "Giai đoạn 1: Kích thích nhẹ",
        description: "Kích thích buồng trứng nhẹ và theo dõi nang trứng",
        position: 1,
        isComplete: false,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440062",
        title: "Giai đoạn 2: Thụ tinh nhân tạo",
        description: "Thực hiện thụ tinh nhân tạo trong tử cung",
        position: 2,
        isComplete: false,
      },
    ],
  },
]

export default function TreatmentPlans() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

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

  const calculateProgress = (phases: any[]) => {
    const completedPhases = phases.filter((phase) => phase.isComplete).length
    return Math.round((completedPhases / phases.length) * 100)
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

        {/* Treatment Plans List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTreatments.map((treatment) => (
            <Card key={treatment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{treatment.patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {treatment.patient.age} tuổi • {treatment.patient.phone}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getProtocolBadgeColor(treatment.protocol.type)}>
                          {treatment.protocol.type}
                        </Badge>
                        <Badge variant="outline">
                          {treatment.protocol.subtype === "long" && "Long Protocol"}
                          {treatment.protocol.subtype === "short" && "Short Protocol"}
                          {treatment.protocol.subtype === "natural" && "Natural"}
                          {treatment.protocol.subtype === "stimulated" && "Stimulated"}
                        </Badge>
                        <Badge className={getStatusColor(treatment.status)}>{getStatusText(treatment.status)}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            treatment.status === "Complete"
                              ? "bg-green-600"
                              : treatment.status === "Cancel"
                                ? "bg-red-600"
                                : "bg-blue-600"
                          }`}
                          style={{ width: `${calculateProgress(treatment.phases)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{calculateProgress(treatment.phases)}%</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>

                {/* Treatment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Ngày bắt đầu:</span>
                    </div>
                    <p className="font-medium">{treatment.startDate}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>Ngày kết thúc:</span>
                    </div>
                    <p className="font-medium">{treatment.endDate || "Chưa xác định"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <FileText className="h-4 w-4" />
                      <span>Chẩn đoán:</span>
                    </div>
                    <p className="font-medium">{treatment.diagnosis}</p>
                  </div>
                </div>

                {/* Current Phase */}
                {treatment.currentPhase && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Giai đoạn hiện tại</h4>
                    <p className="font-medium text-blue-800">{treatment.currentPhase.title}</p>
                    <p className="text-sm text-blue-700">{treatment.currentPhase.description}</p>
                  </div>
                )}

                {/* Treatment Phases */}
                <div>
                  <h4 className="font-semibold mb-3">Các giai đoạn điều trị</h4>
                  <div className="space-y-2">
                    {treatment.phases.map((phase, index) => (
                      <div
                        key={phase.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          phase.isComplete
                            ? "bg-green-50 border-green-200"
                            : treatment.currentPhase?.id === phase.id
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            phase.isComplete
                              ? "bg-green-600 text-white"
                              : treatment.currentPhase?.id === phase.id
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
                          ) : treatment.currentPhase?.id === phase.id ? (
                            <Badge className="bg-blue-100 text-blue-800">Đang thực hiện</Badge>
                          ) : (
                            <Badge variant="outline">Chờ thực hiện</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
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
