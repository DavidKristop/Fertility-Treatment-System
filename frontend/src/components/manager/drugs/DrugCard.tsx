import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Ban, CheckCircle, DollarSign, Package } from "lucide-react"
import type { DrugResponse } from "@/api/types"

interface DrugCardProps {
  drug: DrugResponse
  onView: (drugId: string) => void
  onEdit: (drugId: string) => void
  onDeactivate: (drugId: string) => void
  onReactivate: (drugId: string) => void
  actionLoading: string | null
}

export default function DrugCard({ 
  drug, 
  onView, 
  onEdit, 
  onDeactivate, 
  onReactivate, 
  actionLoading 
}: DrugCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge variant="default" className="bg-green-100 text-green-800">Hoạt động</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">Vô hiệu hóa</Badge>
    )
  }

  const isLoading = actionLoading === drug.id

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">
              {drug.name}
            </h3>
            {getStatusBadge(drug.active)}
          </div>

          <p className="text-gray-600 mb-3 line-clamp-2">{drug.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Giá:</span>
              <span className="font-medium text-green-600">
                {formatCurrency(drug.price)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Đơn vị:</span>
              <span className="font-medium">{drug.unit}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(drug.id)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Xem
          </Button>
          
          {drug.active ? (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(drug.id)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Sửa
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDeactivate(drug.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Ban className="h-4 w-4 mr-2" />
                    Vô hiệu hóa
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="default"
              onClick={() => onReactivate(drug.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kích hoạt lại
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}