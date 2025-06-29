import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import FormSection from "./FormSection"
import { Heart } from "lucide-react"

interface MedicalHistoryData {
  allergies: string[]
  chronicConditions: string[]
  previousSurgeries: Array<{ procedure: string; date: string }>
  medications: Array<{ name: string; dosage: string; frequency: string }>
  familyHistory: string
  notes: string
}

interface MedicalHistoryCardProps {
  data: MedicalHistoryData
  className?: string
}

export default function MedicalHistoryCard({ data, className = "" }: MedicalHistoryCardProps) {
  return (
    <FormSection title="Tiền sử bệnh án" icon={Heart} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="font-semibold text-red-600">Dị ứng</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {data.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-semibold">Bệnh mãn tính</Label>
            <div className="mt-1 flex flex-wrap gap-2">
              {data.chronicConditions.map((condition, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-semibold">Phẫu thuật trước đây</Label>
            <div className="mt-1 space-y-1">
              {data.previousSurgeries.map((surgery, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{surgery.procedure}</span> - {surgery.date}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="font-semibold">Thuốc đang sử dụng</Label>
            <div className="mt-1 space-y-1">
              {data.medications.map((med, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-semibold">Tiền sử gia đình</Label>
            <p className="mt-1 text-sm">{data.familyHistory}</p>
          </div>

          <div>
            <Label className="font-semibold">Ghi chú</Label>
            <p className="mt-1 text-sm">{data.notes}</p>
          </div>
        </div>
      </div>
    </FormSection>
  )
}
