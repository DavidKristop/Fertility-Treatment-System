"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import TreatmentPlanForm from "@/components/doctor/treatment/TreatmentPlanForm"

// Available treatment protocols - Only correct protocols
const availableProtocols = [
  {
    id: "550e8400-e29b-41d4-a716-446655440021",
    title: "IVF Long Protocol",
    description: "Phác đồ IVF dài với ức chế GnRH trước khi kích thích",
    type: "IVF",
    subtype: "long",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440023",
    title: "IVF Short Protocol",
    description: "Phác đồ IVF ngắn với kích thích trực tiếp",
    type: "IVF",
    subtype: "short",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440022",
    title: "IUI Natural Protocol",
    description: "Phác đồ IUI tự nhiên theo dõi chu kỳ kinh nguyệt",
    type: "IUI",
    subtype: "natural",
    isActive: true,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440024",
    title: "IUI Stimulated Protocol",
    description: "Phác đồ IUI có kích thích buồng trứng nhẹ",
    type: "IUI",
    subtype: "stimulated",
    isActive: true,
  },
]

export default function CreateTreatmentPlans() {
  const navigate = useNavigate()

  const handleCreatePlan = (data: any) => {
    console.log("Creating treatment plan:", data)
    // Here you would typically send the data to your API
    // After successful creation, navigate back to treatment plans list
    navigate("/doctor/treatment-plans")
  }

  const handleCancel = () => {
    navigate("/doctor/treatment-plans")
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Tạo kế hoạch mới" },
  ]

  return (
    <DoctorLayout title="Tạo kế hoạch điều trị mới" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link to="/doctor/treatment-plans">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Button>
          </Link>
        </div>

        {/* Reuse TreatmentPlanForm */}
        <TreatmentPlanForm
          onSubmit={handleCreatePlan}
          onCancel={handleCancel}
          availableProtocols={availableProtocols}
        />
      </div>
    </DoctorLayout>
  )
}
