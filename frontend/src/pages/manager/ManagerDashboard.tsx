import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStaffSchedule } from "@/api/schedule";
import { getAllDoctors, type DoctorBasic } from "@/api/doctor-management";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import type {
  ScheduleDetailResponse,
  ScheduleStatus,
} from "@/api/types";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function Schedules() {
  const [events, setEvents] = useState<ScheduleDetailResponse[]>([]);
  const [doctorList, setDoctorList] = useState<DoctorBasic[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [viewStartDate, setViewStartDate] = useState<Date | null>(null);
  const [viewEndDate, setViewEndDate] = useState<Date | null>(null);

  const navigate = useNavigate();
  const { setTitle, setBreadCrumbs } = useAuthHeader();

  const fetchSchedules = useCallback(
    async (
      startDate: Date,
      endDate: Date,
      filterStatus?: ScheduleStatus | "ALL"
    ) => {
      try {
        // Lưu thời gian đang xem
        setViewStartDate(startDate);
        setViewEndDate(endDate);

        const res = await getStaffSchedule(
          startDate,
          endDate,
          filterStatus === "ALL" || !filterStatus ? undefined : [filterStatus],
          selectedDoctorId
        );
        setEvents(res.payload || []);
      } catch (err) {
        console.error(err);
        toast.error(
          (err as Error).message || "Lỗi khi tải danh sách lịch hẹn"
        );
      }
    },
    [selectedDoctorId]
  );

  // Lấy danh sách bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
        setDoctorList(res.payload || []);
      } catch (err) {
        console.error(err);
        toast.error("Không tải được danh sách bác sĩ");
      }
    };
    fetchDoctors();
  }, []);

  // Đặt tiêu đề & breadcrumb
  useEffect(() => {
    setTitle("Trang tổng quan");
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/doctor/dashboard" },
      { label: "Lịch khám" },
    ]);
  }, []);

  // Khi đổi bác sĩ → fetch lại dữ liệu theo range hiện tại
  useEffect(() => {
    if (viewStartDate && viewEndDate) {
      fetchSchedules(viewStartDate, viewEndDate);
    }
  }, [selectedDoctorId]);

  return (
    <div className="space-y-6">
      {/* Thanh filter */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Filter bác sĩ */}
        <div className="flex gap-2 items-center">
          <label htmlFor="doctor-select" className="text-sm font-medium text-gray-700">
            Chọn bác sĩ:
          </label>
          <select
            id="doctor-select"
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            value={selectedDoctorId ?? ""}
            onChange={(e) => setSelectedDoctorId(e.target.value || undefined)}
          >
            <option value="">----</option>
            {doctorList.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lịch khám */}
      <ScheduleCalendar
        schedules={events}
        isDoctorPov={true}
        onNavigate={fetchSchedules}
        onScheduleClick={(event) =>
          navigate(`/doctor/schedule-result/${event.id}`)
        }
        drugs={[]}
        hasFilterStatus={true}
      />
    </div>
  );
}