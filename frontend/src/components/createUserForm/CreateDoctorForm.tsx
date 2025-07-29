import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { doctorRegisterSchema, type DoctorRegisterFormValues } from "@/lib/validations/auth";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function CreateDoctorForm({
    onSubmitCb,
}: {
    onSubmitCb: (data: DoctorRegisterFormValues) => Promise<void>,
}){
    const formik = useFormik<DoctorRegisterFormValues>({
        validationSchema: toFormikValidationSchema(doctorRegisterSchema),
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Họ tên
                </label>
                <Input id="username" placeholder="Họ tên" {...formik.getFieldProps("username")} />
                {formik.touched.username && formik.errors.username && (
                    <p className="text-sm text-red-500">{formik.errors.username}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <Input id="email" placeholder="Email" type="email" {...formik.getFieldProps("email")} />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                </label>
                <Input id="phone" placeholder="Số điện thoại" {...formik.getFieldProps("phone")} />
                {formik.touched.phone && formik.errors.phone && (
                    <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                </label>
                <Input id="address" placeholder="Địa chỉ" {...formik.getFieldProps("address")} />
                {formik.touched.address && formik.errors.address && (
                    <p className="text-sm text-red-500">{formik.errors.address}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Ngày sinh
                </label>
                <Input id="dateOfBirth" placeholder="Ngày sinh" type="date" {...formik.getFieldProps("dateOfBirth")} />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{formik.errors.dateOfBirth}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mật khẩu
                </label>
                <Input id="password" placeholder="Mật khẩu" type="password" {...formik.getFieldProps("password")} />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">{formik.errors.password}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                    Chuyên khoa
                </label>
                <Input id="specialty" placeholder="Chuyên khoa" {...formik.getFieldProps("specialty")} />
                {formik.touched.specialty && formik.errors.specialty && (
                    <p className="text-sm text-red-500">{formik.errors.specialty}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
                    Bằng cấp
                </label>
                <Input id="degree" placeholder="Bằng cấp" {...formik.getFieldProps("degree")} />
                {formik.touched.degree && formik.errors.degree && (
                    <p className="text-sm text-red-500">{formik.errors.degree}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
                    Số năm kinh nghiệm
                </label>
                <Input id="yearsOfExperience" placeholder="Số năm kinh nghiệm" type="number" {...formik.getFieldProps("yearsOfExperience")} />
                {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                    <p className="text-sm text-red-500">{formik.errors.yearsOfExperience}</p>
                )}
            </div>
            <div className="space-y-2">
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                    Số giấy phép
                </label>
                <Input id="licenseNumber" placeholder="Số giấy phép" {...formik.getFieldProps("licenseNumber")} />
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