import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import doctorImg from "../../../assets/doctor1.jpg";

export default function DoctorDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy thông tin bác sĩ</p>
          <Button variant="outline" onClick={() => navigate("/doctors")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách bác sĩ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center p-4">
        <div className="mb-10 w-full max-w-4xl rounded-2xl bg-white p-10 text-gray-900 shadow-xl">
          <Button
            variant="outline"
            onClick={() => navigate("/doctors")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách bác sĩ
          </Button>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
              <img
                src={doctor.avatarUrl || doctorImg}
                alt={doctor.fullName}
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
              />
            </div>

            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                {doctor.fullName}
              </h1>
              <p className="text-gray-600 mb-6">{doctor.specialty}</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Thông tin chuyên môn
              </h2>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>Chuyên khoa: {doctor.specialty}</li>
                <li>Bằng cấp: {doctor.degree}</li>
                <li>Kinh nghiệm: {doctor.yearsOfExperience} năm</li>
                <li>Chứng chỉ hành nghề: {doctor.licenseNumber}</li>
              </ul>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Thông tin liên hệ
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>Email: {doctor.email}</li>
                <li>Điện thoại: {doctor.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
