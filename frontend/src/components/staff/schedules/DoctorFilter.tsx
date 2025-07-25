import React from "react"
import type { DoctorBasic } from "@/api/doctor-management"

interface Props {
  doctors: DoctorBasic[]
  selectedDoctorId: string
  onDoctorChange: (id: string) => void
}

const DoctorFilter: React.FC<Props> = ({ doctors, selectedDoctorId, onDoctorChange }) => (
  <div className="max-w-sm">
    <label className="block font-medium text-gray-700 mb-1">Chọn bác sĩ:</label>
    <select
      value={selectedDoctorId}
      onChange={(e) => onDoctorChange(e.target.value)}
      className="border rounded px-3 py-2 w-full"
    >
      <option value="">-- Chọn bác sĩ --</option>
      {doctors.map((doc) => (
        <option key={doc.id} value={doc.id}>
          {doc.fullName}
        </option>
      ))}
    </select>
  </div>
)

export default DoctorFilter
