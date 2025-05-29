import Banner from '../components/home/Banner'
import ServicesSection from '../components/home/ServicesSection'
import BecomingParentsSection from '../components/home/BecomingParentsSection'
import main_img from '../assets/main.jpg'

export default function Home() {
  return (
    <div>
      <Banner />

      <ServicesSection />

      <BecomingParentsSection />

      <div className="outer-container">
        <div className="mx-auto py-[1vw] my-[2vw] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-l-2 border-b-2 border-black max-container">
          <h2 className="text-2xl lg:text-3xl lg:col-span-12 font-semibold text-[#005a9c] text-center">
              Trải nghiệm từ những gia đình đã thành công
          </h2>
          <div className="col-span-12 lg:col-start-3 lg:col-span-4 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Mỗi nụ cười, mỗi ánh mắt trong bức ảnh này là minh chứng cho hành trình đầy yêu thương mà chúng tôi đã có cơ hội đồng hành. Tại Ucare, chúng tôi tin rằng phép màu không chỉ đến từ y học, mà còn đến từ sự kiên trì và niềm tin của chính bạn.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex justify-center md:justify-end relative">
            <div>
              <img src={main_img} alt="Happy couple" className="rounded shadow-lg relative z-10" />
              <div className="absolute top-0 left-0 w-full h-full border-r-16 border-b-32 border-[#FFD3A3] translate-x-3 translate-y-4"></div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}