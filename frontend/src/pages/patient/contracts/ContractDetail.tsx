import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ContractDetailForm from "@/components/contracts/ContractDetailForm"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import { useEffect, useState } from "react"
import {DocusealForm} from "@docuseal/react";
import { getTemplateContract } from "@/api/contract"

export default function PatientContractDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const {setTitle, setBreadCrumbs} = useAuthHeader()
  const [slug, setSlug] = useState('');

  useEffect(()=>{
    setTitle("Chi tiết hợp đồng")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/patient/dashboard" },
      { label: "Hợp đồng điều trị", path: "/patient/contracts" },
      { label: "Chi tiết hợp đồng" },
    ])
  },[])

  useEffect(()=>{
    const fetchContract = async () => {
      try {
        const response = await getTemplateContract(id!);
        setSlug(response?.payload || '');
      } catch (err) {
        console.error("Lỗi khi tải thông tin hợp đồng", err);
      }
    };
    fetchContract();
  }, [id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/patient/contracts")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Chi tiết hợp đồng
          </h2>
          <p className="text-gray-600">
            Thông tin chi tiết về hợp đồng điều trị
          </p>
        </div>
      </div>

      {/* Contract Detail Form */}
      <ContractDetailForm
        contractId={id || null}
        showPatientInfo={false}
        userRole="patient"
      />

      {slug && <DocusealForm src={`https://docuseal.com/s/${slug}`} onComplete={(data)=>console.log(data)}/>}
    </div>
  )
}
