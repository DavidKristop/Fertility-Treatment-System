import { FileText } from "lucide-react"

type ContractStatusFilter = "all" | "pending" | "signed" // ✅ Xóa "expired"

interface ContractStatusWarningsProps {
  statusFilter: ContractStatusFilter
  userRole: "patient" | "manager"
}

export default function ContractStatusWarnings({ statusFilter, userRole }: ContractStatusWarningsProps) {
  if (statusFilter === "pending") {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FileText className="h-5 w-5 text-yellow-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              <strong>Lưu ý:</strong> {userRole === "patient" 
                ? "Bạn cần ký hợp đồng trước thời hạn để bắt đầu điều trị. Hợp đồng quá hạn sẽ bị ẩn tự động."
                : "Các hợp đồng này đang chờ bệnh nhân ký. Hợp đồng quá hạn sẽ bị ẩn tự động."
              }
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}