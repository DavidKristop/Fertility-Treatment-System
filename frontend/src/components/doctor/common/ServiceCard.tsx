import { Stethoscope } from "lucide-react"
import FormSection from "./FormSection"

interface Service {
  name: string
  description: string
  price: number
  unit: string
  notes?: string
}

interface ServiceCardProps {
  services: Service[]
  title?: string
  className?: string
}

export default function ServiceCard({ services, title = "Dịch vụ", className = "" }: ServiceCardProps) {
  return (
    <FormSection title={title} icon={Stethoscope} className={className}>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{service.name}</p>
              <p className="text-sm text-gray-600">{service.description}</p>
              {service.notes && <p className="text-xs text-gray-500 mt-1">Ghi chú: {service.notes}</p>}
            </div>
            <div className="text-right">
              <p className="font-medium">{service.price.toLocaleString("vi-VN")} VNĐ</p>
              <p className="text-sm text-gray-600">/{service.unit}</p>
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  )
}
