import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { TreatmentResponse } from "@/api/types";
import ScheduleList from "./ScheduleList";
import { useState } from "react";
import { useTreatmentDetail } from "@/lib/context/TreatmentDetailContext";

interface TreatmentPhaseManagerProps {
  initialPhasePosition: number;
}

export default function TreatmentPhaseManager({
  initialPhasePosition = 1,
}: TreatmentPhaseManagerProps) {
  const {treatmentDetail} = useTreatmentDetail()
  const [currentPhasePosition, setCurrentPhasePosition] = useState(initialPhasePosition);

  return (
    <div className="space-y-4">
      {treatmentDetail&&
        <>
          {/* Current Phase Display */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPhasePosition(currentPhasePosition - 1)}
              disabled={currentPhasePosition === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Giai đoạn trước
            </Button>
            <div className="flex-grow text-center">
              <h3 className="text-lg font-semibold">
                {treatmentDetail?.phases[currentPhasePosition - 1].title}
              </h3>
                {treatmentDetail?.currentPhase.id===treatmentDetail?.phases[currentPhasePosition - 1].id && <p className="text-sm text-yellow-500">Đang diễn ra</p>}
                {treatmentDetail?.phases[currentPhasePosition-1].complete&&treatmentDetail?.phases[currentPhasePosition-1].id!==treatmentDetail?.currentPhase.id? <p className="text-sm text-green-500">Hoàn thành</p>: <p className="text-sm text-red-500">Chưa hoàn thành</p>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPhasePosition(currentPhasePosition + 1)}
              disabled={currentPhasePosition === treatmentDetail?.phases.length}
            >
              Giai đoạn sau
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>

          {/* Schedule Management */}
          <ScheduleList
            schedules={treatmentDetail?.phases[currentPhasePosition - 1].schedules || []}
            unsetServices={treatmentDetail?.phases[currentPhasePosition - 1].unsetServices||[]}
            phaseId={treatmentDetail?.phases[currentPhasePosition - 1].id}
          />
        </>
      }

    </div>
  );
}
