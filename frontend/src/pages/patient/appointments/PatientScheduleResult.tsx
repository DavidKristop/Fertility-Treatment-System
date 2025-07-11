import { useState, useEffect } from "react";
import PatientLayout from "@/components/patient/PatientLayout";
import {
  Calendar,
  User,
  ArrowLeft,
  Phone,
  Mail,
  Cake,
  FileText,
  Clock,
  Receipt,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/common/LoadingComponent";
import FormSection from "@/components/doctor/common/FormSection";
import AppointmentStatusBadge from "@/components/doctor/common/AppointmentStatusBadge";
import type { ScheduleDetailResponse } from "@/api/types";
import { getPatientScheduleById } from "@/api/schedule";
import { toast } from "react-toastify";
import TreatmentStatusBadge from "@/components/doctor/common/TreatmentStatusBadge";

export default function PatientScheduleResult() {
  const [loading, setLoading] = useState(true);
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const [schedule, setSchedule] = useState<ScheduleDetailResponse | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!scheduleId) {
      navigate("/patient", { replace: true });
      return;
    }
    const fetchList = async () => {
      setLoading(true);
      try {
        const detail = await getPatientScheduleById(scheduleId)
        setSchedule(detail.payload);
      } catch (err) {
        console.error(err);
        toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu")
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, [scheduleId, navigate]);

  if (!loading && !schedule) {
    return (
      <PatientLayout title="Ghi nhận lịch hẹn" breadcrumbs={[]}>
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
      </PatientLayout>
    );
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Kết quả khám" },
  ];

  return (
    <PatientLayout title="Kết quả khám" breadcrumbs={breadcrumbs}>
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

          {/* Contract not signed */}
          {schedule?.treatment && schedule?.treatment.status !== "AWAITING_CONTRACT_SIGNED" && (
            <FormSection title="Hợp đồng" icon={FileText}>
              <div className="border border-gray-200 rounded-lg bg-white p-6">
                <h3 className="text-lg font-medium mb-4">
                  Hợp đồng chưa được ký: <Link to={``}><span className="text-red-500">Ký hợp đồng</span></Link>
                </h3>
              </div>
            </FormSection>
          )}

          {/*Unpaid payments */}
          {schedule?.payment?.some(p => p.status === "PENDING") && (
            <FormSection title="Thanh toán" icon={Receipt}>
              <div className="border border-gray-200 rounded-lg bg-white p-6">
              <h3 className="text-lg font-medium mb-4">
                Các thanh toán chưa hoàn thành
              </h3>
              <div className="space-y-4">
                {schedule?.payment?.filter(p => p.status === "PENDING")?.map(p => (
                  <div key={p.id} className="flex items-center gap-4">
                    <Link to={`/patient/payments/payment-detail/${p.id}`}>
                      <p className="font-medium text-red-500">Thanh toán {p.id} ({p.amount.toLocaleString("vi-VN")}₫)</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            </FormSection>
          )}

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {schedule?.doctor.fullName}
                        </p>
                        <p className="text-sm text-gray-600">Bác sĩ</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{schedule?.doctor.phone}</p>
                        <p className="text-sm text-gray-600">Số điện thoại</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{schedule?.doctor.email}</p>
                        <p className="text-sm text-gray-600">Email</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Cake className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {schedule?.doctor.dateOfBirth}
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
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/patient/treatment/${schedule.treatment.id}`)}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Xem chi tiết điều trị
                        </Button>
                      </div>
                    )}

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
                  </div>
                </div>
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
          <FormSection title="Ghi chú của bác sĩ" icon={FileText}>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              {schedule?.scheduleResult?.doctorsNote ? (
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {schedule?.scheduleResult?.doctorsNote}
                </p>
              ) : (
                <p className="text-gray-500 italic">Chưa có ghi chú nào.</p>
              )}
            </div>
          </FormSection>

        </div>
      </LoadingComponent>
    </PatientLayout>
  );
}
