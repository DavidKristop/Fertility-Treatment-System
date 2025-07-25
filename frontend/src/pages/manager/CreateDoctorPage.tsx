import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createDoctor } from "@/api/doctor-management";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function CreateDoctorPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    password: "",
    specialty: "",
    degree: "",
    yearsOfExperience: "",
    licenseNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const {setTitle,setBreadCrumbs} = useAuthHeader()
  const fields = [
    { name: "fullName", label: "Họ tên" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Số điện thoại" },
    { name: "address", label: "Địa chỉ" },
    { name: "dateOfBirth", label: "Ngày sinh", type: "date" },
    { name: "password", label: "Mật khẩu", type: "password" },
    { name: "specialty", label: "Chuyên khoa" },
    { name: "degree", label: "Bằng cấp" },
    { name: "yearsOfExperience", label: "Số năm kinh nghiệm" },
    { name: "licenseNumber", label: "Mã chứng chỉ hành nghề" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        await createDoctor({
        ...formData,
        yearsOfExperience: Number(formData.yearsOfExperience),
        });
        toast.success("Tạo tài khoản bác sĩ thành công!");

        // Reset lại form
        setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        password: "",
        specialty: "",
        degree: "",
        yearsOfExperience: "",
        licenseNumber: "",
        });
    } catch (err: any) {
        toast.error(err.message || "Không thể tạo tài khoản bác sĩ");
    } finally {
        setLoading(false);
    }
  };

  useEffect(()=>{
    setTitle("Tạo tài khoản bác sĩ mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
    ])
  },[])

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4"
    >
      {fields.map(({ name, label, type = "text" }) => (
        <div key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            name={name}
            type={type}
            value={(formData as any)[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo bác sĩ"}
      </Button>
    </form>
  );
}
