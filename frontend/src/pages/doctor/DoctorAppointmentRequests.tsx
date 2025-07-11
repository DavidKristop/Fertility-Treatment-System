import { useEffect, useState } from "react";
import { getAppointmentRequestToMe } from "@/api/request-appointment";
import { acceptRequestAppointment, rejectRequestAppointment } from "@/api/request-appointment";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import type { RequestAppointmentResponse } from "@/api/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import DoctorLayout from "@/components/doctor/DoctorLayout";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Đang chờ" },
  { value: "ACCEPTED", label: "Đã chấp nhận" },
  { value: "DENIED", label: "Từ chối" },
  { value: "ALL", label: "Tất cả" }
];

export default function DoctorAppointmentRequest() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from query params, fallback to defaults
  const statusParam = searchParams.get("status") as "PENDING" | "ACCEPTED" | "DENIED" | "ALL" | null;
  const pageParam = Number(searchParams.get("page"));
  const patientEmailParam = searchParams.get("patientEmail") || "";


  const [requests, setRequests] = useState<RequestAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(Number.isNaN(pageParam) ? 0 : pageParam);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState<"PENDING" | "ACCEPTED" | "DENIED" | "ALL">(statusParam || "ALL");
  const [patientEmail, setPatientEmail] = useState(patientEmailParam);
  const [search, setSearch] = useState(patientEmailParam);

  // Dialog states
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/doctor/dashboard" },
    { label: "Yêu cầu đặt lịch" },
  ];

  const fetchRequests = async (pageNum = 0, statusVal = status, email = patientEmail) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAppointmentRequestToMe({
        page: pageNum,
        size: 10,
        patientEmail: email,
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

  const acceptRequest = async (requestId: string) => {
    if (!selectedRequestId) return;
    
    setIsAccepting(true);
    try {
      const res = await acceptRequestAppointment(requestId)
      toast.success("Đã chấp nhận yêu cầu thành công");
      setIsAcceptDialogOpen(false);
      setSelectedRequestId(null);
      fetchRequests(page, status, patientEmail);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách bác sĩ")
    } finally {
      setIsAccepting(false);
    }
  }

  const rejectRequest = async (requestId: string) => {
    if (!selectedRequestId) return;
    
    setIsRejecting(true);
    try {
      const res = await rejectRequestAppointment(requestId, rejectReason)
      toast.success("Đã từ chối yêu cầu thành công");
      setIsRejectDialogOpen(false);
      setSelectedRequestId(null);
      fetchRequests(page, status, patientEmail);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách bác sĩ")
    } finally {
      setIsRejecting(false);
    }
  }

  useEffect(() => {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    params.page = String(page);
    if (patientEmail) params.patientEmail = patientEmail;
    setSearchParams(params);
    // eslint-disable-next-line
  }, [status, page, patientEmail]);

  useEffect(() => {
    if (statusParam && statusParam !== status) setStatus(statusParam);
    if (!Number.isNaN(pageParam) && pageParam !== page) setPage(pageParam);
    if (patientEmailParam !== patientEmail) {
      setPatientEmail(patientEmailParam);
      setSearch(patientEmailParam);
    }
    // eslint-disable-next-line
  }, [statusParam, pageParam, patientEmailParam]);

  useEffect(() => {
    fetchRequests(page, status, patientEmail);
    // eslint-disable-next-line
  }, [page, status, patientEmail]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as "PENDING" | "ACCEPTED" | "DENIED");
    setPage(0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPatientEmail(search.trim());
    setPage(0);
  };

  return (
    <DoctorLayout title="Yêu cầu đặt lịch" breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Lịch sử yêu cầu đặt lịch</h2>
        <form className="flex gap-2 mb-4" onSubmit={handleSearch}>
          <input
            type="text"
            className="border rounded px-2 py-1 flex-1"
            placeholder="Tìm theo email của bệnh nhân"
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
                      <div className="font-semibold text-lg">Hẹn với bệnh nhân {req.patient.fullName}</div>
                      <div className="text-sm text-gray-500 mb-1">Email bệnh nhân: {req.patient.email}</div>
                      <div className="text-sm">
                        <span className="font-medium">Thời gian: </span>
                        {new Date(req.appointmentDatetime).toLocaleString("vi-VN") + " - " + new Date(new Date(req.appointmentDatetime).getTime() + 30 * 60 * 1000).toLocaleString("vi-VN")}
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
                      <div className="flex gap-2">
                        {req.status === "PENDING" && (
                          <>
                            <Button
                              onClick={() => {
                                setSelectedRequestId(req.id);
                                setIsAcceptDialogOpen(true);
                              }}
                              variant="default"
                            >
                              Duyệt
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedRequestId(req.id);
                                setIsRejectDialogOpen(true);
                              }}
                              variant="destructive"
                              
                            >
                              Từ chối
                            </Button>
                          </>
                        )}
                      </div>
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
      {/* Accept Dialog */}
      <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chấp nhận yêu cầu</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            Bạn có chắc chắn muốn chấp nhận yêu cầu này?
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsAcceptDialogOpen(false);
                setSelectedRequestId(null);
              }}
              variant="outline"
            >
              Không
            </Button>
            <Button
              onClick={async () => acceptRequest(selectedRequestId||"")}
              disabled={isAccepting}
            >
              {isAccepting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Có"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối yêu cầu</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">Bạn có chắc chắn muốn từ chối yêu cầu này?</div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Lý do từ chối:</label>
              <Input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setIsRejectDialogOpen(false);
                setSelectedRequestId(null);
                setRejectReason("");
              }}
              variant="outline"
            >
              Không
            </Button>
            <Button
              onClick={async () => rejectRequest(selectedRequestId||"")}
              disabled={isRejecting}
            >
              {isRejecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Có"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DoctorLayout>


  );
}