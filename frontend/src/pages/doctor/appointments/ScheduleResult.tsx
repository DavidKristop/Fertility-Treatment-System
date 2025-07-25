"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  Receipt,
} from "lucide-react";
import TreatmentStatusBadge from "@/components/doctor/common/TreatmentStatusBadge";
import {
  postDoctorNote,
  markScheduleDone,
  type ScheduleResultInput,
  getDoctorScheduleById,
} from "@/api/schedule";
import FormSection from "@/components/doctor/common/FormSection";
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge";
import LoadingComponent from "@/components/common/LoadingComponent";
import type { ScheduleDetailResponse } from "@/api/types";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import { Editor } from 'primereact/editor';
        

// Mock patient medical history data

export default function DoctorScheduleResult() {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<ScheduleDetailResponse | undefined>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [doctorsNote, setDoctorsNote] = useState("");
  const {setTitle,setBreadCrumbs} = useAuthHeader()


  const handleMarkDone = async () => {
    if (!scheduleId) return;
    setSaving(true);
    try {
      await markScheduleDone(scheduleId);
      setSchedule((s) => s && { ...s, status: "DONE" });
      toast.success("Đánh dấu hoàn thành thành công");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đánh dấu hoàn thành")
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
        return toast.error("Lưu không thành công: " + response.message);
      }

      // update lại schedule và đánh dấu đã save
      const result = response.payload!;
      setSchedule((s) =>
        s ? { ...s, scheduleResult: result, status: "DONE" } : s
      );
      toast.success("Lưu kết quả thành công");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi lưu kết quả");
    } finally {
      setSaving(false);
    }
  };

  const haveUnpaidPayment = (schedule: ScheduleDetailResponse) => {
    if(!schedule.payment) return false;
    return schedule.payment.some(p => p.status !== "COMPLETED");
  }
  
  useEffect(() => {
    if (!scheduleId) {
      navigate("/doctor", { replace: true });
      return;
    }
    const fetchList = async () => {
      setLoading(true);
      try {
        const detail = await getDoctorScheduleById(scheduleId)
        setSchedule(detail.payload);
        setDoctorsNote(detail.payload?.scheduleResult?.doctorsNote || "");
      } catch (err) {
        console.error(err);
        toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu")
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [scheduleId, navigate]);

  useEffect(() => {
    setTitle("Chi tiết lịch hẹn")
    setBreadCrumbs([
      { label: "Trang chủ", path: "/doctor/dashboard" },
      { label: "Lịch khám", path: "/doctor/schedule" },
      { label: "Chi tiết lịch hẹn", path: `/doctor/schedule/${scheduleId}` },
    ])
  },[])

  // Error state - schedule not found
  if (!loading && !schedule) {
    return (
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
    );
  }

  return (
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
        <FormSection title={schedule?.title || "Thông tin cuộc hẹn"} icon={Calendar}>
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

              <div className="flex items-center gap-3">
                <Receipt className="h-5 w-5 text-gray-500" />
                <div>
                  <TreatmentStatusBadge status={schedule?.treatment?.status || 'Không có thông tin'} />
                  <p className="text-sm text-gray-600">Trạng thái điều trị</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">
                    {schedule?.treatmentPhase?.title || 'Không có thông tin'}
                  </p>
                  <p className="text-sm text-gray-600">Giai đoạn điều trị</p>
                </div>
              </div>

              {schedule?.treatment?.id && (
                <div className="flex items-center gap-3">
                  <Link to={`/doctor/treatment-plans/treatment-details/${schedule.treatment.id}`}>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Xem chi tiết điều trị
                    </Button>
                  </Link>
                </div>
              )}
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

              <div className="flex flex-items-center gap-3">
                <Receipt className="h-5 w-5 text-gray-500"/>
                <div>
                  {(()=>{
                    if(schedule?.payment){
                      if(schedule.payment.length===0) return <p className="text-sm text-gray-600">Không có thanh toán nào</p>
                      if(schedule.payment.filter(p => p.status === "PENDING").length > 0){
                        return <p className="text-sm text-red-500">Chưa thanh toán: {schedule.payment.filter(p => p.status !== "PENDING").length}/{schedule.payment.length} dịch vụ </p>
                      }
                    }
                    return <p className="text-sm text-green-500">Đã thanh toán {schedule?.payment.length}/{schedule?.payment.length} dịch vụ</p>
                  })()}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {schedule && (
                  <AppointmentStatusBadge status={schedule.status} />
                )}
              </div>

              {schedule?.status === "PENDING" && (
                <Button
                  onClick={handleMarkDone}
                  disabled={saving || haveUnpaidPayment(schedule) || schedule?.treatment?.status === "AWAITING_CONTRACT_SIGNED"}
                  className="mb-4 cursor-pointer"
                >
                  {
                    haveUnpaidPayment(schedule) ? "Đánh dấu hoàn thành": 
                    saving ? "Đang cập nhật…" : 
                    schedule?.treatment?.status === "AWAITING_CONTRACT_SIGNED" ? "Cần ký hợp đồng":
                    "Đánh dấu hoàn thành"
                  }
                </Button>
              )}
            </div>
          </div>
        </FormSection>
        <FormSection title="Dịch vụ" icon={FileText}>
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium mb-4">
              Danh sách dịch vụ của {schedule?.patient.fullName}
            </h3>
            <div className="space-y-4">
              {schedule?.services.map((svc) => (
                <div
                  key={svc.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  {/* Tên & mô tả */}
                  <div className="flex-1">
                    <p className="font-semibold">{svc.name}</p>
                    <p className="text-sm text-gray-600">
                      {svc.description}
                    </p>
                  </div>

                  {/* Giá */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">
                      {svc.price.toLocaleString("vi-VN")}₫
                    </span>
                    <span className="text-sm text-gray-500">/ dịch vụ</span>
                  </div>

                  {/* Trạng thái */}
                  <div>
                    <span
                      className={`inline-block px-2 py-1 text-sm rounded ${
                        svc.active
                          ? "bg-green-50 text-green-800"
                          : "bg-red-50 text-red-800"
                      }`}
                    >
                      {svc.active ? "Đang hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FormSection>

        <fieldset
          disabled={schedule?.status !== "DONE"}
          className={schedule?.status !== "DONE" ? "opacity-50" : ""}
        >
          {/* Schedule Result */}

          <FormSection title="Ghi chú của bác sĩ" icon={FileText}>
            <Label htmlFor="doctorsNote" className="mb-2">Ghi chú chi tiết</Label>
            <Editor 
              disabled={schedule?.status !== "DONE"}
              className={schedule?.status !== "DONE" ? "opacity-50" : "h-[300px]"}
              id="doctorsNote"
              placeholder="Nhập ghi chú..."
              value={doctorsNote}
              onTextChange={(e)=>setDoctorsNote(e.htmlValue||"")}
            />
          </FormSection>

          <div className="flex gap-4 justify-end mt-6">
            <LoadingComponent isLoading={saving}>
              <Button
                onClick={handleSaveResult}
                disabled={schedule?.status !== "DONE"}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving
                  ? "Đang lưu..."
                  : "Lưu kết quả"}
              </Button>
            </LoadingComponent>
          </div>
        </fieldset>

        {/* Examination Results */}
      </div>
    </LoadingComponent>
  );
}
