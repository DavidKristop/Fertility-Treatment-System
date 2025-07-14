import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import type { TreatmentScheduleResponse } from "@/api/types";

interface ScheduleCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (schedule: Partial<TreatmentScheduleResponse>) => void;
}

export default function ScheduleCreateDialog({
  isOpen,
  onClose,
  onSubmit,
}: ScheduleCreateDialogProps) {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    undefined
  );

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setSelectedDate(undefined);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày hẹn");
      return;
    }

    onSubmit({
      title,
      appointmentDateTime: selectedDate.toISOString(),
      status: "PENDING", // Default status
      services: [], // Empty array for now
      payment: [], // Empty array for now
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Tạo lịch hẹn mới
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Tiêu đề lịch hẹn</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề lịch hẹn"
            />
          </div>

        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit}>
            Tạo lịch hẹn
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
