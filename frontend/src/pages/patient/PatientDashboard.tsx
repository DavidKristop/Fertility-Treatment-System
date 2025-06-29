import PatientLayout from "@/components/patient/PatientLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, MapPin} from "lucide-react"
import { useState } from "react"
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from "@radix-ui/react-select"
import { Link } from "react-router-dom"


// Mock data
const patientName = "Nguyễn Thị Lan"
const hasActiveTreatment = true
const treatmentProgress = {
  currentStage: "Giai đoạn 2: Kích thích buồng trứng",
  completed: 2,
  total: 5,
  phases: [
    { name: "Khám sơ bộ", status: "completed" },
    { name: "Kích thích buồng trứng", status: "current" },
    { name: "Thu thập trứng", status: "pending" },
    { name: "Thụ tinh", status: "pending" },
    { name: "Chuyển phôi", status: "pending" },
  ],
}

// Mock data cho appointments - chỉ khám trực tiếp
const appointments = [
  {
    id: 1,
    date: "2025-05-31",
    time: "09:00",
    duration: 30,
    patient: "Đơn thuốc ABC",
    reason: "Tái khám IVF - Giai đoạn 2",
    status: "drug",
  },
  {
    id: 2,
    date: "2025-06-01",
    time: "10:30",
    duration: 20,
    patient: "BS. Trần Văn Nam",
    reason: "Tư vấn kết quả xét nghiệm",
    status: "appointment",
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

export default function PatientDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const getPhaseStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
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

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return appointments.filter((apt) => {
      return apt.date === dateString
    })
  }

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "drug":
        return "bg-green-100 text-green-800 border-green-200"
      case "appointment":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = () => {
    return <MapPin className="h-3 w-3 text-green-600" />
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


  return (
    <PatientLayout title="Trang tổng quan" breadcrumbs={[{ label: "Trang tổng quan" }]}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Chào bệnh nhân {patientName}</h1>
        </div>

        {/* Treatments */}
        <Card className="p-6">
            <CardContent className="p-0">
              {hasActiveTreatment ? (
                <div className="text-center">
                  <h2 className="text-lg font-medium mb-4">Điều trị hiện tại của bạn và các giai đoạn</h2>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Tiến độ điều trị</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {treatmentProgress.phases.map((phase, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getPhaseStatus(phase.status)}`} />
                          {index < treatmentProgress.phases.length - 1 && (
                            <div className="w-8 h-0.5 bg-gray-300 mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-medium">{treatmentProgress.currentStage}</div>
                    <div className="text-sm text-gray-500">
                      Giai đoạn {treatmentProgress.completed}/{treatmentProgress.total}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {treatmentProgress.phases.map((phase, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          phase.status === "completed"
                            ? "bg-green-50 border-green-200"
                            : phase.status === "current"
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getPhaseStatus(phase.status)}`} />
                          <span className="font-medium">{phase.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Bạn chưa có điều trị nào đang diễn ra</p>
                  <Link to="/patient/appointments/schedule">
                    <Button className="cursor-pointer">Đặt lịch hẹn</Button>
                  </Link>
                  
                </div>
              )}
            </CardContent>
        </Card>

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
          </div>
        </div>
        
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Lịch bệnh nhân {patientName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">{renderMonthView()}</CardContent>
        </Card>
        
        {/* Prescriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Chú thích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Ngày uống thuốc</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span className="text-sm">Ngày có hẹn với bác sĩ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  )
}
