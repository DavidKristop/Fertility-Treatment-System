import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pill } from "lucide-react"
import ManagerLayout from "@/components/manager/ManagerLayout"
import DrugDetailForm from "@/components/manager/drugs/DrugDetailForm"
import { getDrugDetail } from "@/api/drug"
import type { DrugResponse } from "@/api/types"
import { toast } from "react-toastify"

export default function DrugDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [drug, setDrug] = useState<DrugResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/manager/dashboard" },
    { label: "Quản lý thuốc", path: "/manager/drugs" },
    { label: "Chi tiết thuốc" },
  ]

  const fetchDrugDetail = async () => {
    if (!id) {
      toast.error("ID thuốc không hợp lệ")
      navigate("/manager/drugs")
      return
    }

    setLoading(true)
    try {
      const response = await getDrugDetail(id)
      if (response.payload) {
        setDrug(response.payload)
      } else {
        toast.error("Không tìm thấy thông tin thuốc")
        navigate("/manager/drugs")
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lỗi khi tải chi tiết thuốc")
      navigate("/manager/drugs")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    if (drug) {
      navigate(`/manager/drugs/edit/${drug.id}`)
    }
  }

  const handleDeactivate = async () => {
    if (!drug) return
    setActionLoading(true)
    try {
      // TODO: Implement deactivate API call
      toast.info(`Vô hiệu hóa thuốc ${drug.name} - Chức năng sẽ được phát triển`)
      // After successful deactivation, refresh data
      // await fetchDrugDetail()
    } catch (error) {
      toast.error("Lỗi khi vô hiệu hóa thuốc")
    } finally {
      setActionLoading(false)
    }
  }

  const handleReactivate = async () => {
    if (!drug) return
    setActionLoading(true)
    try {
      // TODO: Implement reactivate API call
      toast.info(`Kích hoạt lại thuốc ${drug.name} - Chức năng sẽ được phát triển`)
      // After successful reactivation, refresh data
      // await fetchDrugDetail()
    } catch (error) {
      toast.error("Lỗi khi kích hoạt lại thuốc")
    } finally {
      setActionLoading(false)
    }
  }

  useEffect(() => {
    fetchDrugDetail()
  }, [id])

  if (loading) {
    return (
      <ManagerLayout title="Chi tiết thuốc" breadcrumbs={breadcrumbs}>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Đang tải thông tin thuốc...</p>
          </div>
        </div>
      </ManagerLayout>
    )
  }

  if (!drug) {
    return (
      <ManagerLayout title="Chi tiết thuốc" breadcrumbs={breadcrumbs}>
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không tìm thấy thuốc
          </h3>
          <p className="text-gray-500 mb-4">
            Thông tin thuốc không tồn tại hoặc đã bị xóa
          </p>
          <Button onClick={() => navigate("/manager/drugs")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách
          </Button>
        </div>
      </ManagerLayout>
    )
  }

  return (
    <ManagerLayout title="Chi tiết thuốc" breadcrumbs={breadcrumbs}>
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
              Chi tiết thuốc
            </h2>
            <p className="text-gray-600">
              Thông tin chi tiết về thuốc {drug.name}
            </p>
          </div>
        </div>

        {/* Drug Detail Form */}
        <DrugDetailForm
          drug={drug}
          onEdit={handleEdit}
          onDeactivate={handleDeactivate}
          onReactivate={handleReactivate}
          actionLoading={actionLoading}
        />
      </div>
    </ManagerLayout>
  )
}