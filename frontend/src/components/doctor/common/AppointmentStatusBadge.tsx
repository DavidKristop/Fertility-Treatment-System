import { Badge } from "@/components/ui/badge"

interface AppointmentStatusBadgeProps {
  status: string
  className?: string
}

export default function AppointmentStatusBadge({ status, className = "" }: AppointmentStatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done":
      case "Complete":
      case "completed":
      case "active":
      case "normal":
        return "bg-green-100 text-green-800"
      case "Pending":
      case "pending":
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "In Progress":
      case "Changed":
        return "bg-blue-100 text-blue-800"
      case "Cancel":
      case "cancelled":
      case "paused":
        return "bg-red-100 text-red-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "abnormal":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "Done":
        return "Đã hoàn thành"
      case "Complete":
      case "completed":
        return "Hoàn thành"
      case "Pending":
      case "pending":
        return "Chờ xác nhận"
      case "In Progress":
        return "Đang điều trị"
      case "Changed":
        return "Đã thay đổi"
      case "Cancel":
      case "cancelled":
        return "Đã hủy"
      case "active":
        return "Đang điều trị"
      case "new":
        return "Bệnh nhân mới"
      case "paused":
        return "Tạm dừng"
      case "scheduled":
        return "Đã lên lịch"
      case "normal":
        return "Bình thường"
      case "abnormal":
        return "Bất thường"
      default:
        return status
    }
  }

  return <Badge className={`${getStatusColor(status)} ${className}`}>{getStatusText(status)}</Badge>
}
