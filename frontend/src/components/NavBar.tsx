import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/icon-color.png';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const navItems = [
    {
        to: '/',
        label: 'TRANG CHỦ',
    },
    {
        to: '/about',
        label: 'GIỚI THIỆU',
        submenu: [
            { to: '/about/company', label: 'Về chúng tôi' },
            { to: '/about/team', label: 'Đội ngũ' },
            { to: '/about/quality', label: 'Chất lượng lâm sàng' },
            { to: '/about/experts', label: 'Chuyên gia của chúng tôi' },
            { to: '/about/management', label: 'Ban lãnh đạo' },
            { to: '/about/story', label: 'Câu chuyện Ucare' },
            { to: '/about/press', label: 'Báo chí' },
            { to: '/about/careers', label: 'Tuyển dụng' },
            { to: '/about/faq', label: 'Câu hỏi thường gặp (FAQ)' },
            { to: '/about/blog', label: 'Blog' },
        ],
    },
    {
        to: '/pricing',
        label: 'BẢNG GIÁ',
        submenu: [
            { to: '/pricing/services', label: 'Dịch vụ & Bảng giá' },
            { to: '/pricing/insurance', label: 'Bảo hiểm' },
            { to: '/pricing/financing', label: 'Tài chính hỗ trợ' },
        ],
    },
    {
        to: '/services',
        label: 'DỊCH VỤ',
        submenu: [
            { to: '/services/iui', label: 'Dịch vụ IUI' },
            { to: '/services/ivf', label: 'Dịch vụ IVF' },
        ],
    },
    {
        to: '/news',
        label: 'TIN TỨC',
        submenu: [
            { to: '/news/hcm', label: 'TP. Hồ Chí Minh' },
            { to: '/news/hanoi', label: 'Thủ đô Hà Nội' },
            { to: '/news/danang', label: 'TP. Đà Nẵng' },
            { to: '/news/nhatrang', label: 'TP. Nha Trang' },
        ],
    },
];

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        if (menuOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setMenuOpen(false);
                setIsClosing(false);
            }, 200);
        } else {
            setMenuOpen(true);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            // Auto-close menu on navigation if it was open
            setIsClosing(true);
            setTimeout(() => {
                setMenuOpen(false);
                setIsClosing(false);
            }, 200);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'clip';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <div className="outer-container bg-white shadow-sm h-14 border-t-2 border-[#2a3c8e]">
            <div className="max-container flex items-center justify-between px-6 h-full">
                <Button
                    onClick={toggleMenu}
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-9 w-9 text-black bg-gray-200 text-xl"
                >
                    &#9776;
                </Button>

                <NavLink to="/" className="flex items-center space-x-1">
                    <img src={logo} alt="UCARE Logo" className="h-8 w-auto" />
                    <h1 className="font-bold text-[#2a3c8e] text-xl tracking-tight">UCARE</h1>
                </NavLink>

                <NavigationMenu className="hidden lg:flex flex-grow justify-center mx-4">
                    <NavigationMenuList className="gap-x-2"> 
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.label} className="h-full">
                                {item.submenu ? (
                                    <NavigationMenuTrigger
                                        className="text-[#2a3c8e] font-semibold py-1 px-3 
                                         group-data-[state=open]:bg-gray-100 group-data-[state=open]:text-[#2a3c8e] group-data-[state=open]:shadow-none"
                                    >
                                        {item.label}
                                    </NavigationMenuTrigger>
                                ) : (
                                    <NavigationMenuLink asChild>
                                        <NavLink
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `font-semibold py-1 px-3 rounded-sm transition-colors duration-200 
                                                ${isActive
                                                    ? 'bg-[#2a3c8e] text-white'
                                                    : 'text-[#2a3c8e] hover:bg-gray-200'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </NavigationMenuLink>
                                )}

                                <NavigationMenuContent>
                                    <ul className="grid w-[180px] gap-1 p-2">
                                        {item.submenu && item.submenu.map((subItem) => (
                                            <li key={subItem.label}>
                                                <NavigationMenuLink asChild>
                                                    <NavLink
                                                        to={subItem.to}
                                                        className="block px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
                                                    >
                                                        {subItem.label}
                                                    </NavLink>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                <NavLink to="/authorization/login" className="hidden lg:flex flex-shrink-0 ml-auto">
                    <Button
                        variant="outline"
                        className="text-[#2a3c8e] border-[#2a3c8e] border-2 rounded-full px-3 py-1.5 font-semibold text-xs shadow-sm 
                                   hover:bg-[#2a3c8e] hover:text-white transition-colors duration-200 h-auto"
                    >
                        ĐĂNG NHẬP | ĐĂNG KÝ
                    </Button>
                </NavLink>

                {menuOpen && (
                    <section className={`fixed w-full max-h-screen overflow-y-auto top-0 left-0 z-50 bg-[#2a3c8e] text-white lg:hidden flex flex-col justify-start space-y-4 pt-4 pb-8 
                            ${isClosing ? 'animate-close-menu' : 'animate-open-menu'}
                          `}>
                        <Button
                            onClick={toggleMenu}
                            variant="ghost"
                            size="icon"
                            className="self-end mr-4 text-3xl" 
                        >
                            &times; 
                        </Button>

                        <nav className="flex flex-col items-start space-y-3 px-4">
                            {navItems.map((item) => (
                                <div key={item.label} className="w-full">
                                    {item.submenu ? (
                                        <>
                                            <h2 className="font-semibold text-lg py-1 flex items-center justify-between cursor-pointer">
                                                {item.label}
                                            </h2>
                                            <ul className="pl-3 space-y-1 text-base">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.label}>
                                                        <NavLink to={subItem.to} onClick={toggleMenu} className="block hover:text-gray-300 py-0.5">
                                                            {subItem.label}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.to}
                                            onClick={toggleMenu}
                                            className={({ isActive }) =>
                                                `block font-semibold text-lg py-1 ${isActive ? 'text-gray-300' : 'hover:text-gray-300'}` 
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    )}
                                </div>
                            ))}
                            <NavLink to="/authorization/login" onClick={toggleMenu} className="w-full mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full border-white border-2 rounded-full px-4 py-1.5 font-semibold text-base text-black
                                               hover:bg-white hover:text-[#2a3c8e] transition-colors duration-200"
                                >
                                    ĐĂNG NHẬP | ĐĂNG KÝ
                                </Button>
                            </NavLink>
                        </nav>
                    </section>
                )}
            </div>
        </div>
    );
}