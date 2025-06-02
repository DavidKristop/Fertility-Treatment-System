import { NavLink } from 'react-router-dom'
import main_img from '../../assets/main.jpg'
import icon_white from '../../assets/icon-white-text.png'
import demo_hospital from '../../assets/demo-hospital.jpg'
import { PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Banner() {
    return (
        <div className="relative aspect-[4/3] md:aspect-[2/1] lg:aspect-[5/2] overflow-hidden">
            <img
                src={main_img}
                alt="Medical professionals providing care"
                className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0"
            />
            <img
                src={demo_hospital}
                alt="Hospital environment backdrop"
                className="lg:hidden absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-10 h-full container mx-auto flex flex-col justify-center items-center lg:items-start py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <Card className="bg-blue-800/90 text-white saturate-80 w-11/12 max-w-sm sm:max-w-md lg:w-auto lg:max-w-[320px]">
                    <CardContent className="flex flex-col items-center text-center gap-4 sm:gap-5">
                        <img
                            src={icon_white}
                            alt="UCARE Logo"
                            className="w-3/5 max-w-[180px] border-b border-white pb-2 sm:pb-3"
                        />
                        <p className="text-sm sm:text-base leading-relaxed">
                            Đồng hành cùng bạn vì một cuộc sống khỏe mạnh. “Khám nhanh – Điều trị
                            chuẩn – Dịch vụ tận tâm”.
                        </p>
                        <Button
                            variant="outline"
                            className="w-4/5 max-w-[200px] rounded-full uppercase font-semibold border-white text-black hover:bg-white hover:text-blue-800"
                            asChild
                        >
                            <NavLink to="#">Lên lịch</NavLink>
                        </Button>
                    </CardContent>
                </Card>

                <div className="hidden lg:flex items-center gap-2 bg-blue-800/90 text-white saturate-80 px-4 py-3 rounded-full absolute bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10">
                    <PhoneIcon className="h-5 w-5 flex-shrink-0" />
                    <p className="font-semibold text-base md:text-lg whitespace-nowrap">
                        0903 123 1234
                    </p>
                </div>
            </div>
        </div>
    )
}