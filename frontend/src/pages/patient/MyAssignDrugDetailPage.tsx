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
import DrugList from "@/components/manager/assignDrug/DrugList";
import TreatmentInfo from "@/components/manager/assignDrug/TreatmentInfo";
import type { AssignDrugDetailResponse } from "@/api/types";
import { getAssignDrugById } from "@/api/assignDrug";
import PatientLayout from "@/components/patient/PatientLayout";

export default function MyAssignDrugDetailPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [assignDrug, setAssignDrug] = useState<AssignDrugDetailResponse | undefined>();
  const navigate = useNavigate();
  const breadCrumb = [
    { label: "Trang chủ", path: "/patient/dashboard" },
    { label: "Danh sách đơn thuốc", path: "/patient/assigned-drugs" },
    { label: assignDrug?.title || "Chi tiết đơn thuốc", path: `/patient/assigned-drugs/${id}` },
  ];

  useEffect(() => {
    if (!id) {
      navigate("/patient/assigned-drugs", { replace: true });
      return;
    }
    const fetchAssignDrug = async () => {
      setLoading(true);
      try {
        const response = await getAssignDrugById(id);
        setAssignDrug(response.payload);
      } catch (err) {
        console.error(err);
        toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignDrug();
  }, [id, navigate]);

  if (!loading && !assignDrug) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy đơn thuốc</p>
          <Button
            onClick={() => navigate("/patient/assigned-drugs")}
            variant="outline"
          >
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }



  return (
    <PatientLayout title={assignDrug?.title||"Chi tiết đơn thuốc"} breadcrumbs={breadCrumb}>
      <LoadingComponent isLoading={loading}>
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/patient/assigned-drugs")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Chi tiết đơn thuốc</h1>
              <p className="text-gray-600">{assignDrug?.title}</p>
            </div>
          </div>

          {/* Contract not signed */}
          {assignDrug?.contract && !assignDrug.contract.signed && (
            <UnSignedContract contractUrl={`/patient/contracts/${assignDrug.contract.id}`} />
          )}

          {/* Unpaid payment */}
          {assignDrug?.payment.status === "PENDING" && (
            <UnPaidPayment 
              payments={[assignDrug.payment]} 
              onClick={(payment) => navigate(`/patient/payments/payment-detail/${payment.id}`)} 
            />
          )}

          {/* Treatment Info */}
          <FormSection title="Thông tin điều trị" icon={Calendar}>
            <TreatmentInfo 
              treatment={assignDrug?.treatment || { id: "", status: "AWAITING_CONTRACT_SIGNED", contractId: "" }}
              phase={assignDrug?.treatmentPhase || { id: "", title: "" }}
            />
          </FormSection>

          {/* Patient Info */}
          <FormSection title="Thông tin bệnh nhân" icon={Calendar}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Tên bệnh nhân</h3>
                  <p className="text-sm text-gray-600">{assignDrug?.patient.fullName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-gray-600">{assignDrug?.patient.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Trạng thái</h3>
                  <p className="text-sm text-gray-600">
                    {assignDrug?.status === "PENDING" ? "Chờ lấy" :
                     assignDrug?.status === "COMPLETED" ? "Đã lấy" :
                     assignDrug?.status === "CANCELLED" ? "Đã hủy" : ""}
                  </p>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Drug List */}
          <FormSection title="Danh sách thuốc" icon={Calendar}>
            <DrugList drugs={assignDrug?.patientDrugs || []} />
          </FormSection>

        </div>
      </LoadingComponent>
    </PatientLayout>
  );
}