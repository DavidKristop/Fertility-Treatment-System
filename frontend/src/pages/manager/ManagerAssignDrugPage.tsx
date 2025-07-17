import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllAssignedDrugsForManager, cancelAssignDrug, markAssignDrugAsTaken } from "@/api/assignDrug";
import type { AssignDrugResponse } from "@/api/types";
import ManagerLayout from "@/components/manager/ManagerLayout";
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

export default function ManagerAssignedDrugPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") as
    | "PENDING"
    | "COMPLETED"
    | "CANCELLED"
    | "ALL"
    | null;
  const keywordParam = searchParams.get("keyword") || "";
  const pageParam = Number(searchParams.get("page"));

  const [assignDrugs, setAssignDrugs] = useState<AssignDrugResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<
    "PENDING" | "COMPLETED" | "CANCELLED" | "ALL"
  >(statusParam || "ALL");
  const [keyword, setKeyword] = useState(keywordParam);

  const fetchAssignDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllAssignedDrugsForManager({ 
        page,
        size: 10,
        status,
        keyword,
      });
      setAssignDrugs(res.payload.content);
      setTotalPages(res.payload.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams({ status, keyword, page: String(page) });
  }, [status, keyword, page]);

  useEffect(() => {
    fetchAssignDrugs();
  }, [status, keyword, page]);

  const handleCancel = async (id: string) => {
    await cancelAssignDrug(id);
    fetchAssignDrugs();
  };

  const handleMarkTaken = async (id: string) => {
    await markAssignDrugAsTaken(id);
    fetchAssignDrugs();
  };

  return (
    <ManagerLayout title="Quản lý đơn thuốc">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Danh sách đơn thuốc</h2>

        <div className="flex gap-2 mb-4">
          <select
            className="border rounded px-2 py-1"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as any);
              setPage(0);
            }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Tìm theo tên bệnh nhân"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
            className="border px-2 py-1 rounded"
          />
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && assignDrugs.length === 0 && (
          <div className="text-gray-500 italic">Không có dữ liệu</div>
        )}

        {!loading && assignDrugs.length > 0 && (
          <div className="grid gap-4">
            {assignDrugs.map((assign) => (
              <div key={assign.id} className="p-4 border rounded shadow bg-white">
                <div className="font-medium text-sm mb-2">
                  {assign.treatmentPhaseName} - <span className="text-blue-700">{assign.patientName}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Trạng thái:</span> {assign.status}
                </div>
                {assign.patientDrugs.map((drug, i) => (
                  <div key={i} className="text-sm pl-4 mb-2 border-l border-gray-300">
                    <div><strong>Tên thuốc:</strong> {drug.drug.name}</div>
                    <div><strong>Liều lượng:</strong> {drug.dosage}</div>
                    <div><strong>Cách dùng:</strong> {drug.usageInstructions}</div>
                    <div><strong>Số lượng:</strong> {drug.amount}</div>
                    <div><strong>Giá:</strong> {drug.drug.price.toLocaleString("vi-VN")} đ</div>
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  {assign.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleMarkTaken(assign.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Đánh dấu đã dùng
                      </button>
                      <button
                        onClick={() => handleCancel(assign.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        Hủy thuốc
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
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
        )}
      </div>
    </ManagerLayout>
  );
}
