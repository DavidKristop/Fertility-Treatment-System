import type { AssignDrugDetailResponse, AssignDrugStatus } from "@/api/types";

interface AssignDrugStatusListProps {
  assignDrugs: AssignDrugDetailResponse[];
  onClick: (assignDrug: AssignDrugDetailResponse) => void;
}

export default function AssignDrugStatusList({ assignDrugs, onClick }: AssignDrugStatusListProps) {
  const getStatusText = (status: AssignDrugStatus) => {
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
  };

  const getStatusColor = (status: AssignDrugStatus) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600';
      case 'CANCELLED':
        return 'text-red-600';
      case 'COMPLETED':
        return 'text-green-600';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {assignDrugs.map((assign) => (
        <div key={assign.id} className="p-4 cursor-pointer bg-white rounded-lg shadow" onClick={()=>onClick(assign)}>
          <div className="text-lg">
            <span className="font-medium">Đơn thuốc: </span>
            {assign.title}
          </div>
          <div className="text-sm">
            {assign.patientDrugs.length > 0 && (
              <span>
                Từ:
                  {assign.patientDrugs.reduce((earliest, current) => 
                  new Date(current.startDate) < new Date(earliest.startDate) ? current : earliest
                ).startDate} - 
                Tới:
                  {assign.patientDrugs.reduce((latest , current) => 
                  new Date(current.endDate) > new Date(latest.endDate) ? current : latest
                ).endDate}
              </span>
            )}
          </div>
          <div className="text-sm">
            <span className="font-medium">Tên bệnh nhân: {assign.patient.fullName} (email: {assign.patient.email} ) </span>
            
          </div>
          <div className="text-sm">
            <span className="font-medium">Trạng thái: </span>
            <span className={getStatusColor(assign.status)}>
              {getStatusText(assign.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
