import { NavLink } from 'react-router-dom'
import logo from '../assets/icon-color.png'

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
    return (
        <div className="grid grid-cols-2 lg:grid-cols-12 lg:gap-4 items-center px-6">
            <div className="lg:col-span-3 flex items-center justify-center py-3">
                <img src={logo} alt="UCARE Logo" className="w-[20%] h-auto" />
                <h1 className="font-bold text-blue-500 filter saturate-50 text-4xl">UCARE</h1>
            </div>

            <nav className="h-full lg:col-span-6 flex items-center justify-evenly uppercase text-center">
                {navItems.map(({ label, to, submenu }) => (
                    <div key={label} className="h-full relative group">
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `h-full text-blue-800 font-medium px-3 inline-flex items-center ${isActive
                                    ? 'bg-blue-800 filter saturate-70 text-white'
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

            <div className="lg:col-span-3 flex justify-center">
                <NavLink
                    to="/authorization"
                    className="bg-white border border-gray-300 rounded-full px-4 py-1 text-blue-800 shadow-lg hover:bg-gray-100 text-lg font-semibold"
                >
                    ĐĂNG NHẬP | ĐĂNG KÝ
                </NavLink>
            </div>
        </div>
    )
}