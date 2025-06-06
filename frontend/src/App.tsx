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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <div className="flex">
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-50 bg-white shadow">
          <Header />
          <Navbar />
        </div>
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
    </div>
  )
}