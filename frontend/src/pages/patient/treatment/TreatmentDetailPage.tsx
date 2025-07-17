import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TreatmentResponse } from "@/api/types";
import { fetchWrapper } from "@/api/index";
import { Card } from "@/components/ui/card";
import PatientLayout from "@/components/patient/PatientLayout";

export default function TreatmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [treatment, setTreatment] = useState<TreatmentResponse | null>(null);
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
        {/* Button quay lại */}
        <div>
          <button
            onClick={() => navigate("/patient/treatment")}
            className="mb-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm border border-gray-300 transition"
          >
            ← Quay lại danh sách điều trị
          </button>
        </div>

        {/* Trạng thái tải */}
        {loading && (
          <p className="text-center mt-6 text-gray-500 italic">
            Đang tải thông tin điều trị...
          </p>
        )}
        {error && (
          <p className="text-center mt-6 text-red-500">{error}</p>
        )}
        {!loading && !error && !treatment && (
          <p className="text-center mt-6 text-gray-500 italic">
            Không tìm thấy điều trị
          </p>
        )}

        {/* Nội dung điều trị */}
        {treatment && (
          <>
            {/* Thông tin chính */}
            <Card className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Thông tin điều trị
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Mô tả:</span> {treatment.description || "Không có mô tả"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Trạng thái:</span> {treatment.status}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Ngày bắt đầu:</span> {treatment.startDate}
              </p>
              {treatment.endDate && (
                <p className="text-gray-700">
                  <span className="font-medium">Ngày kết thúc:</span> {treatment.endDate}
                </p>
              )}
            </Card>

            {/* Thông tin bác sĩ */}
            <Card className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Bác sĩ phụ trách
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Họ tên:</span> {treatment.doctor.fullName}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {treatment.doctor.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Chuyên môn:</span> {treatment.doctor.specialty}
              </p>
            </Card>

            {/* Phác đồ điều trị */}
            <Card className="p-6 space-y-2">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Thông tin phác đồ
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Tiêu đề:</span> {treatment.protocol.title}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Giá ước tính:</span>{" "}
                {treatment.protocol.estimatedPrice.toLocaleString()} VNĐ
              </p>
            </Card>

            {/* Các giai đoạn */}
            {treatment.phases?.length > 0 && (
              <Card className="p-6 space-y-2">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Giai đoạn điều trị
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {treatment.phases.map((phase, index) => (
                    <li key={index}>
                      <span className="font-medium">{phase.title}</span>: {phase.description}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </>
        )}
      </div>
    </PatientLayout>
  );
}
