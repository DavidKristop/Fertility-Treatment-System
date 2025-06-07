// pages/about/Story.tsx

import logo from "@/assets/ucarelogo.png"; // Đảm bảo bạn đã có logo trong thư mục assets

export default function Story() {
  return (
    <div className="p-8 bg-[#f4f8fa]">
      {/* Hiển thị logo ở đầu trang */}
      <div className="flex justify-center mb-8">
        <img
          src={logo}  // Đường dẫn tới logo
          alt="Ucare Logo"
          className="w-32 h-auto mb-4"  // Kích thước logo
        />
      </div>

      <h1 className="text-4xl font-bold text-[#004c77] text-center mb-8">Câu Chuyện Thương Hiệu Ucare</h1>

      {/* Mô tả câu chuyện */}
      <div className="max-w-4xl mx-auto text-lg text-gray-700 mb-12">
        <p className="mb-6">
          Ucare ra đời với sứ mệnh mang lại hy vọng và hạnh phúc cho những cặp vợ chồng đang gặp phải khó khăn trong việc sinh con. Từ những ngày đầu thành lập, Ucare đã xác định rõ ràng mục tiêu trở thành trung tâm điều trị hiếm muộn uy tín, chuyên nghiệp và tận tâm nhất. Chúng tôi không chỉ cung cấp dịch vụ chăm sóc sức khỏe sinh sản chất lượng cao mà còn tạo ra môi trường an toàn, ấm áp và đầy hy vọng cho các cặp vợ chồng trong hành trình tìm kiếm con yêu.
        </p>

        <p className="mb-6">
          Trải qua nhiều năm nỗ lực không ngừng, Ucare đã khẳng định được vị thế của mình trong lĩnh vực điều trị hiếm muộn. Với đội ngũ bác sĩ chuyên gia đầu ngành, cơ sở vật chất hiện đại và những phương pháp điều trị tiên tiến, chúng tôi cam kết giúp đỡ khách hàng vượt qua mọi thử thách về sức khỏe sinh sản, đồng thời mang lại kết quả điều trị hiệu quả và bền vững.
        </p>

        <p className="mb-6">
          Ucare không chỉ là một trung tâm điều trị, mà còn là một người bạn đồng hành trong hành trình làm cha mẹ. Chúng tôi hiểu rằng mỗi hành trình là một câu chuyện riêng biệt, và chúng tôi tự hào khi được là phần không thể thiếu trong hành trình đó, giúp các gia đình viết nên câu chuyện của chính mình, với niềm vui và hy vọng luôn hiện diện.
        </p>

        <p className="mb-6">
          Từ khi thành lập cho đến nay, Ucare đã giúp hàng nghìn cặp vợ chồng hoàn thành giấc mơ làm cha mẹ. Và chúng tôi vẫn tiếp tục cống hiến hết mình để mang lại nhiều hơn nữa những kết quả tích cực cho cộng đồng, vì chúng tôi tin rằng mỗi gia đình xứng đáng có cơ hội trải nghiệm niềm hạnh phúc này.
        </p>
      </div>
    </div>
  );
}
