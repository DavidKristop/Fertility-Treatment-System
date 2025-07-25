import doctorImg from "../../assets/doctor1.jpg";

export default function DoctorDetail() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nội dung chính */}
      <div className="flex items-center justify-center p-4">
        <div className="mb-10 w-full max-w-4xl rounded-2xl bg-white p-10 text-gray-900 shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Avatar */}
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
              <img
                src={doctorImg}
                alt="Profile"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
              />
            </div>

            {/* Thông tin bác sĩ */}
            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                Dr. John Doe
              </h1>
              <p className="text-gray-600 mb-6">Bác sĩ chuyên khoa tim mạch</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Thông tin tổ chức
              </h2>
              <p className="text-gray-700 mb-6">Bệnh viện Đa khoa ABC</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Thông tin liên hệ
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">john.doe@example.com</li>
                <li className="flex items-center">+84 987 654 321</li>
                <li className="flex items-center">TP. Hồ Chí Minh, Việt Nam</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
