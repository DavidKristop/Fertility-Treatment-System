"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, Phone, Mail, Plus, X, ChevronLeft, ChevronRight, Clock, Pill } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWeekend,
} from "date-fns"
import { vi } from "date-fns/locale"

interface TreatmentPlan {
  id: string
  patient_id: string
  patient_name: string
  patient_email: string
  protocol_id: string
  protocol_name: string
  diagnosis: string
  description: string
  start_date: string
  status: "In Progress" | "Completed" | "Paused" | "Cancelled"
  current_phase: string
  progress: number
  next_appointment?: string
  created_at: string
  updated_at: string
}

interface Schedule {
  id: string
  type: "service" | "drug"
  name: string
  serviceIds?: string[]
  date: string
  time?: string
  status: "scheduled" | "completed" | "cancelled"
}

interface DrugAssignment {
  id: string
  drugId: string
  name: string
  startDate: string
  endDate: string
  dosage: string
  instructions: string
  status: "active" | "completed" | "paused"
}

interface Service {
  id: string
  name: string
  protocols: string[]
  isAssigned: boolean
}

interface Drug {
  id: string
  name: string
  protocols: string[]
  isAssigned: boolean
}

// Mock data
const mockTreatmentPlan: TreatmentPlan = {
  id: "tp-001",
  patient_id: "p-001",
  patient_name: "Nguyễn Thị Lan",
  patient_email: "lan.nguyen@email.com",
  protocol_id: "1",
  protocol_name: "IVF Long Protocol",
  diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
  description: "Kế hoạch điều trị IVF với phác đồ dài hạn, bao gồm kích thích buồng trứng và chuyển phôi",
  start_date: "2024-01-15",
  status: "In Progress",
  current_phase: "Kích thích buồng trứng",
  progress: 45,
  next_appointment: "2024-02-10",
  created_at: "2024-01-10T08:00:00Z",
  updated_at: "2024-02-05T10:30:00Z",
}

const allServices: Service[] = [
  { id: "1", name: "Siêu âm theo dõi nang trứng", protocols: ["1", "2", "3", "4"], isAssigned: false },
  { id: "2", name: "Xét nghiệm hormone FSH, LH", protocols: ["1", "2", "3", "4"], isAssigned: false },
  { id: "3", name: "Chọc hút trứng", protocols: ["1", "2"], isAssigned: false },
  { id: "4", name: "Chuyển phôi", protocols: ["1", "2"], isAssigned: false },
  { id: "5", name: "Xét nghiệm Beta HCG", protocols: ["1", "2", "3", "4"], isAssigned: false },
  { id: "6", name: "Thụ tinh nhân tạo (IUI)", protocols: ["3", "4"], isAssigned: false },
  { id: "7", name: "Ức chế GnRH", protocols: ["1"], isAssigned: true },
  { id: "8", name: "Theo dõi chu kỳ tự nhiên", protocols: ["3"], isAssigned: false },
  { id: "9", name: "Kích thích buồng trứng nhẹ", protocols: ["4"], isAssigned: false },
  { id: "10", name: "Nuôi cấy phôi", protocols: ["1", "2"], isAssigned: false },
]

const allDrugs: Drug[] = [
  { id: "1", name: "Gonal-F 450IU", protocols: ["1", "2", "4"], isAssigned: true },
  { id: "2", name: "Puregon 300IU", protocols: ["1", "2", "4"], isAssigned: false },
  { id: "3", name: "Cetrotide 0.25mg", protocols: ["1", "2"], isAssigned: false },
  { id: "4", name: "Duphaston 10mg", protocols: ["1", "2", "3", "4"], isAssigned: false },
  { id: "5", name: "Lupron (GnRH Agonist)", protocols: ["1"], isAssigned: true },
  { id: "6", name: "Clomiphene Citrate", protocols: ["4"], isAssigned: false },
  { id: "7", name: "Letrozole", protocols: ["4"], isAssigned: false },
  { id: "8", name: "Progesterone", protocols: ["1", "2", "3", "4"], isAssigned: false },
]

const timeSlots = {
  morning: ["08:00", "09:00", "10:00", "11:00"],
  afternoon: ["13:00", "14:00", "15:00", "16:00"],
  evening: ["18:00", "19:00", "20:00"],
}

// Helper function to format date without timezone issues
const formatDateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Helper function to format date for display in dd/mm/yyyy format
const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00") // Add time to avoid timezone issues
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Helper function to convert dd/mm/yyyy to yyyy-mm-dd for input value
const convertToInputFormat = (dateString: string): string => {
  if (!dateString) return ""
  const [day, month, year] = dateString.split("/")
  return `${year}-${month}-${day}`
}

// Helper function to convert yyyy-mm-dd to dd/mm/yyyy for display
const convertFromInputFormat = (dateString: string): string => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${day}/${month}/${year}`
}

export default function TreatmentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDrug, setSelectedDrug] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [drugStartDate, setDrugStartDate] = useState("")
  const [drugEndDate, setDrugEndDate] = useState("")
  const [drugStartDateDisplay, setDrugStartDateDisplay] = useState("")
  const [drugEndDateDisplay, setDrugEndDateDisplay] = useState("")
  const [dosage, setDosage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [error, setError] = useState("")

  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [availableDrugs, setAvailableDrugs] = useState<Drug[]>([])
  const [unassignedServices, setUnassignedServices] = useState<Service[]>([])
  const [unassignedDrugs, setUnassignedDrugs] = useState<Drug[]>([])

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      type: "service",
      name: "Ức chế GnRH",
      serviceIds: ["7"],
      date: "2024-02-15",
      time: "09:00",
      status: "scheduled",
    },
    {
      id: "2",
      type: "service",
      name: "Xét nghiệm hormone FSH, LH",
      serviceIds: ["2"],
      date: "2024-02-20",
      time: "08:00",
      status: "completed",
    },
  ])

  const [drugAssignments, setDrugAssignments] = useState<DrugAssignment[]>([
    {
      id: "1",
      drugId: "1",
      name: "Gonal-F 450IU",
      startDate: "2024-02-10",
      endDate: "2024-02-25",
      dosage: "150IU/ngày",
      instructions: "Tiêm dưới da vào buổi tối, cùng giờ mỗi ngày",
      status: "active",
    },
    {
      id: "2",
      drugId: "5",
      name: "Lupron (GnRH Agonist)",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      dosage: "0.5ml/ngày",
      instructions: "Tiêm dưới da vào buổi sáng",
      status: "completed",
    },
  ])

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Chi tiết kế hoạch" },
  ]

  useEffect(() => {
    const fetchTreatmentPlan = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTreatmentPlan(mockTreatmentPlan)
      } catch (error) {
        console.error("Failed to fetch treatment plan:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTreatmentPlan()
  }, [id])

  useEffect(() => {
    if (treatmentPlan?.protocol_id) {
      const protocolId = treatmentPlan.protocol_id
      const filteredServices = allServices.filter((service) => service.protocols.includes(protocolId))
      const filteredDrugs = allDrugs.filter((drug) => drug.protocols.includes(protocolId))

      setAvailableServices(filteredServices)
      setAvailableDrugs(filteredDrugs)

      // Set unassigned items
      setUnassignedServices(filteredServices.filter((service) => !service.isAssigned))
      setUnassignedDrugs(filteredDrugs.filter((drug) => !drug.isAssigned))
    }
  }, [treatmentPlan])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleAddSchedule = () => {
    setError("")

    if (selectedServices.length === 0 || !selectedDate || !selectedTime) {
      setError("Vui lòng chọn dịch vụ, ngày và thời gian")
      return
    }

    // Create service names string
    const serviceNames = selectedServices
      .map((serviceId) => unassignedServices.find((s) => s.id === serviceId)?.name)
      .filter(Boolean)
      .join(", ")

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      type: "service",
      name: serviceNames,
      serviceIds: selectedServices,
      date: formatDateToString(selectedDate), // Use helper function to avoid timezone issues
      time: selectedTime,
      status: "scheduled",
    }

    setSchedules((prev) => [...prev, newSchedule])

    // Mark services as assigned
    setUnassignedServices((prev) => prev.filter((service) => !selectedServices.includes(service.id)))

    // Reset form
    setSelectedServices([])
    setSelectedTime("")
  }

  const handleAddDrug = () => {
    setError("")

    if (!selectedDrug || !drugStartDate || !drugEndDate || !dosage || !instructions) {
      setError("Vui lòng điền đầy đủ thông tin thuốc")
      return
    }

    if (new Date(drugStartDate) >= new Date(drugEndDate)) {
      setError("Ngày kết thúc phải sau ngày bắt đầu")
      return
    }

    const drug = unassignedDrugs.find((d) => d.id === selectedDrug)
    if (drug) {
      const newAssignment: DrugAssignment = {
        id: Date.now().toString(),
        drugId: drug.id,
        name: drug.name,
        startDate: drugStartDate,
        endDate: drugEndDate,
        dosage,
        instructions,
        status: "active",
      }
      setDrugAssignments((prev) => [...prev, newAssignment])

      // Mark drug as assigned
      setUnassignedDrugs((prev) => prev.filter((d) => d.id !== selectedDrug))
    }

    setSelectedDrug("")
    setDrugStartDate("")
    setDrugEndDate("")
    setDrugStartDateDisplay("")
    setDrugEndDateDisplay("")
    setDosage("")
    setInstructions("")
  }

  const handleCancelSchedule = (scheduleId: string) => {
    const schedule = schedules.find((s) => s.id === scheduleId)
    if (schedule && schedule.serviceIds) {
      // Return services to unassigned list
      const servicesToReturn = availableServices.filter((service) => schedule.serviceIds?.includes(service.id))
      setUnassignedServices((prev) => [...prev, ...servicesToReturn])
    }

    setSchedules((prev) => prev.map((s) => (s.id === scheduleId ? { ...s, status: "cancelled" as const } : s)))
  }

  const handleRemoveDrugAssignment = (assignmentId: string) => {
    const assignment = drugAssignments.find((a) => a.id === assignmentId)
    if (assignment) {
      // Return drug to unassigned list
      const drugToReturn = availableDrugs.find((drug) => drug.id === assignment.drugId)
      if (drugToReturn) {
        setUnassignedDrugs((prev) => [...prev, drugToReturn])
      }
    }

    setDrugAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
  }

  const handleDrugStartDateChange = (value: string) => {
    setDrugStartDate(value)
    setDrugStartDateDisplay(convertFromInputFormat(value))
  }

  const handleDrugEndDateChange = (value: string) => {
    setDrugEndDate(value)
    setDrugEndDateDisplay(convertFromInputFormat(value))
  }

  const formatDate = (dateString: string) => {
    return formatDateForDisplay(dateString)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Đã lên lịch"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      case "active":
        return "Đang sử dụng"
      case "paused":
        return "Tạm dừng"
      default:
        return status
    }
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })
    const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

    // Calculate empty cells at the beginning
    const firstDayOfWeek = monthStart.getDay()
    const emptyCells = Array.from({ length: firstDayOfWeek }, (_, i) => i)

    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-3 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-xl font-semibold text-gray-900">{format(currentMonth, "MMMM yyyy", { locale: vi })}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="h-12 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">{day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells for days before month starts */}
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="h-12"></div>
          ))}

          {/* Current month days */}
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate)
            const isDisabled = isWeekend(day) || day < new Date()
            const hasSchedule = schedules.some((schedule) => {
              const scheduleDate = new Date(schedule.date + "T00:00:00") // Add time to avoid timezone issues
              return isSameDay(scheduleDate, day) && schedule.status !== "cancelled"
            })

            return (
              <div key={day.toISOString()} className="h-12 flex items-center justify-center">
                <button
                  onClick={() => !isDisabled && setSelectedDate(day)}
                  disabled={isDisabled}
                  className={`
                    h-10 w-10 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center
                    ${
                      isSelected
                        ? "bg-blue-500 text-white shadow-lg scale-105"
                        : hasSchedule
                          ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
                          : isDisabled
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {format(day, "d")}
                </button>
              </div>
            )
          })}
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800">
              Ngày đã chọn: {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
            </p>
          </div>
        )}
      </div>
    )
  }

  const renderTimeSlots = () => {
    if (!selectedDate) return null

    return (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Buổi sáng</h4>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.morning.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-sm h-10 font-medium"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Buổi chiều</h4>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.afternoon.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-sm h-10 font-medium"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Buổi tối</h4>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.evening.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className="text-sm h-10 font-medium"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <DoctorLayout title="Chi tiết kế hoạch điều trị" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải dữ liệu...</p>
          </div>
        </div>
      </DoctorLayout>
    )
  }

  if (!treatmentPlan) {
    return (
      <DoctorLayout title="Chi tiết kế hoạch điều trị" breadcrumbs={breadcrumbs}>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kế hoạch điều trị</h3>
          <p className="text-gray-600 mb-4">Kế hoạch điều trị không tồn tại hoặc đã bị xóa</p>
          <Button onClick={() => navigate("/doctor/treatment-plans")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </DoctorLayout>
    )
  }

  return (
    <DoctorLayout title="Chi tiết kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/doctor/treatment-plans")} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{treatmentPlan.patient_name}</h1>
            <p className="text-lg text-gray-600 mt-1">Lập lịch điều trị</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Left Column - Patient Info & Calendar */}
          <div className="xl:col-span-3 space-y-8">
            {/* Patient Information */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  Thông tin bệnh nhân
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Mail className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">{treatmentPlan.patient_email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Phone className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">0901234567</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Chẩn đoán</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{treatmentPlan.diagnosis}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Giai đoạn hiện tại</h4>
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">{treatmentPlan.current_phase}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-xl font-semibold">
                  Thời gian và ngày nào phù hợp với bạn?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-8">{renderCalendar()}</CardContent>
            </Card>
          </div>

          {/* Right Column - Schedule Controls */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tabs for Services and Drugs */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Lập lịch điều trị</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="services" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="services" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Dịch vụ
                    </TabsTrigger>
                    <TabsTrigger value="drugs" className="flex items-center gap-2">
                      <Pill className="h-4 w-4" />
                      Thuốc
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="services" className="space-y-6 mt-6">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Chọn dịch vụ chưa được phân công ({unassignedServices.length} dịch vụ)
                      </Label>
                      {unassignedServices.length > 0 ? (
                        <div className="space-y-3 max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                          {unassignedServices.map((service) => (
                            <div key={service.id} className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id={service.id}
                                checked={selectedServices.includes(service.id)}
                                onChange={() => handleServiceToggle(service.id)}
                                className="rounded border-gray-300 h-4 w-4"
                              />
                              <label htmlFor={service.id} className="text-sm font-medium text-gray-700">
                                {service.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-500">Tất cả dịch vụ đã được phân công</p>
                        </div>
                      )}
                    </div>

                    {selectedDate && selectedServices.length > 0 && (
                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Chọn thời gian</Label>
                        {renderTimeSlots()}
                      </div>
                    )}

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </div>
                    )}

                    <Button
                      onClick={handleAddSchedule}
                      className="w-full h-11 font-semibold"
                      disabled={selectedServices.length === 0 || !selectedDate || !selectedTime}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo lịch hẹn ({selectedServices.length} dịch vụ)
                    </Button>
                  </TabsContent>

                  <TabsContent value="drugs" className="space-y-6 mt-6">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Chọn thuốc chưa được phân công ({unassignedDrugs.length} loại thuốc)
                      </Label>
                      {unassignedDrugs.length > 0 ? (
                        <Select value={selectedDrug} onValueChange={setSelectedDrug}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Chọn thuốc..." />
                          </SelectTrigger>
                          <SelectContent>
                            {unassignedDrugs.map((drug) => (
                              <SelectItem key={drug.id} value={drug.id}>
                                {drug.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-500">Tất cả thuốc đã được phân công</p>
                        </div>
                      )}
                    </div>

                    {selectedDrug && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="drugStartDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                              Ngày bắt đầu
                            </Label>
                            <div className="relative">
                              <Input
                                id="drugStartDate"
                                type="date"
                                value={drugStartDate}
                                onChange={(e) => handleDrugStartDateChange(e.target.value)}
                                className="h-11"
                              />
                              {drugStartDateDisplay && (
                                <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                                  <span className="text-sm text-gray-700 bg-white px-1">{drugStartDateDisplay}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="drugEndDate" className="text-sm font-semibold text-gray-700 mb-2 block">
                              Ngày kết thúc
                            </Label>
                            <div className="relative">
                              <Input
                                id="drugEndDate"
                                type="date"
                                value={drugEndDate}
                                onChange={(e) => handleDrugEndDateChange(e.target.value)}
                                className="h-11"
                              />
                              {drugEndDateDisplay && (
                                <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                                  <span className="text-sm text-gray-700 bg-white px-1">{drugEndDateDisplay}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="dosage" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Liều lượng
                          </Label>
                          <Input
                            id="dosage"
                            placeholder="Ví dụ: 150IU/ngày"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="h-11"
                          />
                        </div>

                        <div>
                          <Label htmlFor="instructions" className="text-sm font-semibold text-gray-700 mb-2 block">
                            Hướng dẫn sử dụng
                          </Label>
                          <Input
                            id="instructions"
                            placeholder="Ví dụ: Tiêm dưới da vào buổi tối"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            className="h-11"
                          />
                        </div>
                      </>
                    )}

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </div>
                    )}

                    <Button
                      onClick={handleAddDrug}
                      className="w-full h-11 font-semibold"
                      disabled={!selectedDrug || unassignedDrugs.length === 0}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm thuốc
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Current Schedules */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Lịch hẹn hiện tại</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900">{schedule.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(schedule.date)} {schedule.time && `• ${schedule.time}`}
                        </p>
                        {schedule.serviceIds && schedule.serviceIds.length > 1 && (
                          <p className="text-xs text-blue-600 mt-1">
                            {schedule.serviceIds.length} dịch vụ được lên lịch cùng lúc
                          </p>
                        )}
                        <Badge className={`${getStatusColor(schedule.status)} text-xs mt-2`}>
                          {getStatusLabel(schedule.status)}
                        </Badge>
                      </div>
                      {schedule.status === "scheduled" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCancelSchedule(schedule.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-3"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {schedules.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500">Chưa có lịch hẹn nào</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Drug Assignments */}
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Thuốc đang sử dụng</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drugAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-900">{assignment.name}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDate(assignment.startDate)} - {formatDate(assignment.endDate)}
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            <strong>Liều:</strong> {assignment.dosage}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{assignment.instructions}</p>
                          <Badge className={`${getStatusColor(assignment.status)} text-xs mt-2`}>
                            {getStatusLabel(assignment.status)}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDrugAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-3"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {drugAssignments.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500">Chưa có thuốc nào được kê</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DoctorLayout>
  )
}
