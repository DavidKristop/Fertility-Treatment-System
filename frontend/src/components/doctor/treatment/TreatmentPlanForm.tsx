"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText } from "lucide-react"

interface Protocol {
  id: string
  title: string
  description: string
  isActive: boolean
}

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  age: number
}

interface TreatmentPlanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  availableProtocols?: Protocol[]
}

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
    isActive: true,
  },
  {
    id: "4",
    title: "IUI Stimulated Protocol",
    description: "Phác đồ IUI có kích thích buồng trứng nhẹ",
    isActive: true,
  },
]

const mockPatients: Patient[] = [
  { id: "1", name: "Nguyễn Thị Lan", email: "lan.nguyen@email.com", phone: "0901234567", age: 32 },
  { id: "2", name: "Trần Thị Hoa", email: "hoa.tran@email.com", phone: "0901234568", age: 28 },
  { id: "3", name: "Lê Thị Mai", email: "mai.le@email.com", phone: "0901234569", age: 35 },
  { id: "4", name: "Phạm Thị Thu", email: "thu.pham@email.com", phone: "0901234570", age: 30 },
]

export default function TreatmentPlanForm({
  onSubmit,
  onCancel,
  availableProtocols = mockProtocols,
}: TreatmentPlanFormProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    protocolId: "",
    diagnosis: "",
    description: "",
    paymentMethod: "phase",
  })
  const [patientSearch, setPatientSearch] = useState("")
  const [protocolSearch, setProtocolSearch] = useState("")
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients)
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>(availableProtocols)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null)
  const [showPatientDropdown, setShowPatientDropdown] = useState(false)
  const [showProtocolDropdown, setShowProtocolDropdown] = useState(false)

  // Filter patients based on search
  useEffect(() => {
    const filtered = mockPatients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.email.toLowerCase().includes(patientSearch.toLowerCase()),
    )
    setFilteredPatients(filtered)
  }, [patientSearch])

  // Filter protocols based on search
  useEffect(() => {
    const filtered = availableProtocols.filter(
      (protocol) =>
        protocol.title.toLowerCase().includes(protocolSearch.toLowerCase()) ||
        protocol.description.toLowerCase().includes(protocolSearch.toLowerCase()),
    )
    setFilteredProtocols(filtered)
  }, [protocolSearch, availableProtocols])

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient)
    setFormData((prev) => ({ ...prev, patientId: patient.id }))
    setPatientSearch(patient.name)
    setShowPatientDropdown(false)
  }

  const handleProtocolSelect = (protocol: Protocol) => {
    setSelectedProtocol(protocol)
    setFormData((prev) => ({ ...prev, protocolId: protocol.id }))
    setProtocolSearch(protocol.title)
    setShowProtocolDropdown(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.patientId || !formData.protocolId || !formData.diagnosis || !formData.description) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    const submitData = {
      ...formData,
      patientName: selectedPatient?.name,
      patientEmail: selectedPatient?.email,
      protocolName: selectedProtocol?.title,
    }

    onSubmit(submitData)
  }

  return (
    <div className="max-w-4xl mx-auto">
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
              <Label htmlFor="patient">
                Bệnh nhân <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="relative">
                  <Input
                    id="patient"
                    placeholder="Tìm kiếm và chọn bệnh nhân..."
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value)
                      setShowPatientDropdown(true)
                    }}
                    onFocus={() => setShowPatientDropdown(true)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                {showPatientDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">
                          {patient.email} • {patient.age} tuổi
                        </div>
                      </div>
                    ))}
                    {filteredPatients.length === 0 && (
                      <div className="px-4 py-3 text-gray-500 text-center">Không tìm thấy bệnh nhân nào</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Protocol Selection */}
            <div className="space-y-2">
              <Label htmlFor="protocol">
                Giao thức điều trị <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="relative">
                  <Input
                    id="protocol"
                    placeholder="Tìm kiếm và chọn giao thức..."
                    value={protocolSearch}
                    onChange={(e) => {
                      setProtocolSearch(e.target.value)
                      setShowProtocolDropdown(true)
                    }}
                    onFocus={() => setShowProtocolDropdown(true)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                {showProtocolDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredProtocols.map((protocol) => (
                      <div
                        key={protocol.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleProtocolSelect(protocol)}
                      >
                        <div className="font-medium text-gray-900">{protocol.title}</div>
                        <div className="text-sm text-gray-500">{protocol.description}</div>
                      </div>
                    ))}
                    {filteredProtocols.length === 0 && (
                      <div className="px-4 py-3 text-gray-500 text-center">Không tìm thấy giao thức nào</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label htmlFor="diagnosis">
                Chẩn đoán <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="diagnosis"
                placeholder="Nhập chẩn đoán của bệnh nhân"
                value={formData.diagnosis}
                onChange={(e) => setFormData((prev) => ({ ...prev, diagnosis: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Treatment Plan Description */}
            <div className="space-y-2">
              <Label htmlFor="description">
                Mô tả kế hoạch điều trị <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về kế hoạch điều trị, mục tiêu và các bước thực hiện..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Payment Method */}
            {/* <div className="space-y-2">
              <Label htmlFor="paymentMethod">Hình thức thanh toán</Label>
              <Select
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phase">Thanh toán theo giai đoạn</SelectItem>
                  <SelectItem value="full">Thanh toán toàn bộ</SelectItem>
                  <SelectItem value="insurance">Bảo hiểm y tế</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Hủy
              </Button>
              <Button type="submit" className="bg-[#004c77] hover:bg-[#003d61]">
                Tạo kế hoạch điều trị
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
