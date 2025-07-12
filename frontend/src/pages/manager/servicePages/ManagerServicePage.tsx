import { useEffect, useState } from "react";
import {
  getServices,
  deactivateService,
  reactivateService,
} from "@/api/service";
import type { ServiceReponse } from "@/api/types";
import ManagerLayout from "@/components/manager/ManagerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ManagerServicePage() {
  const [services, setServices] = useState<ServiceReponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState("");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await getServices({ page, size: 10, isActive, name });
      setServices(res.payload.content);
      setTotalPages(res.payload.totalPages);
    } catch (err) {
      toast.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [page, isActive]);

  const handleSearch = () => {
    setPage(0);
    fetchServices();
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await deactivateService(id);
        toast.success("Vô hiệu hóa thành công");
      } else {
        await reactivateService(id);
        toast.success("Kích hoạt lại thành công");
      }
      fetchServices();
    } catch (err) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái");
    }
  };

  const navigate = useNavigate();

  return (
    <ManagerLayout title="Quản lý dịch vụ">
      <div className="p-4 space-y-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Tìm kiếm theo tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleSearch}>Tìm</Button>
          <select
            value={isActive ? "active" : "inactive"}
            onChange={(e) => {
              setPage(0);
              setIsActive(e.target.value === "active");
            }}
            className="border rounded px-2 py-1"
          >
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã vô hiệu hóa</option>
          </select>
          <Button variant="outline" className="ml-auto" onClick={() => navigate("/manager/services/create")}>
            + Thêm dịch vụ mới
          </Button>
        </div>

        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="grid gap-4">
            {services.length === 0 ? (
              <div className="text-center text-gray-500">Không có dịch vụ nào</div>
            ) : (
              services.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                      <p className="text-sm mt-1">
                        Giá:{" "}
                        <span className="font-medium text-green-700">
                          {service.price.toLocaleString("vi-VN")}đ / {service.unit}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/manager/services/${service.id}`)}
                      >
                        Xem
                      </Button>
                      <Button
                        variant="outline"
                        disabled={service.active}
                        onClick={() => navigate(`/manager/services/${service.id}/edit`)}
                      >
                        Cập nhật
                      </Button>
                      <Button
                        variant={service.active ? "destructive" : "default"}
                        onClick={() =>
                          handleToggleActive(service.id, service.active)
                        }
                      >
                        {service.active ? "Vô hiệu hóa" : "Kích hoạt lại"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
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
                    isActive={idx === page}
                    onClick={() => setPage(idx)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </ManagerLayout>
  );
}
