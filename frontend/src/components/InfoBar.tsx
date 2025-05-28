import { MapPinIcon } from "@heroicons/react/16/solid"

export default function InfoBar() {
    return (
        <div className="hidden lg:outer-container bg-blue-800 saturate-70 py-2 text-white">
            <div className="max-container lg:grid lg:grid-cols-4 lg:gap-8">
                <div className="lg:col-span-1 mr-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm …"
                        className="bg-white w-full px-4 py-0.5 rounded-full text-black focus:outline-none"
                    />
                </div>

                <div className="lg:col-span-1 mr-auto">
                    <span>Hotline tư vấn: <strong>0903 123 1234</strong></span>
                </div>

                <div className="lg:col-span-2 flex justify-end space-x-2 ml-auto">
                    <MapPinIcon className="size-6" />
                    <span className="font-bold">123 Đường D1, Phường 9, Quận Thủ Đức</span>
                </div>
            </div>
        </div>
    )
}