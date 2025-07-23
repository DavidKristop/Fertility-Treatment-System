import { Button } from "@/components/ui/button"
import demo_hospital from "@/assets/doctor1.jpg"
import { Calendar, Stethoscope, TestTube, Phone, CheckCircle, Clock } from "lucide-react"

export default function Iui() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="outer-container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center items-center max-container">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
              Thụ tinh nhân tạo
              <span className="text-blue-600"> (IUI)</span>
              <span className="block text-3xl md:text-4xl xl:text-5xl mt-2 text-muted-foreground">
                Intrauterine Insemination
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              IUI là phương pháp hỗ trợ sinh sản nhẹ nhàng, hiệu quả giúp các cặp vợ chồng hiện thực hóa ước mơ làm cha mẹ.
              Đây là thủ thuật ít xâm lấn, đưa tinh trùng đã được chuẩn bị đặc biệt trực tiếp vào buồng tử cung vào thời điểm rụng trứng.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Đặt lịch tư vấn
              </Button>
              <Button variant="outline" size="lg">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 justify-self-end">
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Tư vấn với bác sĩ hỗ trợ sinh sản"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is IUI Section */}
      <section className="bg-slate-50 py-16 md:py-24 outer-container">
        <div className="mx-auto px-4 max-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Minh họa quy trình IUI"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">IUI là gì?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Thụ tinh nhân tạo (IUI) là phương pháp hỗ trợ sinh sản trong đó tinh trùng đã được chuẩn bị đặc biệt sẽ được bơm trực tiếp vào buồng tử cung vào thời điểm rụng trứng.
                Thủ thuật này giúp tăng số lượng tinh trùng tiếp cận được ống dẫn trứng, từ đó tăng khả năng thụ thai tự nhiên.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Ít xâm lấn</h3>
                    <p className="text-muted-foreground">Thủ thuật đơn giản, ít gây khó chịu hơn so với IVF</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Chi phí hợp lý</h3>
                    <p className="text-muted-foreground">
                      Lựa chọn phù hợp về chi phí cho nhiều cặp vợ chồng bắt đầu điều trị hiếm muộn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Quá trình tự nhiên</h3>
                    <p className="text-muted-foreground">Quá trình thụ tinh diễn ra tự nhiên trong cơ thể</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IUI Process Steps */}
      <section className="py-16 md:py-24 mx-auto outer-container">
        <div className="px-4 max-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy trình IUI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quy trình IUI tại trung tâm của chúng tôi được xây dựng khoa học, tối ưu hóa cơ hội thành công cho bạn.
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold">Tư vấn & Khám tổng quát</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Hành trình của bạn bắt đầu bằng buổi tư vấn toàn diện, bao gồm khai thác tiền sử, khám lâm sàng và làm các xét nghiệm cần thiết cho cả hai vợ chồng.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Xét nghiệm nội tiết sinh sản</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Siêu âm kiểm tra tử cung, buồng trứng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Phân tích tinh dịch đồ</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital}
                alt="Tư vấn bác sĩ"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Theo dõi rụng trứng"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold">Theo dõi rụng trứng</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Bác sĩ sẽ theo dõi chu kỳ rụng trứng của bạn bằng siêu âm và xét nghiệm máu để xác định thời điểm thích hợp nhất cho thủ thuật IUI. Một số trường hợp sẽ được chỉ định dùng thuốc kích thích rụng trứng.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Hẹn tái khám định kỳ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Theo dõi nồng độ hormone</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Dự đoán thời điểm rụng trứng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold">Chuẩn bị tinh trùng</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Vào ngày thực hiện, mẫu tinh dịch sẽ được lấy và xử lý tại phòng lab để chọn lọc những tinh trùng khỏe mạnh, di động tốt nhất cho thủ thuật bơm.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Rửa và cô đặc tinh trùng</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Đánh giá chất lượng</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Chuẩn bị cho bơm tinh trùng</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital}
                alt="Chuẩn bị tinh trùng"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital}
                alt="Thực hiện IUI"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-2xl font-bold">Thực hiện IUI & Theo dõi</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Tinh trùng đã chuẩn bị sẽ được bơm nhẹ nhàng vào buồng tử cung bằng ống thông mảnh. Thủ thuật diễn ra nhanh chóng, hầu hết phụ nữ chỉ cảm thấy hơi khó chịu nhẹ.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Thời gian thực hiện 5-10 phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Kiểm tra thai sau 2 tuần</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Hỗ trợ và theo dõi liên tục</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            {/* Content */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng cho hành trình làm cha mẹ?</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Hãy để đội ngũ chuyên gia của chúng tôi đồng hành cùng bạn. Đặt lịch tư vấn ngay hôm nay để tìm hiểu IUI có phù hợp với bạn không.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="w-4 h-4" />
                Đặt lịch tư vấn
              </Button>
              <Button size="lg" variant="secondary">
                Gọi (028) 1234 5678
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}