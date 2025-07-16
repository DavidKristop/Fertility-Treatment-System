import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AssignDrugResponse, AssignDrugStatus, DrugResponse } from "@/api/types";
import DrugSelectionDialog from "./DrugSelectionDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "@/components/ui/accordion";

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Danh sách thuốc</h4>
        {isSettable && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsDrugDialogOpen(true)
              setSelectedDrug(undefined)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm thuốc mới
          </Button>
        )}
      </div>

      <div className="space-y-2 flex flex-col gap-2">
        {assignDrugs.map((drug) => (
          <div 
            key={drug.id}
            className={`w-full cursor-pointer flex items-center justify-between p-4 border rounded-md bg-white hover:bg-gray-50 transition-colors duration-200`}
            style={{
              backgroundColor: drug.status === 'PENDING' ? '#FFF3E0' :
                        drug.status === 'CANCELLED' ? '#FFE7E7' :
                        drug.status === 'COMPLETED' ? '#E8F5E9' : '#fff',
              color: drug.status === 'PENDING' ? '#F57C00' :
                    drug.status === 'CANCELLED' ? '#D32F2F' :
                    drug.status === 'COMPLETED' ? '#388E3C' : '#000',
            }}
            onClick={() => {
              if(!isSettable){
                setIsDrugDialogOpen(true);
                setSelectedDrug(drug);
              }
            }}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <h5 className="font-medium text-lg mb-1">
                  {drug.patientDrugs.length > 0 && (
                    <span>
                      Từ:
                      {drug.patientDrugs.reduce((earliest, current) => 
                        new Date(current.startDate) < new Date(earliest.startDate) ? current : earliest
                      ).startDate} - 
                      Tới:
                      {drug.patientDrugs.reduce((latest, current) => 
                        new Date(current.endDate) > new Date(latest.endDate) ? current : latest
                      ).endDate}
                    </span>
                  )}
                </h5>
                <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>
      <DrugSelectionDialog 
        open={isDrugDialogOpen}
        onClose={()=>setIsDrugDialogOpen(false)}
        assignDrug={{
          assignDrugId: selectedDrug?.id || "",
          patientDrugs: selectedDrug?.patientDrugs.map((patientDrug)=>({
            patientDrugId: patientDrug.id,
            drugId: patientDrug.drug.id,
            inputId: crypto.randomUUID(),
            name: patientDrug.drug.name,
            usageInstructions: patientDrug.usageInstructions,
            startDate: patientDrug.startDate? new Date(patientDrug.startDate):new Date(),
            endDate: patientDrug.endDate? new Date(patientDrug.endDate):new Date(),
            dosage: patientDrug.dosage,
            amount: patientDrug.amount,
          })) || [],
        }}
      />
    </div>
  );
}
