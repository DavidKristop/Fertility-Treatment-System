import { Card, CardContent } from "@/components/ui/card";

const main_img_placeholder = "https://placehold.co/600x400/FFD3A3/000?text=Happy+Couple";

export default function SuccessStorySection() {
  return (
    <div className="outer-container">
      <div className="mx-auto py-8 my-8 flex flex-col items-center border-l-2 border-b-2 border-black max-container">
        <h2 className="w-full text-2xl lg:text-3xl font-semibold text-[#005a9c] text-center mb-8">
          Trải nghiệm từ những gia đình đã thành công
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full lg:max-w-[70%]">
          <Card className="w-full lg:w-1/2 bg-transparent border-none shadow-none p-0">
            <CardContent className="p-0 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Mỗi nụ cười, mỗi ánh mắt trong bức ảnh này là minh chứng cho hành trình đầy yêu thương mà chúng tôi đã có cơ hội đồng hành. Tại Ucare, chúng tôi tin rằng phép màu không chỉ đến từ y học, mà còn đến từ sự kiên trì và niềm tin của chính bạn.
              </p>
            </CardContent>
          </Card>

          <div className="w-full lg:w-1/2 flex justify-center md:justify-end relative">
            <div>
              <img
                src={main_img_placeholder}
                alt="Happy couple"
                className="rounded shadow-lg relative z-10 w-full max-w-sm"
              />
              <div className="absolute top-0 left-0 w-full h-full border-r-16 border-b-32 border-[#FFD3A3] translate-x-3 translate-y-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
