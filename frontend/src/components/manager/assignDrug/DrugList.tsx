import type { PatientDrugResponse } from "@/api/types";

interface DrugListProps {
  drugs: PatientDrugResponse[];
}

export default function DrugList({ drugs }: DrugListProps) {
  return (
    <div className="space-y-4">
      {drugs.map((drug) => (
        <div key={drug.id} className="border rounded-lg p-4" id={drug.id}>
          <div className="font-medium">{drug.drug.name}</div>
          <div className="text-sm text-gray-600">
            <div><strong>Liều lượng:</strong> {drug.dosage}</div>
            <div><strong>Cách dùng:</strong> {drug.usageInstructions}</div>
            <div><strong>Số lượng:</strong> {drug.amount}</div>
            <div><strong>Thời gian sử dụng:</strong> Từ {drug.startDate} đến {drug.endDate}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
