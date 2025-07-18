import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import DrugForm from "@/components/manager/drugs/DrugForm" // ✅ Reuse form

export default function CreateDrug() {
  const navigate = useNavigate()

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý thuốc", path: "/manager/drugs" },
    { label: "Tạo thuốc mới" },
  ]

  const handleSuccess = () => {
    navigate("/manager/drugs")
  }

  const handleCancel = () => {
    navigate("/manager/drugs")
  }

  return (
    <ManagerLayout title="Tạo thuốc mới" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/manager/drugs")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Tạo thuốc mới
            </h2>
            <p className="text-gray-600">
              Thêm thông tin thuốc mới vào hệ thống
            </p>
          </div>
        </div>

        {/* ✅ Reuse DrugForm in create mode */}
        <DrugForm
          mode="create"
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </ManagerLayout>
  )
}