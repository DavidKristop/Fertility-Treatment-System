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
import type { AssignDrugDetailResponse, TreatmentStatus, PaymentStatus } from "@/api/types";
import { getAssignDrugByIdForManager, markAssignDrugAsTaken, cancelAssignDrug } from "@/api/assignDrug";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

export default function ManagerAssignDrugDetailPage() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const [assignDrug, setAssignDrug] = useState<AssignDrugDetailResponse | undefined>();
  const {setTitle,setBreadCrumbs} = useAuthHeader()
  const navigate = useNavigate();

  // Helper function to get default treatment status
  const getDefaultTreatmentStatus = (): TreatmentStatus => {
    return "AWAITING_CONTRACT_SIGNED";
  };

  // Helper function to get default payment status
  const getDefaultPaymentStatus = (): PaymentStatus => {
    return "PENDING";
  };
  const breadCrumb= [
    { label: "Trang chủ", path: "/manager/dashboard" },
    { label: "Danh sách đơn thuốc", path: "/manager/assigned-drugs" },
    { label: assignDrug?.title || "Chi tiết đơn thuốc", path: `/manager/assigned-drugs/${id}` },
  ];

  useEffect(() => {
    if (!id) {
      navigate("/manager/assigned-drugs", { replace: true });
      return;
    }
    const fetchAssignDrug = async () => {
      setLoading(true);
      try {
        const response = await getAssignDrugByIdForManager(id);
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

  const handleComplete = async () => {
    if (!assignDrug) return;
    try {
      await markAssignDrugAsTaken(assignDrug.id);
      toast.success("Đã cập nhật trạng thái thuốc");
      navigate("/manager/assigned-drugs");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    }
  };

  const handleCancel = async () => {
    if (!assignDrug) return;
    try {
      await cancelAssignDrug(assignDrug.id);
      toast.success("Đã hủy đơn thuốc");
      navigate("/manager/assigned-drugs"); 
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    }
  };

  
  useEffect(()=>{
    setTitle("Chi tiết đơn thuốc")
    setBreadCrumbs([
      { label: "Trang chủ", path: "/manager/dashboard" },
      { label: "Danh sách đơn thuốc", path: "/manager/assigned-drugs" },
      { label: assignDrug?.title || "Chi tiết đơn thuốc", path: `/manager/assigned-drugs/${id}` },
    ])
  },[])

  if (!loading && !assignDrug) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy đơn thuốc</p>
          <Button
            onClick={() => navigate("/manager/assigned-drugs")}
            variant="outline"
          >
            Quay lại danh sách
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <LoadingComponent isLoading={loading}>
        <div className="space-y-6">
          {/* Header with back button and doctor info */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/manager/assigned-drugs")}
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
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Bác sĩ:</span>
                  <span className="text-sm text-gray-600">{assignDrug?.doctor.fullName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl font-bold">Chi tiết đơn thuốc</h1>
            <p className="text-gray-600">{assignDrug?.title}</p>
          </div>

          {/* Contract Section */}
          {assignDrug?.contract?.signed === false && (
              <UnSignedContract contractUrl={`manager/contracts/${assignDrug.contract.id}`} />
          )}

          {/* Payment Section */}
          {assignDrug?.payment?.status === "PENDING" && (
              <UnPaidPayment 
                  payments={assignDrug?.payment ? [assignDrug.payment] : []}
                  onClick={(payment) => {
                      navigate(`manager/payments/${payment.id}`)
                  }}  
              />
          )}

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

          {/* Doctor Information */}
          <FormSection title="Thông tin bác sĩ" className="mt-6">
            <div className="border border-gray-200 rounded-lg bg-white p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Họ tên:</span>
                  <span className="text-gray-600">{assignDrug?.doctor.fullName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Chuyên khoa:</span>
                  <span className="text-gray-600">{assignDrug?.doctor.specialty}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Bằng cấp:</span>
                  <span className="text-gray-600">{assignDrug?.doctor.degree}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Năm kinh nghiệm:</span>
                  <span className="text-gray-600">{assignDrug?.doctor.yearsOfExperience} năm</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">Số chứng chỉ hành nghề:</span>
                  <span className="text-gray-600">{assignDrug?.doctor.licenseNumber}</span>
                </div>
              </div>
            </div>
          </FormSection>

          {/* Treatment Information */}
          <FormSection title="Thông tin điều trị" className="mt-6">
            <TreatmentInfo 
              treatment={assignDrug?.treatment || { id: "", status: getDefaultTreatmentStatus(), contractId: "" }}
              phase={assignDrug?.treatmentPhase || { id: "", title: "" }}
              treatmentUrl={`/manager/treatments/${assignDrug?.treatment.id}`}
            />
          </FormSection>

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
                {assignDrug.payment.status !== "PENDING"?"Hoàn thành":"Đang chờ thanh toán"}
              </Button>
            )}
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
}