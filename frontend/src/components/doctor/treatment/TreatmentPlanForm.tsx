import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save } from "lucide-react"
import { useState } from "react"

interface TreatmentPlanFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function TreatmentPlanForm({ onSubmit, onCancel }: TreatmentPlanFormProps) {
  const [selectedType, setSelectedType] = useState("")
  const [formData, setFormData] = useState({
    patient: "",
    type: "",
    protocol: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Tạo kế hoạch điều trị mới
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient">Bệnh nhân</Label>
              <Select value={formData.patient} onValueChange={(value) => setFormData({ ...formData, patient: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bệnh nhân" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient1">Nguyễn Thị Lan</SelectItem>
                  <SelectItem value="patient2">Trần Văn Nam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Loại điều trị</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value)
                  setFormData({ ...formData, type: value })
                }}
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
          </div>

          {selectedType && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="protocol">Phác đồ điều trị</Label>
                <Select
                  value={formData.protocol}
                  onValueChange={(value) => setFormData({ ...formData, protocol: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phác đồ" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedType === "IVF" ? (
                      <>
                        <SelectItem value="long">Phác đồ dài (Long protocol)</SelectItem>
                        <SelectItem value="short">Phác đồ ngắn (Short protocol)</SelectItem>
                        <SelectItem value="antagonist">Phác đồ antagonist</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="natural">Chu kỳ tự nhiên</SelectItem>
                        <SelectItem value="stimulated">Chu kỳ kích thích</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea
                  id="notes"
                  placeholder="Ghi chú về kế hoạch điều trị..."
                  className="min-h-[100px]"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Lưu kế hoạch
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
