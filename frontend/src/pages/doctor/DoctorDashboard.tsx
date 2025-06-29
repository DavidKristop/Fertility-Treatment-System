"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, User, Phone } from "lucide-react"
import { getTodaySchedules, type Schedule } from "@/api/schedule"
import Calendar from "@/components/doctor/appointments/Calendar" // Import Calendar component

// Mock user data for testing
const mockDoctorData = {
  id: "doc123",
  fullName: "Doctor name",
  email: "doctor@example.com",
  roles: ["ROLE_DOCTOR"],
  specialty: "Sản phụ khoa",
  licenseNumber: "MD12345",
}

// Function to set mock data in localStorage
const setMockUserData = () => {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", JSON.stringify(mockDoctorData))
  }
}

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("Doctor name")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedView, setSelectedView] = useState<"list" | "calendar">("list")
  const navigate = useNavigate()

  useEffect(() => {
    setMockUserData()
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

    // Fetch today's schedules
    const fetchSchedules = async () => {
      try {
        setLoading(true)
        const schedules = await getTodaySchedules()
        setTodaySchedules(schedules)
      } catch (error) {
        console.error("Error fetching schedules:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedules()
  }, [])

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/doctor/schedule-result/${scheduleId}`)
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
        return "Completed"
      case "Pending":
        return "Pending"
      case "Changed":
        return "Changed"
      case "Cancel":
        return "Cancelled"
      default:
        return status
    }
  }

  const breadcrumbs = [{ label: "Overview" }]

  return (
    <DoctorLayout title={`Welcome back, ${doctorName}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Today's Schedules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Today schedules
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant={selectedView === "list" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedView("list")}
                >
                  Xem Danh Sách
                </Button>
                <Button 
                  variant={selectedView === "calendar" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedView("calendar")}
                >
                  Xem Lịch
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading schedules...</div>
              </div>
            ) : selectedView === "list" ? (
              <div className="space-y-4">
                {todaySchedules.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">No schedules for today</div>
                ) : (
                  todaySchedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleScheduleClick(schedule.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-blue-600 font-medium">
                          <Clock className="h-4 w-4" />
                          {new Date(schedule.appointment_datetime).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <div className="font-medium">{schedule.patient?.name}</div>
                            <div className="text-sm text-gray-500">{schedule.reason}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{schedule.patient?.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}
                        >
                          {getStatusText(schedule.status)}
                        </span>
                        <span className="text-sm text-gray-500">{schedule.duration} min</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <Calendar
                appointments={todaySchedules}
                onAppointmentClick={handleScheduleClick}
                currentDate={currentDate}
                onChangeDate={setCurrentDate}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}