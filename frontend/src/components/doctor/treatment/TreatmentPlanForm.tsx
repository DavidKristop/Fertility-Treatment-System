"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, User, FileText, Activity } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Patient {
  id: string
  email: string
  fullName: string
  phone: string
}

interface Protocol {
  id: string
  title: string
  description: string
  isActive: boolean
}

interface TreatmentPlanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

// Mock data - replace with actual API calls
const mockPatients: Patient[] = [
  { id: "1", email: "lan.nguyen@email.com", fullName: "Nguyễn Thị Lan", phone: "0901234567" },
  { id: "2", email: "minh.tran@email.com", fullName: "Trần Văn Minh", phone: "0901234568" },
  { id: "3", email: "hoa.le@email.com", fullName: "Lê Thị Hoa", phone: "0901234569" },
  { id: "4", email: "duc.pham@email.com", fullName: "Phạm Văn Đức", phone: "0901234570" },
]

const mockProtocols: Protocol[] = [
  {
    id: "1",
    title: "IVF Long Protocol",
    description: "Phác đồ IVF dài với ức chế GnRH trước khi kích thích buồng trứng",
    isActive: true,
  },
  {
    id: "2",
    title: "IVF Short Protocol",
    description: "Phác đồ IVF ngắn với kích thích buồng trứng trực tiếp",
    isActive: true,
  },
  { 
    id: "3", 
    title: "IUI Natural Protocol", 
    description: "Phác đồ IUI tự nhiên theo dõi chu kỳ kinh nguyệt", 
    isActive: true 
  },
  { 
    id: "4", 
    title: "IUI Stimulated Protocol", 
    description: "Phác đồ IUI có kích thích buồng trứng nhẹ", 
    isActive: true 
  },
]

export default function TreatmentPlanForm({ onSubmit, onCancel }: TreatmentPlanFormProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null)
  const [diagnosis, setDiagnosis] = useState("")
  const [description, setDescription] = useState("")
  const [paymentMode, setPaymentMode] = useState<"full" | "phase">("phase")

  const [patientSearch, setPatientSearch] = useState("")
  const [protocolSearch, setProtocolSearch] = useState("")
  const [patientOpen, setPatientOpen] = useState(false)
  const [protocolOpen, setProtocolOpen] = useState(false)

  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients)
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>(mockProtocols)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter patients based on search
  useEffect(() => {
    const filtered = mockPatients.filter(
      (patient) =>
        patient.email.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.fullName.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.phone.includes(patientSearch),
    )
    setFilteredPatients(filtered)
  }, [patientSearch])

  // Filter protocols based on search
  useEffect(() => {
    const filtered = mockProtocols.filter(
      (protocol) =>
        protocol.isActive &&
        (protocol.title.toLowerCase().includes(protocolSearch.toLowerCase()) ||
          protocol.description.toLowerCase().includes(protocolSearch.toLowerCase())),
    )
    setFilteredProtocols(filtered)
  }, [protocolSearch])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedPatient) {
      newErrors.patient = "Vui lòng chọn bệnh nhân"
    }

    if (!selectedProtocol) {
      newErrors.protocol = "Vui lòng chọn phác đồ điều trị"
    }

    if (!diagnosis.trim()) {
      newErrors.diagnosis = "Vui lòng nhập chẩn đoán"
    }

    if (!description.trim()) {
      newErrors.description = "Vui lòng nhập mô tả kế hoạch điều trị"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const treatmentData = {
        patient_id: selectedPatient!.id,
        protocol_id: selectedProtocol!.id,
        diagnosis,
        description,
        paymentMode,
        start_date: new Date().toISOString().split("T")[0],
        status: "In Progress",
      }

      await onSubmit(treatmentData)
    } catch (error) {
      console.error("Error creating treatment:", error)
      setErrors({ submit: "Có lỗi xảy ra khi tạo kế hoạch điều trị. Vui lòng thử lại." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onCancel} className="p-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo kế hoạch điều trị mới</h1>
          <p className="text-gray-600">Tạo kế hoạch điều trị cho bệnh nhân</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Thông tin kế hoạch điều trị
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Patient Selection */}
              <div className="space-y-2">
                <Label htmlFor="patient">Bệnh nhân *</Label>
                <Popover open={patientOpen} onOpenChange={setPatientOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={patientOpen}
                      className="w-full justify-between bg-transparent"
                    >
                      {selectedPatient ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            {selectedPatient.fullName} ({selectedPatient.email})
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Tìm kiếm và chọn bệnh nhân...</span>
                      )}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Tìm theo email, tên hoặc số điện thoại..."
                        value={patientSearch}
                        onValueChange={setPatientSearch}
                      />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy bệnh nhân.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-y-auto">
                          {filteredPatients.map((patient) => (
                            <CommandItem
                              key={patient.id}
                              onSelect={() => {
                                setSelectedPatient(patient)
                                setPatientOpen(false)
                                setPatientSearch("")
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{patient.fullName}</span>
                                <span className="text-sm text-gray-600">{patient.email}</span>
                                <span className="text-sm text-gray-600">{patient.phone}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.patient && <p className="text-sm text-red-600">{errors.patient}</p>}
              </div>

              {/* Protocol Selection */}
              <div className="space-y-2">
                <Label htmlFor="protocol">Giao thức điều trị *</Label>
                <Popover open={protocolOpen} onOpenChange={setProtocolOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={protocolOpen}
                      className="w-full justify-between bg-transparent"
                    >
                      {selectedProtocol ? (
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          <span>{selectedProtocol.title}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Tìm kiếm và chọn giao thức...</span>
                      )}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Tìm theo tên giao thức..."
                        value={protocolSearch}
                        onValueChange={setProtocolSearch}
                      />
                      <CommandList>
                        <CommandEmpty>Không tìm thấy giao thức.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-y-auto">
                          {filteredProtocols.map((protocol) => (
                            <CommandItem
                              key={protocol.id}
                              onSelect={() => {
                                setSelectedProtocol(protocol)
                                setProtocolOpen(false)
                                setProtocolSearch("")
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{protocol.title}</span>
                                <span className="text-sm text-gray-600">{protocol.description}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.protocol && <p className="text-sm text-red-600">{errors.protocol}</p>}
              </div>

              {/* Diagnosis */}
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Chẩn đoán *</Label>
                <Input
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="Nhập chẩn đoán của bệnh nhân"
                  className={errors.diagnosis ? "border-red-500" : ""}
                />
                {errors.diagnosis && <p className="text-sm text-red-600">{errors.diagnosis}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả kế hoạch điều trị *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả chi tiết về kế hoạch điều trị, mục tiêu và các bước thực hiện..."
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Payment Mode */}
              <div className="space-y-2">
                <Label htmlFor="paymentMode">Hình thức thanh toán</Label>
                <Select value={paymentMode} onValueChange={(value: "full" | "phase") => setPaymentMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phase">Thanh toán theo giai đoạn</SelectItem>
                    <SelectItem value="full">Thanh toán toàn bộ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                  Hủy
                </Button>
                <Button type="submit" className="bg-[#004c77] hover:bg-[#003a5c]" disabled={isSubmitting}>
                  {isSubmitting ? "Đang tạo..." : "Tạo kế hoạch điều trị"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
