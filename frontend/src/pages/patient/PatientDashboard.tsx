import PatientLayout from "@/components/patient/PatientLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "@/api/auth";

export default function PatientDashboard() {
  const [patientName, setPatientName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const user = await me(); // sẽ gửi header Bearer <token>
        setPatientName(user.fullName); // dùng email làm display name
      } catch {
        navigate("/authorization/login", { replace: true });
      }
    })();
  }, [navigate]);



  if (!patientName) {
    return (
      <PatientLayout title="Trang tổng quan">
        <div>Đang tải thông tin người dùng…</div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout
      title="Trang tổng quan"
      breadcrumbs={[{ label: "Trang tổng quan" }]}
    >
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
            {/* {hasActiveTreatment ? (
              <div className="text-center">
                <h2 className="text-lg font-medium mb-4">
                  Điều trị hiện tại của bạn và các giai đoạn
                </h2>

                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Tiến độ điều trị
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {treatmentProgress.phases.map((phase, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getPhaseStatus(
                            phase.status
                          )}`}
                        />
                        {index < treatmentProgress.phases.length - 1 && (
                          <div className="w-8 h-0.5 bg-gray-300 mx-1" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-medium">
                    {treatmentProgress.currentStage}
                  </div>
                  <div className="text-sm text-gray-500">
                    Giai đoạn {treatmentProgress.completed}/
                    {treatmentProgress.total}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {treatmentProgress.phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        phase.status === "completed"
                          ? "bg-green-50 border-green-200"
                          : phase.status === "current"
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getPhaseStatus(
                            phase.status
                          )}`}
                        />
                        <span className="font-medium">{phase.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  Bạn chưa có điều trị nào đang diễn ra
                </p>
                <Link to="/patient/appointments/schedule">
                  <Button className="cursor-pointer">Đặt lịch hẹn</Button>
                </Link>
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  );
}
