import { type FormikProps } from 'formik';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ForgotPasswordFormValues } from '@/lib/validations/auth';

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
        <Input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={`mt-1 w-full bg-gray-100 ${
            formik.touched.email && formik.errors.email ? 'border-red-500' : ''
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>
    </form>
  );
}