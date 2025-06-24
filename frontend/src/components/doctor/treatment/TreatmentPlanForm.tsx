"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Plus, Save, User, FileText, Calendar } from "lucide-react"
import { useState } from "react"
// import { convertFromInputDate } from "@/lib/date-utils"

interface TreatmentProtocol {
  id: string
  title: string
  description: string
  type: string
  subtype: string
  isActive: boolean
}

interface TreatmentPlanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  availableProtocols: TreatmentProtocol[]
}

export default function TreatmentPlanForm({ onSubmit, onCancel, availableProtocols }: TreatmentPlanFormProps) {
  const [formData, setFormData] = useState({
    patientId: "",
    treatmentType: "",
    protocolId: "",
    startDate: "",
    diagnosis: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const selectedProtocol = availableProtocols.find((p) => p.id === formData.protocolId)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Tạo kế hoạch điều trị mới
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Bệnh nhân
              </Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bệnh nhân" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440011">Nguyễn Thị Lan (32 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440012">Trần Văn Nam (35 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440013">Lê Thị Hoa (28 tuổi)</SelectItem>
                  <SelectItem value="550e8400-e29b-41d4-a716-446655440014">Phạm Thị Mai (30 tuổi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Ngày bắt đầu điều trị
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="treatmentType" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Loại điều trị
            </Label>
            <Select
              value={formData.treatmentType}
              onValueChange={(value) => setFormData({ ...formData, treatmentType: value, protocolId: "" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại điều trị" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IVF">IVF (Thụ tinh trong ống nghiệm)</SelectItem>
                <SelectItem value="IUI">IUI (Thụ tinh nhân tạo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.treatmentType && (
            <div>
              <Label htmlFor="protocol" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Phác đồ điều trị
              </Label>
              <Select
                value={formData.protocolId}
                onValueChange={(value) => setFormData({ ...formData, protocolId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phác đồ điều trị" />
                </SelectTrigger>
                <SelectContent>
                  {formData.treatmentType === "IVF" && (
                    <>
                      <SelectItem value="550e8400-e29b-41d4-a716-446655440021">IVF Long Protocol</SelectItem>
                      <SelectItem value="550e8400-e29b-41d4-a716-446655440023">IVF Short Protocol</SelectItem>
                    </>
                  )}
                  {formData.treatmentType === "IUI" && (
                    <>
                      <SelectItem value="550e8400-e29b-41d4-a716-446655440022">IUI Natural Protocol</SelectItem>
                      <SelectItem value="550e8400-e29b-41d4-a716-446655440024">IUI Stimulated Protocol</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
              {selectedProtocol && <p className="text-sm text-muted-foreground mt-2">{selectedProtocol.description}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="diagnosis">Chẩn đoán</Label>
            <Textarea
              id="diagnosis"
              placeholder="Nhập chẩn đoán chi tiết..."
              className="min-h-[80px]"
              value={formData.diagnosis}
              onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="notes">Ghi chú bổ sung</Label>
            <Textarea
              id="notes"
              placeholder="Ghi chú về kế hoạch điều trị, lưu ý đặc biệt..."
              className="min-h-[100px]"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Tạo kế hoạch điều trị
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
