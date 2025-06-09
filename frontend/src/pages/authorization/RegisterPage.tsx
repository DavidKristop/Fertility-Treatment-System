import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { auth } from '@/api';
import { type RegisterRequest } from '@/api/types';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      const registerData: RegisterRequest = {
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword
      };
      const response = await auth.register(registerData);
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const formik = useFormik<RegisterFormValues>({
      initialValues: {
        phone: '',
        password: '',
        confirmPassword: '',
      },
      validationSchema: toFormikValidationSchema(registerSchema),
      validateOnBlur: true,
      onSubmit: handleRegister,
    });

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
            <RegisterForm formik={formik} />
            <Button onClick={()=>formik.handleSubmit()} type="submit" form="register-form" className="w-full bg-gray-300 hover:bg-gray-400 text-black">
              Đăng kí
            </Button>
            <div className="text-center text-sm text-gray-500">Hoặc đăng kí với</div>
            <GoogleAuth text="Đăng kí Google" mode="register" />
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}