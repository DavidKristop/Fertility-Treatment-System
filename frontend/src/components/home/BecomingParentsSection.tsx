import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

export default function BecomingParentsSection() {
    return (
        <div className="outer-container bg-blue-900/90 saturate-80">
            <div className="max-container py-8 lg:grid lg:grid-cols-5">
                <div className="hidden lg:grid lg:grid-cols-5 lg:gap-0 text-center items-center col-span-full">
                    <div className="h-full border-b-2 border-white col-span-1"></div>
                    <h3 className="col-span-3 text-white text-3xl font-bold uppercase">
                        Hành trình làm cha mẹ bắt đầu từ đây
                    </h3>
                    <div className="h-full border-b-2 border-white col-span-1"></div>
                </div>
                <h3 className="lg:hidden text-white text-2xl font-bold uppercase text-center mb-8">
                    Hành trình làm cha mẹ bắt đầu từ đây
                </h3>
                <div className="hidden lg:block h-full border-l-2 border-white col-span-1"></div>
                <div className="flex flex-col items-center gap-8 lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-8 justify-items-center">
                    <Card className="w-full bg-transparent border-none shadow-none text-center flex flex-col items-center">
                        <CardContent className="p-0">
                            <h3 className="text-white text-2xl font-bold mb-2">Chăm sóc toàn diện</h3>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                            </p>
                        </CardContent>
                        <CardFooter className="p-0">
                            <Button
                                asChild
                                className="
                           bg-orange-300 text-black text-lg font-semibold uppercase
                           rounded-full hover:bg-orange-200 hover:brightness-90 transition-colors duration-200"
                            >
                                <NavLink to='#'>
                                    Lên lịch
                                </NavLink>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="w-full bg-transparent border-none shadow-none text-center flex flex-col items-center">
                        <CardContent className="p-0">
                            <h3 className="text-white text-2xl font-bold mb-2">Chăm sóc toàn diện</h3>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                            </p>
                        </CardContent>
                        <CardFooter className="p-0">
                            <Button
                                asChild
                                className="bg-orange-300 text-black text-lg font-semibold uppercase rounded-full hover:bg-orange-200 hover:brightness-90 transition-colors duration-200"
                            >
                                <NavLink to='#'>
                                    Lên lịch
                                </NavLink>
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="w-full bg-transparent border-none shadow-none text-center flex flex-col items-center">
                        <CardContent className="p-0">
                            <h3 className="text-white text-2xl font-bold mb-2">Chăm sóc toàn diện</h3>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                Từ chẩn đoán đến điều trị, tất cả đều được thực hiện tại cơ sở hiện đại với quy trình chuẩn hóa.
                            </p>
                        </CardContent>
                        <CardFooter className="p-0">
                            <Button
                                asChild
                                className="bg-orange-300 text-black text-lg font-semibold uppercase rounded-full hover:bg-orange-200 hover:brightness-90 transition-colors duration-200"
                            >
                                <NavLink to='#'>
                                    Lên lịch
                                </NavLink>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}