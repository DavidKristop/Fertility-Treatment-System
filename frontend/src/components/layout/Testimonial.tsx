import happyCouple from "@/assets/happycouple.jpg" // Đổi đúng ảnh bạn có

export default function Testimonial() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Text trái */}
        <div className="border-l-2 border-black pl-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#004c77] mb-6">
            Trải nghiệm từ những gia đình đã thành công
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Mỗi nụ cười, mỗi ánh mắt trong bức ảnh này là minh chứng cho hành trình đầy yêu thương mà chúng tôi đã có cơ hội đồng hành. Tại Ucare, chúng tôi tin rằng phép màu không chỉ đến từ y học, mà còn đến từ sự kiên trì và niềm tin của chính bạn.
          </p>
        </div>

        {/* Hình ảnh phải */}
        <div className="relative w-fit mx-auto">
          {/* Nền viền cam nhạt */}
          <div className="absolute top-4 left-4 w-full h-full bg-[#fddbb1] z-0 rounded-sm" />
          {/* Ảnh nổi lên trên */}
          <img
            src={happyCouple}
            alt="Gia đình hạnh phúc"
            className="relative z-10 w-full max-w-md rounded-sm shadow-md"
          />
        </div>
      </div>
    </section>
  )
}
