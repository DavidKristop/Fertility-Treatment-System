import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";
import DoctorLayout from "@/components/doctor/DoctorLayout";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import type { ScheduleDetailResponse, ScheduleStatus } from "@/api/types";

export default function PatientDashboard() {
  const [doctorName, setDoctorName] = useState<string>("");
  const [events, setEvents] = useState<ScheduleDetailResponse[]>([]);
  const navigate = useNavigate();

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

  const fetchSchedules =useCallback(async (startDate:Date, endDate:Date, filterStatus?: ScheduleStatus | "ALL") => {
    try {
      const res = await getDoctorScheduleInAMonth(startDate, endDate, filterStatus==="ALL" || !filterStatus ? undefined : [filterStatus]);
      setEvents(res.payload || []);
    } catch (err) {
      console.error(err);
    }
  }, []); 

  if (!doctorName) {
    return (
      <DoctorLayout title="Lịch khám">
        <div>Đang tải thông tin người dùng…</div>
      </DoctorLayout>
    );
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/doctor/dashboard" },
    { label: "Lịch khám" },
  ];

  return (
    <DoctorLayout title="Lịch khám" breadcrumbs={breadcrumbs}>
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
        <Card>
          <CardHeader>
            <CardTitle>Chú thích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Ngày uống thuốc</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span className="text-sm">Ngày có hẹn với bác sĩ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  );
}
