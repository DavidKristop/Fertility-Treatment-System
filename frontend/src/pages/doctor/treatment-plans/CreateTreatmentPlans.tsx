"use client"

import { CreateTreatmentForm } from "@/components/doctor/treatment/TreatmentPlanForm"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import { useEffect } from "react"

export default function CreateTreatmentPlans() {
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  useEffect(() => {
    setTitle("Tạo kế hoạch điều trị mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/doctor/dashboard" },
      { label: "Kế hoạch điều trị", path: "/doctor/treatment-plans" },
      { label: "Tạo kế hoạch mới" },
    ])
  },[])

  return (
    <div className="mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tạo kế hoạch điều trị mới</h1>
      </div>

      <CreateTreatmentForm/>
    </div>
  )
}
