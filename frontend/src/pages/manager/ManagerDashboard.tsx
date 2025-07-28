import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStaffSchedule } from "@/api/schedule";
import { getAllDoctors, type DoctorBasic } from "@/api/doctor-management";
import { getPatients } from "@/api/patient-management";
import ScheduleCalendar from "@/components/ScheduleCalendar";
import type { ScheduleDetailResponse, ScheduleStatus } from "@/api/types";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function Schedules() {
  const [events, setEvents] = useState<ScheduleDetailResponse[]>([]);
  const [doctorList, setDoctorList] = useState<DoctorBasic[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(
    undefined
  );
  const [viewStartDate, setViewStartDate] = useState<Date | null>(null);
  const [viewEndDate, setViewEndDate] = useState<Date | null>(null);
  const [allPatients, setAllPatients] = useState<string[]>([]);

  const navigate = useNavigate();
  const { setTitle, setBreadCrumbs } = useAuthHeader();

  const fetchSchedules = useCallback(
    async (
      startDate: Date,
      endDate: Date,
      filterStatus?: ScheduleStatus | "ALL"
    ) => {
      try {
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
        toast.error((err as Error).message || "Lỗi khi tải danh sách lịch hẹn");
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

  // ✅ Dùng đúng hàm getPatients(email, page, size)
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients("", 0, 1000); // email rỗng, size lớn
        const names =
          res.payload?.content
            .map((p) => p.fullName)
            .filter((name): name is string => Boolean(name)) ?? [];
        setAllPatients(Array.from(new Set(names)));
      } catch (err) {
        console.error(err);
        toast.error("Không tải được danh sách bệnh nhân");
      }
    };
    fetchPatients();
  }, []);

  // Breadcrumbs
  useEffect(() => {
    setTitle("Trang tổng quan");
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/doctor/dashboard" },
      { label: "Lịch khám" },
    ]);
  }, []);

  // Đổi bác sĩ → refetch đúng lịch
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
          <label
            htmlFor="doctor-select"
            className="text-sm font-medium text-gray-700"
          >
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

      {/* 🔷 Card bệnh nhân nâng cấp UI */}
      <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-blue-800">Tổng số bệnh nhân</h2>
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {allPatients.length} người
          </span>
        </div>

        <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {allPatients.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-800">
              {allPatients.map((name, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-blue-300 hover:shadow transition-all"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs">
                    {idx + 1}
                  </div>
                  <div className="flex-1 truncate font-medium">{name}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Không có bệnh nhân.</p>
          )}
        </div>
      </div>
    </div>
  );
}
