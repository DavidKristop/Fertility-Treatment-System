"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Drug {
  id: string
  name: string
  price: number
  unit: string
}

interface DrugSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (drugData: {
    drugId: string
    dosage: string
    quantity: number
  }) => void
  availableDrugs: Drug[]
  phaseType: string
}

export default function DrugSelectionDialog({
  open,
  onOpenChange,
  onSave,
  availableDrugs,
  phaseType
}: DrugSelectionDialogProps) {
  const [selectedDrug, setSelectedDrug] = useState<string>("")
  const [dosage, setDosage] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const selectedDrugData = availableDrugs.find(d => d.id === selectedDrug)

  // Filter drugs based on the phase type
  const filteredDrugs = availableDrugs.filter(drug => {
    // In a real app, you would have a more sophisticated matching logic
    // based on your specific requirements
    if (phaseType.includes("Ức chế buồng trứng")) {
      return drug.name.includes("GnRH")
    }
    if (phaseType.includes("Kích thích")) {
      return drug.name.includes("FSH") || drug.name.includes("Clomiphene")
    }
    if (phaseType.includes("Chuyển phôi")) {
      return drug.name.includes("Progesterone")
    }
    if (phaseType.includes("Thu hoạch trứng")) {
      return drug.name.includes("hCG")
    }
    return true
  })

  const calculateTotal = () => {
    if (!selectedDrugData) return 0
    return selectedDrugData.price * quantity
  }

  const handleSave = () => {
    if (!selectedDrug || !dosage) return

    onSave({
      drugId: selectedDrug,
      dosage,
      quantity
    })

    // Reset form
    setSelectedDrug("")
    setDosage("")
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm thuốc mới</DialogTitle>
          <DialogDescription>
            Chọn thuốc và liều lượng cho giai đoạn điều trị này.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="drug">1. Chọn thuốc</Label>
            <Select value={selectedDrug} onValueChange={setSelectedDrug}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn thuốc" />
              </SelectTrigger>
              <SelectContent>
                {filteredDrugs.map((drug) => (
                  <SelectItem key={drug.id} value={drug.id}>
                    {drug.name} - {new Intl.NumberFormat('vi-VN').format(drug.price)}đ/{drug.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="dosage">2. Liều lượng</Label>
            <Textarea
              id="dosage"
              placeholder="Ví dụ: 150 IU/ngày, uống 1 viên/ngày..."
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="quantity">3. Số lượng</Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          
          {selectedDrugData && (
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Thành tiền:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat('vi-VN').format(calculateTotal())}đ
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedDrugData.price.toLocaleString('vi-VN')}đ x {quantity} {selectedDrugData.unit}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button type="button" onClick={handleSave} disabled={!selectedDrug || !dosage}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
