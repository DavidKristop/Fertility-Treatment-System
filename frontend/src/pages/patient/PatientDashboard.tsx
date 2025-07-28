import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";
import { getMyTreatments } from "@/api/treatment";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { getPatientScheduleInAMonth } from "@/api/schedule";
import ScheduleCardList from "@/components/staff/schedules/ScheduleCardList"; // tái sử dụng component staff
import type { ScheduleDetailResponse } from "@/api/types";

export default function PatientDashboard() {
  const [patientName, setPatientName] = useState<string>("");
  const { setTitle, setBreadCrumbs } = useAuthHeader();
  const [firstTreatmentId, setFirstTreatmentId] = useState<string | null>(null);
  const [patientSchedules, setPatientSchedules] = useState<
    ScheduleDetailResponse[]
  >([]);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await me(); // sẽ gửi header Bearer <token>
        setPatientName(user.fullName); // dùng email làm display name
        const res = await getMyTreatments({ page: 0 });
        const first = res.payload?.content?.[0];
        if (first) {
          setFirstTreatmentId(first.id);
        }
        const today = new Date();
        const from = new Date(today.getFullYear(), today.getMonth(), 1);
        const to = new Date(today.getFullYear(), today.getMonth() + 7, 0);

        try {
          const res = await getPatientScheduleInAMonth(from, to);
          if (res.success && res.payload) {
            setPatientSchedules(res.payload);
          } else {
            setScheduleError("Không có lịch hẹn nào");
          }
        } catch {
          setScheduleError("Lỗi khi tải lịch hẹn");
        } finally {
          setScheduleLoading(false);
        }
      } catch {
        navigate("/authorization/login", { replace: true });
      }
    })();
  }, [navigate]);

  useEffect(() => {
    setTitle("Trang tổng quan");
    setBreadCrumbs([{ label: "Trang tổng quan", path: "/patient/dashboard" }]);
  }, []);

  if (!patientName) {
    return <div>Đang tải thông tin người dùng…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin Chào, {patientName}
        </h1>
      </div>

      {/* Treatments */}
      <Card className="p-6">
        <CardContent className="p-0">
          <h2 className="text-xl font-semibold mb-4">Kế hoạch điều trị</h2>
          <p className="text-gray-600">
            Bạn có thể xem và quản lý kế hoạch điều trị của mình tại đây.
          </p>
          {firstTreatmentId ? (
            <button
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium text-sm rounded-lg shadow hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-200"
              onClick={() => navigate(`/patient/treatment/${firstTreatmentId}`)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3M16 7V3M4 11h16M4 7h16a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zm8 8l2 2 4-4"
                />
              </svg>
              Xem Kế hoạch điều trị
            </button>
          ) : (
            <div className="mt-6 space-y-3">
              <p className="text-red-600 text-sm font-medium">
                Bạn chưa có kế hoạch điều trị nào.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 cursor-pointer bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium text-sm rounded-lg shadow hover:from-orange-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all duration-200"
                onClick={() => navigate("/patient/appointments/schedule")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Đặt lịch hẹn mới
              </button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardContent className="p-0">
          <h2 className="text-xl font-semibold mb-4">Lịch hẹn sắp tới</h2>

          {scheduleError && (
            <div className="text-red-600 mb-2">{scheduleError}</div>
          )}

          {scheduleLoading ? (
            <p className="text-gray-500">Đang tải lịch hẹn…</p>
          ) : patientSchedules.length === 0 ? (
            <p className="text-red-600 text-sm font-medium">
              Bạn chưa có lịch hẹn nào trong tháng này.
            </p>
          ) : (
            <ScheduleCardList
              schedules={patientSchedules}
              currentPage={0}
              totalPages={1}
              onPageChange={() => {}}
              onViewDetails={(scheduleId) =>
                navigate(`/patient/schedule-result/${scheduleId}`)
              }
              isLoading={false}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
