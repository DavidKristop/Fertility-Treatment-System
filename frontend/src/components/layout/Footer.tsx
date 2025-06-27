import {
  Facebook,
  Instagram,
  Linkedin,
  X as TwitterX
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#004c77] text-white pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-22 gap-y-8">
        {/* Liên hệ */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Liên hệ chúng tôi</h4>
          <p>Giữ liên lạc với Ucare:</p>
          <p>0903 123 1234</p>
          <p>info@ucare.vn</p>
          <div className="flex justify-center sm:justify-start gap-4 pt-2">
            <Facebook className="w-5 h-5" />
            <Instagram className="w-5 h-5" />
            <TwitterX className="w-5 h-5" />
            <Linkedin className="w-5 h-5" />
          </div>
        </div>

        {/* Giới thiệu */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Giới thiệu</h4>
          <ul className="space-y-1 text-sm">
            <li>Giới thiệu chung</li>
            <li>Chất lượng lâm sàng</li>
            <li>Chuyên gia của chúng tôi</li>
            <li>Ban lãnh đạo</li>
            <li>Câu chuyện Ucare</li>
            <li>Báo chí</li>
            <li>Tuyển dụng</li>
            <li>Câu hỏi thường gặp (FAQ)</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Chi phí */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Chi phí</h4>
          <ul className="space-y-1 text-sm">
            <li>Dịch vụ & Bảng giá</li>
            <li>Bảo hiểm</li>
            <li>Tài chính hỗ trợ</li>
          </ul>
        </div>

        {/* Dịch vụ */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Dịch vụ</h4>
          <ul className="space-y-1 text-sm">
            <li>Dịch vụ IUI</li>
            <li>Dịch vụ IVF</li>
          </ul>
        </div>

        {/* Địa điểm */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Địa điểm</h4>
          <ul className="space-y-1 text-sm">
            <li>TP. Hồ Chí Minh</li>
            <li>Thủ đô Hà Nội</li>
            <li>TP. Đà Nẵng</li>
            <li>TP. Nha Trang</li>
          </ul>
        </div>
      </div>

      {/* Gạch chia */}
      <div className="border-t border-white/70 mt-12 pt-4 text-sm flex flex-col sm:flex-row justify-between items-center gap-y-2 max-w-6xl mx-auto text-center sm:text-left">
        <p>© 2025 Ucare</p>
        <div className="flex gap-6">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">SMS Terms</a>
        </div>
      </div>
    </footer>
  )
}
