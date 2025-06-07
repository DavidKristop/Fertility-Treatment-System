import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import Services from "@/components/layout/Services";
import Journey from "@/components/layout/Journey";
import Testimonial from "@/components/layout/Testimonial";
import CallbackForm from "@/components/layout/CallbackForm";
import ExpertSlider from "@/components/layout/ExpertSlider";
import Quotes from "@/components/layout/Quotes";
import FollowGallery from "@/components/layout/FollowGallery";
import Footer from "@/components/layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Giả sử bạn đã tạo các component cho các trang khác, ví dụ: Home, About, Contact
import Company from "@/pages/about/Company";
import Team from "@/pages/about/Team";
import Story from "./pages/about/Story";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <div className="sticky top-0 z-50 bg-white shadow">
            <Header />
            <Navbar />
          </div>

          <Routes>
            <Route path="/company" element={<Company />} />
            {/* Route cho Team */}
            <Route path="/team" element={<Team />} /> {/* Định nghĩa route cho Team */}
            {/* Các route khác, có thể dùng Layout riêng cho Home */}
            <Route path="/story" element={<Story />} />
            <Route
              path="/"
              element={
                <>
                  {/* Các component chung cho trang chủ */}
                  <Hero />
                  <Services />
                  <Journey />
                  <Testimonial />
                  <CallbackForm />
                  <ExpertSlider />
                  <Quotes />
                  <FollowGallery />
                </>
              }
            />
          </Routes>

          {/* Footer sẽ vẫn hiển thị ở cuối mỗi trang */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}
