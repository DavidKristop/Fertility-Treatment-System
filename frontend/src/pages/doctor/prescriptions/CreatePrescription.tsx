"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, User, Pill, FileText } from "lucide-react"
import { useState } from "react"

interface Patient {
  id: string
  name: string
  age: number
  treatmentPhase: string
  currentPhaseId: string
}

interface Drug {
  id: string
  name: string
  description: string
  unit: string
  price: number
}

interface TreatmentPhase {
  id: string
  title: string
  description: string
  recommendedDrugs: Drug[]
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Nguyễn Thị Lan",
    age: 32,
    treatmentPhase: "IVF - Giai đoạn kích thích buồng trứng",
    currentPhaseId: "phase1",
  },
  {
    id: "2",
    name: "Trần Văn Nam",
    age: 35,
    treatmentPhase: "IUI - Chuẩn bị",
    currentPhaseId: "phase2",
  },
  {
    id: "3",
    name: "Lê Thị Hoa",
    age: 28,
    treatmentPhase: "IVF - Hỗ trợ hoàng thể",
    currentPhaseId: "phase3",
  },
]

const mockTreatmentPhases: Record<string, TreatmentPhase> = {
  phase1: {
    id: "phase1",
    title: "IVF - Giai đoạn kích thích buồng trứng",
    description: "Sử dụng hormone để kích thích buồng trứng phát triển nhiều nang trứng",
    recommendedDrugs: [
      { id: "drug1", name: "Gonal-F", description: "Hormone FSH tái tổ hợp", unit: "vial", price: 1200000 },
      { id: "drug2", name: "Menopur", description: "Hormone FSH/LH", unit: "vial", price: 800000 },
      { id: "drug3", name: "Cetrotide", description: "Thuốc chống GnRH", unit: "vial", price: 600000 },
    ],
  },
  phase2: {
    id: "phase2",
    title: "IUI - Chuẩn bị",
    description: "Chuẩn bị cho quá trình thụ tinh nhân tạo",
    recommendedDrugs: [
      { id: "drug4", name: "Clomid", description: "Thuốc kích thích rụng trứng", unit: "tablet", price: 50000 },
      { id: "drug5", name: "Letrozole", description: "Thuốc ức chế aromatase", unit: "tablet", price: 80000 },
    ],
  },
  phase3: {
    id: "phase3",
    title: "IVF - Hỗ trợ hoàng thể",
    description: "Hỗ trợ hoàng thể sau chuyển phôi",
    recommendedDrugs: [
      { id: "drug6", name: "Progesterone", description: "Hormone progesterone", unit: "capsule", price: 30000 },
      { id: "drug7", name: "Estradiol", description: "Hormone estrogen", unit: "tablet", price: 25000 },
    ],
  },
}

interface PrescriptionItem {
  drugId: string
  drugName: string
  dosage: string
  amount: number
  unit: string
  usageInstructions: string
  startDate: string
  endDate: string
}

export default function CreatePrescription() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [prescriptionItems, setPrescriptionItems] = useState<PrescriptionItem[]>([])
  const [notes, setNotes] = useState("")

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Đơn thuốc", path: "/doctor/prescriptions" },
    { label: "Tạo đơn mới" },
  ]

  const handlePatientSelect = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId)
    setSelectedPatient(patient || null)
    setPrescriptionItems([]) // Reset prescription items when changing patient
  }

  const addPrescriptionItem = () => {
    setPrescriptionItems([
      ...prescriptionItems,
      {
        drugId: "",
        drugName: "",
        dosage: "",
        amount: 1,
        unit: "",
        usageInstructions: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const updatePrescriptionItem = (index: number, field: keyof PrescriptionItem, value: string | number) => {
    const updatedItems = [...prescriptionItems]
    updatedItems[index] = { ...updatedItems[index], [field]: value }

    // If drug is selected, auto-fill drug name and unit
    if (field === "drugId" && selectedPatient) {
      const phase = mockTreatmentPhases[selectedPatient.currentPhaseId]
      const drug = phase.recommendedDrugs.find((d) => d.id === value)
      if (drug) {
        updatedItems[index].drugName = drug.name
        updatedItems[index].unit = drug.unit
      }
    }

    setPrescriptionItems(updatedItems)
  }

  const removePrescriptionItem = (index: number) => {
    setPrescriptionItems(prescriptionItems.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!selectedPatient || prescriptionItems.length === 0) {
      alert("Vui lòng chọn bệnh nhân và thêm ít nhất một loại thuốc")
      return
    }

    // Here you would typically send the data to your API
    console.log("Creating prescription:", {
      patientId: selectedPatient.id,
      treatmentPhaseId: selectedPatient.currentPhaseId,
      items: prescriptionItems,
      notes,
    })

    alert("Đơn thuốc đã được tạo thành công!")
  }

  const currentPhase = selectedPatient ? mockTreatmentPhases[selectedPatient.currentPhaseId] : null

  return (
    <DoctorLayout title="Tạo đơn thuốc mới" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Chọn bệnh nhân
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient">Bệnh nhân</Label>
                <Select onValueChange={handlePatientSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bệnh nhân" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockPatients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.age} tuổi) - {patient.treatmentPhase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedPatient && (
                <div>
                  <Label>Giai đoạn điều trị hiện tại</Label>
                  <div className="mt-2">
                    <Badge className="bg-blue-100 text-blue-800">{selectedPatient.treatmentPhase}</Badge>
                  </div>
                </div>
              )}
            </div>

            {currentPhase && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">{currentPhase.title}</h4>
                <p className="text-sm text-blue-700 mt-1">{currentPhase.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescription Items */}
        {selectedPatient && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Danh sách thuốc
                </CardTitle>
                <Button onClick={addPrescriptionItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuốc
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptionItems.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Thuốc #{index + 1}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removePrescriptionItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Xóa
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Tên thuốc</Label>
                        <Select
                          value={item.drugId}
                          onValueChange={(value) => updatePrescriptionItem(index, "drugId", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn thuốc" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentPhase?.recommendedDrugs.map((drug) => (
                              <SelectItem key={drug.id} value={drug.id}>
                                {drug.name} - {drug.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Liều lượng</Label>
                        <Input
                          placeholder="VD: 75 IU, 50mg"
                          value={item.dosage}
                          onChange={(e) => updatePrescriptionItem(index, "dosage", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Số lượng</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.amount}
                          onChange={(e) =>
                            updatePrescriptionItem(index, "amount", Number.parseInt(e.target.value) || 1)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Ngày bắt đầu</Label>
                        <Input
                          type="date"
                          value={item.startDate}
                          onChange={(e) => updatePrescriptionItem(index, "startDate", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Ngày kết thúc</Label>
                        <Input
                          type="date"
                          value={item.endDate}
                          onChange={(e) => updatePrescriptionItem(index, "endDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Hướng dẫn sử dụng</Label>
                      <Textarea
                        placeholder="VD: Tiêm dưới da mỗi ngày vào buổi tối, cùng giờ"
                        value={item.usageInstructions}
                        onChange={(e) => updatePrescriptionItem(index, "usageInstructions", e.target.value)}
                      />
                    </div>
                  </div>
                ))}

                {prescriptionItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Pill className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Chưa có thuốc nào được thêm</p>
                    <p className="text-sm">Nhấn "Thêm thuốc" để bắt đầu</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes */}
        {selectedPatient && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ghi chú bổ sung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Ghi chú về đơn thuốc, lưu ý đặc biệt cho bệnh nhân..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>
        )}

        {/* Submit */}
        {selectedPatient && prescriptionItems.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Tạo đơn thuốc
            </Button>
            <Button variant="outline">Hủy</Button>
          </div>
        )}
      </div>
    </DoctorLayout>
  )
}
