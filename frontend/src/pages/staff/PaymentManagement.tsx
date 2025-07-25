"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import PaymentList from "@/components/staff/payments/PaymentList"
import PaymentFilters from "@/components/staff/payments/PaymentFilters"
import type { PaymentResponse } from "@/api/types"
import { getStaffPayments, processPaymentByStaff, cancelPaymentByStaff } from "@/api/payment"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

type PaymentStatusFilter = "all" | "pending" | "completed" | "canceled"

const PaymentManagement: React.FC = () => {
  const navigate = useNavigate()
  const [payments, setPayments] = useState<PaymentResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [processingPaymentId, setProcessingPaymentId] = useState<string | undefined>()
  const [cancelingPaymentId, setCancelingPaymentId] = useState<string | undefined>()
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<PaymentStatusFilter>("all")
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  // Map statusFilter to statuses array for API
  const getStatuses = (filter: PaymentStatusFilter) => {
    if (filter === "all") return ["PENDING", "COMPLETED", "CANCELED"] as ("PENDING" | "COMPLETED" | "CANCELED")[]
    return [filter.toUpperCase() as "PENDING" | "COMPLETED" | "CANCELED"]
  }

  const fetchPayments = useCallback(
    async (page = 0) => {
      try {
        setLoading(true)
        setError(null)
        const response = await getStaffPayments({
          page,
          size: 10,
          email: searchTerm,
          statuses: getStatuses(statusFilter),
        })

        if (response.success && response.payload) {
          setPayments(response.payload.content)
          setTotalPages(response.payload.totalPages)
          setTotalElements(response.payload.totalElements)
          setCurrentPage(response.payload.pageable.pageNumber)
        } else {
          setError("Không tìm thấy dữ liệu thanh toán")
        }
      } catch (error) {
        setError("Lỗi khi tải danh sách thanh toán")
      } finally {
        setLoading(false)
      }
    },
    [searchTerm, statusFilter],
  )

  useEffect(() => {
    fetchPayments(0)
  }, [fetchPayments])

  const handlePageChange = (page: number) => {
    fetchPayments(page)
  }

  const handleViewDetails = (paymentId: string) => {
    navigate(`/staff/payments/${paymentId}`)
  }

  const handleProcessPayment = async (paymentId: string) => {
    try {
      setProcessingPaymentId(paymentId)
      setError(null)
      setSuccessMessage(null)
      const response = await processPaymentByStaff(paymentId, "CASH")

      if (response.success) {
        setSuccessMessage("Xử lý thanh toán thành công")
        setPayments((prev) =>
          prev.map((payment) =>
            payment.id === paymentId
              ? { ...payment, status: "COMPLETED" as const, paymentMethod: "CASH" as const, paymentDate: new Date().toISOString() }
              : payment,
          ),
        )
      } else {
        setError("Xử lý thanh toán thất bại")
      }
    } catch (error) {
      setError("Xử lý thanh toán thất bại")
    } finally {
      setProcessingPaymentId(undefined)
    }
  }

  const handleCancelPayment = async (paymentId: string) => {
    try {
      setCancelingPaymentId(paymentId)
      setError(null)
      setSuccessMessage(null)
      const response = await cancelPaymentByStaff(paymentId)

      if (response.success) {
        setSuccessMessage("Hủy thanh toán thành công")
        setPayments((prev) =>
          prev.map((payment) => (payment.id === paymentId ? { ...payment, status: "CANCELED" as const } : payment)),
        )
      } else {
        setError("Hủy thanh toán thất bại")
      }
    } catch (error) {
      setError("Hủy thanh toán thất bại")
    } finally {
      setCancelingPaymentId(undefined)
    }
  }

  useEffect(()=>{
    setTitle("Quản lý thanh toán")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
      { label: "Quản lý thanh toán" },
    ])
  },[])

  return (
    <div className="space-y-6">
      <PaymentFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {(error || successMessage) && (
        <div className="rounded bg-gray-50 border p-3">
          {error && <div className="text-red-600 font-medium">{error}</div>}
          {successMessage && <div className="text-green-600 font-medium">{successMessage}</div>}
        </div>
      )}

      <PaymentList
        payments={payments}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        onViewDetails={handleViewDetails}
        onProcessPayment={handleProcessPayment}
        onCancelPayment={handleCancelPayment}
        isLoading={loading}
        processingPaymentId={processingPaymentId}
        cancelingPaymentId={cancelingPaymentId}
      />
    </div>
  )
}

export default PaymentManagement