import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { TreatmentResponse, TreatmentScheduleResponse } from "@/api/types";
import ScheduleList from "./ScheduleList";
import ScheduleCreateDialog from "./ScheduleCreateDialog";
import { useState } from "react";

interface TreatmentPhaseManagerProps {
  treatment: TreatmentResponse;
  initialPhasePosition: number;
}

export default function TreatmentPhaseManager({
  treatment,
  initialPhasePosition = 1,
}: TreatmentPhaseManagerProps) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<TreatmentScheduleResponse | undefined>();
  const [currentPhasePosition, setCurrentPhasePosition] = useState(initialPhasePosition);

  return (
    <div className="space-y-4">
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
            {treatment.phases[currentPhasePosition - 1].title}
          </h3>
            {treatment.currentPhase.id===treatment.phases[currentPhasePosition - 1].id && <p className="text-sm text-yellow-500">Đang diễn ra</p>}
            {treatment.phases[currentPhasePosition-1].complete&&treatment.phases[currentPhasePosition-1].id!==treatment.currentPhase.id? <p className="text-sm text-green-500">Hoàn thành</p>: <p className="text-sm text-red-500">Chưa hoàn thành</p>}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPhasePosition(currentPhasePosition + 1)}
          disabled={currentPhasePosition === treatment.phases.length}
        >
          Giai đoạn sau
          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
        </Button>
      </div>

      {/* Schedule Management */}
      <ScheduleList
        schedules={treatment.phases[currentPhasePosition - 1].schedules || []}
        onScheduleCreate={() => setIsScheduleDialogOpen(true)}
        onScheduleEdit={(schedule) => {
          setSelectedSchedule(schedule);
          setIsScheduleDialogOpen(true);
        }}
        onScheduleDragStart={(e, scheduleId) => {
          e.dataTransfer.setData('text/plain', scheduleId);
        }}
      />

      {/* Schedule Dialog */}
      <ScheduleCreateDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
        unsetServices={treatment.phases[currentPhasePosition - 1].unsetServices||[]}
      />
    </div>
  );
}
