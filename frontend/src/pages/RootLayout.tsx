import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import InfoBar from '../components/InfoBar'

export default function RootLayout() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-md">
                <InfoBar />
                <NavBar />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </div>
    )
}
