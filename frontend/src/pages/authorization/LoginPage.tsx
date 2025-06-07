import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import SocialLoginButton from "@/components/auth/GoogleButton";

export default function LoginPage() {
  const handleLogin = (values: { phone: string; password: string }) => {
    console.log('Login values:', values);
    // Add your login logic here
  };

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
          <div className="space-y-6">
            <LoginForm onSubmit={handleLogin} />
            <Button type="submit" form="login-form" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
              Đăng nhập
            </Button>
            <div className="text-center text-sm text-gray-500">Hoặc đăng nhập với</div>
            <div className="flex justify-center">
              <SocialLoginButton text="Đăng nhập Google" />
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}