import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import type { DoctorRegisterFormValues } from "@/lib/validations/auth";

export default function CreateDoctorForm({
    onSubmitCb,
}: {
    onSubmitCb: (data: DoctorRegisterFormValues) => Promise<void>,
}){
    const formik = useFormik<DoctorRegisterFormValues>({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            address: '',
            dateOfBirth: '',
            password: '',
            role: 'ROLE_DOCTOR',
            specialty: '',
            degree: '',
            yearsOfExperience: 0,
            licenseNumber: '',
        },
        onSubmit: async (values) => {
            await onSubmitCb(values);
            formik.resetForm();
        },
    });

    const { setTitle, setBreadCrumbs } = useAuthHeader();

    useEffect(() => {
        setTitle("Tạo tài khoản Bác sĩ");
        setBreadCrumbs([
            { label: "Tạo tài khoản Bác sĩ", path: "/admin/create-doctor" },
        ]);
    }, []);

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
            <div className="space-y-2">
                <Input placeholder="Chuyên khoa" {...formik.getFieldProps("specialty")} />
                {formik.touched.specialty && formik.errors.specialty && (
                    <p className="text-sm text-red-500">{formik.errors.specialty}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Học vị" {...formik.getFieldProps("degree")} />
                {formik.touched.degree && formik.errors.degree && (
                    <p className="text-sm text-red-500">{formik.errors.degree}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Số năm kinh nghiệm" type="number" {...formik.getFieldProps("yearsOfExperience")} />
                {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                    <p className="text-sm text-red-500">{formik.errors.yearsOfExperience}</p>
                )}
            </div>
            <div className="space-y-2">
                <Input placeholder="Số giấy phép" {...formik.getFieldProps("licenseNumber")} />
                {formik.touched.licenseNumber && formik.errors.licenseNumber && (
                    <p className="text-sm text-red-500">{formik.errors.licenseNumber}</p>
                )}
            </div>
            <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Đang tạo..." : "Tạo tài khoản"}
            </Button>
        </form>
    );
}