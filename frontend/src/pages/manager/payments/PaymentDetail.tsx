"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PaymentDetailForm from "@/components/manager/payments/PaymentDetailForm"
import type { PaymentResponse } from "@/api/types"
import { getManagerPaymentDetail, processPaymentByManager, cancelPaymentByManager } from "@/api/payment"
import { ArrowLeft, RefreshCw } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"

const PaymentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [payment, setPayment] = useState<PaymentResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      fetchPaymentDetail()
    }
  }, [id])

  const fetchPaymentDetail = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      setSuccessMessage(null)
      const response = await getManagerPaymentDetail(id)

      if (response.success && response.payload) {
        setPayment(response.payload)
      } else {
        setError("Không tìm thấy thanh toán")
        navigate("/manager/payments")
      }
    } catch (error) {
      setError("Lỗi khi tải chi tiết thanh toán")
      navigate("/manager/payments")
    } finally {
      setLoading(false)
    }
  }

  const handleProcessPayment = async (paymentMethod: "CASH" | "CREDIT_CARD" | "PAYPAL") => {
    if (!id) return

    try {
      setIsProcessing(true)
      setError(null)
      setSuccessMessage(null)
      const response = await processPaymentByManager(id, paymentMethod)

      if (response.success && response.payload) {
        setPayment(response.payload)
        setSuccessMessage("Xử lý thanh toán thành công")
      } else {
        setError("Xử lý thanh toán thất bại")
      }
    } catch (error) {
      setError("Xử lý thanh toán thất bại")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCancelPayment = async () => {
    if (!id) return

    try {
      setIsCanceling(true)
      setError(null)
      setSuccessMessage(null)
      const response = await cancelPaymentByManager(id)

      if (response.success && response.payload) {
        setPayment(response.payload)
        setSuccessMessage("Hủy thanh toán thành công")
      } else {
        setError("Hủy thanh toán thất bại")
      }
    } catch (error) {
      setError("Hủy thanh toán thất bại")
    } finally {
      setIsCanceling(false)
    }
  }

  const handleBack = () => {
    navigate("/manager/payments")
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý thanh toán", path: "/manager/payments" },
    { label: "Chi tiết thanh toán" },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>

        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mr-3" />
            <span className="text-gray-600">Đang tải chi tiết thanh toán...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy thanh toán</p>
            <p className="text-gray-600 mb-4">Không thể tìm thấy thanh toán bạn yêu cầu.</p>
            <Button onClick={handleBack}>Về danh sách thanh toán</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ManagerLayout title="Chi tiết thanh toán" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Chi tiết thanh toán</h1>
              <p className="text-gray-600">Thanh toán #{payment.id.slice(-8)}</p>
            </div>
          </div>

          <Button variant="outline" onClick={fetchPaymentDetail} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </div>

        {/* Thông báo lỗi/thành công */}
        {(error || successMessage) && (
          <Card>
            <CardContent className="py-3">
              {error && <div className="text-red-600 font-medium">{error}</div>}
              {successMessage && <div className="text-green-600 font-medium">{successMessage}</div>}
            </CardContent>
          </Card>
        )}

        {/* Payment Detail Form */}
        <PaymentDetailForm
          payment={payment}
          onProcessPayment={handleProcessPayment}
          onCancelPayment={handleCancelPayment}
          isProcessing={isProcessing}
          isCanceling={isCanceling}
        />
      </div>
    </ManagerLayout>
  )
}

export default PaymentDetail
