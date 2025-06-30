"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { CalendarDays, Calendar, Clock } from "lucide-react"
import { getTodaySchedules, type Schedule } from "@/api/schedule"
import { getDoctorProfile } from "@/api/doctor"
import AppointmentCard from "@/components/doctor/common/AppointmentCard"
import FormSection from "@/components/doctor/common/FormSection"

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState("Bác sĩ")
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch doctor profile immediately after successful login
    const fetchDoctorProfile = async () => {
      try {
        setProfileLoading(true)
        const profile = await getDoctorProfile()

        // Check if profile exists and has username or fullName
        if (profile) {
          // Try to get username from different possible fields based on API response
          const name = profile.fullName || profile.email?.split("@")[0] || "Bác sĩ"

          if (name) {
            setDoctorName(name)
            // Store in localStorage as fallback for future sessions
            const userData = { fullName: name }
            localStorage.setItem("user", JSON.stringify(userData))
          }
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error)

        // Fallback to localStorage if API fails
        const userDataString = localStorage.getItem("user")
        if (userDataString) {
          try {
            const userData = JSON.parse(userDataString)
            if (userData.fullName) {
              setDoctorName(userData.fullName)
            }
          } catch (parseError) {
            console.error("Error parsing user data:", parseError)
          }
        }

        // If all else fails, try to get name from token payload or use default
        const token = localStorage.getItem("token")
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]))
            if (payload.fullName) {
              setDoctorName(payload.fullName)
            } else if (payload.email) {
              setDoctorName(payload.email.split("@")[0])
            }
          } catch (tokenError) {
            console.error("Error parsing token:", tokenError)
            // Keep default "Bác sĩ" name
          }
        }
      } finally {
        setProfileLoading(false)
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
        // Set empty array on error to avoid showing loading state indefinitely
        setTodaySchedules([])
      } finally {
        setLoading(false)
      }
    }

    fetchDoctorProfile()
    fetchSchedules()
  }, [])

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/doctor/schedule-result/${scheduleId}`)
  }

  // Transform schedule data for AppointmentCard
  const appointmentCards = todaySchedules.map((schedule) => ({
    id: schedule.id,
    time: new Date(schedule.appointment_datetime).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    patient: {
      name: schedule.patient?.name || "Bệnh nhân",
      phone: schedule.patient?.phone || "",
    },
    reason: schedule.reason,
    status: schedule.status,
    duration: schedule.duration,
  }))

  const breadcrumbs = [{ label: "Trang chủ" }]

  return (
    <DoctorLayout title={profileLoading ? "Đang tải..." : `Xin chào, ${doctorName}`} breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Today's Schedules */}
        <FormSection
          title="Lịch hẹn hôm nay"
          icon={Calendar}
          actions={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/doctor/schedule")}
              className="flex items-center gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Xem lịch đầy đủ
            </Button>
          }
        >
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Đang tải lịch hẹn...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {appointmentCards.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Không có lịch hẹn hôm nay</p>
                </div>
              ) : (
                appointmentCards.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} onClick={handleScheduleClick} />
                ))
              )}
            </div>
          )}
        </FormSection>
      </div>
    </DoctorLayout>
  )
}
