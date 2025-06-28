import { useState, useEffect } from "react"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import AppointmentCard from "@/components/doctor/dashboard/AppointmentCard"

const todayAppointments = [
  {
    id: 1,
    time: "08:00",
    patient: "Nguyễn Thị Lan",
    type: "Tái khám",
    status: "completed",
    phone: "0901234567",
  },
  {
    id: 2,
    time: "09:30",
    patient: "Trần Văn Nam",
    type: "Khám đầu tiên",
    status: "completed",
    phone: "0912345678",
  },
  {
    id: 3,
    time: "10:15",
    patient: "Lê Thị Hoa",
    type: "Theo dõi điều trị",
    status: "in-progress",
    phone: "0923456789",
  },
  {
    id: 4,
    time: "11:00",
    patient: "Phạm Minh Tuấn",
    type: "Tư vấn",
    status: "pending",
    phone: "0934567890",
  },
  {
    id: 5,
    time: "14:00",
    patient: "Võ Thị Mai",
    type: "Khám đầu tiên",
    status: "pending",
    phone: "0945678901",
  },
]

// Mock user data for testing
const mockDoctorData = {
  id: "doc123",
  fullName: "Bác sĩ Nguyễn Văn A",
  email: "doctor@example.com",
  roles: ["ROLE_DOCTOR"],
  specialty: "Sản phụ khoa",
  licenseNumber: "MD12345"
};

// Function to set mock data in localStorage
const setMockUserData = () => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(mockDoctorData));
    console.log("Mock doctor data set in localStorage");
  }
};

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("Bác sĩ")

  useEffect(() => {
    // Set mock user data for testing
    setMockUserData();
    // Get user data from localStorage
    const userDataString = localStorage.getItem("user")
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString)
        if (userData.fullName) {
          setDoctorName(userData.fullName)
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAppointmentStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang khám"
      case "pending":
        return "Chờ khám"
      default:
        return status
    }
  }

  const breadcrumbs = [{ label: "Trang chủ" }]

  return (
    <DoctorLayout title={`Xin chào, ${doctorName}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lịch khám hôm nay</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  getStatusColor={getAppointmentStatusColor}
                  getStatusText={getAppointmentStatusText}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
