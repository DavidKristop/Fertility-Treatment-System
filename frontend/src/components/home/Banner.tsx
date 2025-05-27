import { NavLink } from 'react-router-dom'
import main_img from '../../assets/main.jpg'
import icon_white from '../../assets/icon-white-text.png'
import { PhoneIcon } from '@heroicons/react/16/solid'

export default function Banner() {
    return (
        <div className="lg:col-span-12 relative w-full h-150 overflow-hidden">
            <img src={main_img} alt="Doctors" className="w-full h-auto object-cover" />

            <div className="absolute top-10 left-30 w-80 h-80 bg-blue-800/90 filter saturate-80 text-white">
                <div className='w-[80%] border-b-2 border-white mx-auto my-5'>
                    <img src={icon_white} alt="" className="block w-[50%] mx-auto" />
                </div>

                <div className="w-[80%] mx-auto">
                    <p className="text-base text-center">
                        Đồng hành cùng bạn vì một cuộc sống khỏe mạnh. “Khám nhanh – Điều trị chuẩn – Dịch vụ tận tâm”.
                    </p>
                </div>

                <NavLink to='#' className="block w-[50%] mt-4 mx-auto bg-none border-2 text-center text-white text-lg font-semibold uppercase hover:bg-white hover:text-blue-800 hover:saturate-70 py-2 px-4 rounded-full">
                    Lên lịch
                </NavLink>
            </div>

            <span className="absolute flex justify-center top-115 left-220 w-78 h-15 rounded-full bg-blue-800/90 filter saturate-80 text-white">
                <PhoneIcon className='mt-2.5 size-10' />
                <p className='text-white mt-2.5 ml-2 text-3xl font-bold uppercase'>
                    0903 123 1234
                </p>
            </span>
        </div>
    )
}