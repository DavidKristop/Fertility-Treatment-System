"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  Save,
  ArrowLeft,
  Stethoscope,
  Pill,
  ClipboardList,
  Heart,
} from "lucide-react"
import {
  getScheduleById,
  getScheduleResult,
  createScheduleResult,
  type Schedule,
  type ScheduleResult,
  type ScheduleResultRequest,
} from "@/api/schedule"

// Mock patient medical history data
const mockMedicalHistory = {
  allergies: ["Penicillin", "Shellfish"],
  chronicConditions: ["Hypertension", "Diabetes Type 2"],
  previousSurgeries: [
    { procedure: "Appendectomy", date: "2020-03-15" },
    { procedure: "Gallbladder removal", date: "2019-08-22" },
  ],
  medications: [
    { name: "Metformin", dosage: "500mg", frequency: "2x daily" },
    { name: "Lisinopril", dosage: "10mg", frequency: "1x daily" },
  ],
  familyHistory: "Mother: Diabetes, Father: Heart disease",
  notes: "Patient has been compliant with medication regimen. Regular exercise routine.",
}

export default function DoctorScheduleResult() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [schedule, setSchedule] = useState<Schedule | null>(null)
  const [existingResult, setExistingResult] = useState<ScheduleResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form state
  const [doctorsNote, setDoctorsNote] = useState("")
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
  })
  const [diagnosis, setDiagnosis] = useState("")
  const [treatmentPlan, setTreatmentPlan] = useState("")
  const [followUpInstructions, setFollowUpInstructions] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        setLoading(true)

        // Fetch schedule details
        const scheduleData = await getScheduleById(id)
        if (scheduleData) {
          setSchedule(scheduleData)
        }

        // Check if result already exists
        const resultData = await getScheduleResult(id)
        if (resultData) {
          setExistingResult(resultData)
          setDoctorsNote(resultData.doctors_note)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSaveResult = async () => {
    if (!id || !schedule) return

    try {
      setSaving(true)

      const resultData: ScheduleResultRequest = {
        schedule_id: id,
        doctors_note: doctorsNote,
        attachments: attachments,
      }

      await createScheduleResult(resultData)

      // Show success message and navigate back
      alert("Kết quả đã được lưu thành công!")
      navigate("/doctor/schedule")
    } catch (error) {
      console.error("Error saving result:", error)
      alert("Có lỗi xảy ra khi lưu kết quả")
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setAttachments(Array.from(files))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Changed":
        return "bg-blue-100 text-blue-800"
      case "Cancel":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "Done":
        return "Đã hoàn thành"
      case "Pending":
        return "Chờ xác nhận"
      case "Changed":
        return "Đã thay đổi"
      case "Cancel":
        return "Đã hủy"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <DoctorLayout title="Chi tiết lịch hẹn" breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải thông tin...</div>
        </div>
      </DoctorLayout>
    )
  }

  if (!schedule) {
    return (
      <DoctorLayout title="Chi tiết lịch hẹn" breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Không tìm thấy lịch hẹn</div>
        </div>
      </DoctorLayout>
    )
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Lịch hẹn", path: "/doctor/schedule" },
    { label: "Chi tiết lịch hẹn" },
  ]

  return (
    <DoctorLayout title="Chi tiết lịch hẹn" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/doctor/schedule")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Chi tiết lịch hẹn</h1>
            <p className="text-gray-600">Ngày {new Date(schedule.appointment_datetime).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Thông tin cuộc hẹn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule.patient?.name}</p>
                    <p className="text-sm text-gray-600">Bệnh nhân</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule.patient?.phone}</p>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                  </div>
                </div>

                {schedule.patient?.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{schedule.patient.email}</p>
                      <p className="text-sm text-gray-600">Email</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {new Date(schedule.appointment_datetime).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-600">Thời gian hẹn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule.reason}</p>
                    <p className="text-sm text-gray-600">Lý do khám</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(schedule.status)}>{getStatusText(schedule.status)}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Tiền sử bệnh án
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold text-red-600">Dị ứng</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {mockMedicalHistory.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Bệnh mãn tính</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {mockMedicalHistory.chronicConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Phẫu thuật trước đây</Label>
                  <div className="mt-1 space-y-1">
                    {mockMedicalHistory.previousSurgeries.map((surgery, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{surgery.procedure}</span> - {surgery.date}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Thuốc đang sử dụng</Label>
                  <div className="mt-1 space-y-1">
                    {mockMedicalHistory.medications.map((med, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">Tiền sử gia đình</Label>
                  <p className="mt-1 text-sm">{mockMedicalHistory.familyHistory}</p>
                </div>

                <div>
                  <Label className="font-semibold">Ghi chú</Label>
                  <p className="mt-1 text-sm">{mockMedicalHistory.notes}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Dịch vụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.services?.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.description}</p>
                    {service.notes && <p className="text-xs text-gray-500 mt-1">Ghi chú: {service.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{service.price.toLocaleString("vi-VN")} VNĐ</p>
                    <p className="text-sm text-gray-600">/{service.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drugs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Thuốc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.drugs?.map((drug, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{drug.name}</p>
                    <p className="text-sm text-gray-600">{drug.description}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      <span className="font-medium">Liều dùng:</span> {drug.dosage}
                    </p>
                    <p className="text-sm text-green-600">
                      <span className="font-medium">Hướng dẫn:</span> {drug.instructions}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {drug.amount} {drug.unit}
                    </p>
                    <p className="text-sm text-gray-600">
                      {drug.price.toLocaleString("vi-VN")} VNĐ/{drug.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Examination Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Kết quả khám
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vital Signs */}
            <div>
              <Label className="text-base font-semibold">Sinh hiệu</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                <div>
                  <Label htmlFor="bloodPressure">Huyết áp</Label>
                  <Input
                    id="bloodPressure"
                    placeholder="120/80"
                    value={vitalSigns.bloodPressure}
                    onChange={(e) => setVitalSigns((prev) => ({ ...prev, bloodPressure: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="heartRate">Nhịp tim</Label>
                  <Input
                    id="heartRate"
                    placeholder="72 bpm"
                    value={vitalSigns.heartRate}
                    onChange={(e) => setVitalSigns((prev) => ({ ...prev, heartRate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="temperature">Nhiệt độ</Label>
                  <Input
                    id="temperature"
                    placeholder="36.5°C"
                    value={vitalSigns.temperature}
                    onChange={(e) => setVitalSigns((prev) => ({ ...prev, temperature: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Cân nặng</Label>
                  <Input
                    id="weight"
                    placeholder="65 kg"
                    value={vitalSigns.weight}
                    onChange={(e) => setVitalSigns((prev) => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Chiều cao</Label>
                  <Input
                    id="height"
                    placeholder="165 cm"
                    value={vitalSigns.height}
                    onChange={(e) => setVitalSigns((prev) => ({ ...prev, height: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Diagnosis */}
            <div>
              <Label htmlFor="diagnosis" className="text-base font-semibold">
                Chẩn đoán
              </Label>
              <Textarea
                id="diagnosis"
                placeholder="Nhập chẩn đoán..."
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>

            <Separator />

            {/* Treatment Plan */}
            <div>
              <Label htmlFor="treatmentPlan" className="text-base font-semibold">
                Kế hoạch điều trị
              </Label>
              <Textarea
                id="treatmentPlan"
                placeholder="Nhập kế hoạch điều trị..."
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>

            <Separator />

            {/* Follow-up Instructions */}
            <div>
              <Label htmlFor="followUp" className="text-base font-semibold">
                Hướng dẫn theo dõi
              </Label>
              <Textarea
                id="followUp"
                placeholder="Nhập hướng dẫn theo dõi..."
                value={followUpInstructions}
                onChange={(e) => setFollowUpInstructions(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Result */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ghi chú của bác sĩ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="doctorsNote">Ghi chú chi tiết</Label>
              <Textarea
                id="doctorsNote"
                placeholder="Nhập ghi chú chi tiết về cuộc khám..."
                value={doctorsNote}
                onChange={(e) => setDoctorsNote(e.target.value)}
                className="mt-2 min-h-[150px]"
              />
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="attachments">Tải lên file đính kèm</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Kéo thả file hoặc click để chọn</p>
                <p className="text-xs text-gray-400 mb-4">PDF, JPG, PNG (tối đa 10MB mỗi file)</p>
                <input
                  type="file"
                  id="attachments"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("attachments")?.click()}>
                  Chọn file
                </Button>
              </div>

              {attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">File đã chọn:</p>
                  <div className="space-y-1">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText className="h-4 w-4" />
                        <span>{file.name}</span>
                        <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Existing Result Display */}
            {existingResult && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Kết quả đã lưu trước đó:</h4>
                <p className="text-sm text-blue-700">{existingResult.doctors_note}</p>
                {existingResult.attachments && existingResult.attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-blue-800">File đính kèm:</p>
                    <div className="space-y-1 mt-1">
                      {existingResult.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-blue-700">
                          <FileText className="h-4 w-4" />
                          <a
                            href={attachment.attachment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            File {index + 1}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button variant="outline" onClick={() => navigate("/doctor/schedule")}>
            Hủy
          </Button>
          <Button
            onClick={handleSaveResult}
            disabled={saving || !doctorsNote.trim()}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Đang lưu..." : "Lưu kết quả"}
          </Button>
        </div>
      </div>
    </DoctorLayout>
  )
}
