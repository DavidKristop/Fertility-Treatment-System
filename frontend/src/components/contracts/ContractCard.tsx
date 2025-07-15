"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, PenTool, CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { ContractResponse } from "@/api/types"

interface ContractCardProps {
  contract: ContractResponse
  onView: (contract: ContractResponse) => void
  onSign?: (contractId: string) => void
  onDownload: (contractId: string) => void
  showPatientInfo?: boolean
}

export default function ContractCard({
  contract,
  onView,
  onSign,
  onDownload,
  showPatientInfo = false,
}: ContractCardProps) {
  const getStatusColor = (signed: boolean) => {
    return signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  const getStatusIcon = (signed: boolean) => {
    return signed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />
  }

  const getStatusText = (signed: boolean) => {
    return signed ? "Đã ký" : "Chờ ký"
  }

  const isExpired = new Date(contract.signDeadline) < new Date()

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">
              Hợp đồng điều trị - {contract.treatment.protocol?.title || "Chưa xác định"}
            </h3>
            <Badge className={getStatusColor(contract.signed)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(contract.signed)}
                {getStatusText(contract.signed)}
              </div>
            </Badge>
            {isExpired && !contract.signed && (
              <Badge className="bg-red-100 text-red-800">
                <AlertCircle className="h-4 w-4 mr-1" />
                Hết hạn
              </Badge>
            )}
          </div>

          <p className="text-gray-600 mb-3">{contract.treatment.description || "Không có mô tả"}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {showPatientInfo && contract.treatment.patient && (
              <div>
                <span className="text-gray-500">Bệnh nhân:</span>
                <div className="font-medium">{contract.treatment.patient.fullName || "Chưa cập nhật"}</div>
              </div>
            )}
            <div>
              <span className="text-gray-500">Bác sĩ:</span>
              <div className="font-medium">{contract.treatment.doctor?.fullName || "Chưa cập nhật"}</div>
            </div>
            <div>
              <span className="text-gray-500">Giá trị:</span>
              <div className="font-medium text-green-600">
                {contract.treatment.protocol?.estimatedPrice?.toLocaleString("vi-VN") || "0"} VNĐ
              </div>
            </div>
            <div>
              <span className="text-gray-500">Hạn ký:</span>
              <div className="font-medium">{new Date(contract.signDeadline).toLocaleDateString("vi-VN")}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <Button variant="outline" size="sm" onClick={() => onView(contract)}>
            <Eye className="h-4 w-4 mr-2" />
            Xem chi tiết
          </Button>

          {contract.signed && contract.contractUrl && (
            <Button variant="outline" size="sm" onClick={() => onDownload(contract.id)}>
              <Download className="h-4 w-4 mr-2" />
              Tải xuống
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
