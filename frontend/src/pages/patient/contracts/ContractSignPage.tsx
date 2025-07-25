"use client"

import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ContractSignForm from "@/components/contracts/ContractSignForm"
import { useEffect } from "react"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

export default function ContractSignPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const handleSignSuccess = () => {
    navigate(`/patient/contracts/${id}`)
  }

  const handleCancel = () => {
    navigate(`/patient/contracts/${id}`)
  }

  useEffect(()=>{
    setTitle("Ký hợp đồng")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Hợp đồng điều trị", path: "/patient/contracts" },
      { label: "Ký hợp đồng" },
    ])
  },[])

  if (!id) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Không tìm thấy ID hợp đồng</p>
        <Button onClick={() => navigate("/patient/contracts")} className="mt-4" variant="outline">
          Quay lại danh sách hợp đồng
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate(`/patient/contracts/${id}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ký hợp đồng điều trị</h2>
          <p className="text-gray-600">Vui lòng đọc kỹ và xác nhận thông tin trước khi ký</p>
        </div>
      </div>

      {/* Contract Sign Form */}
      <ContractSignForm contractId={id} onSignSuccess={handleSignSuccess} onCancel={handleCancel} />
    </div>
  )
}
