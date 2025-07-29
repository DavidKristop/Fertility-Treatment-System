import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import RegisterForm from "@/components/auth/RegisterForm";
import GoogleAuth from "@/components/auth/GoogleAuth";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { patientRegisterSchemaWithConfirmPassword, type PatientRegisterFormWithConfirmPasswordValues } from "@/lib/validations/auth";
import { auth } from '@/api';
import { type RegisterRequest } from '@/api/types';
import { toast } from 'react-toastify';
import { useState } from "react";

export default function RegisterPage() {

  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const handleRegister = async (values: PatientRegisterFormWithConfirmPasswordValues) => {
    try {
      const registerData: RegisterRequest = {
        username: values.username,
        email: values.email,
        address: values.address,
        phone: values.phone,
        dateOfBirth: values.dateOfBirth,
        password: values.password,
        confirmPassword: values.confirmPassword
      };
      await auth.register(registerData);
      setRegisteredEmail(values.email);
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Email đã tồn tại!';
      toast.error(errorMessage);
    }
  };

  const formik = useFormik<PatientRegisterFormWithConfirmPasswordValues>({
      initialValues: {
        username:'',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        role: "ROLE_PATIENT",
        medicalHistory: '',
      },
      validationSchema: toFormikValidationSchema(patientRegisterSchemaWithConfirmPassword),
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
            {!registeredEmail ? (
              <RegisterForm formik={formik} />
            ) : (
              <div className="text-center space-y-4">
                <p className="text-green-600 font-medium">Đăng ký thành công!</p>
                <p>Vui lòng kiểm tra email <span className="font-semibold">{registeredEmail}</span> để xác thực tài khoản.</p>
                <button
                  className="text-sm text-blue-600 underline"
                  onClick={async () => {
                    try {
                      await auth.resendVerifyEmail(registeredEmail);
                      toast.success('Email xác thực đã được gửi lại.');
                    } catch {
                      toast.error('Gửi lại email thất bại.');
                    }
                  }}
                >
                  Gửi lại email xác thực
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}