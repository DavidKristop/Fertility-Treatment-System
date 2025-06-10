import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, Stethoscope, Calendar, TestTube, Microscope, Heart, Clock } from "lucide-react";
import demo_hospital from "src/assets/doctor1.jpg";

export default function Ivf() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="outer-container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 justify-items-center items-center max-container">
          {/* Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-6">
              Thụ Tinh
              <span className="text-blue-600"> Trong Ống Nghiệm</span>
              <span className="block text-3xl md:text-4xl xl:text-5xl mt-2 text-muted-foreground">(IVF)</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Phương pháp hỗ trợ sinh sản tiên tiến giúp các cặp vợ chồng hiếm muộn thực hiện ước mơ làm cha mẹ. IVF là
              kỹ thuật thụ tinh ngoài cơ thể với tỷ lệ thành công cao và an toàn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Đặt Lịch Tư Vấn
              </Button>
              <Button variant="outline" size="lg">
                Tìm Hiểu Thêm
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 justify-self-end">
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Cặp vợ chồng tư vấn với bác sĩ chuyên khoa hiếm muộn"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is IVF Section */}
      <section className="bg-slate-50 py-16 md:py-24 outer-container">
        <div className="mx-auto px-4 max-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="md:max-w-[450px]">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Minh họa quy trình IVF"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">IVF là gì?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Thụ tinh trong ống nghiệm (IVF) là kỹ thuật hỗ trợ sinh sản hiện đại, trong đó trứng và tinh trùng được
                thụ tinh ngoài cơ thể trong phòng thí nghiệm, sau đó phôi được chuyển vào tử cung để phát triển.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Tỷ Lệ Thành Công Cao</h3>
                    <p className="text-muted-foreground">
                      Phương pháp có tỷ lệ thành công cao nhất trong các kỹ thuật hỗ trợ sinh sản
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Kiểm Soát Chất Lượng</h3>
                    <p className="text-muted-foreground">
                      Cho phép lựa chọn phôi chất lượng tốt nhất để chuyển vào tử cung
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Ứng Dụng Rộng Rãi</h3>
                    <p className="text-muted-foreground">Phù hợp với nhiều nguyên nhân hiếm muộn khác nhau</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IVF Process Steps */}
      <section className="py-16 md:py-24 mx-auto outer-container">
        <div className="px-4 max-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy Trình IVF</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quy trình IVF toàn diện của chúng tôi được thiết kế để tối đa hóa cơ hội thành công của bạn.
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold">Tư Vấn & Khám Sàng Lọc</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Hành trình IVF bắt đầu với buổi tư vấn toàn diện bao gồm xem xét tiền sử bệnh, khám lâm sàng và các xét
                nghiệm chuyên sâu cho cả hai vợ chồng.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Xét nghiệm hormone sinh sản</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Siêu âm đánh giá buồng trứng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Phân tích tinh dịch đồ</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Tư vấn bác sĩ"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Kích thích buồng trứng"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold">Kích Thích Buồng Trứng</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sử dụng thuốc hormone để kích thích buồng trứng phát triển nhiều nang trứng cùng lúc. Quá trình này
                thường kéo dài 10-14 ngày với theo dõi chặt chẽ.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Tiêm thuốc kích thích hàng ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Theo dõi siêu âm định kỳ</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Xét nghiệm hormone theo dõi</span>
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
                <h3 className="text-2xl font-bold">Lấy Trứng & Thu Tinh Trùng</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Thực hiện thủ thuật lấy trứng qua đường âm đạo dưới gây mê nhẹ. Cùng ngày, tinh trùng được thu thập và
                xử lý trong phòng thí nghiệm.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Thủ thuật lấy trứng an toàn</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Xử lý và chọn lọc tinh trùng</span>
                </div>
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Đánh giá chất lượng giao tử</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Phòng thí nghiệm xử lý giao tử"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Thụ tinh trong phòng thí nghiệm"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-2xl font-bold">Thụ Tinh & Nuôi Cấy Phôi</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Trứng và tinh trùng được thụ tinh trong phòng thí nghiệm. Phôi được nuôi cấy trong 3-5 ngày và theo dõi
                sự phát triển hàng ngày.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Thụ tinh bằng kỹ thuật ICSI</span>
                </div>
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Nuôi cấy phôi 5 ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <Microscope className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Đánh giá chất lượng phôi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <h3 className="text-2xl font-bold">Chuyển Phôi</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Phôi chất lượng tốt nhất được chuyển vào tử cung thông qua ống thông mềm. Thủ thuật đơn giản, không đau
                và chỉ mất vài phút.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Thủ thuật không đau</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Chuyển 1-2 phôi chất lượng cao</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Đông lạnh phôi dư thừa</span>
                </div>
              </div>
            </div>
            <div className="md:max-w-[450px] justify-self-end">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Chuyển phôi vào tử cung"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Step 6 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1 md:max-w-[450px]">
              <img
                src={demo_hospital || "/placeholder.svg"}
                alt="Xét nghiệm thai"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  6
                </div>
                <h3 className="text-2xl font-bold">Xét Nghiệm Thai & Theo Dõi</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sau 14 ngày chuyển phôi, thực hiện xét nghiệm máu để xác định có thai. Nếu có thai, sẽ được theo dõi sát
                sao trong những tuần đầu.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Xét nghiệm Beta-hCG sau 14 ngày</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Siêu âm xác nhận thai lâm sàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Theo dõi và hỗ trợ liên tục</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn Sàng Bắt Đầu Hành Trình Sinh Con?</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed text-center max-w-2xl">
              Hãy thực hiện bước đầu tiên hướng tới việc làm cha mẹ cùng với đội ngũ chuyên gia sinh sản tận tâm của
              chúng tôi. Đặt lịch tư vấn ngay hôm nay để tìm hiểu xem IVF có phù hợp với bạn không.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="gap-2">
                <Phone className="w-4 h-4" />
                Đặt Lịch Tư Vấn
              </Button>
              <Button size="lg" variant="secondary">
                Gọi (028) 1234-5678
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}