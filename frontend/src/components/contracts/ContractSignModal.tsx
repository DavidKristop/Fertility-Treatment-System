import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import type { ContractResponse } from "@/api/types"

interface ContractSignModalProps {
  contract: ContractResponse | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (contractId: string) => void
  isLoading?: boolean
}

export default function ContractSignModal({ 
  contract, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false 
}: ContractSignModalProps) {
  if (!contract) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận ký hợp đồng</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn ký hợp đồng điều trị "{contract.treatment.protocol.title}"?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Lưu ý quan trọng:</p>
                <p className="text-yellow-700">
                  Sau khi ký, hợp đồng sẽ có hiệu lực pháp lý. Vui lòng đọc kỹ các điều khoản trước
                  khi xác nhận.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Bác sĩ phụ trách:</span>
              <span className="font-medium">{contract.treatment.doctor.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span>Giá trị hợp đồng:</span>
              <span className="font-medium text-green-600">
                {contract.treatment.protocol.estimatedPrice.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hạn ký:</span>
              <span className="font-medium">
                {new Date(contract.signDeadline).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button 
            onClick={() => onConfirm(contract.id)} 
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận ký"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}