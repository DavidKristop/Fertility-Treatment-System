import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFormFields from "@/components/auth/AuthFormFields";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

export default function RegisterPage() {
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
          <form className="space-y-6">
            {/* form fields */}
            <AuthFormFields mode="register" />

            {/* Submit button */}
            <div>
              <Button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
                Đăng kí
              </Button>
            </div>

            {/* “Hoặc đăng kí với” text */}
            <div className="text-center text-sm text-gray-500">Hoặc đăng kí với</div>

            {/* Google “register” button */}
            <div className="flex justify-center">
              <SocialLoginButton text="Đăng kí Google" />
            </div>
            {/* bottomLink is passed via AuthCard’s prop */}
          </form>
        </CardContent>
      </Card>
    </AuthCard>
  );
}
