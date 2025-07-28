import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllFeedbacks } from "@/api/feedback";
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";
import type { FeedbackResponse } from "@/api/feedback";

export default function StaffFeedbackPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page"));
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(0);
  const { setTitle, setBreadCrumbs } = useAuthHeader();

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const res = await getAllFeedbacks({ page });

        if (res.payload) {
          setFeedbacks(res.payload.content || []);
          setTotalPages(res.payload.totalPages || 0);
        } else {
          throw new Error(res.message || "Không thể tải dữ liệu");
        }
      } catch (err: any) {
        toast.error(err.message || "Lỗi khi tải phản hồi");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [page]);

  useEffect(() => {
    setBreadCrumbs([
      { label: "Trang quản lý", path: "/staff/dashboard" },
      { label: "Phản hồi", path: "/staff/feedback" },
    ]);
    setTitle("Phản hồi của bệnh nhân");
  }, []);

  return (
    <div className="mx-auto p-4 space-y-6">

      {loading && (
        <p className="text-sm text-gray-500 italic">Đang tải dữ liệu...</p>
      )}

      {!loading && feedbacks.length === 0 && (
        <p className="text-gray-500 italic">Không có phản hồi nào.</p>
      )}

      {!loading && feedbacks.length > 0 && (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 my-2"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {fb.treatmentName}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Bệnh nhân:</span> {fb.patientName}
                </p>
                <div className="text-sm text-gray-800 whitespace-pre-line border-t pt-2 mt-2">
                  <span className="font-medium">Nội dung phản hồi:</span>
                  <div
                    className="mt-1 bg-gray-50 rounded-md p-2 border text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: fb.content || "(Không có nội dung)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
