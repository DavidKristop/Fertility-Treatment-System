import { getTreatmentDetail } from "@/api/treatment";
import type { TreatmentResponse } from "@/api/types";
import LoadingComponent from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import { Clipboard, ClipboardPlus, ClipboardSignature } from "lucide-react";
import TreatmentPhaseManager from "@/components/doctor/treatment/TreatmentPhaseManager";
import TreatmentInfoCard from "@/components/doctor/treatment/TreatmentInfoCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormSection from "@/components/doctor/common/FormSection";
import { TreatmentDetailProvider } from "@/lib/context/TreatmentDetailContext";
import UnSignedContract from "@/components/common/UnSignedContract";
import UnPaidPayment from "@/components/common/UnPaidPayment";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { createFeedback } from "@/api/feedback";
import { Editor } from "primereact/editor";

export default function TreatmentDetailPage(){
  const [isLoading, setIsLoading] = useState(false)
  const [treatmentDetail, setTreatmentDetail] = useState<TreatmentResponse | undefined>()

  const {id} = useParams<{id: string}>()
  const {setTitle, setBreadCrumbs} = useAuthHeader()

  const [doctorsNote, setDoctorsNote] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const treatmentId = id || "";

  const navigate = useNavigate()

  const fetchTreatmentDetail = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await getTreatmentDetail(id)
      setTreatmentDetail(res.payload)
    } catch (error) {
      console.log(error)
      toast.error(error instanceof Error ? error.message : "Lỗi khi tải dữ liệu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitFeedback = async () => {
    if (!doctorsNote || !treatmentId) {
      toast.error("Vui lòng nhập ghi chú");
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeedback(treatmentId, doctorsNote);
      toast.success("Gửi phản hồi thành công!");
      setDoctorsNote("");
    } catch (error: any) {
      toast.error(error.message || "Gửi phản hồi thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    setBreadCrumbs([{ label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Kế hoạch điều trị", path: "/patient/treatment-plans" },
      { label: treatmentDetail?.title || "Chi tiết kế hoạch điều trị" },])
    setTitle("Chi tiết kế hoạch điều trị")
  },[])

  useEffect(()=>{
    if(id) fetchTreatmentDetail(id)
  },[id])

  // Error state - schedule not found
  if (!isLoading && !treatmentDetail) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy kế hoạch điều trị</p>
          <Button
            onClick={() => navigate("/patient/treatment-plans")}
          >
            Quay lại kế hoạch điều trị
          </Button>
        </div>
      </div>
    );
  }

  return (
    <TreatmentDetailProvider treatmentDetail={treatmentDetail || null} isLoading={isLoading} setTreatmentDetail={setTreatmentDetail}>
      <LoadingComponent isLoading={isLoading}>
        {/* Contract not signed */}
        {treatmentDetail?.status === "AWAITING_CONTRACT_SIGNED" && (
          <div className="my-2">
            <UnSignedContract contractUrl={`/patient/contracts/${treatmentDetail.contractId}`} />
          </div>
        )}
        {treatmentDetail?.payment?.some((payment) => payment.status === "PENDING") && (
          <div className="my-2">
            <UnPaidPayment 
              payments={treatmentDetail?.payment}
              onClick={(payment) => navigate(`/patient/payments/payment-detail/${payment.id}`)} 
            />
          </div>
        )}
        <Grid container spacing={2}>
          <Grid size={12}>
            {/*This will display the info of the patient, doctor, the protocol title, end date/start date, the description and the status of the treatment */}
            <FormSection title="Kế hoạch điều trị" icon={Clipboard}>
              <TreatmentInfoCard treatment={treatmentDetail!} />
            </FormSection>
          </Grid>
          <Grid size={12}>
            <FormSection title="Giai đoạn điều trị" icon={ClipboardPlus}>
              <TreatmentPhaseManager
                role="patient"
                initialPhasePosition={treatmentDetail?.currentPhase.position!+1}
                isSettable={false}
              />
            </FormSection>
          </Grid>
          <Grid size={12}>
            <FormSection title="Góp ý về quá trình điều trị" icon={ClipboardSignature}>
              <Editor
                value={doctorsNote}
                onTextChange={(e) => setDoctorsNote(e.htmlValue || "")}
                placeholder="Bạn có thể chia sẻ cảm nhận, góp ý hoặc bất kỳ điều gì liên quan đến kế hoạch điều trị..."
                className="h-[300px] mt-2"
              />
              <Button
                className="mt-4"
                onClick={handleSubmitFeedback}
                disabled={!doctorsNote || isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
              </Button>
            </FormSection>
          </Grid>
        </Grid>
      </LoadingComponent>
    </TreatmentDetailProvider>
  );
}