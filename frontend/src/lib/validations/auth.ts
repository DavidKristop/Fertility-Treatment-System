import { z } from "zod";

const phoneRegex = /^[0-9]+$/;
const passwordRegex = /^[A-Z]/;

export const loginSchema = z.object({
  phone: z.string({
    required_error: "Số điện thoại là bắt buộc",
  })
    .regex(phoneRegex, "Số điện thoại chỉ chứa các chữ số")
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được quá 11 số"),
  password: z.string({
    required_error: "Mật khẩu là bắt buộc",
  })
    .regex(passwordRegex, "Mật khẩu phải bắt đầu bằng chữ hoa")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(8, "Mật khẩu không được quá 8 ký tự")
});

export const registerSchema = loginSchema.extend({
  confirmPassword: z.string({
    required_error: "Xác nhận mật khẩu là bắt buộc",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string({
    required_error: "Email là bắt buộc",
  })
    .email("Email không hợp lệ"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;