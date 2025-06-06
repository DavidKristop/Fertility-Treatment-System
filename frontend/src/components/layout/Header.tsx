import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { MapPin } from "lucide-react"

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-2 bg-[#004c77] text-white">
      
      {/* Tìm kiếm */}
      <div className="relative w-full sm:w-64 ml-35">
        <Input
          placeholder="Tìm kiếm..."
          className="pr-10 text-black bg-white placeholder:text-gray-400"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Hotline */}
      <div className="flex-1 text-sm sm:text-base text-center sm:text-left">
        <span className="font-bold">
          Hotline tư vấn: <span className="font-normal">0903 123 1234</span>
        </span>
      </div>

      {/* Địa chỉ */}
      <div className="w-full sm:w-auto text-sm sm:text-base text-center sm:text-right mr-20 flex items-center justify-center sm:justify-end gap-2">
        <MapPin className="w-5 h-5 text-white" />
        <span className="font-bold">
          123 Đường D1, Phường 9, Quận Thủ Đức
        </span>
      </div>

    </header>
  )
}
