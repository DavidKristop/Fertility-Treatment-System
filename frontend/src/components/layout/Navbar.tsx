import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ucarelogo.png";
import { Dropdown } from "@/components/ui/dropdown";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItemClass =
    "text-[20px] font-semibold px-4 py-6 transition-colors text-[#004c77] hover:bg-[#004c77] hover:text-white";

  const mobileNavItemClass =
    "block text-[18px] font-semibold px-4 py-3 text-[#004c77] hover:bg-[#004c77] hover:text-white";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setOpenDropdown(null); // Reset dropdown when closing
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  return (
    <header className="flex items-center justify-between px-6 py-0 bg-white border-b sticky top-0 z-50">
      <div className="flex items-center gap-2 ml-0 lg:ml-37">
        <Link to="/">
          <img src={logo} alt="UCare" className="h-15 cursor-pointer" />
        </Link>
        <Link to="/">
          <span className="text-[40px] font-bold text-[#417a9b] cursor-pointer">
            UCARE
          </span>
        </Link>
      </div>

      <div className="hidden custom:flex items-center gap-10 mr-20">
        <nav className="flex items-center text-[#004c77]">
          <Link to="/" className={navItemClass}>
            Trang Chủ
          </Link>

          <Dropdown label="Giới thiệu">
            <Link to="/about/company">
              <DropdownMenuItem className="cursor-pointer">Về UCare</DropdownMenuItem>
            </Link>
            <Link to="/doctors">
              <DropdownMenuItem className="cursor-pointer">Đội ngũ bác sĩ</DropdownMenuItem>
            </Link>
            <Link to="/about/story">
              <DropdownMenuItem className="cursor-pointer">Câu chuyện thương hiệu</DropdownMenuItem>
            </Link>
            <Link to="/blog">
              <DropdownMenuItem className="cursor-pointer">Blog</DropdownMenuItem>
            </Link>
            <Link to="blog/:id">
              <DropdownMenuItem className="cursor-pointer">Post blog</DropdownMenuItem>
            </Link>
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

        <Link to="/authorization/login">
          <Button
            variant="outline"
            className="text-[20px] font-semibold px-6 h-12 rounded-xl border-2 border-[#004c77] text-[#004c77] hover:bg-[#004c77] hover:text-white transition-colors cursor-pointer shadow-md flex items-center justify-center"
          >
            Đăng nhập
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="custom:hidden border-2 border-[#004c77] bg-[#e6f2fa] hover:bg-[#004c77] hover:text-white transition-colors shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </Button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } custom:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-[24px] font-bold text-[#417a9b]">UCARE</span>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-4">
          <Link
            to="/"
            className={mobileNavItemClass}
            onClick={toggleMobileMenu}
          >
            Trang Chủ
          </Link>

          <div className="flex flex-col">
            <button
              className={`${mobileNavItemClass} text-left flex justify-between items-center`}
              onClick={() => toggleDropdown("Giới thiệu")}
            >
              Giới thiệu
              <span>{openDropdown === "Giới thiệu" ? "−" : "+"}</span>
            </button>
            {openDropdown === "Giới thiệu" && (
              <div className="pl-6">
                <Link
                  to="/about"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Về UCare
                </Link>
                <Link
                  to="/doctors"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Đội ngũ bác sĩ
                </Link>
                <Link
                  to="/brand-story"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Câu chuyện thương hiệu
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              className={`${mobileNavItemClass} text-left flex justify-between items-center`}
              onClick={() => toggleDropdown("Bảng giá")}
            >
              Bảng giá
              <span>{openDropdown === "Bảng giá" ? "−" : "+"}</span>
            </button>
            {openDropdown === "Bảng giá" && (
              <div className="pl-6">
                <Link
                  to="/pricing/general-checkup"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Khám tổng quát
                </Link>
                <Link
                  to="/pricing/tests"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Xét nghiệm
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              className={`${mobileNavItemClass} text-left flex justify-between items-center`}
              onClick={() => toggleDropdown("Dịch vụ")}
            >
              Dịch vụ
              <span>{openDropdown === "Dịch vụ" ? "−" : "+"}</span>
            </button>
            {openDropdown === "Dịch vụ" && (
              <div className="pl-6">
                <Link
                  to="/services/checkup"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Khám bệnh
                </Link>
                <Link
                  to="/services/home-treatment"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Điều trị tại nhà
                </Link>
                <Link
                  to="/services/vaccination"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Tiêm ngừa
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <button
              className={`${mobileNavItemClass} text-left flex justify-between items-center`}
              onClick={() => toggleDropdown("Địa điểm")}
            >
              Địa điểm
              <span>{openDropdown === "Địa điểm" ? "−" : "+"}</span>
            </button>
            {openDropdown === "Địa điểm" && (
              <div className="pl-6">
                <Link
                  to="/locations/district-1"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Cơ sở Quận 1
                </Link>
                <Link
                  to="/locations/thu-duc"
                  className={mobileNavItemClass}
                  onClick={toggleMobileMenu}
                >
                  Cơ sở Thủ Đức
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/authorization/login"
            className={mobileNavItemClass}
            onClick={toggleMobileMenu}
          >
            Đăng nhập | Đăng ký
          </Link>
        </nav>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
}
