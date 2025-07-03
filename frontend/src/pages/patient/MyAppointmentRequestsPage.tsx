import { useEffect, useState } from "react";
import { getMyAppointmentRequests } from "@/api/request-appointment";
import type { ScheduleResponse } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Đang chờ" },
  { value: "ACCEPTED", label: "Đã chấp nhận" },
  { value: "DENIED", label: "Từ chối" },
  { value: "ALL", label: "Tất cả" }
];

export default function MyAppointmentRequests() {
  const [requests, setRequests] = useState<ScheduleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "DENIED" | "ALL">("ALL");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [search, setSearch] = useState("");

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Lịch hẹn" },
    { label: "Lịch hẹn đã đặt" },
  ];

  const fetchRequests = async (pageNum = 0, statusVal = status, email = doctorEmail) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMyAppointmentRequests({
        page: pageNum,
        size: 10,
        doctorEmail: email,
        statuses: statusVal === "ALL" ? ["PENDING", "ACCEPTED", "DENIED"] : [statusVal],
      });
      setRequests(res.payload.content);
      setTotalPages(res?.payload?.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(page, status, doctorEmail);
    // eslint-disable-next-line
  }, [page, status, doctorEmail]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "PENDING" | "ACCEPTED" | "DENIED");
    setPage(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDoctorEmail(search.trim());
    setPage(0);
  };

  return (
    <PatientLayout title="Lịch hẹn đã đặt" breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Lịch sử yêu cầu đặt lịch</h2>
        <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            className="border rounded px-2 py-1 flex-1"
            placeholder="Tìm theo email bác sĩ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            Tìm kiếm
          </button>
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
        </form>
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid gap-4">
              {requests.length === 0 ? (
                <div className="text-center p-4 border rounded bg-gray-50">
                  Không có yêu cầu nào
                </div>
              ) : (
                requests.map((req) => (
                  <div
                    key={req.id}
                    className="border rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-2 bg-white"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-lg">Hẹn với bác sĩ {req.doctor.fullName}</div>
                      <div className="text-sm text-gray-500 mb-1">Email bác sĩ: {req.doctor.email}</div>
                      <div className="text-sm">
                        <span className="font-medium">Thời gian: </span>
                        {new Date(req.appointmentDatetime).toLocaleString("vi-VN")}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Trạng thái: </span>
                        {req.status === "PENDING" && (
                          <span className="text-yellow-600">Đang chờ</span>
                        )}
                        {req.status === "ACCEPTED" && (
                          <span className="text-green-600">Đã chấp nhận</span>
                        )}
                        {req.status === "DENIED" && (
                          <span className="text-red-600">Từ chối</span>
                        )}
                      </div>
                      {req.status === "DENIED" && (
                        <div className="text-sm text-red-500">
                          <span className="font-medium">Lý do từ chối: </span>
                          {req.rejectedReason || "-"}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                    />
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
          </>
        )}
      </div>
    </PatientLayout>
  );
}