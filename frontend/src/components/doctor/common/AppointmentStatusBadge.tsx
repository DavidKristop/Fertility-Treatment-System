import { Badge } from "@/components/ui/badge"

interface AppointmentStatusBadgeProps {
  status: string
  className?: string
}

export default function AppointmentStatusBadge({
  status,
  className = "",
}: AppointmentStatusBadgeProps) {
  // Chuẩn hoá string để switch dễ hơn
  const norm = status.toLowerCase()

  const getStatusColor = () => {
    switch (norm) {
      // DONE và biến thể → nền xanh lá, chữ xanh, to + đậm
      case "done":
      case "complete":
      case "completed":
        return "bg-green-100 text-green-800 text-lg font-semibold"

      // PENDING
      case "pending":
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 text-lg font-semibold"

      // IN PROGRESS
      case "in progress":
      case "changed":
        return "bg-blue-100 text-blue-800"

      // CANCEL
      case "cancel":
      case "cancelled":
      case "paused":
        return "bg-red-100 text-red-800"

      // NEW PATIENT
      case "new":
        return "bg-blue-100 text-blue-800"

      // ABNORMAL
      case "abnormal":
        return "bg-red-100 text-red-800"

      // NORMAL / ACTIVE
      case "normal":
      case "active":
        return "bg-green-100 text-green-800"

      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = () => {
    switch (norm) {
      case "done":
        return "Đã hoàn thành"
      case "complete":
      case "completed":
        return "Hoàn thành"
      case "pending":
        return "Chờ xác nhận"
      case "scheduled":
        return "Đã lên lịch"
      case "in progress":
        return "Đang điều trị"
      case "changed":
        return "Đã thay đổi"
      case "cancel":
      case "cancelled":
        return "Đã hủy"
      case "paused":
        return "Tạm dừng"
      case "new":
        return "Bệnh nhân mới"
      case "normal":
        return "Bình thường"
      case "active":
        return "Đang điều trị"
      case "abnormal":
        return "Bất thường"
      default:
        return status
    }
  }

  return (
    <Badge className={`${getStatusColor()} ${className}`}>
      {getStatusText()}
    </Badge>
  )
}
