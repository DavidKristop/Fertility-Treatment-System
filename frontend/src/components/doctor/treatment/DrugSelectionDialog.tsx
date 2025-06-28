"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Save, X } from "lucide-react"

interface Drug {
  id: string
  name: string
  price: number
  unit: string
}

interface DrugSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: { drugId: string; dosage: string; quantity: number }) => void
  availableDrugs: Drug[]
  phaseType: string
}

export default function DrugSelectionDialog({
  open,
  onOpenChange,
  onSave,
  availableDrugs,
  phaseType,
}: DrugSelectionDialogProps) {
  const [selectedDrugId, setSelectedDrugId] = useState("")
  const [dosage, setDosage] = useState("")
  const [quantity, setQuantity] = useState(1)

  const selectedDrug = availableDrugs.find((d) => d.id === selectedDrugId)

  const handleSave = () => {
    if (!selectedDrugId || !dosage) return

    onSave({
      drugId: selectedDrugId,
      dosage,
      quantity,
    })

    // Reset form
    setSelectedDrugId("")
    setDosage("")
    setQuantity(1)
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Reset form
    setSelectedDrugId("")
    setDosage("")
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm thuốc - {phaseType}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drug Selection */}
          <div>
            <Label htmlFor="drug">Chọn thuốc</Label>
            <Select value={selectedDrugId} onValueChange={setSelectedDrugId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thuốc..." />
              </SelectTrigger>
              <SelectContent>
                {availableDrugs.map((drug) => (
                  <SelectItem key={drug.id} value={drug.id}>
                    <div className="flex flex-col">
                      <span>{drug.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat("vi-VN").format(drug.price)} ₫/{drug.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dosage */}
          <div>
            <Label htmlFor="dosage">Liều lượng</Label>
            <Input
              id="dosage"
              placeholder="Ví dụ: 2 viên/ngày, 1ml/lần..."
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Số lượng</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            />
            {selectedDrug && <p className="text-sm text-muted-foreground mt-1">Đơn vị: {selectedDrug.unit}</p>}
          </div>

          {/* Price Preview */}
          {selectedDrug && (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tổng chi phí:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("vi-VN").format(selectedDrug.price * quantity)} ₫
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} disabled={!selectedDrugId || !dosage} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Thêm thuốc
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            <X className="h-4 w-4 mr-2" />
            Hủy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
