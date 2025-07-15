"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, FileText, AlertCircle, CheckCircle, PenTool, Download } from "lucide-react"
import { getPatientContractById, signContract } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"

interface ContractSignFormProps {
  contractId: string
  onSignSuccess?: () => void
  onCancel?: () => void
}

export default function ContractSignForm({ contractId, onSignSuccess, onCancel }: ContractSignFormProps) {
  const [contract, setContract] = useState<ContractResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchContractDetail()
  }, [contractId])

  const fetchContractDetail = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await getPatientContractById(contractId)
      if (response.payload) {
        setContract(response.payload)
      } else {
        setError("Không tìm thấy thông tin hợp đồng")
      }
    } catch (err) {
      console.error("Error fetching contract detail:", err)
      const errorMessage = err instanceof Error ? err.message : "Lỗi khi tải chi tiết hợp đồng"
      setError(errorMessage)
      toast.error("Không thể tải chi tiết hợp đồng")
    } finally {
      setLoading(false)
    }
  }

  const handleSignContract = async () => {
    if (!contract) return

    setSigning(true)
    try {
      await signContract(contract.id)
      toast.success("Ký hợp đồng thành công!")
      if (onSignSuccess) {
        onSignSuccess()
      }
    } catch (err) {
      console.error("Error signing contract:", err)
      const errorMessage = err instanceof Error ? err.message : "Lỗi khi ký hợp đồng"
      toast.error(errorMessage)
    } finally {
      setSigning(false)
    }
  }

  const handleDownloadContract = () => {
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, "_blank")
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p>Đang tải thông tin hợp đồng...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-red-500 mb-4">
            <AlertCircle className="h-12 w-12 mx-auto mb-2" />
            <p>{error}</p>
          </div>
          <Button onClick={fetchContractDetail} variant="outline">
            Thử lại
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!contract) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy thông tin hợp đồng</p>
        </CardContent>
      </Card>
    )
  }

  const isExpired = new Date(contract.signDeadline) < new Date()
  const canSign = !contract.signed && !isExpired

  if (contract.signed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Hợp đồng đã được ký
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hợp đồng đã được ký thành công</h3>
            <p className="text-gray-600 mb-6">
              Hợp đồng điều trị "{contract.treatment.protocol?.title}" đã được ký và có hiệu lực.
            </p>
            {contract.contractUrl && (
              <Button onClick={handleDownloadContract} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Tải xuống hợp đồng
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isExpired) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            Hợp đồng đã hết hạn
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              Hợp đồng này đã hết hạn ký vào ngày {new Date(contract.signDeadline).toLocaleDateString("vi-VN")}. Vui
              lòng liên hệ với bác sĩ hoặc phòng khám để được hỗ trợ.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!canSign) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Không thể ký hợp đồng này</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Contract Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Thông tin hợp đồng cần ký
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Phác đồ điều trị</label>
              <p className="font-medium text-gray-900">{contract.treatment.protocol?.title || "Chưa xác định"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Bác sĩ phụ trách</label>
              <p className="font-medium text-gray-900">{contract.treatment.doctor?.fullName || "Chưa xác định"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Giá trị hợp đồng</label>
              <p className="font-medium text-green-600 text-lg">
                {contract.treatment.protocol?.estimatedPrice?.toLocaleString("vi-VN") || "0"} VNĐ
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Hạn ký</label>
              <p className="font-medium text-gray-900">{new Date(contract.signDeadline).toLocaleString("vi-VN")}</p>
            </div>
          </div>

          {contract.treatment.description && (
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Mô tả điều trị</label>
              <p className="font-medium text-gray-900">{contract.treatment.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract File */}
      {contract.contractUrl && (
        <Card>
          <CardHeader>
            <CardTitle>File hợp đồng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium">Hợp đồng điều trị</p>
                  <p className="text-sm text-gray-500">Vui lòng đọc kỹ trước khi ký</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleDownloadContract}>
                <Download className="h-4 w-4 mr-2" />
                Xem/Tải xuống
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notice */}
      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Lưu ý quan trọng:</strong> Sau khi ký, hợp đồng sẽ có hiệu lực pháp lý. Vui lòng đọc kỹ tất cả các
          điều khoản và đảm bảo bạn hiểu rõ nội dung trước khi xác nhận ký.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button variant="outline" onClick={onCancel} disabled={signing}>
            Hủy bỏ
          </Button>
        )}
        <Button
          onClick={handleSignContract}
          disabled={signing}
          className="min-w-[120px]"
        >
          {signing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Đang ký...
            </>
          ) : (
            <>
              <PenTool className="h-4 w-4 mr-2" />
              Ký hợp đồng
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
