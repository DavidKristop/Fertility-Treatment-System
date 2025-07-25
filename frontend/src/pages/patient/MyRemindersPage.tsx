import { useEffect, useState } from "react";
import { getAllOfMyReminder, readReminder } from "@/api/reminder";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";
import type { Reminder } from "@/api/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function MyRemindersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {setBreadCrumbs} = useAuthHeader()

  const fetchReminders = async (pageNum = 0) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllOfMyReminder({
        page: pageNum,
        size: 10,
      });
      setReminders(res?.payload?.content || []);
      setTotalPages(res?.payload?.totalPages || 1);
    } catch (err) {
    setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleReminderClick = async (reminder: Reminder) => {
    setSelectedReminder(reminder);
    setDialogOpen(true);

    try {
      await readReminder(reminder.id);
      const updatedReminders = reminders.map(r => {
        if(r.id === reminder.id){
          return {...r, read: true}
        }
        return r;
      });
      if(updatedReminders)setReminders(updatedReminders);
    } catch (err) {
      console.error("Failed to mark reminder as read:", err);
    }
  };

  useEffect(() => {
    const params: Record<string, string> = {};
    params.page = String(page);
    setSearchParams(params);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page"));
    if (!Number.isNaN(pageParam) && pageParam !== page) setPage(pageParam);
    // eslint-disable-next-line
  }, [searchParams]);

  useEffect(() => {
    fetchReminders(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(()=>{
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Nhắc nhở" },
      { label: "Danh sách nhắc nhở" },
    ])
  },[])

  return (
    <div className="mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Các thông báo của bạn</h2>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 rounded-lg border cursor-pointer ${
              reminder.read ? "border-gray-300" : "border-blue-500 bg-blue-50"
            }`}
            onClick={() => handleReminderClick(reminder)}
          >
            <h3 className="font-semibold">{reminder.title}</h3>
            <p className="text-sm truncate">{reminder.content}</p>
          </div>
        ))}
      </div>

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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedReminder?.title}</DialogTitle>
          </DialogHeader>
          <p className="mt-4">{selectedReminder?.content}</p>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setDialogOpen(false)}>Đóng</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
