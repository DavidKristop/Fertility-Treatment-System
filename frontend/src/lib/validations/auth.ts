import { z } from "zod";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,32}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;
const phoneRegex = /^[0-9]{10}$/;

// Hàm kiểm tra định dạng YYYY-MM-DD và tính tuổi trực tiếp
const calculateAgeFromString = (dateStr: string): number => {
  if (!dateStr) return -1; // Giá trị không hợp lệ
  const [year, month, day] = dateStr.split('-').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

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
    .regex(passwordRegex, "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và không chứa khoảng trắng")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự")
});

export const registerSchema = loginSchema.extend({
  username: z.string({
    required_error: "Tên người dùng là bắt buộc",
  })
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .max(20, "Tên người dùng không được quá 20 ký tự")
    .regex(usernameRegex, "Tên người dùng chỉ được chứa chữ cái, số và dấu gạch dưới"),
  
  phone: z.string({
    required_error: "Số điện thoại là bắt buộc",
  })
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .max(11, "Số điện thoại không được quá 11 số")
    .regex(phoneRegex, "Số điện thoại không hợp lệ (chỉ chấp nhận 10 số)"),
  
  address: z.string({
    required_error: "Địa chỉ là bắt buộc",
  })
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(100, "Địa chỉ không được quá 100 ký tự"),

  dateOfBirth: z
    .string({ required_error: "Ngày sinh là bắt buộc" })
    .refine((dateStr) => {
      const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      if (!regex.test(dateStr)) return false;
      const [year, month, day] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }, {
      message: "Ngày sinh không hợp lệ (định dạng: YYYY-MM-DD)",
    })
    .refine((dateStr) => calculateAgeFromString(dateStr) >= 18, {
      message: "Bạn phải trên 18 tuổi",
    }), // Giữ nguyên chuỗi, không cần transform thêm
  
  password: z.string({
    required_error: "Mật khẩu là bắt buộc",
  })
    .regex(passwordRegex, "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và không chứa khoảng trắng")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự"),

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