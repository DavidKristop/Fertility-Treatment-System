import { useForm } from "react-hook-form";
import type { RegisterRequest } from "@/api/types";
import { createManager } from "@/api/user";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import AdminLayout from "@/components/admin/AdminLayout";

const CreateManagerPage = () => {
  const { register, handleSubmit, reset } = useForm<RegisterRequest>();

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await createManager(data);
      toast.success("Tạo tài khoản quản lý thành công!");
      reset();
    } catch (err: any) {
      toast.error("Tạo tài khoản thất bại: " + err.message);
    }
  };

  return (
    <AdminLayout title="Tạo tài khoản Quản lý">
      <div className="max-w-xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Họ tên" {...register("username", { required: true })} />
              <Input placeholder="Email" type="email" {...register("email", { required: true })} />
              <Input placeholder="Số điện thoại" {...register("phone")} />
              <Input placeholder="Địa chỉ" {...register("address")} />
              <Input placeholder="Ngày sinh" type="date" {...register("dateOfBirth", { required: true })} />
              <Input placeholder="Mật khẩu" type="password" {...register("password", { required: true })} />
              <Button type="submit" className="w-full">Tạo tài khoản</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateManagerPage;
