// pages/about/Team.tsx

import doctor1 from "@/assets/doctor1.jpg"; // Hình bác sĩ 1
import doctor2 from "@/assets/doctor2.jpg"; // Hình bác sĩ 2
import doctor3 from "@/assets/doctor3.jpg"; // Hình bác sĩ 3

export default function Team() {
  return (
    <div className="p-8 bg-[#f4f8fa]">
      <h1 className="text-4xl font-bold text-[#004c77] text-center mb-8">Đội Ngũ Chuyên Gia</h1>

      {/* Giới thiệu về đội ngũ */}
      <p className="text-lg text-gray-700 text-center mb-12">
        Đội ngũ chuyên gia của trung tâm điều trị hiếm muộn gồm các bác sĩ, chuyên gia y tế hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực điều trị vô sinh và hỗ trợ sinh sản. Chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe sinh sản chất lượng cao và tận tâm.
      </p>

      {/* Đội ngũ bác sĩ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Bác sĩ 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <img
            src={doctor1} // Thay bằng đường dẫn tới ảnh bác sĩ 1
            alt="Dr. Nguyễn Văn A"
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" // object-cover để giữ tỷ lệ ảnh
          />
          <h2 className="text-xl font-semibold text-[#004c77] mb-2">Bác Sĩ Nguyễn Văn A</h2>
          <p className="text-sm text-gray-600 mb-4">Chuyên gia về vô sinh – hiếm muộn</p>
          <p className="text-gray-700">
            Với hơn 15 năm kinh nghiệm trong ngành y tế, bác sĩ Nguyễn Văn A đã thực hiện hàng nghìn ca điều trị thành công cho các cặp vợ chồng hiếm muộn, mang lại niềm vui và hạnh phúc cho nhiều gia đình.
          </p>
        </div>

        {/* Bác sĩ 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <img
            src={doctor2} // Thay bằng đường dẫn tới ảnh bác sĩ 2
            alt="Dr. Lê Thị Lan"
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" // object-cover để giữ tỷ lệ ảnh
          />
          <h2 className="text-xl font-semibold text-[#004c77] mb-2">Bác Sĩ Lê Thị Lan</h2>
          <p className="text-sm text-gray-600 mb-4">Chuyên gia phẫu thuật hỗ trợ sinh sản</p>
          <p className="text-gray-700">
            Bác sĩ Lê Thị Lan chuyên môn về các phương pháp phẫu thuật hỗ trợ sinh sản và điều trị các vấn đề về sức khỏe sinh sản, giúp cải thiện tỷ lệ thành công trong các ca điều trị.
          </p>
        </div>

        {/* Bác sĩ 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <img
            src={doctor3} // Thay bằng đường dẫn tới ảnh bác sĩ 3
            alt="Dr. Trần Minh Tâm"
            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" // object-cover để giữ tỷ lệ ảnh
          />
          <h2 className="text-xl font-semibold text-[#004c77] mb-2">Bác Sĩ Trần Minh Tâm</h2>
          <p className="text-sm text-gray-600 mb-4">Chuyên gia tư vấn và điều trị vô sinh nữ</p>
          <p className="text-gray-700">
            Với chuyên môn sâu về vô sinh nữ, bác sĩ Trần Minh Tâm đã giúp hàng trăm phụ nữ vượt qua những vấn đề khó khăn về sức khỏe sinh sản, mang lại hy vọng mới cho họ.
          </p>
        </div>
      </div>

      {/* Kết thúc giới thiệu */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold text-[#004c77] mb-4">Đội Ngũ Nhân Viên Hỗ Trợ</h2>
        <p className="text-lg text-gray-700 mb-6">
          Bên cạnh đội ngũ bác sĩ, trung tâm còn có đội ngũ nhân viên hỗ trợ chuyên nghiệp, tận tâm, luôn sẵn sàng đồng hành và chăm sóc bạn trong suốt quá trình điều trị.
        </p>
      </div>
    </div>
  );
}
