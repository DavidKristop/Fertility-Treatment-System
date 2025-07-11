import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";
import MyScheduler from "@/components/Scheduler";
import DoctorLayout from "@/components/doctor/DoctorLayout";
import { Button } from "@/components/ui/button";
import { getDoctorScheduleInAMonth } from "@/api/schedule";
import type { ScheduleResponse } from "@/api/types";

export default function PatientDashboard() {
  const [doctorName, setDoctorName] = useState<string>("");
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "DONE">(
    "ALL"
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
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const res = await getDoctorScheduleInAMonth(year, month);

        const mappedEvents = (res.payload || []).map(
          (item) => ({
            id: item.id,
            title: "Hẹn với bệnh nhân " + item.patient.fullName,
            start: new Date(item.appointmentDateTime),
            end: new Date(item.estimatedTime),
            status: item.status, // vẫn giữ nếu bạn có dùng trong tooltip hay style
          })
        );

        setEvents(mappedEvents);

        if (!initRef.current && mappedEvents.length) {
          setCurrentDate(mappedEvents[0].start);
          initRef.current = true;
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchedules();
  }, [currentDate]);

  if (!doctorName) {
    return (
      <DoctorLayout title="Lịch khám">
        <div>Đang tải thông tin người dùng…</div>
      </DoctorLayout>
    );
  }

  interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    status: string;
  }

  const filteredEvents = events.filter((e) =>
    filterStatus === "ALL" ? true : e.status === filterStatus
  );

  const handleScheduleClick = (event: CalendarEvent) => {
    navigate(`/doctor/schedule-result/${event.id}`);
  };

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
              { key: "DONE", label: "Đã hoàn thành" },
            ] as const
          ).map((opt) => (
            <Button
              key={opt.key}
              size="sm"
              variant={filterStatus === opt.key ? "default" : "outline"}
              onClick={() =>
                setFilterStatus(opt.key as "ALL" | "PENDING" | "DONE")
              }
            >
              {opt.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <MyScheduler
            events={filteredEvents}
            date={currentDate}
            onNavigate={handleScheduleNavigate}
            onSelectEvent={handleScheduleClick}
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
