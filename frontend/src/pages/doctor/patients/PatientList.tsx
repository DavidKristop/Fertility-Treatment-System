"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Users, Eye, Plus } from "lucide-react"
import DataTable from "@/components/doctor/common/DataTable"
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge"

// ERD-aligned interfaces
interface User {
  id: string
  email: string
  phone: string
  fullName: string
  dateOfBirth: string // date field in ERD
  address: string
  avatarUrl: string | null
  roleId: string
}

interface PatientProfile {
  id: string
  medicalHistory: string | null
  userId: string
}

interface TreatmentProtocol {
  id: string
  title: string
  description: string
  isActive: boolean
}

interface TreatmentPhase {
  id: string
  title: string
  description: string
  totalAmount: number
  isComplete: boolean
  position: number
  treatmentId: string
}

interface Treatment {
  id: string
  startDate: string // date field in ERD
  endDate: string | null
  description: string
  paymentMode: string // "full" or "phase" from ERD
  status: string // "cancel", "In Progress", "Complete" from ERD
  currentPhase: string | null // current_phase uuid from ERD
  protocolId: string
  userId: string
  doctorId: string
  protocol: TreatmentProtocol
}

interface Schedule {
  id: string
  doctorId: string
  patientId: string
  treatmentPhaseId: string
  appointmentDatetime: string // datetime field from ERD
  estimatedTime: string
  status: string // "Pending", "Changed", "Done", "Cancel" from ERD
}

// Main Patient interface following ERD structure
interface Patient {
  user: User
  patientProfile: PatientProfile
  // Derived/calculated fields
  currentTreatment: Treatment | null
  lastSchedule: Schedule | null
  totalTreatments: number
}

// Mock data aligned with ERD
const mockPatients: Patient[] = [
  {
    user: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      email: "lan.nguyen@email.com",
      phone: "0901234567",
      fullName: "Nguyễn Thị Lan",
      dateOfBirth: "1992-03-15",
      address: "123 Nguyễn Văn Cừ, Quận 1, TP.HCM",
      avatarUrl: null,
      roleId: "role-patient-001",
    },
    patientProfile: {
      id: "profile-001",
      medicalHistory: "Tiền sử phẫu thuật ruột thừa năm 2018. Không có tiền sử dị ứng thuốc.",
      userId: "550e8400-e29b-41d4-a716-446655440001",
    },
    currentTreatment: {
      id: "treatment-001",
      startDate: "2024-01-15",
      endDate: null,
      description: "Điều trị vô sinh bằng IVF",
      paymentMode: "phase",
      status: "In Progress",
      currentPhase: "phase-002",
      protocolId: "protocol-ivf-001",
      userId: "550e8400-e29b-41d4-a716-446655440001",
      doctorId: "doctor-001",
      protocol: {
        id: "protocol-ivf-001",
        title: "IVF Long Protocol",
        description: "Quy trình IVF dài ngày",
        isActive: true,
      },
    },
    lastSchedule: {
      id: "schedule-001",
      doctorId: "doctor-001",
      patientId: "550e8400-e29b-41d4-a716-446655440001",
      treatmentPhaseId: "phase-002",
      appointmentDatetime: "2024-01-20T14:00:00",
      estimatedTime: "2024-01-20T14:30:00",
      status: "Done",
    },
    totalTreatments: 2,
  },
  {
    user: {
      id: "550e8400-e29b-41d4-a716-446655440002",
      email: "mai.tran@email.com",
      phone: "0912345678",
      fullName: "Trần Thị Mai",
      dateOfBirth: "1988-07-22",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      avatarUrl: null,
      roleId: "role-patient-001",
    },
    patientProfile: {
      id: "profile-002",
      medicalHistory: "Tiền sử nạo phá thai 1 lần. Chu kỳ kinh không đều.",
      userId: "550e8400-e29b-41d4-a716-446655440002",
    },
    currentTreatment: null,
    lastSchedule: {
      id: "schedule-002",
      doctorId: "doctor-002",
      patientId: "550e8400-e29b-41d4-a716-446655440002",
      treatmentPhaseId: "phase-003",
      appointmentDatetime: "2024-02-10T09:00:00",
      estimatedTime: "2024-02-10T09:30:00",
      status: "Pending",
    },
    totalTreatments: 1,
  },
]

export default function PatientList() {
  const navigate = useNavigate()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetchWrapper('users?role=PATIENT', {}, true)

        // Simulate API call
        setTimeout(() => {
          setPatients(mockPatients)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching patients:", error)
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  const handleViewPatient = (userId: string) => {
    navigate(`/doctor/patients/${userId}`)
  }

  const handleCreatePatient = () => {
    navigate("/doctor/patients/create")
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.user.phone.includes(searchTerm) ||
      patient.user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const breadcrumbs = [{ label: "Trang tổng quan", path: "/doctor/dashboard" }, { label: "Bệnh nhân" }]

  const columns = [
    {
      key: "patient",
      label: "Thông tin bệnh nhân",
      render: (patient: Patient) => (
        <div>
          <p className="font-medium">{patient.user.fullName}</p>
          <p className="text-sm text-muted-foreground">{patient.user.phone}</p>
          <p className="text-sm text-muted-foreground">{patient.user.email}</p>
        </div>
      ),
    },
    {
      key: "age",
      label: "Tuổi",
      render: (patient: Patient) => <span>{calculateAge(patient.user.dateOfBirth)} tuổi</span>,
    },
    {
      key: "medicalHistory",
      label: "Tiền sử bệnh",
      render: (patient: Patient) => (
        <div className="max-w-xs">
          {patient.patientProfile.medicalHistory ? (
            <p className="text-sm truncate" title={patient.patientProfile.medicalHistory}>
              {patient.patientProfile.medicalHistory}
            </p>
          ) : (
            <span className="text-muted-foreground text-sm">Chưa có</span>
          )}
        </div>
      ),
    },
    {
      key: "currentTreatment",
      label: "Điều trị hiện tại",
      render: (patient: Patient) => {
        if (!patient.currentTreatment) {
          return <span className="text-muted-foreground">Không có</span>
        }
        return (
          <div>
            <p className="font-medium">{patient.currentTreatment.protocol.title}</p>
            <AppointmentStatusBadge status={patient.currentTreatment.status} />
            <p className="text-xs text-gray-600 mt-1">
              Bắt đầu: {new Date(patient.currentTreatment.startDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
        )
      },
    },
    {
      key: "lastSchedule",
      label: "Lịch hẹn gần nhất",
      render: (patient: Patient) => {
        if (!patient.lastSchedule) {
          return <span className="text-muted-foreground">Chưa có</span>
        }
        return (
          <div>
            <p className="text-sm">
              {new Date(patient.lastSchedule.appointmentDatetime).toLocaleDateString("vi-VN")}
            </p>
            <AppointmentStatusBadge status={patient.lastSchedule.status} />
          </div>
        )
      },
    },
    {
      key: "totalTreatments",
      label: "Tổng số điều trị",
      render: (patient: Patient) => <Badge variant="secondary">{patient.totalTreatments}</Badge>,
    },
    {
      key: "actions",
      label: "Thao tác",
      render: (patient: Patient) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewPatient(patient.user.id)}
          className="flex items-center gap-1"
        >
          <Eye className="h-3 w-3" />
          Xem
        </Button>
      ),
    },
  ]

  return (
    <DoctorLayout title="Danh sách bệnh nhân" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Patients Table */}
        <DataTable
          data={filteredPatients}
          columns={columns}
          loading={loading}
          emptyMessage="Không tìm thấy bệnh nhân nào"
          emptyIcon={Users}
        />
      </div>
    </DoctorLayout>
  )
}
