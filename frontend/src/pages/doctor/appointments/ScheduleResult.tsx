"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, Phone, Mail, FileText, Save, ArrowLeft, ClipboardList } from "lucide-react"
import {
  getScheduleById,
  getScheduleResult,
  createScheduleResult,
  type Schedule,
  type ScheduleResult,
  type ScheduleResultRequest,
} from "@/api/schedule"
import FormSection from "@/components/doctor/common/FormSection"
import MedicalHistoryCard from "@/components/doctor/common/MedicalHistoryCard"
import ServiceCard from "@/components/doctor/common/ServiceCard"
import DrugCard from "@/components/doctor/common/DrugCard"
import VitalSignsForm from "@/components/doctor/common/VitalSignsForm"
import FileUpload from "@/components/doctor/common/FileUpload"
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge"
import LoadingComponent from "@/components/common/LoadingComponent"

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

  // Error state - schedule not found
  if (!loading && !schedule) {
    return (
      <DoctorLayout title="Ghi nhận lịch hẹn" breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Không tìm thấy lịch hẹn</p>
            <Button onClick={() => navigate("/doctor/schedule")} variant="outline">
              Quay lại lịch hẹn
            </Button>
          </div>
        </div>
      </DoctorLayout>
    )
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Lịch hẹn", path: "/doctor/schedule" },
    { label: "Chi tiết lịch hẹn" },
  ]

  const patientInfo = {
    id: schedule?.patient?.id || "",
    name: schedule?.patient?.name || "Bệnh nhân",
    phone: schedule?.patient?.phone || "",
    email: schedule?.patient?.email || "",
  }

  return (
    <DoctorLayout title="Ghi nhận lịch hẹn" breadcrumbs={breadcrumbs}>
      <LoadingComponent isLoading={loading}>
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/doctor/schedule")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Chi tiết lịch hẹn</h1>
              <p className="text-gray-600">
                Ngày {schedule && new Date(schedule.appointment_datetime).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <FormSection title="Thông tin cuộc hẹn" icon={Calendar}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule?.patient?.name}</p>
                    <p className="text-sm text-gray-600">Bệnh nhân</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule?.patient?.phone}</p>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                  </div>
                </div>

                {schedule?.patient?.email && (
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
                      {schedule && new Date(schedule.appointment_datetime).toLocaleTimeString("vi-VN", {
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
                    <p className="font-medium">{schedule?.reason}</p>
                    <p className="text-sm text-gray-600">Lý do khám</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {schedule && <AppointmentStatusBadge status={schedule.status} />}
                </div>
              </div>
            </div>
          </FormSection>

          {/* Medical History */}
          <MedicalHistoryCard data={mockMedicalHistory} />

          {/* Services */}
          {schedule?.services && schedule.services.length > 0 && <ServiceCard services={schedule.services} />}

          {/* Drugs */}
          {schedule?.drugs && schedule.drugs.length > 0 && <DrugCard drugs={schedule.drugs} />}

          {/* Examination Results */}
          <FormSection title="Kết quả khám" icon={ClipboardList}>
            <div className="space-y-6">
              {/* Vital Signs */}
              <VitalSignsForm vitalSigns={vitalSigns} onChange={setVitalSigns} />

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
            </div>
          </FormSection>

          {/* Schedule Result */}
          <FormSection title="Ghi chú của bác sĩ" icon={FileText}>
            <div className="space-y-4">
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
              <FileUpload files={attachments} onFilesChange={setAttachments} />

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
            </div>
          </FormSection>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={() => navigate("/doctor/schedule")} disabled={saving}>
              Hủy
            </Button>
            <LoadingComponent isLoading={saving}>
              <Button
                onClick={handleSaveResult}
                disabled={saving || !doctorsNote.trim()}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? "Đang lưu..." : "Lưu kết quả"}
              </Button>
            </LoadingComponent>
          </div>
        </div>
      </LoadingComponent>
    </DoctorLayout>
  )
}
