import { useEffect, useState } from "react";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { createDoctor } from "@/api/doctor-management";
import { Card, CardContent } from "@mui/material";
import CreateDoctorForm from "@/components/createUserForm/CreateDoctorForm";
import { toast } from "react-toastify";
import type { DoctorRegisterFormValues } from "@/lib/validations/auth";

export default function CreateDoctorPage() {
  const {setTitle,setBreadCrumbs} = useAuthHeader()
 
  async function handleSubmit(data: DoctorRegisterFormValues) {
    try {
      await createDoctor(data);
      toast.success("Tạo tài khoản bác sĩ thành công!");
    } catch (err: any) {
      toast.error("Tạo tài khoản thất bại: " + err.message);
    }
  }

  useEffect(()=>{
    setTitle("Tạo tài khoản bác sĩ mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
      { label: "Tạo tài khoản bác sĩ mới"},

    ])
  },[])

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <CreateDoctorForm onSubmitCb={handleSubmit}/>
        </CardContent>
      </Card>
    </div>
  );
}
