import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface SearchAndFilterProps {
  searchTerm: string
  activeFilter: boolean
  onSearchChange: (value: string) => void
  onActiveFilterChange: (value: boolean) => void
  onSearch: () => void
  onClearFilters: () => void
}

export default function SearchAndFilter({
  searchTerm,
  activeFilter,
  onSearchChange,
  onActiveFilterChange,
  onSearch,
  onClearFilters
}: SearchAndFilterProps) {
  const handleActiveFilterChange = (value: string) => {
    onActiveFilterChange(value === "true")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Tìm kiếm & Bộ lọc
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Nhập tên thuốc..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
          <div>
            <Select onValueChange={handleActiveFilterChange} value={activeFilter.toString()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Thuốc hoạt động</SelectItem>
                <SelectItem value="false">Thuốc vô hiệu hóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={onSearch}>
            <Search className="h-4 w-4 mr-2" />
            Tìm kiếm
          </Button>
          <Button variant="outline" onClick={onClearFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Xóa bộ lọc
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}