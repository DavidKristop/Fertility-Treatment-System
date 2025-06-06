import FertilityImage from '@/assets/0VkgqLXqGNQTndYGcB8l2CFaBA6HB0aUZP6wR5a6.jpg';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-5xl w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex flex min-h-0">
        {/* Left Side: “Some Random Picture” */}
        <div className="flex-1 min-h-0">
          <img
            src={FertilityImage}
            alt="Chữa hiếm muộn"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side: Register Form */}
        <div className="w-1/2 bg-white p-8">
          <Card className="shadow-none bg-transparent">
            <CardHeader className="pb-1">
              <CardTitle className="text-2xl text-center font-bold">ĐĂNG KÍ</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <form className="space-y-6">
                {/* Phone Number */}
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Nhập lại mật khẩu
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="mt-1 w-full bg-gray-100"
                  />
                </div>

                {/* “Đăng kí” Button */}
                <div>
                  <Button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
                    Đăng kí
                  </Button>
                </div>

                {/* “Hoặc đăng kí với” */}
                <div className="text-center text-sm text-gray-500">Hoặc đăng kí với</div>

                {/* Google Login Button */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-2 py-1"
                  >
                    {/* Updated Google “G” logo */}
                    <svg
                      className="h-5 w-5 object-contain"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 533.5 544.3"
                    >
                      <path
                        fill="#4285F4"
                        d="M533.5 278.4c0-17.6-1.6-35.2-4.8-52.8H272v100h146.8c-6.4 35.2-25.6 64.8-54.4 84.8v70.4h87.9c51.2-47.2 81.6-116 81.6-202.4z"
                      />
                      <path
                        fill="#34A853"
                        d="M272 544.3c73.6 0 135.2-24.4 180-66l-87.9-70.4c-24.4 16.4-56.4 26.4-92.1 26.4-70 0-129.2-47.2-150.4-110.4h-89.6v69.6c44.8 88 136 150.4 240 150.4z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M121.6 325.9c-8-24-12.8-49.6-12.8-76s4.8-52 12.8-76L32 104.8C11.2 147.6 0 195.2 0 244s11.2 96.4 32 139.2l89.6-57.3z"
                      />
                      <path
                        fill="#EA4335"
                        d="M272 107.7c39.6 0 75.2 13.6 103.2 40.8l77.6-77.6C418.4 24 344.4 0 272 0 168 0 76.8 62.4 32 150.4l89.6 69.6C142.8 155.2 202 107.7 272 107.7z"
                      />
                    </svg>
                    <span className="text-sm">Đăng nhập Google</span>
                  </Button>
                </div>

                {/* “Đã có tài khoản? Đăng nhập ngay!” */}
                <div className="mt-4 text-center text-sm">
                  Đã có tài khoản?{" "}
                  <Link to="/authorization/login" className="text-red-600 hover:underline">
                    Đăng nhập ngay!
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
