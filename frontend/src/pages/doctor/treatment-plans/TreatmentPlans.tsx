import { useEffect, useState } from "react";
import { getTreatmentICreated } from "@/api/treatment";
import type { TreatmentResponse } from "@/api/types";
import DoctorLayout from "@/components/doctor/DoctorLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

// Helper function for date formatting
const formatDate = (date: string | null | undefined): string => {
  if (!date) return "Chưa xác định";
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const STATUS_OPTIONS = [
  { value: "IN_PROGRESS", label: "Đang điều trị" },
  { value: "COMPLETED", label: "Đã hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "AWAITING_CONTRACT_SIGNED", label: "Chờ ký hợp đồng" },
  { value: "ALL", label: "Tất cả" }
];

export default function TreatmentPlans() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from query params, fallback to defaults
  const statusParam = searchParams.get("status") as (typeof STATUS_OPTIONS)[number]["value"] | null;
  const pageParam = Number(searchParams.get("page"));
  const patientEmailParam = searchParams.get("patientEmail") || "";
  const [treatments, setTreatments] = useState<TreatmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]["value"]>(statusParam || "ALL");
  const [patientEmail, setPatientEmail] = useState(patientEmailParam);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/doctor/dashboard" },
    { label: "Danh sách điều trị" },
  ];

  const fetchTreatments = async (pageNum = 0, statusVal = status) => {
    setLoading(true);
    try {
      const res = await getTreatmentICreated(
        pageNum,
        10,
        patientEmail,
        statusVal === "ALL" 
          ? ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
          : [statusVal]
      );
      setTreatments(res.payload.content);
      setTotalPages(res?.payload?.totalPages || 1);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Update query params when status, page, or patientEmail changes
  useEffect(() => {
    setSearchParams({ status, page: String(page), patientEmail });
    // eslint-disable-next-line
  }, [status, page, patientEmail]);

  // Keep state in sync with query params (for back/forward navigation)
  useEffect(() => {
    if (statusParam && statusParam !== status) setStatus(statusParam);
    if (!Number.isNaN(pageParam) && pageParam !== page) setPage(pageParam);
    if (patientEmailParam !== patientEmail) setPatientEmail(patientEmailParam);
    // eslint-disable-next-line
  }, [statusParam, pageParam, patientEmailParam]);

  useEffect(() => {
    fetchTreatments(page, status);
    // eslint-disable-next-line
  }, [page, status, patientEmail]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as (typeof STATUS_OPTIONS)[number]["value"]);
    setPage(0);
  };

  const handlePatientEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientEmail(e.target.value);
    setPage(0);
  };

  return (
    <DoctorLayout title="Danh sách điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">Danh sách điều trị</h2>
          <Link to="/doctor/treatment-plans/create">
            <Button className="cursor-pointer">
              + Tạo kế hoạch điều trị mới
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo email bệnh nhân..."
              value={patientEmail}
              onChange={handlePatientEmailChange}
            />
          </div>
          <select
            className="border rounded px-2 py-1"
            value={status}
            onChange={handleStatusChange}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-4">Đang tải...</div>
        ) : (
            <div className="space-y-4">
            {treatments.map((treatment) => (
              <Link to={`/doctor/treatment-plans/treatment-details/${treatment.id}`}>
                <div
                  key={treatment.id}
                  className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 my-2"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{treatment?.protocol?.title}</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Bệnh nhân:</span> {treatment?.patient?.fullName}
                            <span className="text-gray-500"> (Email: {treatment?.patient?.email})</span>
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">Trạng thái:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${treatment.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                              treatment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                              treatment.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                              treatment.status === 'AWAITING_CONTRACT_SIGNED' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'}`}
                            >
                              {treatment.status}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Ngày bắt đầu:</span> {formatDate(treatment.startDate)}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Ngày kết thúc:</span> {formatDate(treatment.endDate)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => setPage(index)}
                    isActive={page === index}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage(page + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DoctorLayout>
  );
}
