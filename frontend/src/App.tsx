import { Routes, Route } from 'react-router-dom'

import Header from "@/components/layout/Header"
import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/layout/Hero"
import Services from "@/components/layout/Services"
import Journey from "@/components/layout/Journey"
import Testimonial from "@/components/layout/Testimonial"
import CallbackForm from "@/components/layout/CallbackForm"
import ExpertSlider from "@/components/layout/ExpertSlider"
import Quotes from "./components/layout/Quotes"
import FollowGallery from "./components/layout/FollowGallery"
import Footer from "./components/layout/Footer"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import LoginPage from "./pages/authorization/LoginPage"
import RegisterPage from "./pages/authorization/RegisterPage"

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── 1) Header + Navbar live at the very top, always visible ──────────── */}
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header />
        <Navbar />
      </div>

      {/* ── 2) Routes swap out only the “page content” below the Navbar ───────── */}
      <div className="flex-grow">
        <Routes>
          {/* ──── a) Landing page at “/” ───────────────────────────────────── */}
          <Route
            path="/"
            element={
              <div className="flex flex-col">
                <Hero />
                <Services />
                <Journey />
                <Testimonial />
                <CallbackForm />
                <ExpertSlider />
                <Quotes />
                <FollowGallery />
                <Footer />
              </div>
            }
          />

          {/* ──── b) Login page: still sees Header+Navbar above it ───────────── */}
          <Route
            path="/authorization/login"
            element={<LoginPage />}
          />

          {/* ──── c) Register page: still sees Header+Navbar above it ────────── */}
          <Route
            path="/authorization/register"
            element={<RegisterPage />}
          />
          
        </Routes>
      </div>
    </div>
  );
}