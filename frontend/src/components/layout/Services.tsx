import iuiImage from "@/assets/iui.png"
import ivfImage from "@/assets/ivf.png"
import { Link } from "react-router-dom"

export default function Services() {
  return (
    <section className="py-16 px-4 bg-white">
      {/* Tiêu đề */}
      <h2 className="text-center text-3xl font-bold text-[#004c77] mb-12 relative after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[3px] after:bg-[#004c77]">
        DỊCH VỤ
      </h2>

      {/* Grid dịch vụ */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Card 1 */}
        <Link to="/services/iui">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform duration-300">
              <img src={iuiImage} alt="IUI" className="object-contain h-60 p-6" />
              <div className="bg-[#004c77] text-white w-full text-center py-4 text-lg font-semibold">
                  Dịch vụ IUI
              </div>
          </div>
        </Link>



        {/* Card 2 */}
        <Link to="/services/ivf">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform duration-300">
            <img src={ivfImage} alt="IVF" className="object-contain h-60 p-6" />
            <div className="bg-[#004c77] text-white w-full text-center py-4 text-lg font-semibold">
              Dịch vụ IVF
            </div>
          </div>
        </Link>

      </div>
    </section>
  )
}
