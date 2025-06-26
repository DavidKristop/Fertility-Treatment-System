// pages/about/Company.tsx

import treatmentImage from "@/assets/treatment-image.jpg"; // Đảm bảo bạn đã có ảnh này trong thư mục assets

export default function Company() {
  return (
    <div className="flex items-center justify-between p-8 bg-[#f4f8fa]">
      {/* Phần hình ảnh bên trái */}
      <div className="w-1/2">
        <img 
          src={treatmentImage} 
          alt="Treatment Center"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Phần văn bản bên phải */}
      <div className="w-1/2 pl-8">
        <h1 className="text-3xl font-bold text-[#004c77] mb-4">Trung Tâm Điều Trị Hiếm Muộn</h1>
        <p className="text-lg text-gray-700 mb-6">
          Trung tâm điều trị hiếm muộn của chúng tôi được trang bị các thiết bị hiện đại và đội ngũ bác sĩ chuyên gia, cam kết mang đến cơ hội làm cha mẹ cho các cặp vợ chồng đang gặp khó khăn trong việc có con.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Với phương pháp điều trị tiên tiến và quy trình chăm sóc tận tâm, chúng tôi giúp bạn vượt qua mọi thử thách về sức khỏe sinh sản. Tại đây, bạn sẽ được trải nghiệm sự chăm sóc chuyên nghiệp, an toàn và hiệu quả, mang đến cơ hội làm cha mẹ cho bạn và gia đình.
        </p>
        <p className="text-lg text-gray-700">
          Chúng tôi tự hào là nơi đồng hành cùng bạn trên hành trình tìm kiếm hạnh phúc gia đình. Hãy để chúng tôi giúp bạn thực hiện giấc mơ làm cha mẹ của mình.
        </p>
      </div>
    </div>
  );
}
