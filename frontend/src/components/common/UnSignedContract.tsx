import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import FormSection from "../doctor/common/FormSection";


export default function UnSignedContract({contractUrl}: {contractUrl: string}) {
    return (
        <FormSection title="Hợp đồng" icon={FileText}>
            <div className="border border-gray-200 rounded-lg bg-white p-6">
                <h3 className="text-lg font-medium mb-4">
                    Hợp đồng chưa được ký: <Link to={contractUrl}><span className="text-red-500">tới hợp đồng</span></Link>
                </h3>
            </div>
      </FormSection>
    )
}