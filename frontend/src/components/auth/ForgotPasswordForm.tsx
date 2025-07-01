import { type FormikProps } from 'formik'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import type { ForgotPasswordFormValues } from '@/lib/validations/auth'
import { Mail } from 'lucide-react'

interface ForgotPasswordFormProps {
  formik: FormikProps<ForgotPasswordFormValues>;
}

export default function ForgotPasswordForm({ formik }: ForgotPasswordFormProps) {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...formik.getFieldProps('email')}
            className={`mt-1 w-full bg-gray-100 p-2 pl-10 text-base sm:text-sm ${
              formik.touched.email && formik.errors.email ? 'border-red-500' : ''
            }`}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.email}</div>
        )}
        <div className="text-xs text-gray-500 mt-1">
          Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email này
        </div>
      </div>
    </form>
  );
}