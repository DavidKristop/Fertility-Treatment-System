"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, TestTube, Calendar, User, Eye, Download, Activity } from "lucide-react"
import { useState } from "react"

// Mock results data based on ERD
const resultsData = [
  {
    id: "1",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Nguyễn Thị Lan",
      age: 32,
    },
    schedule: {
      id: "1",
      appointmentDatetime: "2024-01-15T09:00:00",
      treatmentPhase: "Giai đoạn 2: Kích thích buồng trứng",
    },
    type: "Xét nghiệm máu",
    date: "2024-01-15",
    status: "normal",
    doctorsNote:
      "Kết quả trong giới hạn bình thường. Hormone tăng đều, phản ứng tốt với thuốc kích thích. Tiếp tục theo dõi và điều chỉnh liều thuốc.",
    details: {
      hcg: "< 2 mIU/mL",
      estradiol: "450 pg/mL",
      progesterone: "1.8 ng/mL",
      lh: "12 mIU/mL",
      fsh: "8.5 mIU/mL",
    },
    attachments: [
      {
        id: "1",
        url: "/results/blood-test-20240115.pdf",
        name: "Kết quả xét nghiệm máu - 15/01/2024",
      },
    ],
  },
  {
    id: "2",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Trần Văn Nam",
      age: 35,
    },
    schedule: {
      id: "2",
      appointmentDatetime: "2024-01-14T14:00:00",
      treatmentPhase: "Giai đoạn 1: Theo dõi chu kỳ tự nhiên",
    },
    type: "Phân tích tinh trùng",
    date: "2024-01-14",
    status: "abnormal",
    doctorsNote:
      "Nồng độ tinh trùng thấp hơn bình thường. Khuyến nghị bổ sung vitamin, thay đổi lối sống và tái khám sau 3 tháng. Có thể cần hỗ trợ kỹ thuật cao.",
    details: {
      concentration: "8 million/mL",
      motility: "25%",
      morphology: "3%",
      volume: "2.5 mL",
      ph: "7.8",
    },
    attachments: [
      {
        id: "2",
        url: "/results/sperm-analysis-20240114.pdf",
        name: "Kết quả phân tích tinh trùng - 14/01/2024",
      },
    ],
  },
  {
    id: "3",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Lê Thị Hoa",
      age: 28,
    },
    schedule: {
      id: "3",
      appointmentDatetime: "2024-01-12T10:30:00",
      treatmentPhase: "Giai đoạn 1: Khám và tư vấn",
    },
    type: "Siêu âm",
    date: "2024-01-12",
    status: "normal",
    doctorsNote:
      "Siêu âm cho thấy buồng trứng và tử cung bình thường. Nội mạc tử cung dày phù hợp với chu kỳ kinh. Sẵn sàng cho giai đoạn điều trị tiếp theo.",
    details: {
      follicles: "12",
      endometriumThickness: "8.5 mm",
      leftOvarySize: "3.2 x 2.1 cm",
      rightOvarySize: "3.0 x 2.3 cm",
      uterusSize: "7.5 x 4.2 x 5.1 cm",
    },
    attachments: [
      {
        id: "3",
        url: "/results/ultrasound-20240112.jpg",
        name: "Hình ảnh siêu âm - 12/01/2024",
      },
    ],
  },
  {
    id: "4",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Nguyễn Thị Lan",
      age: 32,
    },
    schedule: {
      id: "4",
      appointmentDatetime: "2024-01-10T09:00:00",
      treatmentPhase: "Giai đoạn 1: Khám và tư vấn",
    },
    type: "Xét nghiệm hormone",
    date: "2024-01-10",
    status: "normal",
    doctorsNote:
      "Các chỉ số hormone cơ bản trong giới hạn bình thường. AMH cho thấy dự trữ buồng trứng tốt. Có thể tiến hành phác đồ IVF theo kế hoạch.",
    details: {
      amh: "3.2 ng/mL",
      estradiol: "45 pg/mL",
      progesterone: "1.1 ng/mL",
      testosterone: "0.8 ng/mL",
      prolactin: "18 ng/mL",
    },
    attachments: [
      {
        id: "4",
        url: "/results/hormone-test-20240110.pdf",
        name: "Kết quả xét nghiệm hormone - 10/01/2024",
      },
    ],
  },
]

export default function ResultsHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedResult, setSelectedResult] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "abnormal":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "Bình thường"
      case "abnormal":
        return "Bất thường"
      case "pending":
        return "Chờ kết quả"
      default:
        return status
    }
  }

  const getTypeIcon = () => {
    return <TestTube className="h-4 w-4 text-blue-600" />
  }

  const filteredResults = resultsData.filter((result) => {
    const matchesSearch =
      result.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || result.status === statusFilter
    const matchesType = typeFilter === "all" || result.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Kết quả", path: "/doctor/results" },
    { label: "Lịch sử kết quả" },
  ]

  return (
    <DoctorLayout title="Lịch sử kết quả xét nghiệm" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bệnh nhân hoặc loại xét nghiệm..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Loại xét nghiệm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="Xét nghiệm máu">Xét nghiệm máu</SelectItem>
                <SelectItem value="Siêu âm">Siêu âm</SelectItem>
                <SelectItem value="Phân tích tinh trùng">Phân tích tinh trùng</SelectItem>
                <SelectItem value="Xét nghiệm hormone">Xét nghiệm hormone</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="normal">Bình thường</SelectItem>
                <SelectItem value="abnormal">Bất thường</SelectItem>
                <SelectItem value="pending">Chờ kết quả</SelectItem>
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
                  <p className="text-sm text-muted-foreground">Tổng kết quả</p>
                  <p className="text-2xl font-bold">{resultsData.length}</p>
                </div>
                <TestTube className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bình thường</p>
                  <p className="text-2xl font-bold text-green-600">
                    {resultsData.filter((r) => r.status === "normal").length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bất thường</p>
                  <p className="text-2xl font-bold text-red-600">
                    {resultsData.filter((r) => r.status === "abnormal").length}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tuần này</p>
                  <p className="text-2xl font-bold">
                    {
                      resultsData.filter((r) => {
                        const resultDate = new Date(r.date)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return resultDate >= weekAgo
                      }).length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách kết quả xét nghiệm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {getTypeIcon()}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <h3 className="font-semibold">{result.patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {result.patient.age} tuổi • {result.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{result.schedule.treatmentPhase}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{result.doctorsNote}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(result.status)}>{getStatusText(result.status)}</Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedResult(result)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Chi tiết kết quả - {result.patient.name}</DialogTitle>
                          </DialogHeader>
                          {selectedResult && (
                            <div className="space-y-6">
                              {/* Patient & Test Info */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Bệnh nhân</label>
                                    <p className="font-medium">{selectedResult.patient.name}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Loại xét nghiệm</label>
                                    <p className="font-medium">{selectedResult.type}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Ngày thực hiện</label>
                                    <p className="font-medium">{selectedResult.date}</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Giai đoạn điều trị
                                    </label>
                                    <p className="font-medium">{selectedResult.schedule.treatmentPhase}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
                                    <Badge className={getStatusColor(selectedResult.status)}>
                                      {getStatusText(selectedResult.status)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Test Results */}
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Kết quả chi tiết</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                                  {Object.entries(selectedResult.details).map(([key, value]) => (
                                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                      <div className="text-sm font-medium capitalize text-muted-foreground">
                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                      </div>
                                      <div className="font-semibold">{String(value)}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Doctor's Notes */}
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Ghi chú của bác sĩ</label>
                                <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                                  <p className="text-sm leading-relaxed">{selectedResult.doctorsNote}</p>
                                </div>
                              </div>

                              {/* Attachments */}
                              {selectedResult.attachments && selectedResult.attachments.length > 0 && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">File đính kèm</label>
                                  <div className="mt-2 space-y-2">
                                    {selectedResult.attachments.map((attachment: any) => (
                                      <div
                                        key={attachment.id}
                                        className="flex items-center justify-between p-3 border rounded-lg"
                                      >
                                        <div className="flex items-center gap-2">
                                          <TestTube className="h-4 w-4 text-blue-600" />
                                          <span className="text-sm font-medium">{attachment.name}</span>
                                        </div>
                                        <Button variant="outline" size="sm">
                                          <Download className="h-4 w-4 mr-2" />
                                          Tải xuống
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredResults.length === 0 && (
              <div className="text-center py-8">
                <TestTube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không tìm thấy kết quả nào</h3>
                <p className="text-sm text-muted-foreground">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
