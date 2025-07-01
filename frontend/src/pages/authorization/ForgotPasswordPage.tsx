import { useFormik } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useState } from "react";
import { auth } from "@/api"; // Assuming auth is an API client
import type { ForgotPasswordRequest} from "@/api/types";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setMessage(null);
    setError(null);
    try {
      const forgotpasswordData: ForgotPasswordRequest = {
              email: values.email,
            };
      const response = await auth.forgotpassword(forgotpasswordData);
      setMessage(response.message || "Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.");
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setError(error.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    validateOnBlur: true,
    onSubmit: handleForgotPassword,
  });

  return (
    <AuthCard
      submitButtonText="Gửi yêu cầu"
      bottomLink={
        <Link to="/authorization/login" className="text-red-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      }
    >
      <Card className="shadow-none bg-transparent">
        <AuthHeader title="QUÊN MẬT KHẨU" />
        <CardContent className="pt-2">
          <div className="space-y-6">
            {message && <div className="text-green-600 text-center">{message}</div>}
            {error && <div className="text-red-600 text-center">{error}</div>}
            <ForgotPasswordForm formik={formik} />
            <Button
              onClick={() => formik.handleSubmit()}
              type="submit"
              className="w-full bg-gray-300 hover:bg-gray-400 text-black"
              disabled={isLoading}
            >
              {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}