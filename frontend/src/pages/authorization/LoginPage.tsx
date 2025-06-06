import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Auth pieces:
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFormFields from "@/components/auth/AuthFormFields";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

export default function LoginPage() {
  return (
    <AuthCard
      submitButtonText="Đăng nhập"
      bottomLink={
        <Link to="/authorization/register" className="text-red-600 hover:underline">
          Chưa có tài khoản? Đăng ký ngay!
        </Link>
      }
    >
      <Card className="shadow-none bg-transparent">
        <AuthHeader title="ĐĂNG NHẬP" />
        <CardContent className="pt-2">
          <form className="space-y-6">
            {/* form fields */}
            <AuthFormFields mode="login" />

            {/* Submit button */}
            <div>
              <Button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
                Đăng nhập
              </Button>
            </div>

            {/* “Hoặc đăng nhập với” text */}
            <div className="text-center text-sm text-gray-500">Hoặc đăng nhập với</div>

            {/* Google login button */}
            <div className="flex justify-center">
              <SocialLoginButton text="Đăng nhập Google" />
            </div>

            {/* “Quên mật khẩu?” / “Chưa có tài khoản” links */}
            <div className="mt-4 text-center space-y-1 text-sm">
              <Link to="/authorization/forgot-password" className="text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
              {/* The bottom link is actually passed via AuthCard’s bottomLink prop */}
            </div>
          </form>
        </CardContent>
      </Card>
    </AuthCard>
  );
}
