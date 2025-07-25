import { useState } from "react";
import { useFormik } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { auth } from '@/api';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      await auth.forgotPassword({ email: values.email });
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setErrorMessage(error.message || "Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu");
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

  if (isSubmitted) {
    return (
      <AuthCard
        submitButtonText=""
        bottomLink={
          <Link to="/authorization/login" className="text-red-600 hover:underline">
            Quay lại đăng nhập
          </Link>
        }
      >
        <Card className="shadow-none bg-transparent">
          <AuthHeader title="EMAIL ĐÃ ĐƯỢC GỬI" />
          <CardContent className="pt-2">
            <div className="text-center space-y-4">
              <div className="text-green-600 text-lg font-semibold">
                ✓ Yêu cầu đặt lại mật khẩu đã được gửi
              </div>
              <p className="text-gray-600">
                Nếu email của bạn tồn tại trong hệ thống, 
                liên kết đặt lại mật khẩu đã được gửi đến hộp thư của bạn.
              </p>
              <p className="text-sm text-gray-500">
                Vui lòng kiểm tra email (kể cả thư mục spam) và làm theo hướng dẫn. 
                Liên kết sẽ hết hạn sau 15 phút.
              </p>
              <div className="mt-6">
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    formik.resetForm();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Gửi lại yêu cầu
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </AuthCard>
    );
  }

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
            <p className="text-gray-600 text-sm text-center">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu
            </p>
            
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-800 text-sm">
                  {errorMessage}
                </div>
              </div>
            )}
            
            <ForgotPasswordForm formik={formik} />
            <Button 
              onClick={() => formik.handleSubmit()} 
              type="submit" 
              className="w-full bg-gray-300 hover:bg-gray-400 text-black"
              disabled={isLoading || !formik.isValid}
            >
              {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}