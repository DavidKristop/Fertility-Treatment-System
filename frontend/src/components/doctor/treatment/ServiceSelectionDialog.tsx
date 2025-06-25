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
import type { DateRange } from "react-day-picker" 
import { DateRangePicker } from "@/components/ui/date-range-picker"

interface Service {
  id: string
  name: string
  price: number
  unit: string
}

interface ServiceSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (serviceData: {
    serviceId: string
    dateRange: DateRange | undefined
    quantity: number
  }) => void
  availableServices: Service[]
  phaseType: string
}

export default function ServiceSelectionDialog({
  open,
  onOpenChange,
  onSave,
  availableServices,
  phaseType
}: ServiceSelectionDialogProps) {
  const [selectedService, setSelectedService] = useState<string>("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [quantity, setQuantity] = useState<number>(1)
  const selectedServiceData = availableServices.find(s => s.id === selectedService)

  // Filter services based on the phase type
  const filteredServices = availableServices.filter(service => {
    // In a real app, you would have a more sophisticated matching logic
    // based on your specific requirements
    if (phaseType.includes("Kích thích")) {
      return ["Siêu âm theo dõi", "Xét nghiệm máu"].includes(service.name)
    }
    if (phaseType.includes("Thu hoạch trứng")) {
      return service.name === "Chọc hút trứng"
    }
    if (phaseType.includes("Nuôi cấy")) {
      return ["Thụ tinh trong ống nghiệm", "Nuôi cấy phôi"].includes(service.name)
    }
    if (phaseType.includes("Chuyển phôi")) {
      return service.name === "Chuyển phôi"
    }
    if (phaseType.includes("Bơm tinh trùng")) {
      return service.name === "Bơm tinh trùng"
    }
    return true
  })

  const calculateTotal = () => {
    if (!selectedServiceData) return 0
    return selectedServiceData.price * quantity
  }

  const handleSave = () => {
    if (!selectedService || !dateRange) return

    onSave({
      serviceId: selectedService,
      dateRange,
      quantity
    })

    // Reset form
    setSelectedService("")
    setDateRange(undefined)
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm dịch vụ mới</DialogTitle>
          <DialogDescription>
            Chọn dịch vụ và lịch thực hiện cho giai đoạn điều trị này.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="service">1. Chọn lịch thực hiện</Label>
            <DateRangePicker 
              value={dateRange} 
              onChange={setDateRange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="service">2. Chọn dịch vụ</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                {filteredServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {new Intl.NumberFormat('vi-VN').format(service.price)}đ/{service.unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          
          {selectedServiceData && (
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between">
                <span className="font-medium">Thành tiền:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat('vi-VN').format(calculateTotal())}đ
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedServiceData.price.toLocaleString('vi-VN')}đ x {quantity} {selectedServiceData.unit}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button type="button" onClick={handleSave} disabled={!selectedService || !dateRange}>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
