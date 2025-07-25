"use client"

import type React from "react"
import type { PaymentResponse } from "@/api/types"
import PaymentCard from "./PaymentCard"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

interface PaymentListProps {
  payments: PaymentResponse[]
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
  onViewDetails: (paymentId: string) => void
  onProcessPayment: (paymentId: string) => void
  onCancelPayment: (paymentId: string) => void
  isLoading?: boolean
  processingPaymentId?: string
  cancelingPaymentId?: string
}

const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetails,
  onProcessPayment,
  onCancelPayment,
  isLoading = false,
  processingPaymentId,
  cancelingPaymentId,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-32"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CreditCard className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Không có thanh toán nào</h3>
          <p className="text-gray-600 text-center max-w-md">
            Không có thanh toán nào phù hợp với tiêu chí tìm kiếm hiện tại.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">

      {/* Payment Cards */}
      <div className="space-y-4">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onViewDetails={onViewDetails}
            onProcessPayment={onProcessPayment}
            onCancelPayment={onCancelPayment}
            isProcessing={processingPaymentId === payment.id}
            isCanceling={cancelingPaymentId === payment.id}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                  className={currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageIndex = Math.max(0, Math.min(currentPage - 2, totalPages - 5)) + index
                if (pageIndex >= totalPages) return null

                return (
                  <PaginationItem key={pageIndex}>
                    <PaginationLink
                      onClick={() => onPageChange(pageIndex)}
                      isActive={pageIndex === currentPage}
                      className="cursor-pointer"
                    >
                      {pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                  className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default PaymentList
