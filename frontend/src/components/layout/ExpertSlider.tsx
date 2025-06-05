import Slider from "react-slick"
import Doctor1 from "@/assets/doctor1.jpg"
import Doctor2 from "@/assets/doctor2.jpg"
import Doctor3 from "@/assets/doctor3.jpg"


const experts = [
  {
    name: "Dr. Lynn Westphal",
    role: "Lead CMO, Medicine + Research & REI",
    image: Doctor1,
  },
  {
    name: "Dr. Kristin Bendikson",
    role: "CMO, Clinical Development & REI",
    image: Doctor2,
  },
  {
    name: "Dr. Amber Cooper",
    role: "CMO, Genomic + Lab Operations & REI",
    image: Doctor3,
  },
  // có thể thêm nhiều hơn...
]

function NextArrow(props: any) {
  const { onClick } = props
  return (
    <div
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-[#004c77] hover:text-[#002f4d]"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )
}

function PrevArrow(props: any) {
  const { onClick } = props
  return (
    <div
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-[#004c77] hover:text-[#002f4d]"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  )
}

export default function ExpertSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,     
    prevArrow: <PrevArrow />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  return (
    <section className="py-20 px-4 bg-white">
      <h2 className="text-2xl sm:text-3xl text-[#004c77] font-semibold text-center mb-12">
        Cùng gặp những chuyên gia
      </h2>

      <div className="max-w-6xl mx-auto relative">
        <Slider {...settings}>
          {experts.map((expert, idx) => (
            <div key={idx} className="px-4">
              <div className="bg-white text-center">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="mx-auto mb-4 rounded-md h-[300px] object-cover"
                />
                <h3 className="font-medium text-lg">{expert.name}</h3>
                <p className="font-semibold text-sm text-gray-800 mt-1">{expert.role}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}
