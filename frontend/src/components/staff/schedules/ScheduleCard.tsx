"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { ScheduleDetailResponse } from "@/api/types";

interface ScheduleCardProps {
  schedule: ScheduleDetailResponse;
  onViewDetails: (scheduleId: string) => void;
}

const statusMap = {
  PENDING: { label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-700" },
  DONE: { label: "Đã xác nhận", color: "bg-green-100 text-green-700" },
  CHANGED: { label: "Đã đổi lịch", color: "bg-blue-100 text-blue-700" }, // ✅ THÊM DÒNG NÀY
  REJECTED: { label: "Từ chối", color: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Đã hủy", color: "bg-gray-100 text-gray-700" },
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  onViewDetails,
}) => {
  const status = statusMap[schedule.status as keyof typeof statusMap];

  return (
    <Card
      className="rounded-xl px-6 py-4 mb-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow transition"
      onClick={() => onViewDetails(schedule.id)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base mb-1">
            Lịch hẹn #{schedule.id.slice(-8)}
          </div>
          <div className="text-sm mb-1">
            <span className="font-medium">Bệnh nhân:</span>{" "}
            {schedule.patient.fullName}
          </div>
          <div className="text-sm mb-1">
            <span className="font-medium">Dịch vụ:</span>{" "}
            {schedule.services.map((s) => s.name).join(", ")}
          </div>
          <div className="text-sm mb-1">
            <span className="font-medium">Thời gian:</span>{" "}
            {format(new Date(schedule.appointmentDateTime), "HH:mm dd/MM/yyyy")}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[110px] mt-1">
          {status ? (
            <Badge className={status.color + " font-normal"}>
              {status.label}
            </Badge>
          ) : (
            <Badge className="bg-gray-200 text-gray-600 font-normal">
              Không xác định
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ScheduleCard;
