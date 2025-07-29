import { toast } from "react-toastify";
import { createService, updateService, deactivateService, reactivateService } from "@/api/service";
import type { ServiceResponse } from "@/api/types";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { serviceSchema } from "@/lib/validations/auth";
import { Input } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";


interface ServiceFormProps {
  service?: ServiceResponse;
  mode: 'create' | 'edit';
  onSuccess: () => void;
  onCancel: () => void;
}



export default function ServiceForm({
  service,
  mode,
  onSuccess,
  onCancel,
}: ServiceFormProps) {
  const isEditMode = mode === 'edit';
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleActive = async (serviceId: string) => {
    setIsLoading(true);
    try {
      if (service?.active) {
        await deactivateService(serviceId);
        toast.success("Dịch vụ đã được vô hiệu hóa thành công!");
      } else {
        await reactivateService(serviceId);
        toast.success("Dịch vụ đã được kích hoạt lại thành công!");
      }
      onSuccess();
    } catch (error) {
      const action = service?.active ? "vô hiệu hóa" : "kích hoạt lại";
      toast.error(error instanceof Error ? error.message : `Lỗi khi ${action} dịch vụ`);
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || "",
    unit: service?.unit || "",
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log("Is submitting")
      if (isEditMode && service?.id) {
        await updateService(service.id, values);
        toast.success("Dịch vụ đã được cập nhật thành công!");
      } else {
        await createService(values);
        toast.success("Dịch vụ đã được tạo thành công!");
      }
      onSuccess();
    } catch (error) {
      const action = isEditMode ? "cập nhật" : "tạo";
      toast.error(error instanceof Error ? error.message : `Lỗi khi ${action} dịch vụ`);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(serviceSchema),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Tên dịch vụ
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="mt-1 text-sm text-red-600">{formik.errors.name}</div>
          )}

          
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Giá
          </label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.price && formik.touched.price && (
            <div className="mt-1 text-sm text-red-600">{formik.errors.price}</div>
          )}
        </div>

        {/* Unit */}
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
            Đơn vị
          </label>
          <Input
            type="text"
            id="unit"
            name="unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.unit && formik.touched.unit && (
            <div className="mt-1 text-sm text-red-600">{formik.errors.unit}</div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Mô tả
        </label>
        <Textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
        />
        {formik.errors.description && formik.touched.description && (
          <div className="mt-1 text-sm text-red-600">{formik.errors.description}</div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="flex-1 md:flex-none"
        >
          {formik.isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isEditMode ? "Đang cập nhật..." : "Đang tạo..."}
            </>
          ) : (
            <>
              {isEditMode ? "Cập nhật" : "Tạo mới"}
            </>
          )}
        </Button>
        {isEditMode && service?.id && (
            <Button
              variant={service?.active ? "destructive" : "default"}
              onClick={() => handleToggleActive(service.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {service?.active ? "Đang vô hiệu hóa..." : "Đang kích hoạt lại..."}
                </>
              ) : (
                <>
                  {service?.active ? "Vô hiệu hóa" : "Kích hoạt lại"}
                </>
              )}
            </Button>
          )}
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={formik.isSubmitting}
        >
          Hủy bỏ
        </Button>
      </div>
    </form>
  );
}
