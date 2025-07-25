"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CalendarDays, Calendar, Clock } from "lucide-react"
import { getTodaySchedules, type Schedule } from "@/api/schedule"
import AppointmentCard from "@/components/doctor/common/AppointmentCard"
import FormSection from "@/components/doctor/common/FormSection"
import { me } from "@/api/auth"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

export default function DoctorDashboard() {
  const [doctorName, setDoctorName] = useState<string>("")
  const [todaySchedules, setTodaySchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const handleScheduleClick = (scheduleId: string) => {
    navigate(`/doctor/schedule-result/${scheduleId}`)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const user = await me()             // Call the me() API function
        setDoctorName(user.fullName)        // Set doctor name from user.fullName
      } catch {
        navigate('/authorization/login', { replace: true })
      }
    })()
  }, [navigate])

  useEffect(() => {
    setTitle("Trang tổng quan")
    setBreadCrumbs([
      { label: "Trang tổng quan" },
    ])

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

  // Loading state while fetching doctor info
  if (!doctorName) {
    return (
      <div>Đang tải thông tin bác sĩ…</div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Xin chào, {doctorName}</h1>
      </div>

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
  )
}