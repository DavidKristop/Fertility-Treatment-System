import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Pill } from "lucide-react"
import { createDrug } from "@/api/drug"
import type { DrugCreateRequest } from "@/api/types"
import { toast } from "react-toastify"

interface CreateDrugFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export default function CreateDrugForm({ onSuccess, onCancel }: CreateDrugFormProps) {
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
      onSuccess()
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          Thông tin thuốc
        </CardTitle>
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
              step="1"
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
              className="flex-1 md:flex-none"
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
              onClick={onCancel}
              disabled={loading}
            >
              Hủy bỏ
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}