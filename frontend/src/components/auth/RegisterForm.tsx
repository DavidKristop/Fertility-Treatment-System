import { useFormik } from 'formik';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerSchema } from '@/lib/validations/auth';

interface RegisterFormValues {
  phone: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
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

        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Nhập lại mật khẩu
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            className={`mt-1 w-full bg-gray-100 ${
              formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
      </div>
    </form>
  );
}