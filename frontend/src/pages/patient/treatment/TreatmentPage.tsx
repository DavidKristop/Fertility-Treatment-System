import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchWrapper } from "@/api";
import type { TreatmentPlan } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import { toast } from "react-toastify";
import Pagination from "@/components/layout/Pagination";

export default function TreatmentPage() {
  const [treatments, setTreatments] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const res = await fetchWrapper(`treatments/patient?page=${page}`, undefined, true);
        const json = await res.json();

        if (res.ok && json.payload) {
          setTreatments(json.payload.content);
          setTotalPages(json.payload.totalPages);
        } else {
          throw new Error(json.message || "Không thể tải dữ liệu");
        }
      } catch (err: any) {
        toast.error(err.message || "Lỗi khi tải danh sách điều trị");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, [page]);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Điều trị", path: "/patient/treatment" },
  ];

  return (
    <PatientLayout title="Kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto p-4">
        {loading && <p>Đang tải dữ liệu...</p>}
        {!loading && treatments.length === 0 && (
          <p className="text-gray-500">Bạn chưa có kế hoạch điều trị nào.</p>
        )}
        {!loading && treatments.length > 0 && (
          <div className="space-y-4">
            {treatments.map((treatment) => (
              <Link
                key={treatment.id}
                to={`/patient/treatment/${treatment.id}`}
                className="block border p-4 rounded shadow hover:shadow-md transition bg-white"
              >
                <div className="font-semibold text-lg">
                  {treatment.description || "Không có mô tả"}
                </div>
                <div className="text-sm">Trạng thái: <strong>{treatment.status}</strong></div>
                <div className="text-sm">Ngày bắt đầu: {treatment.startDate}</div>
                <div className="text-sm">Bác sĩ: {treatment.doctor?.fullName}</div>
              </Link>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
