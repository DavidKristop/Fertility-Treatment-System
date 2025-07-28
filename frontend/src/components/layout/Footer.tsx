import { Link } from "react-router-dom"
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
          <p>0903 123 1234</p>
          <p className="text-sm break-words">ucaretreatmentsystem@gmail.com</p>
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
            <li>
              <Link to="/about/company" className="hover:underline">
                Về UCare
              </Link>
            </li>
            <li>
              <Link to="doctors" className="hover:underline">
                Đội ngũ bác sĩ
              </Link>
            </li>
            <li>
              <Link to="/about/story" className="hover:underline">
                Câu chuyện UCare
              </Link>
            </li>
            <li>
              <Link to="blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Chi phí */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Chi phí</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/pricing/services" className="hover:underline">
                Bảng giá dịch vụ
              </Link>
            </li>
          </ul>
        </div>

        {/* Dịch vụ */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Dịch vụ</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/services/iui" className="hover:underline">
                Dịch vụ IUI
              </Link>
            </li>
            <li>
              <Link to="/services/ivf" className="hover:underline">
                Dịch vụ IVF
              </Link>
            </li>
          </ul>
        </div>

        {/* Địa điểm */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="font-bold text-[19px]">Địa điểm</h4>
          <ul className="space-y-1 text-sm">
            <li>123 Đường D1, Phường 9, Quận Thủ Đức</li>
          </ul>
        </div>
      </div>

      {/* Gạch chia */}
      <div className="border-t border-white/70 mt-12 pt-4 text-sm flex flex-col sm:flex-row justify-between items-center gap-y-2 max-w-6xl mx-auto text-center sm:text-left">
        <p>© 2025 Ucare</p>
      </div>
    </footer>
  )
}
