import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { auth } from '@/api';
import { type LoginRequest } from '@/api/types';
import { useEffect, useState } from "react";
import { X, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  
  // Check for reset success on component mount
  useEffect(() => {
    const resetSuccess = searchParams.get('reset') === 'success';
    if (resetSuccess) {
      setShowResetSuccess(true);
      
      // Clean up URL immediately but keep the message visible
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('reset');
      setSearchParams(newSearchParams, { replace: true });
      
      // Auto-hide message after 5 seconds
      const timer = setTimeout(() => {
        setShowResetSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const loginData: LoginRequest = {
        email: values.email,
        password: values.password
      };
      const response = await auth.login(loginData);
      sessionStorage.setItem('token', response.payload.accessToken);
      switch (response.payload.role) {
        case 'ROLE_PATIENT':
          navigate('/patient/dashboard');
          break;
        case 'ROLE_DOCTOR':
          navigate('/doctor/dashboard');
          break;
        case 'ROLE_MANAGER':
          navigate('/manager/dashboard');
          break;
        case 'ROLE_ADMIN':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/home');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      if (error instanceof Error) {
        formik.setErrors({ email: ' ', password: 'Nhập sai email hoặc mật khẩu' });
      }
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    validateOnBlur: true,
    onSubmit: handleLogin,
  });

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
          {/* Enhanced Success Message */}
          {showResetSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg relative">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-green-800 text-sm font-medium">
                    Mật khẩu đã được đặt lại thành công!
                  </div>
                  <div className="text-green-700 text-xs mt-1">
                    Vui lòng đăng nhập với mật khẩu mới của bạn.
                  </div>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    type="button"
                    onClick={() => setShowResetSuccess(false)}
                    className="inline-flex text-green-400 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-sm"
                  >
                    <span className="sr-only">Đóng</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <LoginForm formik={formik} />
              <Button
                onClick={() => formik.handleSubmit()}
                type="submit"
                form="login-form"
                className="w-full bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Đang vào...' : 'Đăng nhập'}
              </Button>
            <div className="text-center text-sm text-gray-500">Hoặc đăng nhập với</div>
            <GoogleAuth text="Đăng nhập Google" mode="login" />
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}
