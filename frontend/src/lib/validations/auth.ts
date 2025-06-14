import { z } from "zod";

const passwordRegex = /^[A-Z]/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email là bắt buộc",
  })
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(50, "Email không được quá 50 ký tự")
    .regex(emailRegex, "Email không hợp lệ"),
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