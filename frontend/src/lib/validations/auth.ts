import { addDays, startOfDay, subDays } from "date-fns";
import { z } from "zod";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,32}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const usernameRegex = /^[a-zA-Z]+$/;
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

// Hàm kiểm tra ký tự đặc biệt
const hasSpecialCharacter = (password: string): boolean => {
  const specialChars = /[!@#$%^&*?_]/;
  return specialChars.test(password);
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
  .refine(hasSpecialCharacter, {
    message: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (ví dụ: !, @, #, $, %, ^, &, *, ?, _)",
  }),
});

export const registerSchema = loginSchema.extend({
  username: z.string({
    required_error: "Tên người dùng là bắt buộc",
  })
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự")
    .max(20, "Tên người dùng không được quá 20 ký tự"),
  
  
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

export const resetPasswordSchema = z.object({
  token: z.string({
    required_error: "Token là bắt buộc",
  }),
  newPassword: z.string({
    required_error: "Mật khẩu mới là bắt buộc",
  })
    .regex(passwordRegex, "Mật khẩu phải bắt đầu bằng chữ hoa")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(32, "Mật khẩu phải có nhiều nhất 32 ký tự"),
  confirmPassword: z.string({
    required_error: "Xác nhận mật khẩu là bắt buộc",
  })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

export const scheduleSetRequestSchema = z.object({
  title: z.string()
    .trim()
    .min(1, "Tiêu đề buổi hẹn là bắt buộc")
    .max(50, "Tiêu đề buổi hẹn không được quá 50 ký tự"),
  appointmentDateTime: z.date()
    .min(addDays(startOfDay(new Date()),3), "Buổi hẹn phải được đặt ít nhất 3 ngày trước")
    .refine((date)=>date.getDay()>=1 && date.getDay()<=5,"Buổi hẹn phải đặt trong tuần")
    .refine((date)=> date.getHours()>=8 && date.getHours()<=18,"Buổi hẹn phải được đặt trong thời gian 8h-18h"),
  estimatedTime: z.date()
    .max(addDays(startOfDay(new Date()),120), "Buổi hẹn phải được đặt ít nhất 120 ngày trước")
    .refine((date)=>date.getDay()>=1 && date.getDay()<=5,"Buổi hẹn phải đặt trong tuần")
    .refine((date)=> date.getHours()>=8 && date.getHours()<=18,"Buổi hẹn phải được đặt trong thời gian 8h-18h"),
}).refine((data) => {
  const minEstimatedTime = new Date(data.appointmentDateTime.getTime() + 10 * 60 * 1000);
  const maxEstimatedTime = new Date(data.appointmentDateTime.getTime() + 2 * 60 * 60 * 1000);
  return data.estimatedTime >= minEstimatedTime && data.estimatedTime <= maxEstimatedTime;
}, {
  message: "Thời gian dự kiến phải cách thời gian hẹn ít nhất 10 phút",
  path: ["estimatedTime"]
})


export const patientDrugSetRequestSchema = z.object({
  amount:z.number().min(1,"Số lượng phải lớn hơn 0"),
  dosage:z.string()
  .min(1, "Độ lượng phải có ít nhất 1 kí tự")
  .max(50, "Độ lượng không được quá 50 ký tự"),
  usageInstructions:z.string()
  .min(1, "Hướng dẫn sử dụng phải có ít nhất 1 kí tự")
  .max(200, "Hướng dẫn sử dụng không được quá 200 ký tự"),
  startDate: z.date()
  .min(subDays(startOfDay(new Date()), 1),"Ngày bắt đầu phải từ ngày hôm nay"),
  endDate: z.date()
  .min(subDays(startOfDay(new Date()), 1),"Ngày kết thúc phải từ ngày hôm nay"),
}).refine((data)=>data.startDate<=data.endDate,{
  message:"Ngày kết thúc phải sau ngày bắt đầu",
  path:["endDate"]
})

export const assignDrugSetRequestSchema = z.object({
  patientDrugs:z.array(patientDrugSetRequestSchema)
})

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;