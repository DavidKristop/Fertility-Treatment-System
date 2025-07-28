import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { deactivateUser, getUsers, reactivateUser } from "@/api/user";
import type { ManagedUserResponse } from "@/api/types";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  User,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Shield,
  Stethoscope,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

const ROLE_OPTIONS = [
  { value: "", label: "Tất cả vai trò" },
  { value: "ROLE_DOCTOR", label: "Bác sĩ" },
  { value: "ROLE_MANAGER", label: "Quản lý" },
  { value: "ROLE_PATIENT", label: "Người dùng" },
];

export default function ManageUserPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const roleParam = searchParams.get("role") || "";
  const keywordParam = searchParams.get("keyword") || "";
  const pageParam = Number(searchParams.get("page"));

  const [users, setUsers] = useState<ManagedUserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [role, setRole] = useState(roleParam);
  const [keyword, setKeyword] = useState(keywordParam);
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUsers( role, keyword, page, 10 );
      setUsers(res.payload.content);
      setTotalPages(res.payload.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };


  const handleDeactivate = async (id: string) => {
    try {
      await deactivateUser(id);
      toast.success("Khóa tài khoản thành công");
      fetchUsers();
    } catch (err) {
      toast.error("Khóa tài khoản thất bại");
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      await reactivateUser(id);
      toast.success("Mở khóa tài khoản thành công");
      fetchUsers();
    } catch (err) {
      toast.error("Mở khóa tài khoản thất bại");
    }
  };

  const renderRoleIcon = (role: string) => {
    switch (role) {
      case "ROLE_DOCTOR":
        return <Stethoscope className="inline mr-1 text-blue-600 w-4 h-4" />;
      case "ROLE_MANAGER":
        return <Shield className="inline mr-1 text-orange-500 w-4 h-4" />;
      case "ROLE_PATIENT":
        return <User className="inline mr-1 text-gray-600 w-4 h-4" />;
      default:
        return null;
    }
  };

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
    setSearchParams({ role, keyword, page: String(page) });
  }, [role, keyword, page]);

  useEffect(() => {
    fetchUsers();
  }, [role, keyword, page]);

  useEffect(() => {
    setTitle("Quản lý người dùng")
    setBreadCrumbs([
      { label: "Quản lý người dùng", path: "/admin/manage-users" },
    ])
  },[])
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Danh sách người dùng</h2>

      <div className="flex gap-2 mb-4">
        <select
          className="border rounded px-2 py-1"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(0);
          }}
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Tìm theo email"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0);
          }}
          className="border px-2 py-1 rounded"
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && users.length === 0 && (
        <div className="text-gray-500 italic">Không có dữ liệu</div>
      )}

      {!loading && users.length > 0 && (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded shadow bg-white text-sm"
            >
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Họ tên:</strong> {user.fullName}
              </div>
              <div>
                <strong>Vai trò:</strong>{" "}
                {renderRoleIcon(user.role)} {getRoleLabel(user.role)}
              </div>
              <div>
                <strong>Trạng thái:</strong>{" "}
                {user.active ? (
                  <span className="text-green-600 inline-flex items-center gap-1">
                    <UserCheck className="w-4 h-4" />
                    Đang hoạt động
                  </span>
                ) : (
                  <span className="text-red-500 inline-flex items-center gap-1">
                    <UserX className="w-4 h-4" />
                    Đã khóa
                  </span>
                )}
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {user.active ? (
                  <Button
                    variant="destructive"
                    onClick={() => handleDeactivate(user.id)}
                    className="flex items-center gap-1"
                  >
                    <Lock className="w-4 h-4" />
                    Khóa tài khoản
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleReactivate(user.id)}
                    className="flex items-center gap-1"
                  >
                    <Unlock className="w-4 h-4" />
                    Mở khóa
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={() => window.location.href = `/admin/manage-users/${user.id}`}
                >
                  <Eye className="w-4 h-4" />
                  Xem chi tiết
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    isActive={page === idx}
                    onClick={() => setPage(idx)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
