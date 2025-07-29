"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText } from "lucide-react"
import { getPatientContractById, getManagerContractById, signContract } from "@/api/contract"
import type { ContractResponse } from "@/api/types"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import {DocusealForm} from "@docuseal/react"

interface ContractDetailFormProps {
  contract?: ContractResponse | null
  contractId?: string | null
  userRole?: "patient" | "manager"
}

export default function ContractDetailForm({
  contract: initialContract,
  contractId,
  userRole = "patient",
}: ContractDetailFormProps) {
  const [contract, setContract] = useState<ContractResponse | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignContract = async (contractId:string,signedUrl:string) => {
    try {
      const response = await signContract(contractId,signedUrl)
      if (response.success) {
        setContract({...contract!,signed:true})
        toast.success("Ký hợp đồng thành công")
      } else {
        toast.error("Ký hợp đồng thất bại")
      }
    } catch (err) {
      console.error("Error signing contract:", err)
      toast.error("Ký hợp đồng thất bại")
    }
  }

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

  const isExpired = contract ? new Date(contract.signDeadline) < new Date() : false
  
  useEffect(() => {
    if (initialContract) {
      setContract(initialContract)
      setLoading(false)
      setError(null)
    } else if (contractId) {
      fetchContractDetail()
    } else {
      setContract(undefined)
      setLoading(false)
      setError("Không có thông tin hợp đồng")
    }
  }, [contractId, initialContract])

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
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600">ID hợp đồng</label>
              <p className="font-medium text-gray-900 break-all">{contract.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">ID điều trị</label>
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
              <label className="text-sm font-medium text-gray-600">Hạn ký</label>
              <p className="font-medium text-gray-900">{new Date(contract.signDeadline).toLocaleString("vi-VN")}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Trạng thái</label>
              <div className="mt-1 flex gap-2">
                <Badge className={contract.signed ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                  {contract.signed ? "Đã ký" : "Chờ ký"}
                </Badge>
                {isExpired && !contract.signed && <Badge className="bg-red-100 text-red-800">Hết hạn</Badge>}
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Nội dung hợp đồng</label>
            <div className="max-h-[500px] overflow-y-auto" >
              {contract.signed?
              <Link to={contract.contractUrl} className="text-blue-600 underline" target="_blank">Xem hợp đồng</Link>:<>
                {contract.contractUrl && <DocusealForm 
                  readonlyFields={(userRole === "patient" || isExpired) ? [] : ["Chữ ký bệnh nhân"]}
                  src={contract.contractUrl} 
                  onComplete={(data)=>{
                    console.log(data)
                    handleSignContract(contract.id,data.submission_url)
                  }}/>
                }
              </>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
