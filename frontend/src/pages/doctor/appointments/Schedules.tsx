"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"
import { getSchedules, type Schedule } from "@/api/schedule"
import Calendar from "@/components/doctor/appointments/Calendar" // Import Calendar component

export default function Schedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true)
        const data = await getSchedules()
        setSchedules(data)
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

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Lịch hẹn" },
  ]

  return (
    <DoctorLayout title="Lịch hẹn" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Lịch hẹn
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Đang tải lịch hẹn...</div>
              </div>
            ) : (
              <Calendar
                appointments={schedules}
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