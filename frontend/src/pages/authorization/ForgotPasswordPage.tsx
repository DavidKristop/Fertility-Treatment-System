import { useFormik } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/validations/auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    try {
      // TODO: Implement password reset logic when backend is ready
      console.info("Development - Reset password requested for:", values.email);
    } catch (error) {
      console.error("Password reset failed:", error);
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
            <ForgotPasswordForm formik={formik} />
            <Button 
              onClick={()=>formik.handleSubmit()} 
              type="submit" 
              className="w-full bg-gray-300 hover:bg-gray-400 text-black"
            >
              Gửi yêu cầu
            </Button>
          </div>
        </CardContent>
      </Card>
    </AuthCard>
  );
}