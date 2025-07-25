import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import DrugForm from "@/components/manager/drugs/DrugForm" 
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import { useEffect } from "react"

export default function CreateDrug() {
  const navigate = useNavigate()
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const handleSuccess = () => {
    navigate("/manager/drugs")
  }

  const handleCancel = () => {
    navigate("/manager/drugs")
  }

  useEffect(()=>{
    setTitle("Tạo thuốc mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý thuốc", path: "/manager/drugs" },
      { label: "Tạo thuốc mới" },
    ])
  },[])

  return (
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

      <DrugForm
        mode="create"
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  )
}