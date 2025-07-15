import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AssignDrugResponse, AssignDrugStatus, DrugResponse } from "@/api/types";
import DrugSelectionDialog from "./DrugSelectionDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getStatusText(status: AssignDrugStatus) {
  switch (status) {
    case 'PENDING':
      return 'Chưa lấy';
    case 'CANCELLED':
      return 'Đã hủy';
    case 'COMPLETED':
      return 'Đã lấy';
    default:
      return status;
  }
}

interface AssignDrugListProps {
  assignDrugs: AssignDrugResponse[];
  isSettable?: boolean;
}

export default function AssignDrugList({
  assignDrugs,
  isSettable = true,
}: AssignDrugListProps) {
  const [isDrugDialogOpen, setIsDrugDialogOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<AssignDrugResponse | undefined>(undefined);
  const navigate = useNavigate();

  const handleSave = (data: { drugId: string; dosage: string; quantity: number }) => {
    // TODO: Implement save logic
    console.log('Saving drug assignment:', data);
    setIsDrugDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Danh sách thuốc</h4>
        {isSettable && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDrugDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm thuốc mới
          </Button>
        )}
      </div>

      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {assignDrugs.length === 0 && <p className="text-center text-gray-500">Không có thuốc</p>}
        {assignDrugs.map((drug) => (
          <div
            key={drug.id}
            className="border cursor-pointer rounded-md p-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
            style={{
              backgroundColor: drug.status === 'PENDING' ? '#FFF3E0' :
                        drug.status === 'CANCELLED' ? '#FFE7E7' :
                        drug.status === 'COMPLETED' ? '#E8F5E9' : '#fff',
              color: drug.status === 'PENDING' ? '#F57C00' :
                    drug.status === 'CANCELLED' ? '#D32F2F' :
                    drug.status === 'COMPLETED' ? '#388E3C' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
            onClick={() => {
              if (isSettable) {
                setIsDrugDialogOpen(true);
                setSelectedDrug(drug);
              } 
            }}
          >
            <div>
              <h5 className="font-medium text-lg mb-1">{drug.patientDrugs[0]?.drug?.name}</h5>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {drug.patientDrugs[0]?.dosage} mg x {drug.patientDrugs[0]?.amount} lần/ngày
                </span>
                <Badge 
                  variant="outline" 
                  className={`px-2 py-1 text-sm ${
                    drug.status === 'PENDING' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    drug.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border-red-200' :
                    drug.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {getStatusText(drug.status as AssignDrugStatus)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DrugSelectionDialog
        open={isDrugDialogOpen}
        onOpenChange={setIsDrugDialogOpen}
        onSave={handleSave}
        availableDrugs={[]}
        phaseType="Điều trị"
      />
    </div>
  );
}

