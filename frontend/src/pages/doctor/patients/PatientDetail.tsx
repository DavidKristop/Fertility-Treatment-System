"use client"

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Activity, MessageSquare, ExternalLink, Eye, FileText, Download, Clock } from "lucide-react"
import PatientInfoCard from "@/components/doctor/common/PatientInfoCard"
import FormSection from "@/components/doctor/common/FormSection"
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge"
import DataTable from "@/components/doctor/common/DataTable"

// Enhanced interfaces for Results integration
interface ScheduleResultAttachment {
  id: string
  attachmentUrl: string
  fileName: string
  fileType: string
  uploadedAt: string
}

interface ScheduleResult {
  id: string
  doctorsNote: string
  scheduleId: string
  createdAt: string
  updatedAt: string
  attachments: ScheduleResultAttachment[]
}

interface Service {
  id: string
  name: string
  description: string
  unit: string
  price: number
}

interface ScheduleService {
  id: string
  scheduleId: string
  serviceId: string
  notes: string
  service: Service
}

interface Schedule {
  id: string
  appointmentDatetime: string
  estimatedTime: string
  status: "Pending" | "Changed" | "Done" | "Cancel"
  treatmentPhase: {
    id: string
    title: string
    position: number
  }
  doctor: {
    id: string
    fullName: string
  }
  result: ScheduleResult | null
  services: ScheduleService[]
}

interface Treatment {
  id: string
  startDate: string
  endDate: string | null
  description: string
  status: "In Progress" | "Complete" | "Cancel"
  currentPhase: {
    id: string
    title: string
    description: string
    position: number
    isComplete: boolean
  } | null
  protocol: {
    id: string
    title: string
    description: string
    isActive: boolean
  }
  doctor: {
    id: string
    fullName: string
  }
  phases: Array<{
    id: string
    title: string
    description: string
    position: number
    isComplete: boolean
  }>
}

interface PatientDetailData {
  id: string
  user: {
    id: string
    fullName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    avatarUrl: string | null
    role: {
      id: string
      name: string
    }
  }
  patientProfile: {
    id: string
    medicalHistory: string
  }
  treatments: Treatment[]
  schedules: Schedule[]
  feedbacks: Array<{
    id: string
    content: string
    treatment: {
      id: string
      description: string
    }
  }>
}

// Enhanced mock data with comprehensive results
const mockPatientData: PatientDetailData = {
  id: "550e8400-e29b-41d4-a716-446655440001",
  user: {
    id: "550e8400-e29b-41d4-a716-446655440001",
    fullName: "Nguyễn Thị Lan",
    email: "lan.nguyen@email.com",
    phone: "0901234567",
    dateOfBirth: "1992-03-15",
    address: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
    avatarUrl: null,
    role: {
      id: "patient-role-id",
      name: "PATIENT",
    },
  },
  patientProfile: {
    id: "patient-profile-id",
    medicalHistory:
      "Tiền sử phẫu thuật ruột thừa năm 2018. Không có tiền sử dị ứng thuốc. Chu kỳ kinh nguyệt đều đặn 28 ngày.",
  },
  treatments: [
    {
      id: "treatment-1",
      startDate: "2024-01-10",
      endDate: null,
      description: "Vô sinh nguyên phát do tắc vòi trứng",
      status: "In Progress",
      currentPhase: {
        id: "phase-2",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
        position: 2,
        isComplete: false,
      },
      protocol: {
        id: "protocol-ivf-long",
        title: "IVF Long Protocol",
        description: "Quy trình IVF dài với ức chế buồng trứng trước",
        isActive: true,
      },
      doctor: {
        id: "doctor-1",
        fullName: "BS. Nguyễn Văn A",
      },
      phases: [
        {
          id: "phase-1",
          title: "Giai đoạn 1: Khám và tư vấn",
          description: "Khám sàng lọc và tư vấn ban đầu",
          position: 1,
          isComplete: true,
        },
        {
          id: "phase-2",
          title: "Giai đoạn 2: Kích thích buồng trứng",
          description: "Sử dụng thuốc kích thích để phát triển nhiều nang trứng",
          position: 2,
          isComplete: false,
        },
        {
          id: "phase-3",
          title: "Giai đoạn 3: Thu nhận trứng",
          description: "Thực hiện thu nhận trứng từ buồng trứng",
          position: 3,
          isComplete: false,
        },
      ],
    },
    {
      id: "treatment-2",
      startDate: "2023-08-15",
      endDate: "2023-12-20",
      description: "Điều trị rối loạn nội tiết tố",
      status: "Complete",
      currentPhase: null,
      protocol: {
        id: "protocol-hormone",
        title: "Hormone Regulation Protocol",
        description: "Điều chỉnh nội tiết tố sinh sản",
        isActive: true,
      },
      doctor: {
        id: "doctor-1",
        fullName: "BS. Nguyễn Văn A",
      },
      phases: [
        {
          id: "phase-hormone-1",
          title: "Giai đoạn 1: Đánh giá ban đầu",
          description: "Xét nghiệm và đánh giá tình trạng nội tiết",
          position: 1,
          isComplete: true,
        },
        {
          id: "phase-hormone-2",
          title: "Giai đoạn 2: Điều trị",
          description: "Sử dụng thuốc điều chỉnh nội tiết",
          position: 2,
          isComplete: true,
        },
      ],
    },
  ],
  schedules: [
    {
      id: "schedule-1",
      appointmentDatetime: "2024-01-15T09:00:00",
      estimatedTime: "2024-01-15T09:30:00",
      status: "Done",
      treatmentPhase: {
        id: "phase-1",
        title: "Giai đoạn 1: Khám và tư vấn",
        position: 1,
      },
      doctor: {
        id: "doctor-1",
        fullName: "BS. Nguyễn Văn A",
      },
      result: {
        id: "result-1",
        doctorsNote: "Bệnh nhân đã hoàn thành khám sàng lọc. Kết quả xét nghiệm hormone trong giới hạn bình thường. AMH: 2.8 ng/mL, FSH: 7.2 mIU/mL. Siêu âm cho thấy buồng trứng có hoạt động tốt với 12 nang antral. Khuyến nghị tiến hành giai đoạn kích thích buồng trứng.",
        scheduleId: "schedule-1",
        createdAt: "2024-01-15T10:00:00",
        updatedAt: "2024-01-15T10:00:00",
        attachments: [
          {
            id: "attachment-1",
            attachmentUrl: "/results/blood-test-lan-2024-01-15.pdf",
            fileName: "Kết quả xét nghiệm hormone - Nguyễn Thị Lan",
            fileType: "PDF",
            uploadedAt: "2024-01-15T10:05:00",
          },
          {
            id: "attachment-2",
            attachmentUrl: "/results/ultrasound-lan-2024-01-15.jpg",
            fileName: "Siêu âm buồng trứng - Nguyễn Thị Lan",
            fileType: "JPG",
            uploadedAt: "2024-01-15T10:10:00",
          },
        ],
      },
      services: [
        {
          id: "schedule-service-1",
          scheduleId: "schedule-1",
          serviceId: "service-consultation",
          notes: "Khám tổng quát và tư vấn phương pháp điều trị",
          service: {
            id: "service-consultation",
            name: "Tư vấn chuyên khoa",
            description: "Tư vấn và khám sàng lọc ban đầu",
            unit: "lần",
            price: 500000,
          },
        },
        {
          id: "schedule-service-2",
          scheduleId: "schedule-1",
          serviceId: "service-hormone-test",
          notes: "Xét nghiệm các hormone sinh sản",
          service: {
            id: "service-hormone-test",
            name: "Xét nghiệm hormone",
            description: "Xét nghiệm AMH, FSH, LH, E2",
            unit: "lần",
            price: 1200000,
          },
        },
      ],
    },
    {
      id: "schedule-2",
      appointmentDatetime: "2024-01-22T14:00:00",
      estimatedTime: "2024-01-22T14:45:00",
      status: "Done",
      treatmentPhase: {
        id: "phase-2",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        position: 2,
      },
      doctor: {
        id: "doctor-1",
        fullName: "BS. Nguyễn Văn A",
      },
      result: {
        id: "result-2",
        doctorsNote: "Theo dõi phản ứng với thuốc kích thích. Siêu âm cho thấy có 8 nang trứng phát triển tốt, kích thước từ 12-16mm. Estradiol tăng phù hợp. Tiếp tục liều thuốc hiện tại thêm 2 ngày nữa.",
        scheduleId: "schedule-2",
        createdAt: "2024-01-22T15:00:00",
        updatedAt: "2024-01-22T15:00:00",
        attachments: [
          {
            id: "attachment-3",
            attachmentUrl: "/results/ultrasound-followup-lan-2024-01-22.jpg",
            fileName: "Siêu âm theo dõi kích thích - Nguyễn Thị Lan",
            fileType: "JPG",
            uploadedAt: "2024-01-22T15:05:00",
          },
          {
            id: "attachment-4",
            attachmentUrl: "/results/hormone-followup-lan-2024-01-22.pdf",
            fileName: "Kết quả hormone theo dõi - Nguyễn Thị Lan",
            fileType: "PDF",
            uploadedAt: "2024-01-22T15:10:00",
          },
        ],
      },
      services: [
        {
          id: "schedule-service-3",
          scheduleId: "schedule-2",
          serviceId: "service-ultrasound",
          notes: "Theo dõi phản ứng với thuốc kích thích",
          service: {
            id: "service-ultrasound",
            name: "Siêu âm theo dõi",
            description: "Siêu âm theo dõi phát triển nang trứng",
            unit: "lần",
            price: 300000,
          },
        },
        {
          id: "schedule-service-4",
          scheduleId: "schedule-2",
          serviceId: "service-estradiol-test",
          notes: "Kiểm tra mức độ estradiol",
          service: {
            id: "service-estradiol-test",
            name: "Xét nghiệm Estradiol",
            description: "Đo nồng độ estradiol trong máu",
            unit: "lần",
            price: 200000,
          },
        },
      ],
    },
    {
      id: "schedule-3",
      appointmentDatetime: "2024-01-28T10:00:00",
      estimatedTime: "2024-01-28T10:30:00",
      status: "Pending",
      treatmentPhase: {
        id: "phase-2",
        title: "Giai đoạn 2: Kích thích buồng trứng",
        position: 2,
      },
      doctor: {
        id: "doctor-1",
        fullName: "BS. Nguyễn Văn A",
      },
      result: null,
      services: [
        {
          id: "schedule-service-5",
          scheduleId: "schedule-3",
          serviceId: "service-final-ultrasound",
          notes: "Siêu âm cuối cùng trước thu nhận trứng",
          service: {
            id: "service-final-ultrasound",
            name: "Siêu âm chấm dứt",
            description: "Siêu âm đánh giá cuối cùng",
            unit: "lần",
            price: 300000,
          },
        },
      ],
    },
  ],
  feedbacks: [
    {
      id: "feedback-1",
      content: "Bác sĩ tư vấn rất tận tình và chu đáo. Cảm ơn đội ngũ y tế!",
      treatment: {
        id: "treatment-1",
        description: "Vô sinh nguyên phát do tắc vòi trứng",
      },
    },
    {
      id: "feedback-2",
      content: "Quy trình điều trị rõ ràng, nhân viên hỗ trợ nhiệt tình.",
      treatment: {
        id: "treatment-2",
        description: "Điều trị rối loạn nội tiết tố",
      },
    },
  ],
}

export default function PatientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [patient, setPatient] = useState<PatientDetailData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Replace with actual API calls
    // const fetchPatientData = async () => {
    //   const [userResponse, treatmentsResponse, schedulesResponse] = await Promise.all([
    //     fetchWrapper(`users/${id}`, {}, true),
    //     fetchWrapper(`treatments?userId=${id}`, {}, true),
    //     fetchWrapper(`schedules?patientId=${id}&include=result,services`, {}, true),
    //   ])
    //   // Process and set data...
    // }
    
    // Simulate API call
    setTimeout(() => {
      setPatient(mockPatientData)
      setLoading(false)
    }, 500)
  }, [id])

  const handleViewTreatment = (treatmentId: string) => {
    navigate(`/doctor/treatment-plans/treatment-details/${treatmentId}`)
  }

  const handleViewScheduleResult = (scheduleId: string) => {
    navigate(`/doctor/schedule-result/${scheduleId}`)
  }

  const handleDownloadAttachment = (attachmentUrl: string, fileName: string) => {
    // TODO: Implement file download
    window.open(attachmentUrl, '_blank')
  }

  if (loading) {
    return (
      <DoctorLayout title="Đang tải..." breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải thông tin bệnh nhân...</div>
        </div>
      </DoctorLayout>
    )
  }

  if (!patient) {
    return (
      <DoctorLayout title="Không tìm thấy" breadcrumbs={[]}>
        <div className="text-center py-8">
          <p className="text-gray-600">Không tìm thấy thông tin bệnh nhân</p>
        </div>
      </DoctorLayout>
    )
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Bệnh nhân", path: "/doctor/patients" },
    { label: patient.user.fullName },
  ]

  const patientInfo = {
    id: patient.id,
    name: patient.user.fullName,
    phone: patient.user.phone,
    email: patient.user.email,
    address: patient.user.address,
    dateOfBirth: patient.user.dateOfBirth,
  }

  // Get schedule results for Results tab
  const scheduleResults = patient.schedules
    .filter(schedule => schedule.result)
    .map(schedule => ({
      ...schedule.result!,
      schedule: {
        id: schedule.id,
        appointmentDatetime: schedule.appointmentDatetime,
        treatmentPhase: schedule.treatmentPhase,
        doctor: schedule.doctor,
        services: schedule.services,
        status: schedule.status,
      }
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Treatment table columns
  const treatmentColumns = [
    {
      key: "protocol",
      label: "Quy trình điều trị",
      render: (treatment: Treatment) => (
        <div>
          <p className="font-medium">{treatment.protocol.title}</p>
          <p className="text-sm text-muted-foreground">{treatment.description}</p>
        </div>
      ),
    },
    {
      key: "doctor",
      label: "Bác sĩ",
      render: (treatment: Treatment) => treatment.doctor.fullName,
    },
    {
      key: "progress",
      label: "Tiến độ",
      render: (treatment: Treatment) => (
        <div>
          <p className="text-sm">
            {treatment.currentPhase ? `${treatment.currentPhase.position}/${treatment.phases.length}` : "Hoàn thành"}
          </p>
          {treatment.currentPhase && <p className="text-xs text-muted-foreground">{treatment.currentPhase.title}</p>}
        </div>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (treatment: Treatment) => <AppointmentStatusBadge status={treatment.status} />,
    },
    {
      key: "period",
      label: "Thời gian",
      render: (treatment: Treatment) => (
        <div className="text-sm">
          <p>{new Date(treatment.startDate).toLocaleDateString("vi-VN")}</p>
          <p className="text-muted-foreground">{treatment.endDate ? new Date(treatment.endDate).toLocaleDateString("vi-VN") : "Đang điều trị"}</p>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (treatment: Treatment) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewTreatment(treatment.id)}
          className="flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          Xem chi tiết
        </Button>
      ),
    },
  ]

  // Enhanced schedule table columns with result link
  const scheduleColumns = [
    {
      key: "datetime",
      label: "Thời gian",
      render: (schedule: Schedule) => (
        <div>
          <p className="font-medium">{new Date(schedule.appointmentDatetime).toLocaleDateString("vi-VN")}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(schedule.appointmentDatetime).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
    },
    {
      key: "phase",
      label: "Giai đoạn điều trị",
      render: (schedule: Schedule) => (
        <div>
          <p className="font-medium">{schedule.treatmentPhase.title}</p>
          <Badge variant="outline" className="text-xs mt-1">
            Giai đoạn {schedule.treatmentPhase.position}
          </Badge>
        </div>
      ),
    },
    {
      key: "doctor",
      label: "Bác sĩ",
      render: (schedule: Schedule) => schedule.doctor.fullName,
    },
    {
      key: "services",
      label: "Dịch vụ",
      render: (schedule: Schedule) => (
        <div className="space-y-1">
          {schedule.services.map((service) => (
            <div key={service.id} className="text-sm">
              <p className="font-medium">{service.service.name}</p>
              {service.notes && (
                <p className="text-xs text-muted-foreground">{service.notes}</p>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (schedule: Schedule) => <AppointmentStatusBadge status={schedule.status} />,
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (schedule: Schedule) => (
        <div className="flex gap-2">
          {schedule.result ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewScheduleResult(schedule.id)}
              className="flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              Ghi kết quả
            </Button>
          ) : schedule.status === "Done" ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewScheduleResult(schedule.id)}
              className="flex items-center gap-1"
            >
              <FileText className="h-3 w-3" />
              Ghi kết quả
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="text-muted-foreground"
            >
              <Clock className="h-3 w-3 mr-1" />
              Chờ thực hiện
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <DoctorLayout title={`Hồ sơ bệnh nhân - ${patient.user.fullName}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Patient Header */}
        <PatientInfoCard
          patient={patientInfo}
          showMedicalHistory={true}
          medicalHistory={patient.patientProfile.medicalHistory}
        />

        {/* Patient Details Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="treatments">Điều trị</TabsTrigger>
            <TabsTrigger value="appointments">Lịch hẹn</TabsTrigger>
            <TabsTrigger value="results">Kết quả khám</TabsTrigger>
            <TabsTrigger value="feedback">Phản hồi</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Treatment */}
              <FormSection title="Điều trị hiện tại" icon={Activity}>
                {patient.treatments
                  .filter((treatment) => treatment.status === "In Progress")
                  .map((treatment) => (
                    <div key={treatment.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-100 text-purple-800">{treatment.protocol.title}</Badge>
                        <AppointmentStatusBadge status={treatment.status} />
                      </div>
                      <div>
                        <p className="font-medium">{treatment.protocol.title}</p>
                        <p className="text-sm text-muted-foreground">{treatment.description}</p>
                      </div>
                      {treatment.currentPhase && (
                        <div className="text-sm">
                          <p>
                            <strong>Giai đoạn hiện tại:</strong> {treatment.currentPhase.title}
                          </p>
                          <p>
                            <strong>Tiến độ:</strong> {treatment.currentPhase.position}/{treatment.phases.length}
                          </p>
                        </div>
                      )}
                      <div className="text-sm">
                        <p>
                          <strong>Ngày bắt đầu:</strong> {new Date(treatment.startDate).toLocaleDateString("vi-VN")}
                        </p>
                        <p>
                          <strong>Bác sĩ phụ trách:</strong> {treatment.doctor.fullName}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTreatment(treatment.id)}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Xem chi tiết điều trị
                      </Button>
                    </div>
                  ))}
                {patient.treatments.filter((treatment) => treatment.status === "In Progress").length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    Hiện tại không có điều trị nào đang thực hiện
                  </p>
                )}
              </FormSection>

              {/* Recent Appointments */}
              <FormSection title="Lịch hẹn gần đây" icon={Calendar}>
                <div className="space-y-3">
                  {patient.schedules.slice(0, 3).map((schedule) => (
                    <div key={schedule.id} className="border rounded p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">
                            {new Date(schedule.appointmentDatetime).toLocaleDateString("vi-VN")}
                          </p>
                          <p className="text-sm text-muted-foreground">{schedule.treatmentPhase.title}</p>
                        </div>
                        <AppointmentStatusBadge status={schedule.status} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>BS. {schedule.doctor.fullName}</p>
                        <p>{schedule.services.map((service) => service.service.name).join(", ")}</p>
                      </div>
                      {schedule.result && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewScheduleResult(schedule.id)}
                          className="flex items-center gap-1 mt-2"
                        >
                          <Eye className="h-3 w-3" />
                          Xem kết quả
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </FormSection>
            </div>
          </TabsContent>

          <TabsContent value="treatments" className="space-y-4">
            <DataTable
              title="Lịch sử điều trị"
              data={patient.treatments}
              columns={treatmentColumns}
              emptyMessage="Chưa có điều trị nào"
              emptyIcon={Activity}
            />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <DataTable
              title="Lịch hẹn"
              data={patient.schedules}
              columns={scheduleColumns}
              emptyMessage="Chưa có lịch hẹn nào"
              emptyIcon={Calendar}
            />
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <FormSection title="Kết quả khám bệnh" icon={FileText}>
              {scheduleResults.length > 0 ? (
                <div className="space-y-6">
                  {scheduleResults.map((result) => (
                    <Card key={result.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {new Date(result.schedule.appointmentDatetime).toLocaleDateString("vi-VN")} - {result.schedule.treatmentPhase.title}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              Bác sĩ: {result.schedule.doctor.fullName} • 
                              Ghi nhận: {new Date(result.createdAt).toLocaleDateString("vi-VN")}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewScheduleResult(result.schedule.id)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            Xem chi tiết
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Services performed */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Dịch vụ thực hiện:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {result.schedule.services.map((service) => (
                              <div key={service.id} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span>{service.service.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Doctor's notes */}
                        <div>
                          <h4 className="font-medium text-sm mb-2">Ghi chú của bác sĩ:</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm leading-relaxed">{result.doctorsNote}</p>
                          </div>
                        </div>

                        {/* Attachments */}
                        {result.attachments.length > 0 && (
                          <div>
                            <h4 className="font-medium text-sm mb-2">Tệp đính kèm ({result.attachments.length}):</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {result.attachments.map((attachment) => (
                                <div
                                  key={attachment.id}
                                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="flex-shrink-0">
                                      <FileText className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-sm font-medium truncate" title={attachment.fileName}>
                                        {attachment.fileName}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {attachment.fileType} • {new Date(attachment.uploadedAt).toLocaleDateString("vi-VN")}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDownloadAttachment(attachment.attachmentUrl, attachment.fileName)}
                                    className="flex-shrink-0 ml-2"
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">Chưa có kết quả khám nào</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kết quả sẽ xuất hiện sau khi hoàn thành các lịch hẹn
                  </p>
                </div>
              )}
            </FormSection>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <FormSection title="Phản hồi từ bệnh nhân" icon={MessageSquare}>
              <div className="space-y-4">
                {patient.feedbacks.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Điều trị: {feedback.treatment.description}</p>
                      </div>
                      <p className="text-sm">{feedback.content}</p>
                    </CardContent>
                  </Card>
                ))}
                {patient.feedbacks.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">Chưa có phản hồi nào</p>
                )}
              </div>
            </FormSection>
          </TabsContent>
        </Tabs>
      </div>
    </DoctorLayout>
  )
}
