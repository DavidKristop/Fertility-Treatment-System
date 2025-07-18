import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { ScheduleSetRequest, ScheduleStatus, TreatmentScheduleResponse, TreatmentServiceResponse } from "@/api/types";
import ScheduleSetDialog from "./ScheduleSetDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getStatusText(status: ScheduleStatus) {
  switch (status) {
    case 'PENDING':
      return 'Chờ xử lý';
    case 'CHANGED':
      return 'Đã thay đổi';
    case 'CANCELLED':
      return 'Đã hủy';
    case 'DONE':
      return 'Đã hoàn thành';
    default:
      return status;
  }
}

interface ScheduleListProps {
  unsetServices: TreatmentServiceResponse[];
  schedules: TreatmentScheduleResponse[];
  isSettable?:boolean;
  role:"doctor"|"patient"
}

export default function ScheduleList({
  unsetServices,
  schedules,
  isSettable=true,
  role="doctor"
}: ScheduleListProps) {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSetRequest | undefined>(undefined);
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Lịch hẹn</h4>
        {isSettable&&<Button
          variant="outline"
          size="sm"
          onClick={()=>{
            setIsScheduleDialogOpen(true)
            setSelectedSchedule(undefined)
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo lịch hẹn mới
        </Button>}
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {schedules.length===0&&<p className="text-center text-gray-500">Không có lịch hẹn</p>}
        {schedules.sort((a,b)=>new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime()).map((schedule) => (
          <div
            key={schedule.id}
            className="border cursor-pointer rounded-md p-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
            style={{
              backgroundColor: schedule.status === 'PENDING' ? '#FFF3E0' : 
                        schedule.status === 'CANCELLED' ? '#FFE7E7' : 
                        schedule.status === 'DONE' ? '#E8F5E9' : 
                        schedule.status === 'CHANGED' ? '#FFF9C4' : '#fff',
              color: schedule.status === 'PENDING' ? '#F57C00' : 
                    schedule.status === 'CANCELLED' ? '#D32F2F' : 
                    schedule.status === 'DONE' ? '#388E3C' : 
                    schedule.status === 'CHANGED' ? '#F57F17' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            onClick={()=>{
              if(isSettable&&(schedule.status==='PENDING'||schedule.status==='CHANGED')) {
                setIsScheduleDialogOpen(true)
                setSelectedSchedule({
                    scheduleId:schedule.id,
                    title:schedule.title,
                    appointmentDateTime:new Date(schedule.appointmentDateTime),
                  estimatedTime:new Date(schedule.estimatedTime),
                  scheduleServices:schedule.services.map((service)=>({
                    ...service,
                    isUnset:false,
                    inputId:crypto.randomUUID(),
                  }))
                })
              }
              else navigate(`/${role}/schedule-result/${schedule.id}`)
            }}
          >
            <div>
              <h5 className="font-medium text-lg mb-1">{schedule.title}</h5>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {new Date(schedule.appointmentDateTime).toLocaleString('vi-VN') + " - " + new Date(schedule.estimatedTime).toLocaleString('vi-VN')}
                </span>
                <Badge 
                  variant="outline" 
                  className={`px-2 py-1 text-sm ${
                    schedule.status === 'PENDING' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    schedule.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200' :
                    schedule.status === 'DONE' ? 'bg-green-100 text-green-800 border-green-200' :
                    schedule.status === 'CHANGED' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''
                  }`}
                >
                  {getStatusText(schedule.status || 'PENDING')}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Schedule Dialog */}
      {isSettable&&
        <ScheduleSetDialog
          isOpen={isScheduleDialogOpen}
          onClose={() => setIsScheduleDialogOpen(false)}
          unsetServices={unsetServices}
          schedule={selectedSchedule}
        />
      }
    </div>
  );
}
