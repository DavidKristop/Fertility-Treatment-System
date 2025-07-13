import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getServiceById } from "@/api/service";
import ManagerLayout from "@/components/manager/ManagerLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import type { ServiceResponse } from "@/api/types";

export default function ManagerServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getServiceById(id)
      .then((res) => {
        if (!res.payload) throw new Error("No service found");
        setService(res.payload);
      })
      .catch(() => {
        toast.error("Không thể tải thông tin dịch vụ");
        navigate("/manager/services");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <ManagerLayout title="Chi tiết dịch vụ">
      <div className="p-6 max-w-xl space-y-4 bg-white rounded shadow">
        {loading ? (
          <p>Đang tải...</p>
        ) : service ? (
          <>
            <h2 className="text-2xl font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
            <p>
              <span className="font-medium">Giá:</span>{" "}
              <span className="text-green-700">
                {service.price.toLocaleString("vi-VN")}đ / {service.unit}
              </span>
            </p>
            <p>
              <span className="font-medium">Trạng thái:</span>{" "}
              <Badge variant={service.active ? "default" : "destructive"}>
                {service.active ? "Đang hoạt động" : "Đã vô hiệu hóa"}
              </Badge>
            </p>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => navigate("/manager/services")}>
                Quay lại
              </Button>
              <Button
                onClick={() => navigate(`/manager/services/${service.id}/edit`)}
                disabled={service.active}
              >
                Cập nhật
              </Button>
            </div>
          </>
        ) : (
          <p className="text-red-500">Không tìm thấy dịch vụ</p>
        )}
      </div>
    </ManagerLayout>
  );
}
