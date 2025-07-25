import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import type { ScheduleDetailResponse, ScheduleStatus } from "@/api/types";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function Schedules() {
  const [doctorName, setDoctorName] = useState<string>("");
  const [events, setEvents] = useState<ScheduleDetailResponse[]>([]);
  const navigate = useNavigate();
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const fetchSchedules =useCallback(async (startDate:Date, endDate:Date, filterStatus?: ScheduleStatus | "ALL") => {
    try {
      const res = await getDoctorScheduleInAMonth(startDate, endDate, filterStatus==="ALL" || !filterStatus ? undefined : [filterStatus]);
      setEvents(res.payload || []);
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Lỗi khi tải danh sách lịch hẹn");
    }
  }, []); 

  useEffect(() => {
    (async () => {
      try {
        const user = await me(); // sẽ gửi header Bearer <token>
        setDoctorName(user.fullName); // dùng email làm display name
      } catch {
        navigate("/authorization/login", { replace: true });
      }
    })();
  }, [navigate]);

  useEffect(() => {
    setTitle("Lịch khám")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/doctor/dashboard" },
      { label: "Lịch khám" },
    ])
  },[])

  if (!doctorName) {
    return (
      <div>Đang tải thông tin người dùng…</div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <ScheduleCalendar
          schedules={events}
          isDoctorPov={true}
          onNavigate={fetchSchedules}
          onScheduleClick={(event)=>navigate(`/doctor/schedule-result/${event.id}`)}
          drugs={[]}
          hasFilterStatus={true}
        />
      </div>
    </div>
  );
}
