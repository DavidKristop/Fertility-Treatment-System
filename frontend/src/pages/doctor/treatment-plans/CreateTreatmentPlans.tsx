"use client"

import { useNavigate } from "react-router-dom"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import TreatmentPlanForm from "@/components/doctor/treatment/TreatmentPlanForm"

export default function CreateTreatmentPlans() {
  const navigate = useNavigate()

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Tạo kế hoạch mới" },
  ]

  const handleSubmit = async (data: any) => {
    try {
      console.log("Creating treatment plan:", data)
      // Here you would call your API
      // await createTreatmentPlan(data)
      navigate("/doctor/treatment-plans")
    } catch (error) {
      console.error("Error creating treatment plan:", error)
    }
  }

  const handleCancel = () => {
    navigate("/doctor/treatment-plans")
  }

  return (
    <DoctorLayout title="Tạo kế hoạch điều trị mới" breadcrumbs={breadcrumbs}>
      <TreatmentPlanForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </DoctorLayout>
  )
}
