import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Treatment } from "@/api/types";
import { fetchWrapper } from "@/api/index";
import { Card } from "@/components/ui/card";
import PatientLayout from "@/components/patient/PatientLayout";

export default function TreatmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const response = await fetchWrapper(`treatments/patient/${id}`, {}, true);
        if (!response.ok) {
          throw new Error("Không thể lấy thông tin điều trị");
        }
        const data = await response.json();
        setTreatment(data.payload);
      } catch (err: any) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id]);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Điều trị", path: "/patient/treatment" },
    { label: "Chi tiết điều trị", path: `/patient/treatment/${id}` },
  ];

  return (
    <PatientLayout title="Chi tiết điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {loading && <p className="text-center mt-6 text-gray-500">Đang tải thông tin điều trị...</p>}
        {error && <p className="text-center mt-6 text-red-500">{error}</p>}
        {!loading && !error && !treatment && (
          <p className="text-center mt-6 text-gray-500">Không tìm thấy điều trị</p>
        )}
        {treatment && (
          <>
            <h1 className="text-2xl font-bold">Chi tiết điều trị</h1>

            <Card className="p-4">
              <p><strong>Mô tả:</strong> {treatment.description || "Không có mô tả"}</p>
              <p><strong>Trạng thái:</strong> {treatment.status}</p>
              <p><strong>Ngày bắt đầu:</strong> {treatment.startDate}</p>
              <p><strong>Ngày kết thúc:</strong> {treatment.endDate}</p>
            </Card>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-2">Thông tin bác sĩ</h2>
              <p><strong>Tên:</strong> {treatment.doctor.fullName}</p>
              <p><strong>Email:</strong> {treatment.doctor.email}</p>
              <p><strong>Chuyên môn:</strong> {treatment.doctor.specialty}</p>
            </Card>

            <Card className="p-4">
              <h2 className="text-lg font-semibold mb-2">Thông tin phác đồ</h2>
              <p><strong>Tiêu đề:</strong> {treatment.protocol.title}</p>
              <p><strong>Giá ước tính:</strong> {treatment.protocol.estimatedPrice.toLocaleString()} VNĐ</p>
            </Card>

            {treatment.phases?.length > 0 && (
              <Card className="p-4">
                <h2 className="text-lg font-semibold mb-2">Các giai đoạn điều trị</h2>
                <ul className="list-disc list-inside space-y-2">
                  {treatment.phases.map((phase, index) => (
                    <li key={index}>
                      <strong>{phase.title}</strong>: {phase.description}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <button
              onClick={() => navigate("/patient/treatment")}
              className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm border border-gray-300 transition"
            >
              Quay lại kế hoạch điều trị
            </button>
          </>
        )}
      </div>
    </PatientLayout>
  );
}