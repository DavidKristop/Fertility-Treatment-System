"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface VitalSigns {
  bloodPressure: string
  heartRate: string
  temperature: string
  weight: string
  height: string
}

interface VitalSignsFormProps {
  vitalSigns: VitalSigns
  onChange: (vitalSigns: VitalSigns) => void
  className?: string
}

export default function VitalSignsForm({ vitalSigns, onChange, className = "" }: VitalSignsFormProps) {
  const handleChange = (field: keyof VitalSigns, value: string) => {
    onChange({
      ...vitalSigns,
      [field]: value,
    })
  }

  return (
    <div className={className}>
      <Label className="text-base font-semibold">Sinh hiệu</Label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
        <div>
          <Label htmlFor="bloodPressure">Huyết áp</Label>
          <Input
            id="bloodPressure"
            placeholder="120/80"
            value={vitalSigns.bloodPressure}
            onChange={(e) => handleChange("bloodPressure", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="heartRate">Nhịp tim</Label>
          <Input
            id="heartRate"
            placeholder="72 bpm"
            value={vitalSigns.heartRate}
            onChange={(e) => handleChange("heartRate", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="temperature">Nhiệt độ</Label>
          <Input
            id="temperature"
            placeholder="36.5°C"
            value={vitalSigns.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="weight">Cân nặng</Label>
          <Input
            id="weight"
            placeholder="65 kg"
            value={vitalSigns.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="height">Chiều cao</Label>
          <Input
            id="height"
            placeholder="165 cm"
            value={vitalSigns.height}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
