"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { PaymentResponse } from "@/api/types"
import { format } from "date-fns"
import { RefreshCw } from "lucide-react"

interface PaymentDetailFormProps {
  payment: PaymentResponse
  onProcessPayment: (paymentMethod: "CASH" | "VNPAY") => void
  onCancelPayment: () => void
  isProcessing?: boolean
  isCanceling?: boolean
}

const PaymentDetailForm: React.FC<PaymentDetailFormProps> = ({
  payment,
  onProcessPayment,
  onCancelPayment,
  isProcessing = false,
  isCanceling = false,
}) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Đã thanh toán"
      case "PENDING":
        return "Chờ thanh toán"
      case "CANCELED":
        return "Đã hủy"
      default:
        return status
    }
  }

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

  const getPaymentMethodLabel = (method: string | null) => {
    switch (method) {
      case "CASH":
        return "Tiền mặt"
      case "VNPAY":
        return "VNPay"
      default:
        return "-"
    }
  }

  const getPaymentMethodColor = (method: string | null) => {
    if (!method) return "bg-gray-100 text-gray-800"
    switch (method) {
      case "CASH":
        return "bg-blue-100 text-blue-800"
      case "VNPAY":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const isOverdue = payment.status === "PENDING" && new Date(payment.paymentDeadline) < new Date()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Thanh toán #{payment.id.slice(-8)}
          </CardTitle>
          <div className="mt-2 flex items-center gap-2">
            <Badge className={getStatusColor(payment.status)}>{getStatusLabel(payment.status)}</Badge>
            {isOverdue && <Badge variant="destructive">Quá hạn</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2">
                <span className="font-medium">Số tiền:</span>{" "}
                <span className="text-blue-700 font-semibold">{payment.amount.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Trạng thái:</span>{" "}
                <span>{getStatusLabel(payment.status)}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Phương thức:</span>{" "}
                <Badge className={getPaymentMethodColor(payment.paymentMethod)}>
                  {getPaymentMethodLabel(payment.paymentMethod)}
                </Badge>
              </div>
              <div className="mb-2">
                <span className="font-medium">Hạn thanh toán:</span>{" "}
                {format(new Date(payment.paymentDeadline), "dd/MM/yyyy HH:mm")}
              </div>
              {payment.paymentDate && (
                <div className="mb-2">
                  <span className="font-medium">Ngày thanh toán:</span>{" "}
                  {format(new Date(payment.paymentDate), "dd/MM/yyyy HH:mm")}
                </div>
              )}
            </div>
            <div>
              <div className="mb-2">
                <span className="font-medium">Mô tả:</span>{" "}
                <span>{payment.description || "-"}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Người thanh toán (ID):</span>{" "}
                <span>{payment.userId}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Tạo lúc:</span>{" "}
                {payment.createdAt ? format(new Date(payment.createdAt), "dd/MM/yyyy HH:mm") : "-"}
              </div>
              <div className="mb-2">
                <span className="font-medium">Cập nhật:</span>{" "}
                {payment.updatedAt ? format(new Date(payment.updatedAt), "dd/MM/yyyy HH:mm") : "-"}
              </div>
            </div>
          </div>

          {payment.status === "PENDING" && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <Button
                onClick={() => onProcessPayment("CASH")}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                Xử lý (Tiền mặt)
              </Button>
              <Button variant="destructive" onClick={onCancelPayment} disabled={isCanceling}>
                {isCanceling ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : null}
                Hủy thanh toán
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PaymentDetailForm
