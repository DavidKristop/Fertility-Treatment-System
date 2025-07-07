import { useState } from 'react';
import { type FormikProps } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import type { RegisterFormValues } from '@/lib/validations/auth';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${year}/${day}/${month}`;
};

export default function RegisterForm({ formik }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Họ và tên
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Nguyễn Văn A"
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu của bạn"
              {...formik.getFieldProps('password')}
              className={`mt-1 w-full bg-gray-100 p-2 pr-10 text-base sm:text-sm ${
                formik.touched.password && formik.errors.password ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Nhập lại mật khẩu
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu của bạn"
              {...formik.getFieldProps('confirmPassword')}
              className={`mt-1 w-full bg-gray-100 p-2 pr-10 text-base sm:text-sm ${
                formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <Button
          onClick={() => formik.handleSubmit()}
          type="submit"
          className="w-full bg-gray-300 hover:bg-gray-400 text-black cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
        </Button>
      </div>
    </form>
  );
}