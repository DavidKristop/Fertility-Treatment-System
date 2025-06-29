"use client"

import { useState } from "react"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import SearchAndFilter from "@/components/doctor/common/SearchAndFilter"
import DataTable from "@/components/doctor/common/DataTable"
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge"

// Mock data
const patients = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    age: 32,
    gender: "Nữ",
    phone: "0901234567",
    email: "lan.nguyen@email.com",
    address: "Quận 1, TP.HCM",
    treatmentPlan: "IVF - Giai đoạn 2",
    status: "active",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-15",
  },
  {
    id: 2,
    name: "Trần Văn Nam",
    age: 35,
    gender: "Nam",
    phone: "0912345678",
    email: "nam.tran@email.com",
    address: "Quận 3, TP.HCM",
    treatmentPlan: "IUI - Giai đoạn 1",
    status: "active",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-01-12",
  },
  {
    id: 3,
    name: "Lê Thị Hoa",
    age: 28,
    gender: "Nữ",
    phone: "0923456789",
    email: "hoa.le@email.com",
    address: "Quận 7, TP.HCM",
    treatmentPlan: "Tư vấn ban đầu",
    status: "new",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-01-14",
  },
  {
    id: 4,
    name: "Phạm Minh Tuấn",
    age: 40,
    gender: "Nam",
    phone: "0934567890",
    email: "tuan.pham@email.com",
    address: "Quận 2, TP.HCM",
    treatmentPlan: "IVF - Hoàn thành",
    status: "completed",
    lastVisit: "2023-12-20",
    nextAppointment: null,
  },
  {
    id: 5,
    name: "Võ Thị Mai",
    age: 29,
    gender: "Nữ",
    phone: "0945678901",
    email: "mai.vo@email.com",
    address: "Quận 5, TP.HCM",
    treatmentPlan: "IUI - Tạm dừng",
    status: "paused",
    lastVisit: "2023-12-15",
    nextAppointment: null,
  },
]

export default function PatientList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "name",
      label: "Bệnh nhân",
      render: (patient: any) => (
        <div>
          <p className="font-medium">{patient.name}</p>
          <p className="text-sm text-gray-500">{patient.email}</p>
        </div>
      ),
    },
    {
      key: "age",
      label: "Tuổi",
      render: (patient: any) => `${patient.age} tuổi`,
    },
    {
      key: "gender",
      label: "Giới tính",
    },
    {
      key: "treatmentPlan",
      label: "Kế hoạch điều trị",
    },
    {
      key: "status",
      label: "Trạng thái",
      render: (patient: any) => <AppointmentStatusBadge status={patient.status} />,
    },
    {
      key: "actions",
      label: "Thao tác",
      className: "text-right",
      render: (patient: any) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm">
            Xem
          </Button>
          <Button variant="ghost" size="sm">
            Sửa
          </Button>
        </div>
      ),
    },
  ]

  const filters = [
    {
      label: "Trạng thái",
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: "all", label: "Tất cả trạng thái" },
        { value: "active", label: "Đang điều trị" },
        { value: "new", label: "Bệnh nhân mới" },
        { value: "completed", label: "Hoàn thành" },
        { value: "paused", label: "Tạm dừng" },
      ],
    },
  ]

  const actions = (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Thêm bệnh nhân
    </Button>
  )

  return (
    <DoctorLayout title="Danh sách bệnh nhân">
      <div className="space-y-6">
        <SearchAndFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Tìm kiếm bệnh nhân..."
          filters={filters}
          actions={actions}
        />

        <DataTable
          title={`Danh sách bệnh nhân (${filteredPatients.length} bệnh nhân)`}
          data={filteredPatients}
          columns={columns}
          emptyMessage="Không tìm thấy bệnh nhân nào"
          emptyIcon={Users}
        />
      </div>
    </DoctorLayout>
  )
}
