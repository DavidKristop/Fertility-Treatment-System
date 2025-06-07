import { Quote } from "lucide-react"

const feedbacks = [
  {
    quote:
      "Sau nhiều năm chạy chữa ở khắp nơi, vợ chồng tôi đã được bác sĩ ở đây tư vấn và điều trị đúng hướng. Giờ con trai tôi đã hơn 1 tuổi. Không biết nói gì hơn ngoài hai từ: biết ơn!",
    name: "Chị Thu Hà, 36 tuổi",
  },
  {
    quote:
      "Từ khâu tư vấn ban đầu đến ngày chuyển phôi đều rất chuyên nghiệp, nhẹ nhàng và đầy nhân văn. Cảm giác không còn là bệnh nhân mà là người được đồng hành.",
    name: "Anh Minh T., quận Tân Bình",
  },
  {
    quote:
      "Mình chọn IVF tại đây sau khi thất bại ở nơi khác. Cả đội ngũ bác sĩ và điều dưỡng đều tận tâm, giải thích kỹ lưỡng từng bước. Nay bé gái đã 3 tháng tuổi, khỏe mạnh và đáng yêu vô cùng.",
    name: "Chị Lan Anh, Đồng Nai",
  },
  {
    quote:
      "Tôi từng rất lo lắng vì tuổi đã ngoài 40. Nhưng nhờ bác sĩ hỗ trợ đúng cách, mình đã có thai tự nhiên sau khi làm IUI tại đây. Đúng là phép màu!",
    name: "Chị Nguyễn Hương, 42 tuổi",
  },
  {
    quote:
      "Không gian sạch đẹp, quy trình rõ ràng, bác sĩ lắng nghe và không phán xét. Đây là nơi mình cảm thấy được tôn trọng và hy vọng thật sự.",
    name: "Chị My Vân, TP.HCM",
  },
  {
    quote:
      "Nhân viên gọi điện nhắc lịch nhẹ nhàng, hỗ trợ mình từng giấy tờ bảo hiểm. Một trải nghiệm rất khác biệt so với những nơi mình từng đến.",
    name: "Anh Hoàng K., Bình Dương",
  },
]

export default function Quotes() {
  return (
    <section className="bg-white py-20 px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#004c77] text-center mb-12">
        Đánh giá của các bệnh nhân
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {feedbacks.map((item, idx) => (
          <div key={idx} className="bg-gray-100 p-6 rounded-md shadow-sm hover:scale-105 hover:shadow-xl transition-transform duration-300">
            <Quote className="text-[#004c77] w-8 h-8 mb-4" />
            <p className="text-gray-700 mb-4">“{item.quote}”</p>
            <p className="font-semibold text-black">— {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
