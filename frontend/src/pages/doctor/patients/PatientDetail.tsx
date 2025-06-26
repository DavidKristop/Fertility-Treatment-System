import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Phone, Mail, MapPin, Calendar, Activity, TestTube, Pill, Heart, Edit, Plus } from "lucide-react"
import { useParams } from "react-router-dom"

// Mock patient data based on ERD
const patientData = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  user: {
    fullName: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    phone: "0901234567",
    dateOfBirth: "1992-03-15",
    address: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
    avatarUrl: null,
  },
  profile: {
    medicalHistory:
      "Tiền sử phẫu thuật ruột thừa năm 2018. Không có tiền sử dị ứng thuốc. Chu kỳ kinh nguyệt đều đặn 28 ngày.",
  },
  treatments: [
    {
      id: "550e8400-e29b-41d4-a716-446655440011",
      startDate: "2024-01-10",
      endDate: null,
      diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
      status: "In Progress",
      protocol: {
        title: "IVF Long Protocol",
        type: "IVF",
      },
      currentPhase: {
        title: "Giai đoạn 2: Kích thích buồng trứng",
        position: 2,
      },
    },
  ],
  schedules: [
    {
      id: "1",
      appointmentDatetime: "2024-01-15T09:00:00",
      estimatedTime: "2024-01-15T09:30:00",
      status: "Done",
      treatmentPhase: "Giai đoạn 1: Khám và tư vấn",
      doctorsNote: "Bệnh nhân đã hoàn thành khám sàng lọc. Kết quả tốt, tiến hành giai đoạn tiếp theo.",
    },
    {
      id: "2",
      appointmentDatetime: "2024-01-20T14:00:00",
      estimatedTime: "2024-01-20T14:30:00",
      status: "Pending",
      treatmentPhase: "Giai đoạn 2: Kích thích buồng trứng",
      doctorsNote: null,
    },
  ],
  prescriptions: [
    {
      id: "1",
      drug: {
        name: "Gonal-F",
        description: "Thuốc kích thích buồng trứng",
      },
      dosage: "75 IU",
      usageInstructions: "Tiêm dưới da mỗi ngày vào buổi tối",
      startDate: "2024-01-15",
      endDate: "2024-01-25",
      amount: 10,
    },
  ],
  results: [
    {
      id: "1",
      type: "Xét nghiệm máu",
      date: "2024-01-12",
      status: "normal",
      details: {
        hcg: "< 2 mIU/mL",
        estradiol: "45 pg/mL",
        progesterone: "1.2 ng/mL",
      },
      notes: "Kết quả bình thường, sẵn sàng cho giai đoạn kích thích.",
    },
  ],
}

export default function PatientDetail() {
  const { id } = useParams()
  const patient = patientData // In real app, fetch by id

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Bệnh nhân", path: "/doctor/patients" },
    { label: patient.user.fullName },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Done":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Cancel":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DoctorLayout title={`Hồ sơ bệnh nhân - ${patient.user.fullName}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Patient Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{patient.user.fullName}</h1>
                    <p className="text-muted-foreground">
                      {new Date().getFullYear() - new Date(patient.user.dateOfBirth).getFullYear()} tuổi
                    </p>
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.user.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.user.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="treatments">Điều trị</TabsTrigger>
            <TabsTrigger value="appointments">Lịch hẹn</TabsTrigger>
            <TabsTrigger value="prescriptions">Đơn thuốc</TabsTrigger>
            <TabsTrigger value="results">Kết quả</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Medical History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Tiền sử bệnh
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{patient.profile.medicalHistory}</p>
                </CardContent>
              </Card>

              {/* Current Treatment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Điều trị hiện tại
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.treatments.map((treatment) => (
                    <div key={treatment.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-800">{treatment.protocol.type}</Badge>
                        <Badge className={getStatusColor(treatment.status)}>
                          {treatment.status === "In Progress" ? "Đang điều trị" : treatment.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="font-medium">{treatment.protocol.title}</p>
                        <p className="text-sm text-muted-foreground">{treatment.diagnosis}</p>
                      </div>
                      <div className="text-sm">
                        <p>
                          <strong>Giai đoạn hiện tại:</strong> {treatment.currentPhase.title}
                        </p>
                        <p>
                          <strong>Ngày bắt đầu:</strong> {treatment.startDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử điều trị</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.treatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{treatment.protocol.title}</h3>
                          <p className="text-sm text-muted-foreground">{treatment.diagnosis}</p>
                        </div>
                        <Badge className={getStatusColor(treatment.status)}>
                          {treatment.status === "In Progress" ? "Đang điều trị" : treatment.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Ngày bắt đầu:</span> {treatment.startDate}
                        </div>
                        <div>
                          <span className="font-medium">Ngày kết thúc:</span> {treatment.endDate || "Chưa xác định"}
                        </div>
                      </div>
                      {treatment.currentPhase && (
                        <div className="mt-3 p-3 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-blue-900">
                            Giai đoạn hiện tại: {treatment.currentPhase.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Lịch hẹn</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tạo lịch hẹn
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {patient.schedules.map((schedule) => (
                    <div key={schedule.id} className="border-b last:border-b-0 p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {new Date(schedule.appointmentDatetime).toLocaleString("vi-VN")}
                            </span>
                            <Badge className={getStatusColor(schedule.status)}>
                              {schedule.status === "Done"
                                ? "Hoàn thành"
                                : schedule.status === "Pending"
                                  ? "Chờ khám"
                                  : schedule.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{schedule.treatmentPhase}</p>
                          {schedule.doctorsNote && (
                            <p className="text-sm bg-gray-50 p-2 rounded">{schedule.doctorsNote}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Đơn thuốc</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Kê đơn mới
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {patient.prescriptions.map((prescription) => (
                    <div key={prescription.id} className="border-b last:border-b-0 p-4">
                      <div className="flex items-start gap-3">
                        <Pill className="h-5 w-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium">{prescription.drug.name}</h4>
                          <p className="text-sm text-muted-foreground">{prescription.drug.description}</p>
                          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                            <div>
                              <strong>Liều dùng:</strong> {prescription.dosage}
                            </div>
                            <div>
                              <strong>Số lượng:</strong> {prescription.amount}
                            </div>
                            <div>
                              <strong>Từ:</strong> {prescription.startDate}
                            </div>
                            <div>
                              <strong>Đến:</strong> {prescription.endDate}
                            </div>
                          </div>
                          <p className="text-sm mt-2 p-2 bg-yellow-50 rounded">
                            <strong>Cách dùng:</strong> {prescription.usageInstructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Kết quả xét nghiệm</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Thêm kết quả
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {patient.results.map((result) => (
                    <div key={result.id} className="border-b last:border-b-0 p-4">
                      <div className="flex items-start gap-3">
                        <TestTube className="h-5 w-5 text-green-600 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{result.type}</h4>
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  result.status === "normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }
                              >
                                {result.status === "normal" ? "Bình thường" : "Bất thường"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{result.date}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            {Object.entries(result.details).map(([key, value]) => (
                              <div key={key} className="bg-gray-50 p-2 rounded">
                                <div className="font-medium capitalize">{key}</div>
                                <div>{value}</div>
                              </div>
                            ))}
                          </div>
                          {result.notes && (
                            <p className="text-sm mt-2 p-2 bg-blue-50 rounded">
                              <strong>Ghi chú:</strong> {result.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  )
}
