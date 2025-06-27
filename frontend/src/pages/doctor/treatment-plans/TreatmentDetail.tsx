"use client"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, User, CalendarIcon, X } from "lucide-react"
import { format, isWeekend, isBefore, startOfDay } from "date-fns"
import { vi } from "date-fns/locale"

interface Treatment {
  id: string
  patientName: string
  patientEmail: string
  patientAge: number
  protocolTitle: string
  diagnosis: string
  status: string
  startDate: string
  currentPhase: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  unit: string
}

interface Drug {
  id: string
  name: string
  description: string
  price: number
  unit: string
}

interface Schedule {
  id: string
  date: string
  time: string
  services: Service[]
  status: string
}

// Mock data based on the treatment ID
const getTreatmentById = (id: string): Treatment | null => {
  const treatments: { [key: string]: Treatment } = {
    "1": {
      id: "1",
      patientName: "Nguyễn Thị Lan",
      patientEmail: "lan.nguyen@email.com",
      patientAge: 32,
      protocolTitle: "IVF Protocol Standard",
      diagnosis: "Vô sinh nguyên phát",
      status: "In Progress",
      startDate: "2024-01-15",
      currentPhase: "Kích thích buồng trứng",
    },
    "2": {
      id: "2",
      patientName: "Trần Văn Minh",
      patientEmail: "minh.tran@email.com",
      patientAge: 35,
      protocolTitle: "IUI Protocol Basic",
      diagnosis: "Vô sinh thứ phát",
      status: "Complete",
      startDate: "2023-12-01",
      currentPhase: "Hoàn thành",
    },
    "3": {
      id: "3",
      patientName: "Lê Thị Hoa",
      patientEmail: "hoa.le@email.com",
      patientAge: 28,
      protocolTitle: "IVF Protocol Advanced",
      diagnosis: "Vô sinh do tuổi cao",
      status: "In Progress",
      startDate: "2024-02-01",
      currentPhase: "Chuẩn bị nội mạc tử cung",
    },
  }
  return treatments[id] || null
}

const mockServices: Service[] = [
  { id: "1", name: "ULTRA sound", description: "Siêu âm theo dõi nang trứng", price: 200000, unit: "lần" },
  { id: "2", name: "Insemination", description: "Thụ tinh nhân tạo", price: 500000, unit: "lần" },
  { id: "3", name: "Blood test", description: "Xét nghiệm máu", price: 300000, unit: "lần" },
  { id: "4", name: "Consultation", description: "Tư vấn chuyên khoa", price: 150000, unit: "lần" },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

export default function TreatmentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [treatment, setTreatment] = useState<Treatment | null>(id ? getTreatmentById(id) : null)
  const [scheduleType, setScheduleType] = useState<"service" | "drug">("service")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      date: "2024-06-28",
      time: "09:00 - 10:00",
      services: [mockServices[0]],
      status: "scheduled",
    },
    {
      id: "2",
      date: "2024-06-30",
      time: "14:00 - 15:00",
      services: [mockServices[1]],
      status: "scheduled",
    },
  ])
  const [fromTime, setFromTime] = useState("")
  const [toTime, setToTime] = useState("")
  const [error, setError] = useState("")

  const today = startOfDay(new Date())

  const isDateDisabled = (date: Date) => {
    if (scheduleType === "service") {
      return isWeekend(date) || isBefore(date, today)
    }
    return isBefore(date, today)
  }

  const getUnassignedServices = () => {
    const assignedServiceIds = schedules.flatMap((schedule) => schedule.services.map((s) => s.id))
    return mockServices.filter((service) => !assignedServiceIds.includes(service.id))
  }

  const getSchedulesForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return schedules.filter((schedule) => schedule.date === dateStr)
  }

  const handleServiceClick = (service: Service) => {
    setSelectedServices((prev) => {
      const isSelected = prev.some((s) => s.id === service.id)
      if (isSelected) {
        return prev.filter((s) => s.id !== service.id)
      } else {
        return [...prev, service]
      }
    })
  }

  const handleAddSchedule = () => {
    if (!selectedDate || !fromTime || !toTime || selectedServices.length === 0) {
      setError("Vui lòng chọn đầy đủ ngày, giờ và dịch vụ")
      return
    }

    if (fromTime >= toTime) {
      setError("Giờ kết thúc phải sau giờ bắt đầu")
      return
    }

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      date: format(selectedDate, "yyyy-MM-dd"),
      time: `${fromTime} - ${toTime}`,
      services: selectedServices,
      status: "scheduled",
    }

    setSchedules((prev) => [...prev, newSchedule])
    setSelectedServices([])
    setFromTime("")
    setToTime("")
    setError("")
  }

  const handleRemoveSchedule = (scheduleId: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== scheduleId))
  }

  if (!treatment) {
    return (
      <DoctorLayout
        title="Chi tiết điều trị"
        breadcrumbs={[
          { label: "Dashboard", path: "/doctor/dashboard" },
          { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
          { label: "Chi tiết điều trị" },
        ]}
      >
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Không tìm thấy kế hoạch điều trị</h2>
          <Button onClick={() => navigate("/doctor/treatment-plans")}>Quay lại danh sách</Button>
        </div>
      </DoctorLayout>
    )
  }

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Chi tiết điều trị" },
  ]

  return (
    <DoctorLayout title="Treatment detail" breadcrumbs={breadcrumbs}>
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/doctor/treatment-plans")} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Treatment detail</h1>
            </div>
          </div>

          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin bệnh nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Bệnh nhân</Label>
                  <p className="font-medium">{treatment.patientName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Tuổi</Label>
                  <p className="font-medium">{treatment.patientAge} tuổi</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Email</Label>
                  <p className="font-medium">{treatment.patientEmail}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Ngày bắt đầu</Label>
                  <p className="font-medium">{new Date(treatment.startDate).toLocaleDateString("vi-VN")}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm text-gray-600">Chẩn đoán</Label>
                  <p className="font-medium">{treatment.diagnosis}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Lịch điều trị
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  locale={vi}
                  className="rounded-md"
                />
                {scheduleType === "service" && (
                  <p className="text-sm text-gray-500 mt-2">
                    * Để cài date picker của Nhật Anh ở đây. Nếu là chọn filter service, cái date picker chỉ đc chọn
                    t2-t6, thứ 7 và cn để mờ đi và các ngày trc hôm nay để mờ luôn. Tg thi có limit từ 8 giờ sáng tới 6
                    giờ chiều.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          {/* Service/Drug Selector */}
          <Card>
            <CardContent className="p-4">
              <Select value={scheduleType} onValueChange={(value: "service" | "drug") => setScheduleType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service/drug</SelectItem>
                  <SelectItem value="drug">Drug only</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Current Phase */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Label className="text-sm text-gray-600">Current phase:</Label>
                <div className="mt-2">
                  <Badge className="bg-blue-100 text-blue-800 px-4 py-2">{treatment.currentPhase}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedules.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    List of schedule that day, and a button to cancel that schedule
                  </p>
                ) : (
                  schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{new Date(schedule.date).toLocaleDateString("vi-VN")}</p>
                        <p className="text-xs text-gray-600">{schedule.time}</p>
                        <p className="text-xs text-gray-600">{schedule.services.map((s) => s.name).join(", ")}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveSchedule(schedule.id)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Service with no schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {getUnassignedServices().map((service) => (
                    <Button
                      key={service.id}
                      variant={selectedServices.some((s) => s.id === service.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleServiceClick(service)}
                      className="text-xs"
                    >
                      {service.name}
                    </Button>
                  ))}
                </div>

                {/* Time Selection */}
                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-sm">From</Label>
                      <Select value={fromTime} onValueChange={setFromTime}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Time picker here" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">To</Label>
                      <Select value={toTime} onValueChange={setToTime}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Time picker here" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {error && <p className="text-red-600 text-xs">Error when choosing a day that is overlapping</p>}

                  <Button onClick={handleAddSchedule} className="w-full" size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  )
}
