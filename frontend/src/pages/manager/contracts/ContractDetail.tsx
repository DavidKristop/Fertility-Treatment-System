import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import ContractDetailForm from "@/components/contracts/ContractDetailForm"

export default function ManagerContractDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý hợp đồng", path: "/manager/contracts" },
    { label: "Chi tiết hợp đồng" },
  ]

  return (
    <ManagerLayout title="Chi tiết hợp đồng" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/manager/contracts")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Chi tiết hợp đồng
            </h2>
            <p className="text-gray-600">
              Thông tin chi tiết về hợp đồng điều trị
            </p>
          </div>
        </div>

        {/* Contract Detail Form */}
        <ContractDetailForm
          contractId={id || null}
          showPatientInfo={true}
          userRole="manager"
        />
      </div>
    </ManagerLayout>
  )
}
