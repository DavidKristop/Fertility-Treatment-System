"use client";

interface TreatmentStatusBadgeProps {
  status: string;
  className?: string;
}

export default function TreatmentStatusBadge({
  status,
  className = "",
}: TreatmentStatusBadgeProps) {
  const getStatusColor = () => {
    switch (status) {
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "AWAITING_CONTRACT_SIGNED":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTranslatedStatus = () => {
    switch (status) {
      case "IN_PROGRESS":
        return "Đang điều trị";
      case "COMPLETED":
        return "Hoàn thành";
      case "CANCELLED":
        return "Đã hủy";
      case "AWAITING_CONTRACT_SIGNED":
        return "Chờ ký hợp đồng";
      default:
        return status;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor()} ${className}`}
    >
      {getTranslatedStatus()}
    </span>
  );
}
