import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import ScrollToTop from '@/components/ScrollToTop';
import { ToastContainer } from 'react-toastify';

export default function RootLayout() {
  return (
    <div className="min-h-screen text-gray-900 flex flex-col">
      <header className="sticky top-0 z-50 shadow-md bg-white">
        <Header />
        <Navbar />
      </header>

      <main className="flex-grow">
        <ScrollToTop />
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}