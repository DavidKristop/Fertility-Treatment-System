"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import PaymentDetailForm from "@/components/staff/payments/PaymentDetailForm"
import type { PaymentResponse } from "@/api/types"
import { getStaffPaymentDetail, processPaymentByStaff, cancelPaymentByStaff } from "@/api/payment"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

const PaymentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [payment, setPayment] = useState<PaymentResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const fetchPaymentDetail = async () => {
    if (!id) return

    try {
      setLoading(true)
      setError(null)
      setSuccessMessage(null)
      const response = await getStaffPaymentDetail(id)

      if (response.success && response.payload) {
        setPayment(response.payload)
      } else {
        setError("Không tìm thấy thanh toán")
        navigate("/staff/payments")
      }
    } catch (error) {
      setError("Lỗi khi tải chi tiết thanh toán")
      navigate("/staff/payments")
    } finally {
      setLoading(false)
    }
  }

  const handleProcessPayment = async (paymentMethod: "CASH" | "VNPAY") => {
    if (!id) return

    try {
      setIsProcessing(true)
      setError(null)
      setSuccessMessage(null)
      const response = await processPaymentByStaff(id, paymentMethod)

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
      const response = await cancelPaymentByStaff(id)

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
    navigate("/staff/payments")
  }


  useEffect(() => {
    if (id) {
      fetchPaymentDetail()
    }
  }, [id])

  useEffect(()=>{
    setTitle("Chi tiết thanh toán")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý thanh toán", path: "/manager/payments" },
      { label: "Chi tiết thanh toán" },
    ])
  },[])

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
  )
}

export default PaymentDetail
