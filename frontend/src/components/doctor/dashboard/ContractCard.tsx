import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

interface ContractCardProps {
  contract: {
    id: number
    contractNumber: string
    patient: string
    treatmentType: string
    treatmentStatus: string
    progress: number
    currentStage: string
    confirmedDate: string
  }
  getTreatmentStatusColor: (status: string) => string
  getTreatmentStatusText: (status: string) => string
}

export default function ContractCard({ contract, getTreatmentStatusColor, getTreatmentStatusText }: ContractCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium">{contract.contractNumber}</span>
        </div>
        <div>
          <p className="font-medium">{contract.patient}</p>
          <p className="text-sm text-muted-foreground">{contract.treatmentType}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-12 bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  contract.treatmentStatus === "completed"
                    ? "bg-blue-600"
                    : contract.treatmentStatus === "stopped"
                      ? "bg-red-600"
                      : "bg-green-600"
                }`}
                style={{ width: `${contract.progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium">{contract.progress}%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{contract.currentStage}</p>
          <Badge className={getTreatmentStatusColor(contract.treatmentStatus)} variant="secondary">
            {getTreatmentStatusText(contract.treatmentStatus)}
          </Badge>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{contract.confirmedDate}</p>
      </div>
    </div>
  )
}
