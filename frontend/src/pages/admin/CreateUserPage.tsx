import { useEffect, useState } from "react";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { createDoctor } from "@/api/doctor-management";
import { createStaff } from "@/api/staff-management";
import { Card, CardContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import CreateDoctorForm from "@/components/createUserForm/CreateDoctorForm";
import { toast } from "react-toastify";
import type { DoctorRegisterFormValues, RegisterFormValues } from "@/lib/validations/auth";
import CreateUserForm from "@/components/createUserForm/CreateUserForm";

export default function CreateUserPage() {
  const { setTitle, setBreadCrumbs } = useAuthHeader()
  const [userRole, setUserRole] = useState<'ROLE_DOCTOR' | 'ROLE_MANAGER' | 'ROLE_STAFF'>('ROLE_DOCTOR')

  const handleDoctorSubmit = async (data: DoctorRegisterFormValues) => {
    try {
      await createDoctor(data);
      toast.success("Tạo tài khoản bác sĩ thành công!");
    } catch (err: any) {
      toast.error("Tạo tài khoản thất bại: " + err.message);
    }
  }

  const handleUserFormSubmit = async (data: RegisterFormValues) => {
    try {
      if(userRole === 'ROLE_STAFF') await createStaff({...data,role:"ROLE_STAFF"});
      else if(userRole === 'ROLE_MANAGER') await createStaff({...data,role:"ROLE_MANAGER"});
      toast.success("Tạo tài khoản quản lý thành công!");
    } catch (err: any) {
      toast.error("Tạo tài khoản thất bại: " + err.message);
    }
  }

  useEffect(() => {
    setTitle("Tạo tài khoản mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
      { label: "Tạo tài khoản mới"},
    ])
  }, [])

  return (
    <div className="mx-auto p-6">
      <Card className="p-6">
        <FormControl fullWidth>
          <InputLabel>Tạo tài khoản</InputLabel>
          <Select
            value={userRole}
            label="Tạo tài khoản"
            onChange={(e) => {
              setUserRole(e.target.value as 'ROLE_DOCTOR' | 'ROLE_STAFF');
            }}
          >
            <MenuItem value="ROLE_DOCTOR">Tạo tài khoản bác sĩ</MenuItem>
            <MenuItem value="ROLE_STAFF">Tạo tài khoản nhân viên</MenuItem>
          </Select>
        </FormControl>
        <CardContent className="pt-6 space-y-4">
          {userRole === 'ROLE_DOCTOR' ? (
            <CreateDoctorForm onSubmitCb={handleDoctorSubmit} />
          ) : (
            <CreateUserForm onSubmitCb={handleUserFormSubmit} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
