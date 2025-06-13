import { z } from "zod";

const passwordRegex = /^[A-Z]/;

export const loginSchema = z.object({
  username: z.string({
    required_error: "Tên đăng nhập là bắt buộc",
  })
    .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
    .max(20, "Tên đăng nhập không được quá 20 ký tự"),
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