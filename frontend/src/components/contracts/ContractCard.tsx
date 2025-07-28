"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { ContractResponse } from "@/api/types"
import { Link } from "react-router-dom"

interface ContractCardProps {
  contract: ContractResponse
  onView: (contract: ContractResponse) => void
  onSign?: (contractId: string) => void
  showPatientInfo?: boolean
  userRole?: "patient" | "manager"
}

export default function ContractCard({
  contract,
  onView,
  userRole = "patient",
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
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow" onClick={() => onView(contract)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">
              Hợp đồng điều trị - Treatment ID: {contract.treatmentId}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Hạn ký:</span>
              <div className="font-medium">{new Date(contract.signDeadline).toLocaleDateString("vi-VN")}</div>
            </div>
            <div>
              <span className="text-gray-500">Treatment ID:</span>
              <div className="font-medium">
                {contract.treatmentId ? (
                  userRole === "patient" ? (
                    <Link
                      to={`/patient/treatment/${contract.treatmentId}`}
                      className="text-blue-600 underline hover:text-blue-800 transition"
                      title="Xem chi tiết điều trị"
                    >
                      {contract.treatmentId}
                    </Link>
                  ) : (
                    contract.treatmentId
                  )
                ) : (
                  <span className="text-gray-400">Không có</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}