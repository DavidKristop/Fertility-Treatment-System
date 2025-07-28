import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import type { RegisterFormValues } from "@/lib/validations/auth";

export default function CreateUserForm({
    onSubmitCb,
}:{
    onSubmitCb: (data: RegisterFormValues) => Promise<void>,
}){
    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await onSubmitCb(values);
                toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || 'Email đã tồn tại!';
                toast.error(errorMessage);
            }
            formik.resetForm();
        },
        
    });
    const {setTitle,setBreadCrumbs} = useAuthHeader()

  
    useEffect(() => {
      setTitle("Tạo tài khoản Quản lý")
      setBreadCrumbs([
        { label: "Tạo tài khoản Quản lý", path: "/admin/create-manager" },
      ])
    },[])
  
    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Input placeholder="Họ tên" {...formik.getFieldProps("username")} />
                {formik.touched.username && formik.errors.username && (
                    <p className="text-sm text-red-500">{formik.errors.username}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Email" type="email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Số điện thoại" {...formik.getFieldProps("phone")} />
                {formik.touched.phone && formik.errors.phone && (
                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Địa chỉ" {...formik.getFieldProps("address")} />
                {formik.touched.address && formik.errors.address && (
                    <p className="text-sm text-red-500">{formik.errors.address}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Ngày sinh" type="date" {...formik.getFieldProps("dateOfBirth")} />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{formik.errors.dateOfBirth}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Mật khẩu" type="password" {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>{formik.isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}</Button>
        </form>
    );
}