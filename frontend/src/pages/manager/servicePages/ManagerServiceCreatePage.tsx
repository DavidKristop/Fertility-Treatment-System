import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ServiceForm from "@/components/manager/services/ServiceForm";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

const ManagerServiceCreatePage = () => {
  const navigate = useNavigate();
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const onSuccess = () => {
    navigate("/manager/services");
  };

  const onCancel = () => {
    navigate("/manager/services");
  };

  useEffect(()=>{
    setTitle("Thêm dịch vụ mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý dịch vụ" },
    ])
  },[])

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Tạo dịch vụ mới</h1>
        <ServiceForm
          mode="create"
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default ManagerServiceCreatePage;
