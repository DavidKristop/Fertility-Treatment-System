import heroImage from "@/assets/hero.jpg"
import logo from "@/assets/logo.png"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { Link } from "react-router-dom"


export default function Hero() {
  return (
    <section className="relative w-full h-[700px] overflow-hidden">
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-full object-cover object-top"
      />
      <div className="flex-col absolute top-10 left-40 text-white rounded-md shadow-lg w-[400px] h-[400px]"
            style={{ backgroundColor: "rgba(0, 76, 119, 0.8)" }}>
            <img 
                src={logo}
                className="w-[200px] h-[200px] ml-25"
            />
            <div className="w-3/4 h-[3px] bg-white ml-12"></div>
            <span className="flex justify-center text-center mt-8">
                Đồng hành cùng bạn vì một cuộc sống khỏe mạnh. “Khám nhanh - Điều trị chuẩn - Dịch vụ tận tâm”.
            </span>

            <div className="mt-4 flex justify-center">
              <Link to="/authorization/login">
                <Button
                    className="text-[#004c77] bg-white text-2xl font-bold px-12 py-8 rounded-full uppercase hover:bg-[#004c77] hover:text-white"
                    >
                    Lên lịch
                </Button>
              </Link>
                
            </div>

        </div>

        <div className="flex-col absolute top-120 left-250 text-white rounded-full shadow-lg w-[380px] h-[100px] hover:scale-105 hover:shadow-xl transition-transform duration-300"
            style={{ backgroundColor: "rgba(0, 76, 119, 0.8)" }}>
            <span className="flex items-center gap-2 ml-10 mt-7 text-4xl font-bold">
                <Phone className="w-10 h-10" />
                0903 123 1234
            </span>
        </div>

        

    </section>
  )
}
