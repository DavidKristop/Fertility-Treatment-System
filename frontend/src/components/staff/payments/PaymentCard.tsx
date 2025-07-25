"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PaymentResponse } from "@/api/types"
import { format } from "date-fns"

interface PaymentCardProps {
  payment: PaymentResponse
  onViewDetails: (paymentId: string) => void
  onProcessPayment: (paymentId: string) => void
  onCancelPayment: (paymentId: string) => void
  isProcessing?: boolean
  isCanceling?: boolean
}

const statusText = {
  PENDING: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-700" },
  COMPLETED: { label: "Đã thanh toán", color: "bg-green-100 text-green-700" },
  CANCELED: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
}

const methodText = {
  CASH: "Tiền mặt",
  CREDIT_CARD: "Thẻ",
  PAYPAL: "PayPal",
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onViewDetails,
  onProcessPayment,
  onCancelPayment,
  isProcessing = false,
  isCanceling = false,
}) => {
  const status = statusText[payment.status as keyof typeof statusText]
  return (
    <Card
      className="rounded-xl px-6 py-4 mb-4 shadow-sm border border-gray-200 cursor-pointer hover:shadow transition"
      onClick={() => onViewDetails(payment.id)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base mb-1">
            Thanh toán #{payment.id.slice(-8)}
          </div>
          {payment.description && (
            <div className="text-gray-600 text-sm mb-1 line-clamp-2">{payment.description}</div>
          )}
          <div className="text-sm mb-1">
            <span className="font-medium">Số tiền:</span>{" "}
            <span className="font-semibold text-blue-700">{payment.amount.toLocaleString("vi-VN")} đ</span>
          </div>
          <div className="text-sm mb-1">
            <span className="font-medium">Hạn thanh toán:</span>{" "}
            {format(new Date(payment.paymentDeadline), "dd/MM/yyyy")}
            {payment.paymentDate && (
              <>
                {"  "} <span className="font-medium">Đã thanh toán:</span>{" "}
                {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 min-w-[110px] mt-1">
          <Badge className={status.color + " font-normal"}>{status.label}</Badge>
          {payment.paymentMethod && (
            <Badge className="bg-blue-50 text-blue-700 font-normal">
              {methodText[payment.paymentMethod as keyof typeof methodText]}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

export default PaymentCard