import { type FormikProps } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { RegisterFormValues } from '@/lib/validations/auth';

interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${year}/${day}/${month}`;
};

export default function RegisterForm({ formik }: RegisterFormProps) {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Họ và tên
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Nguyễn Văn A"
            {...formik.getFieldProps('username')}
            className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
              formik.touched.username && formik.errors.username ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.username}</div>
          )}
        </div>

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
          <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số điện thoại
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0903 123 4567"
            {...formik.getFieldProps('phone')}
            className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
              formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.phone}</div>
          )}
        </div>

        <div>
          <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Địa chỉ
          </Label>
          <Input
            id="address"
            type="text"
            placeholder="Nhập địa chỉ của bạn"
            {...formik.getFieldProps('address')}
            className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
              formik.touched.address && formik.errors.address ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.address}</div>
          )}
        </div>

        <div>
          <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
            Ngày sinh
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="Nhập ngày sinh (YYYY-MM-DD, ví dụ: 2000-01-01)"
            {...formik.getFieldProps('dateOfBirth')}
            className={`mt-1 w-full bg-gray-100 p-2 text-base sm:text-sm ${
              formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">
              {formik.errors.dateOfBirth} {formik.values.dateOfBirth && `(Định dạng: ${formatDate(formik.values.dateOfBirth)})`}
            </div>
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