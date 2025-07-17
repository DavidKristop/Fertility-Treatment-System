import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { AssignDrugResponse, AssignDrugStatus } from "@/api/types";
import { useNavigate } from "react-router-dom";

function getStatusText(status: AssignDrugStatus) {
  switch (status) {
    case 'PENDING':
      return 'Chờ xử lý';
    case 'COMPLETED':
      return 'Đã hoàn thành';
    case 'CANCELLED':
      return 'Đã hủy';
    default:
      return status;
  }
}

interface PatientDrugListProps {
  assignDrugs: AssignDrugResponse[];
  phaseId: string;
  isSettable?: boolean;
}

export default function PatientDrugList({
  assignDrugs,
  isSettable = true,
}: PatientDrugListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">Danh sách thuốc</h4>
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {assignDrugs.length === 0 && (
          <p className="text-center text-gray-500">Không có đơn thuốc</p>
        )}
        {assignDrugs.map((assignDrug) => (
          <div
            key={assignDrug.id}
            className="border rounded-md p-3 flex flex-col bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-medium text-lg mb-1">
                  {assignDrug.patientDrugs.length > 0 && (
                    <>
                      {(() => {
                        const dates = assignDrug.patientDrugs.map(drug => ({
                          start: new Date(drug.startDate),
                          end: new Date(drug.endDate)
                        }));
                        const earliestStart = new Date(Math.min(...dates.map(d => d.start.getTime())));
                        const latestEnd = new Date(Math.max(...dates.map(d => d.end.getTime())));
                        return (
                          <>
                            Từ {earliestStart.toLocaleDateString('vi-VN')} đến {latestEnd.toLocaleDateString('vi-VN')}
                          </>
                        );
                      })()}
                    </>
                  )}
                </h5>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${
                      assignDrug.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      assignDrug.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    {getStatusText(assignDrug.status as AssignDrugStatus)}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isSettable && (
                  <Button variant="outline" size="sm" onClick={() => navigate(`/doctor/assign-drug/${assignDrug.id}`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Chi tiết
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-2">
              {assignDrug.patientDrugs.map((drug) => (
                <div key={drug.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{drug.drug.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {drug.dosage}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {drug.usageInstructions}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}