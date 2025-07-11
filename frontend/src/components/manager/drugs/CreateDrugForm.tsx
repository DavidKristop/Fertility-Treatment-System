import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { X, Save, Pill } from "lucide-react"
import { createDrug } from "@/api/drug"
import type { DrugCreateRequest } from "@/api/types"
import { toast } from "react-toastify"

interface CreateDrugFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function CreateDrugForm({ isOpen, onClose, onSuccess }: CreateDrugFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<DrugCreateRequest>({
    name: "",
    description: "",
    price: 0,
    unit: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      toast.error("Tên thuốc không được để trống")
      return
    }
    if (!formData.description.trim()) {
      toast.error("Mô tả không được để trống")
      return
    }
    if (formData.price <= 0) {
      toast.error("Giá thuốc phải lớn hơn 0")
      return
    }
    if (!formData.unit.trim()) {
      toast.error("Đơn vị không được để trống")
      return
    }

    setLoading(true)
    try {
      await createDrug(formData)
      toast.success("Thuốc đã được tạo thành công!")
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: 0,
        unit: ""
      })
      
      onSuccess()
      onClose()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Lỗi khi tạo thuốc")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof DrugCreateRequest, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleClose = () => {
    if (loading) return
    
    // Reset form when closing
    setFormData({
      name: "",
      description: "",
      price: 0,
      unit: ""
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Thêm thuốc mới
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={loading}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Tên thuốc <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập tên thuốc..."
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>

                {/* Unit */}
                <div className="space-y-2">
                  <Label htmlFor="unit">
                    Đơn vị <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="unit"
                    type="text"
                    placeholder="Ví dụ: viên, chai, hộp..."
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Giá <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="1000"
                  placeholder="Nhập giá thuốc..."
                  value={formData.price || ""}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  disabled={loading}
                  required
                />
                <p className="text-sm text-gray-500">
                  Giá thuốc tính bằng VND
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Mô tả <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Nhập mô tả về thuốc..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  disabled={loading}
                  rows={4}
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Tạo thuốc
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={loading}
                >
                  Hủy bỏ
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}