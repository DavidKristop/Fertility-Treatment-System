import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { TreatmentResponse, TreatmentStatus } from "@/api/types";
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
import { TextField } from "@mui/material";
import { getMyTreatments } from "@/api/treatment";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
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
  const statusParam = searchParams.get("status") || "ALL";
  const pageParam = Number(searchParams.get("page"));
  const titleParam = searchParams.get("title") || "";

  const [treatments, setTreatments] = useState<TreatmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState(statusParam);
  const [titleFilter, setTitleFilter] = useState(titleParam);
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  useEffect(() => {
    setSearchParams({ status: statusFilter, page: String(page), title: titleFilter });
  }, [statusFilter, page, titleFilter]);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const res = await getMyTreatments({
          page,
          title: titleFilter,
          status: statusFilter === "ALL" ? undefined : [statusFilter as TreatmentStatus],
        });

        if (res.payload) {
          setTreatments(res.payload.content || []);
          setTotalPages(res.payload.totalPages || 0);
        } else {
          throw new Error(res.message || "Không thể tải dữ liệu");
        }
      } catch (err: any) {
        toast.error(err.message || "Lỗi khi tải danh sách điều trị");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, [page, statusFilter, titleFilter]);

  useEffect(()=>{
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Điều trị", path: "/patient/treatment" },
    ])
    setTitle("Điều trị")
  },[])

  return (
    <div className="mx-auto p-4 space-y-6">
      {/* Bộ lọc trạng thái */}
      <div className="flex gap-2">
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
        <TextField
          fullWidth
          label="Tìm kiếm theo tiêu đề"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
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
            <Link key={treatment.id} to={`/patient/treatment/${treatment.id}`}>
              <div
                key={treatment.id}
                className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 my-2"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{treatment.title}</h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Bệnh nhân:</span> {treatment?.patient?.fullName}
                          <span className="text-gray-500"> (Email: {treatment?.patient?.email})</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Giao thức điều trị:</span> {treatment?.protocol?.title}
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
  );
}
