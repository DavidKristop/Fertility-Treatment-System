import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string()
    .min(1, "Tên dịch vụ không được để trống")
    .max(50, "Tên không được quá 50 ký tự"),
  description: z.string()
    .max(200, "Mô tả không được quá 200 ký tự"),
  price: z.number()
    .min(0.01, "Giá phải lớn hơn 0"),
  unit: z.string()
    .min(1, "Đơn vị không được để trống")
    .max(50, "Đơn vị không được quá 50 ký tự"),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
