import Hero from "@/components/layout/Hero"
import Services from "@/components/layout/Services"
import Journey from "@/components/layout/Journey"
import Testimonial from "@/components/layout/Testimonial"
import CallbackForm from "@/components/layout/CallbackForm"
import ExpertSlider from "@/components/layout/ExpertSlider"
import Quotes from "@/components/layout/Quotes"
import FollowGallery from "@/components/layout/FollowGallery"

export default function Home() {
  return (
    <div>

        <Hero />
        <Services />
        <Journey />
        <Testimonial />
        <CallbackForm />
        <ExpertSlider />
        <Quotes />
        <FollowGallery />

    </div>
  )
}