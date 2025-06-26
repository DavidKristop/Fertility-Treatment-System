import type React from "react"
import { Link } from "react-router-dom"
import { Eye, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Patient {
  id: number
  name: string
  age: number
  gender: string
  phone?: string
  email?: string
  address?: string
  treatmentPlan?: string
  status?: string
  lastVisit?: string
  nextAppointment?: string | null
}

type PatientTableProps = {
  patients: Patient[]
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

const PatientTable: React.FC<PatientTableProps> = ({ patients, getStatusColor, getStatusText }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left border-b">
              Họ và tên
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left border-b">
              Tuổi
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left border-b">
              Giới tính
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left border-b">
              Kế hoạch điều trị
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-left border-b">
              Trạng thái
            </th>
            <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right border-b">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{patient.age}</div>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{patient.gender}</div>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                <div className="text-sm text-gray-700">{patient.treatmentPlan || "-"}</div>
              </td>
              <td className="py-3 px-4 whitespace-nowrap">
                {patient.status && (
                  <Badge className={`${getStatusColor(patient.status)} font-normal`}>
                    {getStatusText(patient.status)}
                  </Badge>
                )}
              </td>
              <td className="py-3 px-4 whitespace-nowrap text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <Link to={`/doctor/patients/${patient.id}`}>
                      <span className="sr-only">View</span>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                    <Link to={`/doctor/patients/${patient.id}/edit`}>
                      <span className="sr-only">Edit</span>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PatientTable
