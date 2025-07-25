import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type PaymentStatusFilter = "all" | "pending" | "completed" | "canceled"

interface PaymentFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: PaymentStatusFilter
  onStatusFilterChange: (value: PaymentStatusFilter) => void
  searchPlaceholder?: string
}

const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ thanh toán" },
  { value: "completed", label: "Đã thanh toán" },
  { value: "canceled", label: "Đã hủy" },
]

export default function PaymentFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  searchPlaceholder = "Tìm kiếm theo email bệnh nhân..."
}: PaymentFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}