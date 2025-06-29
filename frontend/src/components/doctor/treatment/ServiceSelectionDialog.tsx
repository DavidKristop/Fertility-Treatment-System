"use client"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, X } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { DateRange } from "react-day-picker"

interface Service {
  id: string
  name: string
  price: number
  unit: string
}

interface ServiceSelectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: { serviceId: string; dateRange: DateRange | undefined; quantity: number }) => void
  availableServices: Service[]
  phaseType: string
}

export default function ServiceSelectionDialog({
  open,
  onOpenChange,
  onSave,
  availableServices,
  phaseType,
}: ServiceSelectionDialogProps) {
  const [selectedServiceId, setSelectedServiceId] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const selectedService = availableServices.find((s) => s.id === selectedServiceId)

  const handleSave = () => {
    if (!selectedServiceId) return

    onSave({
      serviceId: selectedServiceId,
      dateRange,
      quantity,
    })

    // Reset form
    setSelectedServiceId("")
    setDateRange(undefined)
    setQuantity(1)
    onOpenChange(false)
  }

  const handleCancel = () => {
    // Reset form
    setSelectedServiceId("")
    setDateRange(undefined)
    setQuantity(1)
    onOpenChange(false)
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Chọn khoảng thời gian"
    if (!range.to) return format(range.from, "dd/MM/yyyy", { locale: vi })
    return `${format(range.from, "dd/MM/yyyy", { locale: vi })} - ${format(range.to, "dd/MM/yyyy", { locale: vi })}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm dịch vụ - {phaseType}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Service Selection */}
          <div>
            <Label htmlFor="service">Chọn dịch vụ</Label>
            <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ..." />
              </SelectTrigger>
              <SelectContent>
                {availableServices.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex flex-col">
                      <span>{service.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat("vi-VN").format(service.price)} ₫/{service.unit}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Selection */}
          <div>
            <Label>Khoảng thời gian thực hiện</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formatDateRange(dateRange)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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
          </div>

          {/* Price Preview */}
          {selectedService && (
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tổng chi phí:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("vi-VN").format(selectedService.price * quantity)} ₫
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleSave} disabled={!selectedServiceId} className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Thêm dịch vụ
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
