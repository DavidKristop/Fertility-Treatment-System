import { MapPinIcon } from "@heroicons/react/16/solid"

export default function InfoBar() {
    return (
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8 bg-blue-800 filter saturate-70 text-white px-4 py-2 items-center">
            <div className="lg:col-span-1 w-[70%] ml-auto">
                <input
                    type="text"
                    placeholder="Tìm kiếm …"
                    className="bg-white w-full px-4 py-0.5 rounded-full text-black focus:outline-none"
                />
            </div>

            <div className="lg:col-span-1 text-center mr-auto">
                <span>Hotline tư vấn: <strong>0903 123 1234</strong></span>
            </div>
            
            <div className="lg:col-span-2 flex items-center justify-end space-x-2 w-[80%] mr-auto">
                <MapPinIcon className="size-6" />
                <span className="font-bold">123 Đường D1, Phường 9, Quận Thủ Đức</span>
            </div>
        </div>
    )
}