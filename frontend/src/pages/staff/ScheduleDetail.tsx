"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getStaffScheduleDetail } from "@/api/schedule";
import type { ScheduleDetailResponse } from "@/api/types";
import { ArrowLeft, RefreshCw } from "lucide-react";
import StaffLayout from "@/components/staff/StaffLayout";

const ScheduleDetail: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate("/staff/dashboard");
  };

  useEffect(() => {
    if (!scheduleId) {
      navigate("/staff/dashboard", { replace: true });
      return;
    }

    const fetchScheduleDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getStaffScheduleDetail(scheduleId);

        if (response.success && response.payload) {
          setSchedule(response.payload);
        } else {
          setError("Không tìm thấy lịch hẹn");
          navigate("/staff/dashboard");
        }
      } catch (err) {
        console.error("Error fetching detail:", err);
        setError("Lỗi khi tải chi tiết lịch hẹn");
        navigate("/staff/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleDetail();
  }, [scheduleId]);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/staff/dashboard" },
    { label: "Lịch khám", path: "/staff/dashboard" },
    { label: "Chi tiết lịch hẹn" },
  ];

  return (
    <StaffLayout title="Chi tiết lịch hẹn" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>

          {!loading && !error && (
            <Button
              variant="ghost"
              onClick={() => window.location.reload()}
              className="text-sm text-muted-foreground"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
          )}
        </div>

        {loading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <RefreshCw className="w-6 h-6 animate-spin text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Đang tải chi tiết lịch hẹn...</span>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-lg text-red-600 font-medium">{error}</p>
              <Button onClick={handleBack} className="mt-6">
                Về trang lịch khám
              </Button>
            </CardContent>
          </Card>
        ) : schedule ? (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold text-gray-900">Lịch hẹn #{schedule.id.slice(-8)}</h1>
              <p className="text-sm text-gray-500">
                Chi tiết lịch hẹn được lên lịch vào{" "}
                <strong>
                  {new Date(schedule.appointmentDateTime).toLocaleString("vi-VN")}
                </strong>
              </p>
            </div>

            <Card>
              <CardContent className="py-6 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tên bệnh nhân</p>
                    <p className="text-base font-medium text-gray-900">{schedule.patient.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bác sĩ phụ trách</p>
                    <p className="text-base font-medium text-gray-900">{schedule.doctor.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Trạng thái</p>
                    <p className="text-base font-medium text-gray-900">{schedule.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dịch vụ</p>
                    <p className="text-base font-medium text-gray-900">
                      {schedule.services.map((s) => s.name).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </StaffLayout>
  );
};

export default ScheduleDetail;
