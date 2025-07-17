import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import LoadingComponent from "@/components/common/LoadingComponent";
import FormSection from "@/components/doctor/common/FormSection";
import { Calendar } from "lucide-react";
import UnSignedContract from "@/components/common/UnSignedContract";
import UnPaidPayment from "@/components/common/UnPaidPayment";
import DrugList from "@/components/doctor/assignDrug/DrugList";
import TreatmentInfo from "@/components/doctor/assignDrug/TreatmentInfo";
import type { AssignDrugDetailResponse } from "@/api/types";
import { getAssignDrugByIdForDoctor, markAssignDrugAsTaken, cancelAssignDrug } from "@/api/assignDrug";
import DoctorLayout from "@/components/doctor/DoctorLayout";

export default function MyAssignDrugDetailPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [assignDrug, setAssignDrug] = useState<AssignDrugDetailResponse | undefined>();
  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Danh sách đơn thuốc", path: "/doctor/assigned-drugs" },
    { label: assignDrug?.title || "Chi tiết đơn thuốc", path: `/doctor/assigned-drugs/${id}` },
  ];
  const navigate = useNavigate();

  const fetchAssignDrug = async () => {
    setLoading(true);
    try {
      const response = await getAssignDrugByIdForDoctor(id || "");
      if (response.success) {
        setAssignDrug(response.payload);
      } else {
        toast.error(response.message || "Lỗi khi lấy thông tin đơn thuốc");
      }
    } catch (error) {
      toast.error("Lỗi khi lấy thông tin đơn thuốc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignDrug();
  }, [id]);

  const handleComplete = async () => {
    if (!assignDrug) return;

    try {
      const response = await markAssignDrugAsTaken(assignDrug.id);
      if (response.success) {
        toast.success("Đánh dấu hoàn thành thành công");
        fetchAssignDrug();
      } else {
        toast.error(response.message || "Lỗi khi đánh dấu hoàn thành");
      }
    } catch (error) {
      toast.error("Lỗi khi đánh dấu hoàn thành");
    }
  };

  const handleCancel = async () => {
    if (!assignDrug) return;

    try {
      const response = await cancelAssignDrug(assignDrug.id);
      if (response.success) {
        toast.success("Hủy đơn thuốc thành công");
        fetchAssignDrug();
      } else {
        toast.error(response.message || "Lỗi khi hủy đơn thuốc");
      }
    } catch (error) {
      toast.error("Lỗi khi hủy đơn thuốc");
    }
  };

  return (
    <DoctorLayout title={assignDrug?.title || "Chi tiết đơn thuốc"} breadcrumbs={breadcrumbs}>
      <div className="container mx-auto py-6">
        <LoadingComponent isLoading={loading}>
          <div className="space-y-6">
            {/* Header with back button */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/doctor/assigned-drugs")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </Button>
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-bold">{assignDrug?.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{new Date(assignDrug?.createdAt || new Date()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <FormSection title="Thông tin bệnh nhân" className="mt-6">
              <div className="border border-gray-200 rounded-lg bg-white p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Họ tên:</span>
                    <span className="text-gray-600">{assignDrug?.patient.fullName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-600">{assignDrug?.patient.email}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Số điện thoại:</span>
                    <span className="text-gray-600">{assignDrug?.patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Địa chỉ:</span>
                    <span className="text-gray-600">{assignDrug?.patient.address}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Ngày sinh:</span>
                    <span className="text-gray-600">{new Date(assignDrug?.patient.dateOfBirth || '').toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Treatment Information */}
            <FormSection title="Thông tin điều trị" className="mt-6">
              <TreatmentInfo 
                treatment={assignDrug?.treatment || { id: "", status: "", contractId: "" }}
                phase={assignDrug?.treatmentPhase || { id: "", title: "" }}
              />
            </FormSection>

            {/* Contract Section */}
            {assignDrug?.contract && (
              <FormSection title="Hợp đồng" className="mt-6">
                <UnSignedContract contractUrl={`manager/contracts/${assignDrug.contract.id}`} />
              </FormSection>
            )}

            {/* Payment Section */}
            {assignDrug?.payment && (
              <FormSection title="Thanh toán" className="mt-6">
                <UnPaidPayment 
                  payments={assignDrug?.payment ? [assignDrug.payment] : []}
                  onClick={(payment) => {
                    navigate(`manager/payments/${payment.id}`)
                  }}  
                />
              </FormSection>
            )}

            {/* Drug List */}
            <FormSection title="Danh sách thuốc" className="mt-6">
              <DrugList drugs={assignDrug?.patientDrugs || []} />
            </FormSection>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {assignDrug?.status === "PENDING" && (
                <Button
                  disabled={assignDrug.payment.status === "PENDING"}
                  onClick={() => handleComplete()}
                >
                  {assignDrug.payment.status !== "PENDING" ? "Hoàn thành" : "Đang chờ thanh toán"}
                </Button>
              )}
            </div>
          </div>
        </LoadingComponent>
      </div>
    </DoctorLayout>
  );
}
