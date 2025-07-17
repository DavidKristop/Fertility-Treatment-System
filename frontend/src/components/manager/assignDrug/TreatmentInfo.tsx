import type { TreatmentPreviewResponse, TreatmentPhasePreviewResponse } from "@/api/types";

interface TreatmentInfoProps {
  treatment: TreatmentPreviewResponse;
  phase: TreatmentPhasePreviewResponse;
}

export default function TreatmentInfo({ treatment, phase }: TreatmentInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Điều trị</h3>
          <p className="text-sm text-gray-600">{treatment.id}</p>
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
