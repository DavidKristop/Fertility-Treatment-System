import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logo from "@/assets/ucarelogo.png";
import { Dropdown } from "@/components/ui/dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navItemClass =
    "text-[20px] font-semibold px-4 py-6 transition-colors text-[#004c77] hover:bg-[#004c77] hover:text-white";

  return (
    <header className="flex flex-wrap items-center justify-between px-6 py-0 bg-white border-b">
      <div className="flex items-center gap-2 ml-37">
        <img src={logo} alt="UCare" className="h-15" />
        <span className="text-[40px] font-bold text-[#417a9b]">UCARE</span>
      </div>

      <nav className="hidden md:flex items-center text-[#004c77] ml-40">
        <a href="#" className={navItemClass}>
          Trang chủ
        </a>

        <Dropdown label="Giới thiệu">
          <DropdownMenuItem>Về UCare</DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/doctors">Đội ngũ bác sĩ</Link> {/* ← Route này nè */}
          </DropdownMenuItem>
          <DropdownMenuItem>Câu chuyện thương hiệu</DropdownMenuItem>
        </Dropdown>

        <Dropdown label="Bảng giá">
          <DropdownMenuItem>Khám tổng quát</DropdownMenuItem>
          <DropdownMenuItem>Xét nghiệm</DropdownMenuItem>
        </Dropdown>

        <Dropdown label="Dịch vụ">
          <DropdownMenuItem>Khám bệnh</DropdownMenuItem>
          <DropdownMenuItem>Điều trị tại nhà</DropdownMenuItem>
          <DropdownMenuItem>Tiêm ngừa</DropdownMenuItem>
        </Dropdown>

        <Dropdown label="Địa điểm">
          <DropdownMenuItem>Cơ sở Quận 1</DropdownMenuItem>
          <DropdownMenuItem>Cơ sở Thủ Đức</DropdownMenuItem>
        </Dropdown>
      </nav>

      <div className="flex items-center gap-4 mr-20">
        <Button
          variant="outline"
          className="text-base font-semibold px-6 py-2 border-[#004c77] text-[#004c77] hover:bg-[#004c77] hover:text-white transition-colors"
        >
          Đăng nhập&nbsp;|&nbsp;Đăng ký
        </Button>
      </div>

      {/* Mobile menu icon (hiển thị trên mobile) */}
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="w-6 h-6" />
      </Button>
    </header>
  );
}
