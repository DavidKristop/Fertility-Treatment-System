import img1 from "@/assets/family1.jpg"
import img2 from "@/assets/family2.jpg"
import img3 from "@/assets/family3.jpg"
import img4 from "@/assets/family4.jpg"
import img5 from "@/assets/family5.png"

export default function FollowGallery() {
  return (
    <section className="py-20 px-4 bg-white">
      <h2 className="text-2xl sm:text-3xl text-[#004c77] font-semibold text-center mb-12 relative w-fit mx-auto after:block after:mt-2 after:h-[2px] after:bg-[#004c77] after:w-[80px]">
        Theo dõi @Ucare
      </h2>

      <div className="max-w mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ảnh lớn bên trái */}
        <div className="lg:col-span-1">
          <img src={img1} alt="Family" className="w-3xl h-full object-cover rounded-md" />
        </div>

        {/* Ảnh phải 2 hàng 2 cột */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <img src={img2} alt="Family 2" className="w-full h-full object-cover rounded-md" />
          <img src={img3} alt="Family 3" className="w-full h-full object-cover rounded-md" />
          <img src={img4} alt="Family 4" className="w-full h-full object-cover rounded-md" />
          <img src={img5} alt="Family 5" className="w-full h-full object-cover rounded-md" />
        </div>
      </div>
    </section>
  )
}
