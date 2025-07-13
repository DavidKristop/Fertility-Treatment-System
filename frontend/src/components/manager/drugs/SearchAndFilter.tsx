import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

type DrugStatusFilter = "active" | "inactive"

interface SearchAndFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: DrugStatusFilter
  onStatusFilterChange: (value: DrugStatusFilter) => void
  searchPlaceholder?: string
}

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  searchPlaceholder = "Tìm kiếm thuốc..."
}: SearchAndFilterProps) {
  return (
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Thuốc hoạt động</SelectItem>
              <SelectItem value="inactive">Thuốc vô hiệu hóa</SelectItem>
            </SelectContent>
          </Select>
        </div>
  )
}