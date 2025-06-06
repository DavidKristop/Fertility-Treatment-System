export default function CallbackForm() {
  return (
    <section className="bg-[#ffdcb3] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-medium text-center mb-10">
          Bạn cần chúng tôi gọi lại?
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Họ và tên */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập họ tên"
              className="p-3 border border-gray-300 rounded-md focus:outline-none bg-white"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Số điện thoại</label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              className="p-3 border border-gray-300 rounded-md focus:outline-none bg-white"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col sm:col-span-2">
            <label className="mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Nhập email"
              className="p-3 border border-gray-300 rounded-md focus:outline-none bg-white"
            />
          </div>

          {/* Nút */}
          <div className="sm:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Yêu cầu gọi lại
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
