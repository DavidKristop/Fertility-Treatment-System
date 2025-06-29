import { Pill } from "lucide-react"
import FormSection from "./FormSection"

interface Drug {
  name: string
  description: string
  dosage: string
  instructions: string
  amount: number
  unit: string
  price: number
}

interface DrugCardProps {
  drugs: Drug[]
  title?: string
  className?: string
}

export default function DrugCard({ drugs, title = "Thuốc", className = "" }: DrugCardProps) {
  return (
    <FormSection title={title} icon={Pill} className={className}>
      <div className="space-y-4">
        {drugs.map((drug, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{drug.name}</p>
              <p className="text-sm text-gray-600">{drug.description}</p>
              <p className="text-sm text-blue-600 mt-1">
                <span className="font-medium">Liều dùng:</span> {drug.dosage}
              </p>
              <p className="text-sm text-green-600">
                <span className="font-medium">Hướng dẫn:</span> {drug.instructions}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {drug.amount} {drug.unit}
              </p>
              <p className="text-sm text-gray-600">
                {drug.price.toLocaleString("vi-VN")} VNĐ/{drug.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  )
}
