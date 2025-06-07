import * as Yup from 'yup';

export const loginSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
    .min(10, 'Số điện thoại phải có ít nhất 10 số')
    .required('Vui lòng nhập số điện thoại'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(8, 'Mật khẩu không được quá 8 ký tự')
    .matches(/^[A-Z]/, 'Mật khẩu phải bắt đầu bằng chữ in hoa')
    .required('Vui lòng nhập mật khẩu'),
});

export const registerSchema = loginSchema.shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
});