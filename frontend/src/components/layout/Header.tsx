import { MapPin } from "lucide-react"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-2 bg-[#004c77] text-white hidden custom2:flex">
      {/* Hotline */}
      <div className="flex items-center gap-2 text-sm sm:text-base">
        <span className="font-bold">Hotline tư vấn:</span>
        <span className="font-normal">0903 123 1234</span>
      </div>

      {/* Địa chỉ */}
      <div className="flex items-center gap-2 text-sm sm:text-base">
        <MapPin className="w-5 h-5 text-white" />
        <span className="font-bold">
          123 Đường D1, Phường 9, Quận Thủ Đức
        </span>
      </div>
    </header>
  )
}
