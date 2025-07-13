import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ManagerLayout from "@/components/manager/ManagerLayout";
import { fetchProtocolsManager } from "@/api/auth";
import type { ProtocolResponse } from "@/api/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const STATUS_OPTIONS = [
  { value: 'ALL', label: 'Tất cả' },
  { value: 'ACTIVE', label: 'Hoạt động' },
  { value: 'INACTIVE', label: 'Không hoạt động' },
] as const;

type StatusFilter = typeof STATUS_OPTIONS[number]['value'];

export default function ManagerProtocolsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const statusParam = (searchParams.get("status") as StatusFilter) || 'ALL';
  const queryParam = searchParams.get("query") || "";

  const [protocols, setProtocols] = useState<ProtocolResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<StatusFilter>(statusParam);
  const [query, setQuery] = useState<string>(queryParam);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý Phác đồ điều trị" },
  ];

  const loadProtocols = async (pageNum = 0) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchProtocolsManager(pageNum, 10);
      setProtocols(res.payload.content);
      setTotalPages(res.payload.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchParams({ page: String(page), status, query });
  }, [page, status, query]);

  useEffect(() => {
    if (!Number.isNaN(pageParam) && pageParam !== page) {
      setPage(pageParam);
    }
    if (statusParam !== status) {
      setStatus(statusParam);
    }
    if (queryParam !== query) {
      setQuery(queryParam);
    }
  }, [pageParam, statusParam, queryParam]);

  useEffect(() => {
    loadProtocols(page);
  }, [page]);

  const filtered = protocols.filter(p => {
    const matchStatus =
      status === 'ALL' || (status === 'ACTIVE' ? p.active : !p.active);
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as StatusFilter);
    setPage(0);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(0);
  };

  return (
    <ManagerLayout title="Danh sách phác đồ điều trị" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Danh sách phác đồ điều trị</h2>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded px-2 py-1"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={query}
            onChange={handleQueryChange}
            className="border rounded px-2 py-1 flex-1"
          />
        </div>

        {loading && <p>Đang tải dữ liệu…</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center p-4 border rounded bg-gray-50">
                Không có protocol nào phù hợp
              </div>
            ) : (
              <div className="grid gap-4">
                {filtered.map(protocol => (
                  <Link
                    key={protocol.id}
                    to={`/manager/protocols/protocolDetail/${protocol.id}`}
                    className="block"
                  >
                    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <div>
                          <div className="font-semibold text-lg mb-1">
                            {protocol.title}
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {protocol.description}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Giá ước tính: </span>
                            {protocol.estimatedPrice.toLocaleString("vi-VN")} đ
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Trạng thái: </span>
                            {protocol.active ? (
                              <span className="text-green-600">Hoạt động</span>
                            ) : (
                              <span className="text-gray-500">Không hoạt động</span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div>
                            Tạo lúc: {protocol.createdAt
                              ? new Date(protocol.createdAt).toLocaleString("vi-VN")
                              : "-"}
                          </div>
                          <div>
                            Cập nhật: {protocol.updatedAt
                              ? new Date(protocol.updatedAt).toLocaleString("vi-VN")
                              : "-"}
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
                    <PaginationPrevious onClick={() => setPage(p => Math.max(0, p - 1))} />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink isActive={page === idx} onClick={() => setPage(idx)}>
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </div>
    </ManagerLayout>
  );
}
