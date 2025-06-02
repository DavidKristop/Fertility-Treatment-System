import { Input } from "@/components/ui/input"
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function InfoBar() {
    return (
        <div className="outer-container bg-[#2a3c8e] text-white">
            <div className="max-container hidden lg:flex items-center justify-between">
                <div className="flex items-center justify-self-end">
                    <Input
                        type="text"
                        placeholder="Tìm Kiếm..."
                        className="bg-white text-gray-800 rounded-full w-64"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5" />
                    <span>Hotline tư vấn: 0903 123 1234</span>
                </div>

                <div className="flex items-center space-x-2 justify-self-end">
                    <MapPinIcon className="h-5 w-5" />
                    <span>123 Đường D1, Phường 9, Quận Phú Nhuận</span>
                </div>
            </div>
        </div>
    )
}