export default function Journey() {
  return (
    <section className="bg-[#004c77] text-white py-16 px-4">
      {/* Tiêu đề với đường kẻ */}
      <div className="flex items-center justify-center mb-12">
        <div className="w-1/5 h-[2px] bg-white hidden sm:block"></div>
        <h2 className="text-2xl sm:text-3xl font-bold px-6 text-center">
          Hành trình làm cha mẹ bắt đầu từ đây
        </h2>
        <div className="w-1/5 h-[2px] bg-white hidden sm:block"></div>
      </div>

      {/* 3 cột */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
        {/* Cột 1 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Chăm sóc toàn diện</h3>
          <p className="text-sm leading-relaxed">
            Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
          </p>
          <button className="mt-4 bg-[#ffdfb6] text-black font-bold px-6 py-3 rounded-full hover:bg-[#f2cd9f] transition-colors">
            Xem dịch vụ
          </button>
        </div>

        {/* Cột 2 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Công nghệ hỗ trợ sinh sản</h3>
          <p className="text-sm leading-relaxed">
            Ứng dụng các phương pháp IUI và IVF hiện đại, tăng tỷ lệ thành công ngay từ chu kỳ đầu.
          </p>
          <button className="mt-4 bg-[#ffdfb6] text-black font-bold px-6 py-3 rounded-full hover:bg-[#f2cd9f] transition-colors">
            Tìm hiểu
          </button>
        </div>

        {/* Cột 3 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Đồng hành cùng bạn</h3>
          <p className="text-sm leading-relaxed">
            Mỗi ca điều trị là một câu chuyện riêng, và chúng tôi luôn sẵn sàng lắng nghe, chia sẻ và hỗ trợ.
          </p>
          <button className="mt-4 bg-[#ffdfb6] text-black font-bold px-6 py-3 rounded-full hover:bg-[#f2cd9f] transition-colors">
            Gặp chuyên gia
          </button>
        </div>
      </div>
    </section>
  )
}
