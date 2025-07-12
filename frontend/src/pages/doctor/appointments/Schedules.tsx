import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";
import DoctorLayout from "@/components/doctor/DoctorLayout";
import { Button } from "@/components/ui/button";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import { endOfWeek, startOfWeek } from "date-fns";
import type { ScheduleDetailResponse } from "@/api/types";

export default function PatientDashboard() {
  const [doctorName, setDoctorName] = useState<string>("");
  const [events, setEvents] = useState<ScheduleDetailResponse[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "CANCELLED" | "DONE">(
    "PENDING"
  );
  const navigate = useNavigate();
  const initRef = useRef(false);

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

  const handleScheduleNavigate = useCallback(
    (newDate: Date) => {
      setCurrentDate(newDate);
    },
    [setCurrentDate]
  );

  // Fetch và map tất cả các event (không còn filter status)
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const start = startOfWeek(currentDate, { weekStartsOn: 1 }); 
        const end = endOfWeek(currentDate, { weekStartsOn: 1 });
        const res = await getDoctorScheduleInAMonth(start, end, filterStatus==="ALL" ? undefined : [filterStatus]);

        setEvents(res.payload || []);

        if (!initRef.current && res.payload?.length) {
          initRef.current = true;
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchedules();
  }, [currentDate, filterStatus]);

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
        {/* BỘ LỌC STATUS */}
        <div className="flex items-center gap-2 mb-4">
          {(
            [
              { key: "ALL", label: "Tất cả" },
              { key: "PENDING", label: "Chưa hoàn thành" },
              { key: "CANCELLED", label: "Đã hủy" },
              { key: "DONE", label: "Đã hoàn thành" },
            ] as const
          ).map((opt) => (
            <Button
              key={opt.key}
              size="sm"
              variant={filterStatus === opt.key ? "default" : "outline"}
              onClick={() =>
                setFilterStatus(opt.key as "ALL" | "PENDING" | "CANCELLED" | "DONE")
              }
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <ScheduleCalendar
            schedules={events}
            date={currentDate}
            onNavigate={handleScheduleNavigate}
            onScheduleClick={(event)=>navigate(`/doctor/schedule-result/${event.id}`)}
            drugs={[]}
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
