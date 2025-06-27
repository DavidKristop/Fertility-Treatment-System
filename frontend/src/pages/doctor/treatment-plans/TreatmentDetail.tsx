"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Phone, Mail, CalendarIcon, Plus, X } from "lucide-react"
import { getTreatmentPlan, type TreatmentPlan } from "@/api/treatment"

interface Schedule {
  id: string
  type: "service" | "drug"
  name: string
  date: string
  time?: string
  status: "scheduled" | "completed" | "cancelled"
}

interface DrugAssignment {
  id: string
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
}

interface Drug {
  id: string
  name: string
  protocols: string[]
}

// Protocol-specific services and drugs
const allServices: Service[] = [
  { id: "1", name: "Siêu âm theo dõi nang trứng", protocols: ["1", "2", "3", "4"] },
  { id: "2", name: "Xét nghiệm hormone FSH, LH", protocols: ["1", "2", "3", "4"] },
  { id: "3", name: "Chọc hút trứng", protocols: ["1", "2"] }, // Only IVF protocols
  { id: "4", name: "Chuyển phôi", protocols: ["1", "2"] }, // Only IVF protocols
  { id: "5", name: "Xét nghiệm Beta HCG", protocols: ["1", "2", "3", "4"] },
  { id: "6", name: "Thụ tinh nhân tạo (IUI)", protocols: ["3", "4"] }, // Only IUI protocols
  { id: "7", name: "Ức chế GnRH", protocols: ["1"] }, // Only IVF Long Protocol
  { id: "8", name: "Theo dõi chu kỳ tự nhiên", protocols: ["3"] }, // Only IUI Natural
  { id: "9", name: "Kích thích buồng trứng nhẹ", protocols: ["4"] }, // Only IUI Stimulated
  { id: "10", name: "Nuôi cấy phôi", protocols: ["1", "2"] }, // Only IVF protocols
]

const allDrugs: Drug[] = [
  { id: "1", name: "Gonal-F 450IU", protocols: ["1", "2", "4"] }, // IVF + IUI Stimulated
  { id: "2", name: "Puregon 300IU", protocols: ["1", "2", "4"] }, // IVF + IUI Stimulated
  { id: "3", name: "Cetrotide 0.25mg", protocols: ["1", "2"] }, // Only IVF protocols
  { id: "4", name: "Duphaston 10mg", protocols: ["1", "2", "3", "4"] }, // All protocols
  { id: "5", name: "Lupron (GnRH Agonist)", protocols: ["1"] }, // Only IVF Long Protocol
  { id: "6", name: "Clomiphene Citrate", protocols: ["4"] }, // Only IUI Stimulated
  { id: "7", name: "Letrozole", protocols: ["4"] }, // Only IUI Stimulated
  { id: "8", name: "Progesterone", protocols: ["1", "2", "3", "4"] }, // All protocols
  { id: "9", name: "Estradiol", protocols: ["1", "2"] }, // Only IVF protocols
  { id: "10", name: "Folic Acid", protocols: ["1", "2", "3", "4"] }, // All protocols
]

export default function TreatmentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [scheduleType, setScheduleType] = useState<"service" | "drug">("service")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedDrug, setSelectedDrug] = useState("")
  const [timeFrom, setTimeFrom] = useState("")
  const [timeTo, setTimeTo] = useState("")
  const [drugStartDate, setDrugStartDate] = useState("")
  const [drugEndDate, setDrugEndDate] = useState("")
  const [dosage, setDosage] = useState("")
  const [instructions, setInstructions] = useState("")
  const [error, setError] = useState("")

  // Filtered services and drugs based on protocol
  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [availableDrugs, setAvailableDrugs] = useState<Drug[]>([])

  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      type: "service",
      name: "Siêu âm theo dõi nang trứng",
      date: "2024-02-15",
      time: "09:00 - 09:30",
      status: "scheduled",
    },
    {
      id: "2",
      type: "service",
      name: "Xét nghiệm hormone FSH, LH",
      date: "2024-02-20",
      time: "08:00 - 08:30",
      status: "completed",
    },
  ])

  const [drugAssignments, setDrugAssignments] = useState<DrugAssignment[]>([
    {
      id: "1",
      name: "Gonal-F 450IU",
      startDate: "2024-02-10",
      endDate: "2024-02-25",
      dosage: "150IU/ngày",
      instructions: "Tiêm dưới da vào buổi tối, cùng giờ mỗi ngày",
      status: "active",
    },
  ])

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Chi tiết kế hoạch" },
  ]

  useEffect(() => {
    const fetchTreatmentPlan = async () => {
      if (!id) return

      try {
        const plan = await getTreatmentPlan(id)
        setTreatmentPlan(plan)
      } catch (error) {
        console.error("Failed to fetch treatment plan:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTreatmentPlan()
  }, [id])

  // Filter services and drugs based on treatment protocol
  useEffect(() => {
    if (treatmentPlan?.protocol_id) {
      const protocolId = treatmentPlan.protocol_id

      const filteredServices = allServices.filter((service) => service.protocols.includes(protocolId))

      const filteredDrugs = allDrugs.filter((drug) => drug.protocols.includes(protocolId))

      setAvailableServices(filteredServices)
      setAvailableDrugs(filteredDrugs)
    }
  }, [treatmentPlan])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleAddSchedule = () => {
    setError("")

    if (scheduleType === "service") {
      if (selectedServices.length === 0 || !selectedDate || !timeFrom || !timeTo) {
        setError("Vui lòng chọn dịch vụ, ngày và thời gian")
        return
      }

      selectedServices.forEach((serviceId) => {
        const service = availableServices.find((s) => s.id === serviceId)
        if (service) {
          const newSchedule: Schedule = {
            id: Date.now().toString() + serviceId,
            type: "service",
            name: service.name,
            date: selectedDate.toISOString().split("T")[0],
            time: `${timeFrom} - ${timeTo}`,
            status: "scheduled",
          }
          setSchedules((prev) => [...prev, newSchedule])
        }
      })

      setSelectedServices([])
      setTimeFrom("")
      setTimeTo("")
    } else {
      if (!selectedDrug || !drugStartDate || !drugEndDate || !dosage || !instructions) {
        setError("Vui lòng điền đầy đủ thông tin thuốc")
        return
      }

      const drug = availableDrugs.find((d) => d.id === selectedDrug)
      if (drug) {
        const newAssignment: DrugAssignment = {
          id: Date.now().toString(),
          name: drug.name,
          startDate: drugStartDate,
          endDate: drugEndDate,
          dosage,
          instructions,
          status: "active",
        }
        setDrugAssignments((prev) => [...prev, newAssignment])
      }

      setSelectedDrug("")
      setDrugStartDate("")
      setDrugEndDate("")
      setDosage("")
      setInstructions("")
    }
  }

  const handleCancelSchedule = (scheduleId: string) => {
    setSchedules((prev) => prev.map((s) => (s.id === scheduleId ? { ...s, status: "cancelled" as const } : s)))
  }

  const handleRemoveDrugAssignment = (assignmentId: string) => {
    setDrugAssignments((prev) => prev.filter((a) => a.id !== assignmentId))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN")
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

  const getProtocolInfo = (protocolId: string) => {
    const protocolMap: Record<string, { name: string; color: string }> = {
      "1": { name: "IVF Long Protocol", color: "bg-purple-100 text-purple-800" },
      "2": { name: "IVF Short Protocol", color: "bg-blue-100 text-blue-800" },
      "3": { name: "IUI Natural Protocol", color: "bg-green-100 text-green-800" },
      "4": { name: "IUI Stimulated Protocol", color: "bg-orange-100 text-orange-800" },
    }
    return protocolMap[protocolId] || { name: "Unknown Protocol", color: "bg-gray-100 text-gray-800" }
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

  const protocolInfo = getProtocolInfo(treatmentPlan.protocol_id)

  return (
    <DoctorLayout title="Chi tiết kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info & Calendar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/doctor/treatment-plans")} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{treatmentPlan.patient_name}</h1>
              <p className="text-gray-600">{treatmentPlan.protocol_name}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{treatmentPlan.patient_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">0901234567</span>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm text-gray-700 mb-1">Chẩn đoán</h4>
                <p className="text-sm">{treatmentPlan.diagnosis}</p>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Giao thức điều trị</h4>
                  <Badge className={protocolInfo.color}>{protocolInfo.name}</Badge>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Giai đoạn hiện tại</h4>
                  <Badge className="bg-blue-100 text-blue-800">{treatmentPlan.current_phase}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocol-specific Information */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin giao thức điều trị</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Dịch vụ khả dụng cho giao thức này</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableServices.map((service) => (
                      <Badge key={service.id} variant="outline" className="text-xs">
                        {service.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Thuốc khả dụng cho giao thức này</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableDrugs.map((drug) => (
                      <Badge key={drug.id} variant="outline" className="text-xs">
                        {drug.name}
                      </Badge>
                    ))}
                  </div>
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
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Schedule Controls */}
        <div className="space-y-6">
          {/* Schedule Type Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Lập lịch điều trị</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Loại lịch hẹn</Label>
                <Select value={scheduleType} onValueChange={(value: "service" | "drug") => setScheduleType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Dịch vụ</SelectItem>
                    <SelectItem value="drug">Thuốc</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scheduleType === "service" ? (
                <>
                  <div>
                    <Label>Chọn dịch vụ (Phù hợp với {protocolInfo.name})</Label>
                    <div className="space-y-2 mt-2 max-h-32 overflow-y-auto">
                      {availableServices.map((service) => (
                        <div key={service.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={service.id}
                            checked={selectedServices.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="rounded border-gray-300"
                          />
                          <label htmlFor={service.id} className="text-sm">
                            {service.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {availableServices.length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">Không có dịch vụ nào khả dụng cho giao thức này</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="timeFrom">Từ</Label>
                      <Input id="timeFrom" type="time" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="timeTo">Đến</Label>
                      <Input id="timeTo" type="time" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>Chọn thuốc (Phù hợp với {protocolInfo.name})</Label>
                    <Select value={selectedDrug} onValueChange={setSelectedDrug}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thuốc..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDrugs.map((drug) => (
                          <SelectItem key={drug.id} value={drug.id}>
                            {drug.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {availableDrugs.length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">Không có thuốc nào khả dụng cho giao thức này</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="drugStartDate">Ngày bắt đầu</Label>
                      <Input
                        id="drugStartDate"
                        type="date"
                        value={drugStartDate}
                        onChange={(e) => setDrugStartDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="drugEndDate">Ngày kết thúc</Label>
                      <Input
                        id="drugEndDate"
                        type="date"
                        value={drugEndDate}
                        onChange={(e) => setDrugEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dosage">Liều lượng</Label>
                    <Input
                      id="dosage"
                      placeholder="Ví dụ: 150IU/ngày"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Hướng dẫn sử dụng</Label>
                    <Input
                      id="instructions"
                      placeholder="Ví dụ: Tiêm dưới da vào buổi tối"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                </>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button
                onClick={handleAddSchedule}
                className="w-full"
                disabled={
                  (scheduleType === "service" && availableServices.length === 0) ||
                  (scheduleType === "drug" && availableDrugs.length === 0)
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm {scheduleType === "service" ? "lịch hẹn" : "thuốc"}
              </Button>
            </CardContent>
          </Card>

          {/* Current Schedules */}
          <Card>
            <CardHeader>
              <CardTitle>Lịch hẹn hiện tại</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{schedule.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(schedule.date)} {schedule.time && `• ${schedule.time}`}
                      </p>
                      <Badge className={`${getStatusColor(schedule.status)} text-xs mt-1`}>
                        {getStatusLabel(schedule.status)}
                      </Badge>
                    </div>
                    {schedule.status === "scheduled" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelSchedule(schedule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {schedules.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có lịch hẹn nào</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Drug Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Thuốc đang sử dụng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {drugAssignments.map((assignment) => (
                  <div key={assignment.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{assignment.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(assignment.startDate)} - {formatDate(assignment.endDate)}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          <strong>Liều:</strong> {assignment.dosage}
                        </p>
                        <p className="text-xs text-gray-600">{assignment.instructions}</p>
                        <Badge className={`${getStatusColor(assignment.status)} text-xs mt-1`}>
                          {getStatusLabel(assignment.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveDrugAssignment(assignment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {drugAssignments.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có thuốc nào được kê</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  )
}
