import { type FormikProps } from 'formik';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { LoginFormValues } from '@/lib/validations/auth';
import { Link } from "react-router-dom";

interface LoginFormProps {
  formik: FormikProps<LoginFormValues>;
}

export default function LoginForm({ formik }: LoginFormProps) {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          {...formik.getFieldProps('email')}
          className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Mật khẩu
          </Label>
          <Link
            to="/authorization/forgot-password"
            className="text-sm text-red-600 hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="Nhập mật khẩu của bạn"
          {...formik.getFieldProps('password')}
          className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.password}</div>
        )}
      </div>
    </form>
  );
}