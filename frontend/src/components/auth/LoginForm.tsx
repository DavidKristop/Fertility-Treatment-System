import { useFormik } from 'formik';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginSchema } from '@/lib/validations/auth';

interface LoginFormValues {
  phone: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Số điện thoại
        </Label>
        <Input
          id="phone"
          type="tel"
          {...formik.getFieldProps('phone')}
          className={`mt-1 w-full bg-gray-100 ${
            formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mật khẩu
        </Label>
        <Input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
          className={`mt-1 w-full bg-gray-100 ${
            formik.touched.password && formik.errors.password ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        )}
      </div>
    </form>
  );
}