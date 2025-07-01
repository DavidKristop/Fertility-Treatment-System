import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/lib/validations/auth";
import { auth } from '@/api';
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const token = searchParams.get('token');

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    if (!token) return;

    try {
      setIsLoading(true);
      setErrorMessage("");
      await auth.resetPassword({
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      
      // Redirect to login with success message
      navigate('/authorization/login?reset=success');
    } catch (error: any) {
      console.error("Password reset failed:", error);
      setErrorMessage(error.message || "Có lỗi xảy ra khi đặt lại mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: {
      token: token || "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    validateOnBlur: true,
    onSubmit: handleResetPassword,
  });

  return (
    <AuthCard
      submitButtonText="Đặt lại mật khẩu"
      bottomLink={
        <Link to="/authorization/login" className="text-red-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      }
    >
      <Card className="shadow-none bg-transparent">
        <AuthHeader title="ĐẶT LẠI MẬT KHẨU" />
        <CardContent className="pt-2">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="text-red-800 text-sm">
                  {errorMessage}
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới"
                  {...formik.getFieldProps('newPassword')}
                  className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm pr-10 ${
                    formik.touched.newPassword && formik.errors.newPassword ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.newPassword && formik.errors.newPassword && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.newPassword}</div>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Mật khẩu phải bắt đầu bằng chữ hoa và có ít nhất 8 ký tự
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  {...formik.getFieldProps('confirmPassword')}
                  className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm pr-10 ${
                    formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gray-300 hover:bg-gray-400 text-black"
              disabled={isLoading || !formik.isValid}
            >
              {isLoading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthCard>
  );
}