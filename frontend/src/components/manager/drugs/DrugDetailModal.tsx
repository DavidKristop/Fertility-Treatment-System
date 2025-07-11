import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Edit, Ban, CheckCircle, Pill, DollarSign, Package, FileText, Calendar } from "lucide-react"
import type { DrugResponse } from "@/api/types"

interface DrugDetailModalProps {
  drug: DrugResponse | null
  isOpen: boolean
  onClose: () => void
  loading?: boolean
  onEdit: (drugId: string) => void
  onDeactivate: (drugId: string) => void
  onReactivate: (drugId: string) => void
  actionLoading?: string | null
}

export default function DrugDetailModal({
  drug,
  isOpen,
  onClose,
  loading = false,
  onEdit,
  onDeactivate,
  onReactivate,
  actionLoading
}: DrugDetailModalProps) {
  if (!isOpen) return null

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !loading) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Chi tiết thuốc
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p>Đang tải thông tin thuốc...</p>
                </div>
              </div>
            ) : !drug ? (
              <div className="text-center py-12">
                <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy thuốc
                </h3>
                <p className="text-gray-500">
                  Thông tin thuốc không tồn tại hoặc đã bị xóa
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header with status */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {drug.name}
                    </h2>
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
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Thao tác</h3>
                  <div className="flex gap-3">
                    {drug.active ? (
                      <>
                        <Button
                          onClick={() => onEdit(drug.id)}
                          disabled={!!actionLoading}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa thuốc
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={actionLoading === drug.id}
                          onClick={() => onDeactivate(drug.id)}
                        >
                          {actionLoading === drug.id ? (
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
                        disabled={actionLoading === drug.id}
                        onClick={() => onReactivate(drug.id)}
                      >
                        {actionLoading === drug.id ? (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}