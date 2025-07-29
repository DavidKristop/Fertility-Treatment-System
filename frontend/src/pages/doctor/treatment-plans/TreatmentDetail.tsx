import { getTreatmentDetaiICreated, moveToNextPhase } from "@/api/treatment";
import type { TreatmentResponse } from "@/api/types";
import LoadingComponent from "@/components/common/LoadingComponent";
import { Button } from "@/components/ui/button";
import { Grid } from "@mui/material";
import { Clipboard, ClipboardPlus } from "lucide-react";
import TreatmentPhaseManager from "@/components/doctor/treatment/TreatmentPhaseManager";
import TreatmentInfoCard from "@/components/doctor/treatment/TreatmentInfoCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormSection from "@/components/doctor/common/FormSection";
import { TreatmentDetailProvider } from "@/lib/context/TreatmentDetailContext";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import TreatmentPhasesDetail from "@/components/TreatmentPhasesDetail";

export default function TreatmentDetail(){
  const [isLoading, setIsLoading] = useState(false)
  const [isMovingToNextPhase, setIsMovingToNextPhase] = useState(false)
  const [treatmentDetail, setTreatmentDetail] = useState<TreatmentResponse | undefined>()

  const {id} = useParams<{id: string}>()
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const navigate = useNavigate()

  const fetchTreatmentDetail = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await getTreatmentDetaiICreated(id)
      setTreatmentDetail(res.payload)
    } catch (error) {
      console.log(error)
      toast.error(error instanceof Error ? error.message : "Lỗi khi tải dữ liệu")
    } finally {
      setIsLoading(false)
    }
  }

  const changePhase = async (id: string) => {
    setIsMovingToNextPhase(true)
    try {
      const res = await moveToNextPhase(id)
      setTreatmentDetail(res.payload)
      toast.success(res.payload?.status === "COMPLETED" ? "Hoàn thành kế hoạch điều trị thành công" : "Chuyển giai đoạn thành công")
    } catch (error) {
      console.log(error)
      toast.error(error instanceof Error ? error.message : "Lỗi khi chuyển giai đoạn")
    } finally {
      setIsMovingToNextPhase(false)
    }
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: treatmentDetail?.title || "Chi tiết kế hoạch điều trị" },
  ]

  useEffect(()=>{
    if(id) fetchTreatmentDetail(id)
  },[id])

  useEffect(()=>{
    setTitle("Chi tiết kế hoạch điều trị")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/doctor/dashboard" },
      { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
      { label: treatmentDetail?.title || "Chi tiết kế hoạch điều trị" },
    ])
  },[treatmentDetail])

  // Error state - schedule not found
  if (!isLoading && !treatmentDetail) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy kế hoạch điều trị</p>
          <Button
            onClick={() => navigate("/doctor/treatment-plans")}
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
        <Grid container spacing={2}>
          <Grid size={12}>
            {/*This will display the info of the patient, doctor, the protocol title, end date/start date, the description and the status of the treatment */}
            <FormSection title="Kế hoạch điều trị" icon={Clipboard}>
              <TreatmentInfoCard treatment={treatmentDetail!} />
            </FormSection>
          </Grid>
          <TreatmentPhasesDetail treatment={treatmentDetail!} />
          <Grid size={12}>
            <FormSection title="Giai đoạn điều trị" icon={ClipboardPlus}>
              <TreatmentPhaseManager
                role="doctor"
                initialPhasePosition={treatmentDetail?.currentPhase.position!+1}
              />
              {treatmentDetail?.canMoveToNextPhase && (<Button className="mt-4" onClick={() => changePhase(treatmentDetail!.id!)} disabled={isMovingToNextPhase}>
                {isMovingToNextPhase ? "Đang thực hiện thao tác..." : 
                  treatmentDetail?.currentPhase.position === treatmentDetail?.phases.length - 1 ? "Hoàn thành kế hoạch điều trị" :
                  "Di chuyển đến giai đoạn tiếp theo"
                }
              </Button>)}
            </FormSection>
          </Grid>
        </Grid>
      </LoadingComponent>
    </TreatmentDetailProvider>
  );
}