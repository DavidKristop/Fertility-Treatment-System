import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllMyAssignedDrugs } from "@/api/assignDrug";
import type { AssignDrugResponse } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ hoàn thành" },
  { value: "COMPLETED", label: "Đã hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "ALL", label: "Tất cả" },
];

export default function MyAssignedDrugsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") as
    | "PENDING"
    | "COMPLETED"
    | "CANCELLED"
    | "ALL"
    | null;
  const pageParam = Number(searchParams.get("page"));

  const [assignDrugs, setAssignDrugs] = useState<AssignDrugResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<
    "PENDING" | "COMPLETED" | "CANCELLED" | "ALL"
  >(statusParam || "ALL");

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Đơn thuốc" },
    { label: "Lịch sử thuốc" },
  ];

  const fetchAssignDrugs = async (pageNum = 0, statusVal = status) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllMyAssignedDrugs({
        page: pageNum,
        size: 10,
        status: statusVal,
      });
      setAssignDrugs(res.payload.content);
      setTotalPages(res?.payload?.totalPages || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams({ status, page: String(page) });
  }, [status, page]);

  useEffect(() => {
    if (statusParam && statusParam !== status) setStatus(statusParam);
    if (!Number.isNaN(pageParam) && pageParam !== page) setPage(pageParam);
  }, [statusParam, pageParam]);

  useEffect(() => {
    fetchAssignDrugs(page, status);
  }, [page, status]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "PENDING" | "COMPLETED" | "CANCELLED" | "ALL");
    setPage(0);
  };

  return (
    <PatientLayout title="Lịch sử thuốc được kê" breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Lịch sử đơn thuốc</h2>

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
              {assignDrugs.length === 0 ? (
                <div className="text-center p-4 border rounded bg-gray-50">
                  Không có đơn thuốc nào
                </div>
              ) : (
                assignDrugs.map((assign) => (
                  <div
                    key={assign.id}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="font-medium mb-1">
                      Đơn thuốc #{assign.id} -{" "}
                      {assign.status === "PENDING" && (
                        <span className="text-yellow-600">Chờ hoàn thành</span>
                      )}
                      {assign.status === "COMPLETED" && (
                        <span className="text-green-600">Đã hoàn thành</span>
                      )}
                      {assign.status === "CANCELLED" && (
                        <span className="text-red-600">Đã hủy</span>
                      )}
                    </div>
                    {assign.patientDrugs?.length ? (
                      <ul className="list-disc ml-6 text-sm">
                        {assign.patientDrugs.map((pd, index) => (
                          <li key={index} className="mb-2">
                            <div><span className="font-medium">Tên thuốc:</span> {pd.drugName}</div>
                            {pd.drugPrice !== undefined && (
                              <div><span className="font-medium">Giá:</span> {pd.drugPrice.toLocaleString("vi-VN")} đ</div>
                            )}
                            {pd.dosage && (
                              <div><span className="font-medium">Liều:</span> {pd.dosage}</div>
                            )}
                            {pd.usageInstructions && (
                              <div><span className="font-medium">Cách dùng:</span> {pd.usageInstructions}</div>
                            )}
                            {pd.amount && (
                              <div><span className="font-medium">Số lượng:</span> {pd.amount}</div>
                            )}
                            {pd.startDate && (
                              <div><span className="font-medium">Từ ngày:</span> {new Date(pd.startDate).toLocaleDateString("vi-VN")}</div>
                            )}
                            {pd.endDate && (
                              <div><span className="font-medium">Đến ngày:</span> {new Date(pd.endDate).toLocaleDateString("vi-VN")}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500">Không có thuốc</div>
                    )}
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
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
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
