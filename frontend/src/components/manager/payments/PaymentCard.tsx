"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PaymentResponse } from "@/api/types"
import { format } from "date-fns"

interface PaymentCardProps {
  payment: PaymentResponse
  onViewDetails: (paymentId: string) => void
  onProcessPayment: (paymentId: string, paymentMethod: "CASH" | "CREDIT_CARD" | "PAYPAL") => void
  onCancelPayment: (paymentId: string) => void
  isProcessing?: boolean
  isCanceling?: boolean
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onViewDetails,
  onProcessPayment,
  onCancelPayment,
  isProcessing = false,
  isCanceling = false,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "CANCELED":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentMethodColor = (method: string | null) => {
    if (!method) return "bg-gray-100 text-gray-800"
    switch (method) {
      case "CASH":
        return "bg-blue-100 text-blue-800"
      case "CREDIT_CARD":
        return "bg-purple-100 text-purple-800"
      case "PAYPAL":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = payment.status === "PENDING" && new Date(payment.paymentDeadline) < new Date()

  return (
    <Card className={`hover:shadow-md transition-shadow ${isOverdue ? "border-red-200 bg-red-50" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Thanh toán #{payment.id.slice(-8)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(payment.status)}>
              {payment.status === "PENDING" && "Chờ thanh toán"}
              {payment.status === "COMPLETED" && "Đã thanh toán"}
              {payment.status === "CANCELED" && "Đã hủy"}
            </Badge>
            {isOverdue && (
              <Badge variant="destructive">Quá hạn</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold text-lg text-blue-700">
            {payment.amount.toLocaleString("vi-VN")} đ
          </span>
          {payment.paymentMethod && (
            <Badge className={getPaymentMethodColor(payment.paymentMethod)}>
              {payment.paymentMethod === "CASH" && "Tiền mặt"}
              {payment.paymentMethod === "CREDIT_CARD" && "Thẻ"}
              {payment.paymentMethod === "PAYPAL" && "PayPal"}
            </Badge>
          )}
        </div>

        {payment.description && (
          <div className="text-sm text-gray-600 line-clamp-2">{payment.description}</div>
        )}

        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="font-medium">Hạn thanh toán:</span>{" "}
            <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
              {format(new Date(payment.paymentDeadline), "dd/MM/yyyy")}
            </span>
          </div>
          {payment.paymentDate && (
            <div>
              <span className="font-medium">Đã thanh toán:</span>{" "}
              {format(new Date(payment.paymentDate), "dd/MM/yyyy")}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(payment.id)}>
            Xem chi tiết
          </Button>
          {payment.status === "PENDING" && (
            <>
              <Button
                size="sm"
                onClick={() => onProcessPayment(payment.id, "CASH")}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? "Đang xử lý..." : "Tiền mặt"}
              </Button>
              <Button
                size="sm"
                onClick={() => onProcessPayment(payment.id, "CREDIT_CARD")}
                disabled={isProcessing}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isProcessing ? "Đang xử lý..." : "Thẻ"}
              </Button>
              <Button
                size="sm"
                onClick={() => onProcessPayment(payment.id, "PAYPAL")}
                disabled={isProcessing}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {isProcessing ? "Đang xử lý..." : "PayPal"}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onCancelPayment(payment.id)}
                disabled={isCanceling}
              >
                {isCanceling ? "Đang hủy..." : "Hủy"}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentCard