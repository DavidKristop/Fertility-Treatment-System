import { NavLink } from 'react-router-dom'
import main_img from '../../assets/main.jpg'
import icon_white from '../../assets/icon-white-text.png'
import demo_hospital from '../../assets/demo-hospital.jpg'
import { PhoneIcon } from '@heroicons/react/16/solid'

export default function Banner() {
    return (
        <div className="outer-container aspect-[1/1] lg:aspect-[5/2] relative overflow-hidden">
            <img src={main_img} alt="Doctors" className="hidden lg:block absolute w-full h-auto z-0 object-cover" />
            <img src={demo_hospital} alt="Doctors" className="absolute lg:hidden w-full h-auto z-0 object-cover" />

            <div className="max-container">
                <div className=" bg-blue-800/90 saturate-80 text-white w-[90%] justify-self-center lg:w-[25%] py-[3vw] lg:py-[1vw] my-[8vw] lg:my-[4vw] lg:justify-self-auto">
                    <div className='mb-[4vw] lg:mb-[1vw]'>
                        <img src={icon_white} alt="" className="w-[50%] mx-auto border-b-2 border-white" />
                    </div>

                    <div className="w-[80%] mx-auto">
                        <p className="text-[4vw] lg:text-[1.1vw] text-center">
                            Đồng hành cùng bạn vì một cuộc sống khỏe mạnh. “Khám nhanh – Điều trị chuẩn – Dịch vụ tận tâm”.
                        </p>
                    </div>

                    <NavLink to='#' className="block w-[50%] my-[3vw] lg:my-[1vw] mx-auto border-2 text-center text-white text-[4vw] lg:text-[1.2vw] font-semibold uppercase hover:bg-white hover:text-blue-800 hover:saturate-70  rounded-full">
                        Lên lịch
                    </NavLink>
                </div>

                <span className="hidden lg:flex justify-center items-center ml-auto py-[0.5vw] w-[22%] h-[8%] rounded-full bg-blue-800/90 filter saturate-80 text-white">
                    <PhoneIcon className='block mt-[1.5%] mr-[5%] w-[12%] h-auto' />
                    <p className='text-white text-[2vw] font-bold uppercase'>
                        0903 123 1234
                    </p>
                </span>
            </div>
        </div>
    )
}