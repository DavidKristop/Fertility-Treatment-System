"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText, Download, PenTool } from "lucide-react"
import { getPatientContractById, getManagerContractById } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"

interface ContractDetailFormProps {
  contract?: ContractResponse | null
  contractId?: string | null
  showPatientInfo?: boolean
  userRole?: "patient" | "manager"
  onRefresh?: () => void
}

export default function ContractDetailForm({
  contract: initialContract,
  contractId,
  showPatientInfo = false,
  userRole = "patient",
  onRefresh,
}: ContractDetailFormProps) {
  const navigate = useNavigate()
  const [contract, setContract] = useState<ContractResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (initialContract) {
      setContract(initialContract)
      setLoading(false)
      setError(null)
    } else if (contractId) {
      fetchContractDetail()
    } else {
      setContract(null)
      setLoading(false)
      setError("Không có thông tin hợp đồng")
    }
  }, [contractId, initialContract])

  const fetchContractDetail = async () => {
    if (!contractId) {
      setError("Không có ID hợp đồng")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response =
        userRole === "manager" ? await getManagerContractById(contractId) : await getPatientContractById(contractId)

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

  const handleRefresh = () => {
    if (contractId) {
      fetchContractDetail()
    }
    if (onRefresh) {
      onRefresh()
    }
  }

  const handleDownloadContract = () => {
    if (contract?.contractUrl) {
      window.open(contract.contractUrl, "_blank")
    } else {
      toast.error("Không tìm thấy file hợp đồng")
    }
  }

  const handleSignContract = () => {
    if (contract) {
      const signPath =
        userRole === "patient" ? `/patient/contracts/${contract.id}/sign` : `/manager/contracts/${contract.id}/sign`
      navigate(signPath)
    }
  }

  const isExpired = contract ? new Date(contract.signDeadline) < new Date() : false
  const canSign = contract && !contract.signed && !isExpired && userRole === "patient"

  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p>Đang tải chi tiết hợp đồng...</p>
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
            <p>{error}</p>
          </div>
          {contractId && (
            <Button onClick={fetchContractDetail} variant="outline">
              Thử lại
            </Button>
          )}
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

  return (
    <div className="space-y-6">
      {/* Contract Info */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Thông tin hợp đồng
            </CardTitle>
            <div className="flex gap-2">
              {canSign && (
                <Button onClick={handleSignContract} size="sm">
                  <PenTool className="h-4 w-4 mr-2" />
                  Ký hợp đồng
                </Button>
              )}
              {contract.signed && contract.contractUrl && (
                <Button variant="outline" size="sm" onClick={handleDownloadContract}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">Contract ID</label>
              <p className="font-medium text-gray-900 break-all">{contract.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Treatment ID</label>
              <p className="font-medium text-gray-900 break-all">
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
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Sign Deadline</label>
              <p className="font-medium text-gray-900">{new Date(contract.signDeadline).toLocaleString("vi-VN")}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Status</label>
              <div className="mt-1 flex gap-2">
                <Badge className={contract.signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {contract.signed ? "Đã ký" : "Chờ ký"}
                </Badge>
                {isExpired && !contract.signed && <Badge className="bg-red-100 text-red-800">Hết hạn</Badge>}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Contract File</label>
              <div className="mt-1">
                {contract.contractUrl ? (
                  <Button variant="link" className="p-0 h-auto text-blue-600" onClick={handleDownloadContract}>
                    Tải xuống
                  </Button>
                ) : (
                  <span className="text-gray-500">Chưa có</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
