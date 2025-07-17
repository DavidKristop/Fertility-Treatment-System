import type { TreatmentPreviewResponse, TreatmentPhasePreviewResponse } from "@/api/types";
import { Link } from "react-router-dom";

interface TreatmentInfoProps {
  treatment: TreatmentPreviewResponse;
  phase: TreatmentPhasePreviewResponse;
  treatmentUrl: string;
}

export default function TreatmentInfo({ treatment, phase, treatmentUrl }: TreatmentInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Điều trị</h3>
          <p className="text-sm text-gray-600">{treatment.id}</p>
          <Link className="text-blue-500" to={treatmentUrl}>Xem chi tiết</Link>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Giai đoạn</h3>
          <p className="text-sm text-gray-600">{phase.title}</p>
        </div>
      </div>
    </div>
  );
}
