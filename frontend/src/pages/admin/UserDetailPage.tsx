import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "@/api/user";
import type { ManagedUserResponse } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { deactivateUser, reactivateUser } from "@/api/user";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<ManagedUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ROLE_DOCTOR":
        return "Bác sĩ";
      case "ROLE_MANAGER":
        return "Quản lý";
      case "ROLE_PATIENT":
        return "Người dùng";
      default:
        return role;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id!);
        setUser(data);
      } catch (err) {
        console.error("Lỗi khi tải thông tin người dùng", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    setTitle("Chi tiết người dùng")
    setBreadCrumbs([
      { label: "Trang chủ", path: "/admin" },
      { label: "Quản lý", path: "/admin" },
      { label: "Quản lý người dùng", path: "/admin/manage-users" },
    ])
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-500">Không tìm thấy người dùng</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <Button variant="outline" onClick={() => navigate("/admin/manage-users")}>
        ← Quay lại
      </Button>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-bold">Chi tiết người dùng</h2>
          <p><strong>Họ tên:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
          <p><strong>Ngày sinh:</strong> {user.dateOfBirth}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
          <p><strong>Vai trò:</strong> {getRoleLabel(user.role)}</p>
          <p><strong>Trạng thái:</strong> {user.active ? "Đang hoạt động" : "Bị khóa"}</p>
          <p><strong>Xác thực:</strong> {user.verify ? "Đã xác thực" : "Chưa xác thực"}</p>
          {user.active ? (
              <Button
                  variant="destructive"
                  onClick={async () => {
                  try {
                      await deactivateUser(user.id);
                      setUser({ ...user, active: false });
                      toast.success("Đã khóa người dùng thành công");
                  } catch (err) {
                      toast.error("Lỗi khi khóa người dùng");
                      console.error(err);
                  }
                  }}
              >
                  Khóa người dùng
              </Button>
              ) : (
              <Button
                  onClick={async () => {
                  try {
                      await reactivateUser(user.id);
                      setUser({ ...user, active: true });
                      toast.success("Đã mở khóa người dùng thành công");
                  } catch (err) {
                      toast.error("Lỗi khi mở khóa người dùng");
                      console.error(err);
                  }
                  }}
              >
                  Mở khóa người dùng
              </Button>
              )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailPage;
