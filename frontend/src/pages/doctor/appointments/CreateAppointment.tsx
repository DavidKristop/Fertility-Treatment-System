import type React from "react"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Stethoscope, Save, Plus } from "lucide-react"
import { useState } from "react"

// Mock data for patients with active treatments
const patientsWithTreatments = [
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Nguyễn Thị Lan",
    age: 32,
    phone: "0901234567",
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      protocol: "IVF Long Protocol",
      status: "In Progress",
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
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Trần Văn Nam",
    age: 35,
    phone: "0912345678",
    treatment: {
      id: "550e8400-e29b-41d4-a716-446655440002",
      protocol: "IUI Natural Protocol",
      status: "In Progress",
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
  },
]

export default function CreateAppointment() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedPhase, setSelectedPhase] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointmentTime, setAppointmentTime] = useState("")
  const [estimatedDuration, setEstimatedDuration] = useState("30")
  const [notes, setNotes] = useState("")

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Cuộc hẹn", path: "/doctor/appointments" },
    { label: "Tạo cuộc hẹn" },
  ]

  const selectedPatientData = patientsWithTreatments.find((p) => p.id === selectedPatient)
  const availablePhases = selectedPatientData?.treatment.phases.filter((phase) => !phase.isComplete) || []

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      selectedPatient,
      selectedPhase,
      appointmentDate,
      appointmentTime,
      estimatedDuration,
      notes,
    })
  }

  return (
    <DoctorLayout title="Tạo cuộc hẹn mới" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Thông tin cuộc hẹn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Chọn bệnh nhân *</Label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bệnh nhân đang điều trị" />
                    </SelectTrigger>
                    <SelectContent>
                      {patientsWithTreatments.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>
                              {patient.name} - {patient.age} tuổi
                            </span>
                            <Badge variant="outline" className="ml-2">
                              {patient.treatment.protocol}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPatientData && (
                  <div>
                    <Label htmlFor="phase">Giai đoạn điều trị *</Label>
                    <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn giai đoạn điều trị" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePhases.map((phase) => (
                          <SelectItem key={phase.id} value={phase.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{phase.title}</span>
                              <span className="text-xs text-muted-foreground">{phase.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Patient Info Display */}
              {selectedPatientData && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900">{selectedPatientData.name}</h3>
                        <p className="text-sm text-blue-700">
                          {selectedPatientData.age} tuổi • {selectedPatientData.phone}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className="bg-purple-100 text-purple-800">
                            {selectedPatientData.treatment.protocol}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {selectedPatientData.treatment.status === "In Progress"
                              ? "Đang điều trị"
                              : selectedPatientData.treatment.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Ngày hẹn *</Label>
                  <Input
                    type="date"
                    id="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Giờ hẹn *</Label>
                  <Input
                    type="time"
                    id="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Thời gian dự kiến (phút)</Label>
                  <Select value={estimatedDuration} onValueChange={setEstimatedDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="45">45 phút</SelectItem>
                      <SelectItem value="60">60 phút</SelectItem>
                      <SelectItem value="90">90 phút</SelectItem>
                      <SelectItem value="120">120 phút</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Phase Details */}
              {selectedPhase && selectedPatientData && (
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Stethoscope className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {availablePhases.find((p) => p.id === selectedPhase)?.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {availablePhases.find((p) => p.id === selectedPhase)?.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú về cuộc hẹn (tùy chọn)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Quick Time Slots */}
              <div>
                <Label>Khung giờ thường dùng</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {[
                    "08:00",
                    "08:30",
                    "09:00",
                    "09:30",
                    "10:00",
                    "10:30",
                    "14:00",
                    "14:30",
                    "15:00",
                    "15:30",
                    "16:00",
                    "16:30",
                  ].map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAppointmentTime(time)}
                      className={appointmentTime === time ? "bg-blue-100 border-blue-300" : ""}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={!selectedPatient || !selectedPhase || !appointmentDate || !appointmentTime}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Tạo cuộc hẹn
                </Button>
                <Button type="button" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lưu và tạo tiếp
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Appointment Preview */}
        {selectedPatient && selectedPhase && appointmentDate && appointmentTime && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">Xem trước cuộc hẹn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Bệnh nhân:</span>
                  <span>{selectedPatientData?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Giai đoạn:</span>
                  <span>{availablePhases.find((p) => p.id === selectedPhase)?.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Thời gian:</span>
                  <span>
                    {new Date(appointmentDate).toLocaleDateString("vi-VN")} lúc {appointmentTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Thời gian dự kiến:</span>
                  <span>{estimatedDuration} phút</span>
                </div>
                {notes && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium">Ghi chú:</span>
                    <span className="text-sm">{notes}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DoctorLayout>
  )
}
