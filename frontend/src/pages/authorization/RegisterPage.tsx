import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialLoginButton from "@/components/auth/GoogleButton";

export default function RegisterPage() {
  const handleRegister = (values: { phone: string; password: string; confirmPassword: string }) => {
    console.log('Register values:', values);
    // Add your registration logic here
  };

  return (
    <AuthCard
      submitButtonText="Đăng kí"
      bottomLink={
        <div>
          Đã có tài khoản?{" "}
          <Link to="/authorization/login" className="text-red-600 hover:underline">
            Đăng nhập ngay!
          </Link>
        </div>
      }
    >
      <Card className="shadow-none bg-transparent">
        <AuthHeader title="ĐĂNG KÍ" />
        <CardContent className="pt-2">
          <div className="space-y-6">
            <RegisterForm onSubmit={handleRegister} />
            <Button type="submit" form="register-form" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
              Đăng kí
            </Button>
            <div className="text-center text-sm text-gray-500">Hoặc đăng kí với</div>
            <div className="flex justify-center">
              <SocialLoginButton text="Đăng kí Google" />
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}