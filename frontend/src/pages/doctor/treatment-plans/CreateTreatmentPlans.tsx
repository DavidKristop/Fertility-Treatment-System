"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { CreateTreatmentForm } from "@/components/doctor/treatment/TreatmentPlanForm"

export default function CreateTreatmentPlans() {

  const breadcrumbs = [
    { label: "Dashboard", path: "/doctor/dashboard" },
    { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
    { label: "Tạo kế hoạch mới" },
  ]

  return (
    <DoctorLayout title="Kế hoạch điều trị mới" breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl mx-auto p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tạo kế hoạch điều trị mới</h1>
        </div>

        <CreateTreatmentForm/>
      </div>
    </DoctorLayout>
  )
}
