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
import { useEffect } from "react";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resetSuccess = searchParams.get('reset') === 'success';

  // Clear the URL parameter after showing the message
  useEffect(() => {
    if (resetSuccess) {
      const timer = setTimeout(() => {
        // Remove the reset parameter from URL without reload
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('reset');
        const newUrl = `${window.location.pathname}${newSearchParams.toString() ? '?' + newSearchParams.toString() : ''}`;
        window.history.replaceState({}, '', newUrl);
      }, 5000); // Remove after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [resetSuccess, searchParams]);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const loginData: LoginRequest = {
        email: values.email,
        password: values.password
      };
      const response = await auth.login(loginData);
      localStorage.setItem('token', response.payload.accessToken);
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
          navigate('/home'); // Trang mặc định nếu role không khớp
      }
    } catch (error: any) {
      // Xử lý lỗi từ API
      console.error('Login failed:', error);
      
      if (error instanceof Error) {
              // Đặt thông báo lỗi vào formik để hiển thị
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
          {resetSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="text-green-800 text-sm font-medium">
                ✓ Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập với mật khẩu mới.
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
            >
              Đăng nhập
            </Button>
            <div className="text-center text-sm text-gray-500">Hoặc đăng nhập với</div>
            <GoogleAuth text="Đăng nhập Google" mode="login" />
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}
