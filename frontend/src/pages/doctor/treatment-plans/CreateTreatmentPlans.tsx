"use client"

import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import TreatmentPlanForm from "@/components/doctor/treatment/TreatmentPlanForm"

const mockProtocols = [
  {
    id: "1",
    title: "IVF Long Protocol",
    description: "Phác đồ IVF dài với ức chế GnRH trước khi kích thích buồng trứng",
    isActive: true,
  },
  {
    id: "2",
    title: "IVF Short Protocol",
    description: "Phác đồ IVF ngắn với kích thích buồng trứng trực tiếp",
    isActive: true,
  },
  {
    id: "3",
    title: "IUI Natural Protocol",
    description: "Phác đồ IUI tự nhiên theo dõi chu kỳ kinh nguyệt",
    isActive: true,
  },
  {
    id: "4",
    title: "IUI Stimulated Protocol",
    description: "Phác đồ IUI có kích thích buồng trứng nhẹ",
    isActive: true,
  },
]

export default function CreateTreatmentPlans() {
  const navigate = useNavigate()

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Tạo kế hoạch mới" },
  ]

  const handleSubmit = async (data: any) => {
    try {
      // Simulate API call
      console.log("Creating treatment plan:", data)

      // Show success message
      alert("Tạo kế hoạch điều trị thành công!")

      // Navigate back to treatment plans list
      navigate("/doctor/treatment-plans")
    } catch (error) {
      console.error("Error creating treatment plan:", error)
      alert("Có lỗi xảy ra khi tạo kế hoạch điều trị")
    }
  }

  const handleCancel = () => {
    navigate("/doctor/treatment-plans")
  }

  return (
    <DoctorLayout title="Kế hoạch điều trị mới" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo kế hoạch điều trị mới</h1>
        </div>

        <TreatmentPlanForm onSubmit={handleSubmit} onCancel={handleCancel} availableProtocols={mockProtocols} />
      </div>
    </DoctorLayout>
  )
}
