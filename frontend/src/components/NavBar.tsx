import { NavLink } from 'react-router-dom'
import logo from '../assets/icon-color.png'
import { useState, useEffect } from "react";

const navItems = [
    {
        to: '/',
        label: 'TRANG CHỦ',
    },
    {
        to: '/about',
        label: 'GIỚI THIỆU',
        submenu: [
            { to: 'about/company', label: 'Về chúng tôi' },
            { to: 'about/team', label: 'Đội ngũ' }
        ]
    },
    {
        to: '/pricing',
        label: 'BẢNG GIÁ',
        submenu: [
            { label: 'Dịch vụ & Bảng giá', to: 'pricing/services' },
            { label: 'Bảo hiểm', to: 'pricing/insurance' },
            { label: 'Tài chính hỗ trợ', to: 'pricing/financing' },
        ],
    },
    {
        to: '/services',
        label: 'DỊCH VỤ',
        submenu: [
            { label: 'Dịch vụ IUI', to: 'services/iui' },
            { label: 'Dịch vụ IVF', to: 'services/ivf' },
        ],
    },
    {
        to: '/news',
        label: 'TIN TỨC',
        submenu: [
            { label: 'TP. Hồ Chí Minh', to: 'news/hcm' },
            { label: 'Thủ đô Hà Nội', to: 'news/hanoi' },
            { label: 'TP. Đà Nẵng', to: 'news/danang' },
            { label: 'TP. Nha Trang', to: 'news/nhatrang' },
        ],
    },
];

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'clip'; // Disable scroll
        } else {
            document.body.style.overflow = ''; // Re-enable scroll
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <div className="outer-container">
            <div className="max-container">
                <section className="grid grid-cols-12 lg:gap-8 items-center">
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden col-start-1 col-span-2 ml-[3vw] py-[1vw] text-[4vw] font-sm focus:outline-none border-[0.4vw] border-black rounded-lg cursor-pointer">
                        &#9776;
                    </button>

                    <div className="col-start-4 col-span-6 lg:col-start-1 lg:col-span-3 gap-0 flex items-center justify-start py-3">
                        <img src={logo} alt="UCARE Logo" className="w-[25%] h-auto mr-[2vw]" />
                        <h1 className="font-bold text-blue-500 saturate-50 text-[8vw] lg:text-[2.5vw]">UCARE</h1>
                    </div>

                    <nav className="hidden lg:flex h-full col-span-6 items-center justify-evenly uppercase text-center">
                        {navItems.map(({ label, to, submenu }) => (
                            <div key={label} className="h-full relative group">
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `h-full text-blue-800 font-medium px-3 inline-flex items-center ${isActive
                                            ? 'bg-blue-800 saturate-70 text-white'
                                            : 'hover:text-blue-500'
                                        }`
                                    }
                                >
                                    {label}
                                    {submenu && <span className="ml-1 text-sm">▼</span>}
                                </NavLink>

                                {submenu && (
                                    <div className="absolute top-18 w-56 bg-white rounded-md shadow-lg invisible group-hover:visible transition-all duration-0 z-10">
                                        {submenu.map((item) => (
                                            <NavLink
                                                key={item.to}
                                                to={item.to}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                {item.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="hidden lg:flex col-span-3 justify-end">
                        <NavLink
                            to="/authorization"
                            className="bg-white border border-gray-300 rounded-full px-4 py-1 text-blue-800 shadow-lg hover:bg-gray-100 text-lg font-semibold"
                        >
                            ĐĂNG NHẬP | ĐĂNG KÝ
                        </NavLink>
                    </div>
                </section>

                {menuOpen &&
                    <section className="fixed w-full max-h-screen overflow-y-scroll top-0 z-50 bg-blue-800 saturate-70 text-5xl text-white lg:hidden flex flex-col justify-start space-y-10 origin-top animate-open-menu">
                        <button
                            onClick={toggleMenu}
                            className="self-start pl-6 text-8xl cursor-pointer">
                            &times;
                        </button>

                        <nav className="flex flex-col h-full items-start space-y-6 pl-8">
                            <div>
                                <NavLink
                                    to="#"
                                    className="font-semibold">
                                    Trang chủ
                                </NavLink>
                            </div>

                            <div>
                                <h2 className="font-semibold pt-8">Giới thiệu</h2>
                                <ul className="text-2xl space-y-3 pl-6 pt-6">
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

                            <div>
                                <h2 className="font-semibold">Bảng giá</h2>
                                <ul className="text-2xl space-y-3 pl-6 pt-6">
                                    <li>Dịch vụ & Bảng giá</li>
                                    <li>Bảo hiểm</li>
                                    <li>Tài chính hỗ trợ</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-semibold">Dịch vụ</h2>
                                <ul className="text-2xl space-y-3 pl-6 pt-6">
                                    <li>Dịch vụ NUI</li>
                                    <li>Dịch vụ IVF</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-semibold">Địa điểm</h2>
                                <ul className="text-2xl space-y-3 pl-6 pt-6">
                                    <li>TP Hồ Chí Minh</li>
                                    <li>Thủ đô Hà Nội</li>
                                    <li>TP Đà Nẵng</li>
                                    <li>TP Nha Trang</li>
                                </ul>
                            </div>
                        </nav>
                    </section>
                }
            </div>

        </div>
    )
}