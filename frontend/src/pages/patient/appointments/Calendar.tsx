import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, CalendarIcon, Plus, MapPin } from "lucide-react"
import { useState } from "react"

// Mock data cho appointments - chỉ khám trực tiếp
const appointments = [
  {
    id: 1,
    date: "2024-01-15",
    time: "09:00",
    duration: 30,
    patient: "Nguyễn Thị Lan",
    reason: "Tái khám IVF - Giai đoạn 2",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "10:30",
    duration: 20,
    patient: "Trần Văn Nam",
    reason: "Tư vấn kết quả xét nghiệm",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-01-16",
    time: "14:00",
    duration: 45,
    patient: "Lê Thị Hoa",
    reason: "Khám đầu - Tư vấn IUI",
    status: "confirmed",
  },
  {
    id: 4,
    date: "2024-01-17",
    time: "15:30",
    duration: 30,
    patient: "Phạm Minh Tuấn",
    reason: "Theo dõi sau chuyển phôi",
    status: "confirmed",
  },
  {
    id: 5,
    date: "2024-01-18",
    time: "09:30",
    duration: 30,
    patient: "Võ Thị Mai",
    reason: "Tư vấn kế hoạch điều trị",
    status: "confirmed",
  },
  {
    id: 6,
    date: "2024-01-19",
    time: "11:00",
    duration: 60,
    patient: "Hoàng Văn Đức",
    reason: "Khám tổng quát và tư vấn",
    status: "pending",
  },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week">("month")

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Cuộc hẹn" }, { label: "Xem lịch" }]

  // Helper functions
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => {
      return apt.date === dateString
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else {
      newDate.setDate(newDate.getDate() + 7)
    }
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = () => {
    return <MapPin className="h-3 w-3 text-green-600" />
  }

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate)
    const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

    return (
      <div className="bg-white rounded-lg border">
        {/* Header with weekdays */}
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day) => (
            <div key={day} className="p-3 text-center font-medium text-gray-500 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b last:border-r-0 p-2 ${day ? "bg-white" : "bg-gray-50"}`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-2 ${isToday(day) ? "text-blue-600" : "text-gray-900"}`}>
                    {day.getDate()}
                    {isToday(day) && <span className="ml-1 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>}
                  </div>
                  <div className="space-y-1">
                    {getAppointmentsForDate(day)
                      .slice(0, 3)
                      .map((apt) => (
                        <div
                          key={apt.id}
                          className={`text-xs p-1 rounded border cursor-pointer hover:shadow-sm ${getStatusColor(apt.status)}`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            {getTypeIcon()}
                            <span className="font-medium">{apt.time}</span>
                          </div>
                          <div className="truncate">{apt.patient}</div>
                        </div>
                      ))}
                    {getAppointmentsForDate(day).length > 3 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{getAppointmentsForDate(day).length - 3} khác
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate)
    const weekDayNames = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]

    return (
      <div className="bg-white rounded-lg border">
        {/* Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 border-r font-medium text-gray-500">Thời gian</div>
          {weekDays.map((day, index) => (
            <div key={index} className="p-4 text-center border-r last:border-r-0">
              <div className="font-medium text-gray-900">{weekDayNames[day.getDay()]}</div>
              <div className={`text-sm ${isToday(day) ? "text-blue-600 font-bold" : "text-gray-500"}`}>
                {day.getDate()}/{day.getMonth() + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="max-h-[600px] overflow-y-auto">
          {Array.from({ length: 12 }, (_, i) => {
            const hour = i + 8 // Start from 8 AM
            return (
              <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
                <div className="p-2 border-r text-sm text-gray-500 font-medium">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="p-1 border-r last:border-r-0 relative">
                    {getAppointmentsForDate(day)
                      .filter((apt) => {
                        const aptHour = Number.parseInt(apt.time.split(":")[0])
                        return aptHour === hour
                      })
                      .map((apt) => (
                        <div
                          key={apt.id}
                          className={`text-xs p-2 rounded border cursor-pointer hover:shadow-sm ${getStatusColor(apt.status)}`}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            {getTypeIcon()}
                            <span className="font-medium">{apt.time}</span>
                          </div>
                          <div className="font-medium truncate">{apt.patient}</div>
                          <div className="text-xs opacity-75 truncate">{apt.reason}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <DoctorLayout title="Lịch làm việc" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => (viewMode === "month" ? navigateMonth("prev") : navigateWeek("prev"))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="min-w-[200px] text-center">
                <h2 className="text-lg font-semibold">
                  {viewMode === "month"
                    ? getMonthName(currentDate)
                    : `Tuần ${Math.ceil(currentDate.getDate() / 7)} - ${getMonthName(currentDate)}`}
                </h2>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => (viewMode === "month" ? navigateMonth("next") : navigateWeek("next"))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Today button */}
            <Button variant="outline" onClick={() => setCurrentDate(new Date())} className="hidden sm:flex">
              Hôm nay
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* View mode toggle */}
            <Select value={viewMode} onValueChange={(value: "month" | "week") => setViewMode(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Tháng</SelectItem>
                <SelectItem value="week">Tuần</SelectItem>
              </SelectContent>
            </Select>

            {/* Add appointment */}
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tạo cuộc hẹn
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Lịch làm việc - {viewMode === "month" ? "Xem theo tháng" : "Xem theo tuần"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">{viewMode === "month" ? renderMonthView() : renderWeekView()}</CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Chú thích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Đã xác nhận</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span className="text-sm">Chờ xác nhận</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                <span className="text-sm">Đã hủy</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">Tại phòng</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
