import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllAssignedDrugsForStaff } from "@/api/assignDrug";
import type { AssignDrugDetailResponse } from "@/api/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import AssignDrugDisplay from "@/components/assignDrug/AssignDrugDisplay";
import { TextField } from "@mui/material";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ hoàn thành" },
  { value: "COMPLETED", label: "Đã hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "ALL", label: "Tất cả" },
];

export default function StaffAssignedDrugPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get("status") as
    | "PENDING"
    | "COMPLETED"
    | "CANCELLED"
    | "ALL"
    | null;
  const keywordParam = searchParams.get("keyword") || "";
  const pageParam = Number(searchParams.get("page"));

  const [assignDrugs, setAssignDrugs] = useState<AssignDrugDetailResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<
    "PENDING" | "COMPLETED" | "CANCELLED" | "ALL"
  >(statusParam || "ALL");
  const [keyword, setKeyword] = useState(keywordParam);
  const navigate = useNavigate()
  const {setTitle,setBreadCrumbs} = useAuthHeader()


  const fetchAssignDrugs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllAssignedDrugsForStaff({ 
        page,
        size: 10,
        status: status === "ALL" ? undefined : [status],
        title: keyword,
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

  useEffect(()=>{
    setTitle("Danh sách đơn thuốc")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
      { label: "Danh sách đơn thuốc", path: "/staff/assigned-drugs" },
    ])
  },[])

  return (
    <div className="mx-auto p-4">
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

        <TextField
          fullWidth
          type="text"
          placeholder="Tìm theo tiêu đề"
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
        <AssignDrugDisplay assignDrugs={assignDrugs} onClick={(assignDrug)=>navigate(`/manager/assigned-drugs/${assignDrug.id}`)}/>
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
  );
}
