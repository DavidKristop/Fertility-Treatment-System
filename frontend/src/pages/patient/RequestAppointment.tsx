"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PatientLayout from "@/components/patient/PatientLayout"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Mock data
const mockDoctors = {
  success: true,
  data: [
    { id: 1, name: "Bs. Nguyễn Văn An" },
    { id: 2, name: "Bs. Trần Thị Bình" },
    { id: 3, name: "Bs. Lê Văn Cường" },
    { id: 4, name: "Bs. Phạm Thị Dung" },
    { id: 5, name: "Bs. Hoàng Minh Đức" },
    { id: 6, name: "Bs. Vũ Thị Hà" },
    { id: 7, name: "Bs. Đỗ Minh Tuấn" },
  ],
};

const mockAvailableSlots: { [key: string]: { success: boolean; data: { Morning: string[]; Afternoon: string[]; Evening: string[] }; highlightedDates: number[] } } = {
  "2025-06": {
    success: true,
    data: {
      Morning: ["08:00", "09:00", "10:00", "11:00"],
      Afternoon: ["13:00", "14:00", "15:00", "16:00"],
      Evening: ["18:00", "19:00"],
    },
    highlightedDates: [24, 25, 26, 27, 28, 29, 30],
  },
  "2025-07": {
    success: true,
    data: {
      Morning: ["08:30", "09:30", "10:30"],
      Afternoon: ["14:00", "15:00", "16:30"],
      Evening: ["19:00", "20:00"],
    },
    highlightedDates: [1, 3, 5, 7, 10, 12, 15, 18, 20, 22, 25, 27],
  },
  "2025-08": {
    success: true,
    data: {
      Morning: ["08:00", "09:00", "10:00", "11:00"],
      Afternoon: ["13:00", "14:00", "15:00"],
      Evening: ["18:00", "19:00", "20:00"],
    },
    highlightedDates: [1, 3, 5, 7, 10, 12, 15, 18, 20, 25],
  },
  "2025-09": {
    success: true,
    data: {
      Morning: ["08:30", "09:30"],
      Afternoon: ["14:30", "15:30", "16:00"],
      Evening: ["19:30"],
    },
    highlightedDates: [2, 4, 6, 8, 11, 13, 16, 19, 22, 27],
  },
};

const mockErrorResponse = {
  success: false,
  message: "Đã xảy ra lỗi khi tải dữ liệu",
};

// Mock response cho gửi lịch hẹn
const mockSubmitAppointmentResponse = {
  success: true,
  message: "Lịch hẹn đã được đặt thành công",
};

export default function RequestAppointment() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({
    Morning: [],
    Afternoon: [],
    Evening: [],
  })
  const [highlightedDates, setHighlightedDates] = useState<number[]>([])
  const [doctors, setDoctors] = useState<{ id: number; name: string }[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [submitStatus, setSubmitStatus] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-08-01T00:00:00+07:00"))
  const navigate = useNavigate()

  const calendarDays = Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }, (_, i) => i + 1)
  const currentDate = new Date("2025-06-24T19:57:00+07:00") // Updated to current time

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(date.toISOString().split("T")[0])
    fetchAvailableSlots(date)
  }

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true)
    setError(null)
    try {
      const monthKey = date.toISOString().slice(0, 7) // Lấy YYYY-MM
      const data = mockAvailableSlots[monthKey]
      if (!data || !data.success) {
        throw new Error(mockErrorResponse.message)
      }
      setTimeSlots(data.data || { Morning: [], Afternoon: [], Evening: [] })
      setHighlightedDates(data.highlightedDates || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu")
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async () => {
    try {
      const data = mockDoctors
      if (!data.success) {
        throw new Error("Failed to fetch doctors")
      }
      setDoctors(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách bác sĩ")
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) {
      setSubmitStatus("Vui lòng chọn đầy đủ ngày, giờ và bác sĩ")
      return
    }

    setLoading(true)
    setSubmitStatus(null)
    try {
      // Mock logic cho gửi lịch hẹn
      const appointmentData = {
        date: selectedDate,
        time: selectedTime,
        doctor: selectedDoctor,
      }
      // Giả lập API response
      const response = mockSubmitAppointmentResponse
      if (!response.success) {
        throw new Error(response.message || "Đã xảy ra lỗi khi đặt lịch")
      }
      setSubmitStatus(response.message)
      // Reset form sau khi đặt thành công
      setSelectedDate(null)
      setSelectedTime(null)
      setSelectedDoctor(null)
      setTimeSlots({ Morning: [], Afternoon: [], Evening: [] })
    } catch (err) {
      setSubmitStatus(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đặt lịch")
    } finally {
      setLoading(false)
    }
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleBack = () => {
    navigate("/patient/dashboard")
  }

  useEffect(() => {
    fetchDoctors()
    if (selectedDate) {
      const date = new Date(selectedDate)
      fetchAvailableSlots(date)
    } else {
      fetchAvailableSlots(currentMonth)
    }
  }, [currentMonth, selectedDate])

  const breadcrumbs = [
    { label: "Trang chủ", path: "/patient/dashboard" },
    { label: "Lịch hẹn" },
    { label: "Lên lịch khám" },
  ]

  return (
    <PatientLayout title="Lên lịch khám" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Thời gian và ngày nào phù hợp với bạn?</h1>

        <div className="flex justify-center gap-8">
          {/* Calendar */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justifyLeyf-between mb-2 items-center">
              <Button variant="ghost" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>{currentMonth.toLocaleString("vi-VN", { month: "long", year: "numeric" })}</span>
              <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                <div key={day} className="font-bold text-sm">
                  {day}
                </div>
              ))}
              {calendarDays.map((day) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                const isHighlighted = highlightedDates.includes(day)
                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 rounded-full ${selectedDate === date.toISOString().split("T")[0] ? "bg-blue-500 text-white" : isHighlighted ? "bg-yellow-200" : "hover:bg-gray-100"}`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time Slotsimaland Doctor Selection */}
          <div className="bg-white p-4 rounded-lg shadow w-64">
            {loading ? (
              <p className="text-center">Đang tải...</p>
            ) : error ? (
              <p className="text-center text-red-600">{error}</p>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">Chọn bác sĩ</h3>
                  <Select onValueChange={setSelectedDoctor} value={selectedDoctor || undefined}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn bác sĩ" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.name}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Buổi sáng</h3>
                  <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="space-y-2 mt-2">
                    {timeSlots.Morning.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <RadioGroupItem value={time} id={time} />
                        <Label htmlFor={time}>{time}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Buổi chiều</h3>
                  <p>{timeSlots.Afternoon.length ? timeSlots.Afternoon.join(", ") : "Không có khung giờ nào khả dụng"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Buổi tối</h3>
                  <p>{timeSlots.Evening.length ? timeSlots.Evening.join(", ") : "Không có khung giờ nào khả dụng"}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Tất cả các khung giờ đều theo giờ MST</p>
              </>
            )}
          </div>
        </div>

        {/* Thông báo trạng thái gửi lịch */}
        {submitStatus && (
          <div className={`text-center mt-4 ${submitStatus.includes("thành công") ? "text-green-600" : "text-red-600"}`}>
            {submitStatus}
          </div>
        )}

        <div className="text-center mt-6 text-gray-600">
          Nếu bạn không thấy khung giờ nào phù hợp với lịch trình của mình, hoặc muốn đặt lịch
          khám trực tiếp, vui lòng gọi cho chúng tôi qua số 855-643-2430.
        </div>

        <div className="mt-6 text-center space-x-4">
          <Button variant="outline" className="px-6 py-2" onClick={handleBack}>
            Quay lại
          </Button>
          <Button
            className="px-6 py-2"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || !selectedDoctor || loading}
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </PatientLayout>
  )
}