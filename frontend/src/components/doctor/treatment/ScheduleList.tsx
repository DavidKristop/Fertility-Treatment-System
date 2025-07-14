import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import type { TreatmentScheduleResponse } from "@/api/types";

interface ScheduleListProps {
  schedules: TreatmentScheduleResponse[];
  onScheduleCreate: () => void;
  onScheduleEdit: (schedule: TreatmentScheduleResponse) => void;
  onScheduleDragStart: (e: React.DragEvent<HTMLDivElement>, scheduleId: string) => void;
}

export default function ScheduleList({
  schedules,
  onScheduleCreate,
  onScheduleEdit,
  onScheduleDragStart,
}: ScheduleListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Lịch hẹn</h4>
        <Button
          variant="outline"
          size="sm"
          onClick={onScheduleCreate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo lịch hẹn mới
        </Button>
      </div>

      <div className="space-y-2">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border rounded-md p-3 flex items-center justify-between bg-white"
            draggable
            onDragStart={(e) => onScheduleDragStart(e, schedule.id)}
          >
            <div>
              <h5 className="font-medium">{schedule.title}</h5>
              <p className="text-sm text-gray-500">
                {new Date(schedule.appointmentDateTime).toLocaleString('vi-VN')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {schedule.status}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onScheduleEdit(schedule)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
