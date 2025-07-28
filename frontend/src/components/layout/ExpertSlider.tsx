import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPublicDoctors } from "@/api/doctor-management";
import type { DoctorProfile } from "@/api/types";
import doctorDefaultImg from "@/assets/doctor1.jpg";
import { toast } from "react-toastify";

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -right-2 top-[200px] -translate-y-1/2 z-10 cursor-pointer text-[#004c77] hover:text-[#002f4d]"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className="absolute -left-2 top-[200px] -translate-y-1/2 z-10 cursor-pointer text-[#004c77] hover:text-[#002f4d]"
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
  );
}

export default function ExpertSlider() {
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getPublicDoctors(0, 6); // Lấy 6 bác sĩ đầu tiên
        setDoctors(response.payload.content);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Không thể tải danh sách bác sĩ");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

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
        settings: { slidesToShow: 2, arrows: true },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: true },
      },
    ],
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="text-center">Đang tải thông tin bác sĩ...</div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <h2 className="text-2xl sm:text-3xl text-[#004c77] font-semibold text-center mb-12">
        Cùng gặp những chuyên gia
      </h2>

      <div className="max-w-6xl mx-auto relative">
        <Slider {...settings}>
          {doctors.map((doctor) => (
            <div key={doctor.id} className="px-4">
              <div className="bg-white text-center border rounded-lg shadow-md p-4">
                <img
                  src={doctor.avatarUrl || doctorDefaultImg}
                  alt={doctor.fullName}
                  className="mx-auto mb-4 rounded-md h-[300px] w-full object-cover"
                />
                <h3 className="font-medium text-lg text-[#004c77]">{doctor.fullName}</h3>
                <p className="font-semibold text-sm text-gray-800 mt-1">{doctor.specialty}</p>
                <p className="text-sm text-gray-600 mt-1">{doctor.degree}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}