import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Ban, CheckCircle, Pill, DollarSign, Package, FileText } from "lucide-react"
import type { DrugResponse } from "@/api/types"

interface DrugDetailFormProps {
  drug: DrugResponse
  onEdit: () => void
  onDeactivate: () => void
  onReactivate: () => void
  actionLoading: boolean
}

export default function DrugDetailForm({
  drug,
  onEdit,
  onDeactivate,
  onReactivate,
  actionLoading
}: DrugDetailFormProps) {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Thông tin thuốc
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Header with status */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {drug.name}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                ID: {drug.id}
              </p>
            </div>
            {getStatusBadge(drug.active)}
          </div>

          {/* Drug Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Giá thuốc</label>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(drug.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-600">Đơn vị</label>
                  <p className="text-lg font-medium text-gray-900">
                    {drug.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* Status and Meta */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Trạng thái</label>
                <div className="mt-1">
                  {getStatusBadge(drug.active)}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4" />
              Mô tả thuốc
            </label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                {drug.description}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-600 mb-3">Thao tác</h4>
            <div className="flex gap-3">
              {drug.active ? (
                <>
                  <Button
                    onClick={onEdit}
                    disabled={actionLoading}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa thuốc
                  </Button>
                  <Button
                    variant="destructive"
                    disabled={actionLoading}
                    onClick={onDeactivate}
                  >
                    {actionLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Ban className="h-4 w-4 mr-2" />
                        Vô hiệu hóa thuốc
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  disabled={actionLoading}
                  onClick={onReactivate}
                >
                  {actionLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Kích hoạt lại thuốc
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}