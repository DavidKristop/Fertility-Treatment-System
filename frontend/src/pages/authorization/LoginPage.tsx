import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import LoginForm from "@/components/auth/LoginForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { auth } from '@/api';
import { type LoginRequest } from '@/api/types';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      const loginData: LoginRequest = {
        phone: values.phone,
        password: values.password
      };
      const response = await auth.login(loginData);
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      phone: '',
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
          <div className="space-y-6">
            <LoginForm formik={formik} />
            <Button onClick={()=>formik.handleSubmit()} type="submit" form="login-form" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
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