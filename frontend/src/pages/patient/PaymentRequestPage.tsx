import { useEffect, useState } from "react";
import { getAllOfMyPatientPayment } from "@/api/payment";
import type { PaymentResponse, PaymentStatus } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Link, useSearchParams } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ thanh toán" },
  { value: "COMPLETED", label: "Đã thanh toán" },
  { value: "CANCELED", label: "Đã hủy" },
  { value: "ALL", label: "Tất cả" }
];

export default function MyPaymentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from query params, fallback to defaults
  const statusParam = searchParams.get("status") as PaymentStatus | "ALL" | null;
  const pageParam = Number(searchParams.get("page"));
  const [payments, setPayments] = useState<PaymentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<PaymentStatus | "ALL">(statusParam || "ALL");


  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Thanh toán" },
    { label: "Lịch sử thanh toán" },
  ];

  const fetchPayments = async (pageNum = 0, statusVal = status) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllOfMyPatientPayment({
        page: pageNum,
        size: 10,
        statuses: statusVal === "ALL" ? ["PENDING", "COMPLETED", "CANCELED"] : [statusVal],
      });
      setPayments(res.payload.content);
      setTotalPages(res?.payload?.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };


  // Update query params when status or page changes
  useEffect(() => {
    setSearchParams({ status, page: String(page) });
    // eslint-disable-next-line
  }, [status, page]);

  // Keep state in sync with query params (for back/forward navigation)
  useEffect(() => {
    if (statusParam && statusParam !== status) setStatus(statusParam);
    if (!Number.isNaN(pageParam) && pageParam !== page) setPage(pageParam);
    // eslint-disable-next-line
  }, [statusParam, pageParam]);

  useEffect(() => {
    fetchPayments(page, status);
    // eslint-disable-next-line
  }, [page, status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as PaymentStatus | "ALL");
    setPage(0);
  };

  return (
    <PatientLayout title="Lịch sử thanh toán" breadcrumbs={breadcrumbs}>
      <div className="mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Lịch sử thanh toán</h2>
        <div className="flex gap-2 mb-4">
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
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid gap-4">
              {payments.length === 0 ? (
                <div className="text-center p-4 border rounded bg-gray-50">
                  Không có thanh toán nào
                </div>
              ) : (
                payments.map((payment) => (
                <Link to={"payment-detail/"+payment.id}>
                  <div
                    key={payment.id}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-lg mb-1">
                          Số tiền:{" "}
                          <span className="text-blue-600">
                            {payment.amount.toLocaleString("vi-VN")} đ
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-1">
                          Mô tả: {payment.description}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Ngày thanh toán: </span>
                          {payment.paymentDate
                            ? new Date(payment.paymentDate).toLocaleString("vi-VN")
                            : "-"}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Hạn thanh toán: </span>
                          {payment.paymentDeadline
                            ? new Date(payment.paymentDeadline).toLocaleString("vi-VN")
                            : "-"}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Phương thức: </span>
                          {payment.paymentMethod}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Trạng thái: </span>
                          {payment.status === "PENDING" && (
                            <span className="text-yellow-600">Chờ thanh toán</span>
                          )}
                          {payment.status === "COMPLETED" && (
                            <span className="text-green-600">Đã thanh toán</span>
                          )}
                          {payment.status === "CANCELED" && (
                            <span className="text-red-600">Đã hủy</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">
                          Tạo lúc: {new Date(payment.createdAt).toLocaleString("vi-VN")}
                        </div>
                        <div className="text-sm text-gray-500">
                          Cập nhật: {new Date(payment.updatedAt).toLocaleString("vi-VN")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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