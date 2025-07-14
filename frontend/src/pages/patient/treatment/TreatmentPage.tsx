import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchWrapper } from "@/api";
import type { TreatmentPlan } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { label: "Đang điều trị", value: "IN_PROGRESS" },
  { label: "Hoàn thành", value: "COMPLETED" },
  { label: "Đã hủy", value: "CANCELLED" },
  { label: "Chờ ký hợp đồng", value: "AWAITING_CONTRACT_SIGNED" },
];

const formatDate = (isoDate?: string) => {
  if (!isoDate) return "-";
  const [year, month, day] = isoDate.split("T")[0].split("-");
  return `${day}-${month}-${year}`;
};

export default function TreatmentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") || "IN_PROGRESS";
  const pageParam = Number(searchParams.get("page"));

  const [treatments, setTreatments] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState(statusParam);

  useEffect(() => {
    setSearchParams({ status: statusFilter, page: String(page) });
  }, [statusFilter, page]);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const res = await fetchWrapper(
          `treatments/patient?page=${page}&status=${statusFilter}`,
          undefined,
          true
        );
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
  }, [page, statusFilter]);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Điều trị", path: "/patient/treatment" },
  ];

  return (
    <PatientLayout title="Kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Bộ lọc trạng thái */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lọc theo trạng thái</label>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(0);
            }}
          >
            <SelectTrigger className="w-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading && (
          <p className="text-sm text-gray-500 italic">Đang tải dữ liệu...</p>
        )}

        {/* Danh sách điều trị */}
        {!loading && treatments.length === 0 && (
          <p className="text-gray-500 italic">
            Bạn chưa có kế hoạch điều trị nào phù hợp với bộ lọc.
          </p>
        )}
        {!loading && treatments.length > 0 && (
          <div className="space-y-4">
            {treatments.map((treatment) => (
              <Link
                key={treatment.id}
                to={`/patient/treatment/${treatment.id}`}
                className="block border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow transition bg-white"
              >
                <div className="font-semibold text-lg mb-1 text-blue-900">
                  {treatment.description || "Không có mô tả"}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Trạng thái:</span> {treatment.status}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  <span className="font-medium">Ngày bắt đầu:</span> {formatDate(treatment.startDate)}
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">Bác sĩ:</span> {treatment.doctor?.fullName}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Phân trang */}
        {totalPages > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage((p) => Math.max(0, p - 1))} />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      isActive={page === idx}
                      onClick={() => setPage(idx)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}
