import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "@/api/service";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import ServiceForm from "@/components/manager/services/ServiceForm";
import type { ServiceResponse } from "@/api/types";


export default function ManagerServiceUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {setTitle,setBreadCrumbs} = useAuthHeader()
  const [service, setService] = useState<ServiceResponse | null>(null);

  const onSuccess = () => {
    navigate("/manager/services");
  };

  const onCancel = () => {
    navigate("/manager/services");
  };

  useEffect(() => {
    if (!id) return;

    getServiceById(id)
      .then((res) => {
        if (!res.payload) {
          toast.error("Không tìm thấy dịch vụ");
          navigate("/manager/services");
          return;
        }

        setService(res.payload);
      })
      .catch(() => {
        toast.error("Không thể tải thông tin dịch vụ");
        navigate("/manager/services");
      });
  }, [id]);

  useEffect(()=>{
    setTitle("Cập nhật dịch vụ")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý dịch vụ" },
    ])
  },[])

  if (!service) return null;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Cập nhật dịch vụ</h1>
        <ServiceForm
          service={service}
          mode="edit"
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
}
