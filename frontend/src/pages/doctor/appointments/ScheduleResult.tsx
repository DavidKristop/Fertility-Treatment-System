"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoctorLayout from "@/components/doctor/DoctorLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  Save,
  ArrowLeft,
  Cake,
} from "lucide-react";
import {
  getDoctorSchedules,
  postDoctorNote,
  type ScheduleResponse,
  markScheduleDone,
  type ScheduleResultInput,
} from "@/api/schedule";
import FormSection from "@/components/doctor/common/FormSection";
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge";
import LoadingComponent from "@/components/common/LoadingComponent";

// Mock patient medical history data

export default function DoctorScheduleResult() {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ScheduleResponse["status"]>("PENDING");
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [] = useState(new Date());

  // Form state
  const [doctorsNote, setDoctorsNote] = useState("");

  useEffect(() => {
    if (!scheduleId) {
      navigate("/doctor", { replace: true });
      return;
    }
    const fetchList = async () => {
      setLoading(true);
      try {
        const all = await getDoctorSchedules();
        const found = all.find((s) => s.id === scheduleId);
        if (!found) throw new Error("Không tìm thấy lịch hẹn");
        setSchedule(found);
        setStatus(found.status);
        if (found.scheduleResult) {
          setDoctorsNote(found.scheduleResult.doctorsNote);
          setSaveSuccess(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [scheduleId, navigate]);

  const handleMarkDone = async () => {
    if (!scheduleId) return;
    setSaving(true);
    try {
      await markScheduleDone(scheduleId);
      setStatus("DONE");
      setSchedule((s) => s && { ...s, status: "DONE" });
    } catch (err) {
      console.error(err);
      alert("Không thể đánh dấu hoàn thành!");
    } finally {
      setSaving(false);
    }
  };

const handleSaveResult = async () => {
  if (!scheduleId || !doctorsNote.trim()) return;

  setSaving(true);
  try {
    const payload: ScheduleResultInput = { scheduleId, doctorsNote };
    const response = await postDoctorNote(payload);

    if (!response.success) {
      return alert("Lưu không thành công: " + response.message);
    }

    // update lại schedule và đánh dấu đã save
    const result = response.payload!;
    setSchedule((s) =>
      s ? { ...s, scheduleResult: result, status: "DONE" } : s
    );
    setStatus("DONE");
    alert("Kết quả đã được lưu thành công!");
    setSaveSuccess(true);
  } catch (error) {
    console.error(error);
    alert("Có lỗi xảy ra khi lưu kết quả");
  } finally {
    setSaving(false);
  }
};


  const isReadOnly = saveSuccess;


  // Error state - schedule not found
  if (!loading && !schedule) {
    return (
      <DoctorLayout title="Ghi nhận lịch hẹn" breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Không tìm thấy lịch hẹn</p>
            <Button
              onClick={() => navigate("/doctor/schedule")}
              variant="outline"
            >
              Quay lại lịch hẹn
            </Button>
          </div>
        </div>
      </DoctorLayout>
    );
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/doctor/dashboard" },
    { label: "Lịch khám", path: "/doctor/schedule" },
    { label: "Chi tiết lịch hẹn" },
  ];

  return (
    <DoctorLayout title="Ghi nhận lịch hẹn" breadcrumbs={breadcrumbs}>
      <LoadingComponent isLoading={loading}>
        <div className="space-y-6">
          {/* Header with back button */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/doctor/schedule")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Chi tiết lịch hẹn</h1>
              <p className="text-gray-600">
                Ngày{" "}
                {schedule &&
                  new Date(schedule.appointmentDateTime).toLocaleDateString(
                    "vi-VN"
                  )}
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <FormSection title="Thông tin cuộc hẹn" icon={Calendar}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule?.patient?.fullName}</p>
                    <p className="text-sm text-gray-600">Bệnh nhân</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule?.patient.phone}</p>
                    <p className="text-sm text-gray-600">Số điện thoại</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{schedule?.patient.email}</p>
                    <p className="text-sm text-gray-600">Email</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Cake className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {schedule?.patient.dateOfBirth}
                    </p>
                    <p className="text-sm text-gray-600">Ngày sinh</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">
                      {schedule &&
                        new Date(
                          schedule.appointmentDateTime
                        ).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </p>
                    <p className="text-sm text-gray-600">Thời gian hẹn</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {schedule && (
                    <AppointmentStatusBadge status={schedule.status} />
                  )}
                </div>

                {status === "PENDING" && (
                  <Button
                    onClick={handleMarkDone}
                    disabled={saving}
                    className="mb-4 cursor-pointer"
                  >
                    {saving ? "Đang cập nhật…" : "Đánh dấu hoàn thành"}
                  </Button>
                )}
              </div>
            </div>
          </FormSection>

          <fieldset
            disabled={isReadOnly}
            className={isReadOnly ? "opacity-50" : ""}
          >
            {/* Schedule Result */}

            <FormSection title="Ghi chú của bác sĩ" icon={FileText}>
              <Label htmlFor="doctorsNote">Ghi chú chi tiết</Label>
              <fieldset
                disabled={isReadOnly}
                className={isReadOnly ? "opacity-50" : ""}
              >
                <Textarea
                  id="doctorsNote"
                  placeholder="Nhập ghi chú..."
                  value={doctorsNote}
                  onChange={(e) => setDoctorsNote(e.target.value)}
                  className="mt-2 min-h-[150px]"
                />
              </fieldset>
            </FormSection>

            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => navigate("/doctor/schedule")}
                disabled={saving || saveSuccess}
              >
                Hủy
              </Button>
              <LoadingComponent isLoading={saving}>
                <Button
                  onClick={handleSaveResult}
                  disabled={saving || !doctorsNote.trim() || saveSuccess}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {saveSuccess
                    ? "Đã lưu"
                    : saving
                    ? "Đang lưu..."
                    : "Lưu kết quả"}
                </Button>
              </LoadingComponent>
            </div>
          </fieldset>

          {/* Examination Results */}
        </div>
      </LoadingComponent>
    </DoctorLayout>
  );
}
