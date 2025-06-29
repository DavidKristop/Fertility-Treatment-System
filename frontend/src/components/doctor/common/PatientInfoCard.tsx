import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Phone, Mail, MapPin, Calendar, Heart } from "lucide-react"

interface PatientInfo {
  id: string
  name: string
  phone: string
  email: string
  address?: string
  dateOfBirth?: string
  age?: number
}

interface PatientInfoCardProps {
  patient: PatientInfo
  showMedicalHistory?: boolean
  medicalHistory?: string
  className?: string
  actions?: React.ReactNode
}

export default function PatientInfoCard({
  patient,
  showMedicalHistory = false,
  medicalHistory,
  className = "",
  actions,
}: PatientInfoCardProps) {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const displayAge = patient.age || (patient.dateOfBirth ? calculateAge(patient.dateOfBirth) : null)

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold">{patient.name}</h1>
                {displayAge && <p className="text-muted-foreground">{displayAge} tuổi</p>}
              </div>
              {actions}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{patient.email}</span>
              </div>
              {patient.dateOfBirth && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.dateOfBirth}</span>
                </div>
              )}
              {patient.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{patient.address}</span>
                </div>
              )}
            </div>
            {showMedicalHistory && medicalHistory && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-semibold text-sm">Tiền sử bệnh</span>
                </div>
                <p className="text-sm leading-relaxed">{medicalHistory}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
