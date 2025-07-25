import type React from "react"
import ScheduleCard from "./ScheduleCard"
import type { ScheduleDetailResponse } from "@/api/types"

interface ScheduleCardListProps {
  schedules: ScheduleDetailResponse[]
  onViewDetails: (scheduleId: string) => void
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  isLoading?: boolean
}

const ScheduleCardList: React.FC<ScheduleCardListProps> = ({
  schedules,
  onViewDetails,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  return (
    <div>
      {isLoading ? (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <>
          {schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onViewDetails={onViewDetails}
            />
          ))}

          {/* Pagination UI nếu cần */}
          {typeof currentPage === "number" && typeof totalPages === "number" && onPageChange && (
            <div className="mt-4 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded ${
                    i === currentPage ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                  }`}
                  onClick={() => onPageChange(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ScheduleCardList
