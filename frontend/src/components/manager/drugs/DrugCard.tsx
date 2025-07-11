import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Package, Edit, Ban, CheckCircle, Eye } from "lucide-react"
import type { DrugResponse } from "@/api/types"

interface DrugCardProps {
  drug: DrugResponse
  onView: (drugId: string) => void
  onEdit: (drugId: string) => void
  onDeactivate: (drugId: string) => void
  onReactivate: (drugId: string) => void
  actionLoading?: string | null
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

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-semibold text-lg text-gray-900">
              {drug.name}
            </h3>
            {getStatusBadge(drug.active)}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2">
            {drug.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Giá:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(drug.price)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Đơn vị:</span>
              <span className="font-medium">
                {drug.unit}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-4 flex flex-col gap-2">
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
                disabled={actionLoading === drug.id}
                onClick={() => onDeactivate(drug.id)}
              >
                {actionLoading === drug.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Ban className="h-4 w-4 mr-2" />
                )}
                Vô hiệu hóa
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="default"
              disabled={actionLoading === drug.id}
              onClick={() => onReactivate(drug.id)}
            >
              {actionLoading === drug.id ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <CheckCircle className="h-4 w-4 mr-2" />
              )}
              Kích hoạt lại
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}