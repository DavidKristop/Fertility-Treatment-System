import { type FormikProps } from 'formik';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { RegisterFormValues } from "@/lib/validations/auth";

interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>;
}

export default function RegisterForm({ formik }: RegisterFormProps) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
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
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật khẩu
          </Label>
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

        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Nhập lại mật khẩu
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu của bạn"
            {...formik.getFieldProps('confirmPassword')}
            className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
      </div>
    </form>
  );
}