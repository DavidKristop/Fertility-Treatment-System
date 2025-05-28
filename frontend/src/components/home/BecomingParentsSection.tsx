import { NavLink } from 'react-router-dom'
export default function BecomingParentsSection() {
    return (
        <div className='outer-container bg-blue-900/90 saturate-80'>
            <div className="max-container grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0 lg:col-span-12 text-center">
                <div className="h-full border-b-2 border-white col-start-1 col-span-3"></div>
                <h3 className="lg: col-span-6 text-white mt-12 text-2xl font-bold uppercase">Hành trình làm cha mẹ bắt đầu từ đây</h3>
                <div className="border-b-2 border-r-2 border-white col-start-10 col-span-3"></div>
                <div className="h-full border-l-2 border-white col-start-1 col-span-1"></div>

                <div className="w-[80%] h-auto lg:col-start-3 lg:col-span-3 overflow-hidden flex-col justify-center items-center justify-self-center my-[4vw]">
                    <h3 className="text-white text-2xl font-bold ">Chăm sóc toàn diện</h3>

                    <p className="text-sm text-white leading-relaxed">
                        Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                    </p>

                    <NavLink to='#' className="block w-[50%] mt-4 mx-auto bg-orange-300 text-center text-black text-lg font-semibold uppercase hover:saturate-70 py-2 px-4 rounded-full">
                        Lên lịch
                    </NavLink>
                </div>

                <div className="w-[80%] h-auto lg:col-span-3 overflow-hidden flex-col justify-center items-center justify-self-center my-[4vw]">
                    <h3 className="text-white text-2xl font-bold ">Chăm sóc toàn diện</h3>

                    <p className="text-sm text-white leading-relaxed">
                        Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                    </p>

                    <NavLink to='#' className="block w-[50%] mt-4 mx-auto bg-orange-300 text-center text-black text-lg font-semibold uppercase hover:saturate-70 py-2 px-4 rounded-full">
                        Lên lịch
                    </NavLink>
                </div>

                <div className="w-[80%] h-auto lg:col-span-3 overflow-hidden flex-col justify-center items-center justify-self-center my-[4vw]">
                    <h3 className="text-white text-2xl font-bold ">Chăm sóc toàn diện</h3>

                    <p className="text-sm text-white leading-relaxed">
                        Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                    </p>

                    <NavLink to='#' className="block w-[50%] mt-4 mx-auto bg-orange-300 text-center text-black text-lg font-semibold uppercase hover:saturate-70 py-2 px-4 rounded-full">
                        Lên lịch
                    </NavLink>
                </div>
            </div>
        </div>
    )
}