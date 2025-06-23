"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Stethoscope, Eye } from "lucide-react"
import { useState } from "react"
import TreatmentPlanForm from "@/components/doctor/treatment/TreatmentPlanForm"

// Mock data for treatment plans
const treatmentPlans = [
  {
    id: 1,
    patient: "Nguyễn Thị Lan",
    type: "IVF",
    status: "active",
    stage: "Giai đoạn 2: Kích thích buồng trứng",
    startDate: "2024-01-10",
    expectedDuration: "8-12 tuần",
    progress: 25,
  },
  {
    id: 2,
    patient: "Trần Văn Nam",
    type: "IUI",
    status: "active",
    stage: "Giai đoạn 1: Chuẩn bị",
    startDate: "2024-01-15",
    expectedDuration: "4-6 tuần",
    progress: 50,
  },
]

export default function TreatmentPlans() {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreatePlan = (data: any) => {
    console.log("Creating treatment plan:", data)
    setShowCreateForm(false)
  }

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Kế hoạch điều trị" }]

  return (
    <DoctorLayout title="Kế hoạch điều trị" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-10 w-80" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="IVF">IVF</SelectItem>
                <SelectItem value="IUI">IUI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tạo kế hoạch mới
          </Button>
        </div>

        {/* Create Treatment Plan Form */}
        {showCreateForm && <TreatmentPlanForm onSubmit={handleCreatePlan} onCancel={() => setShowCreateForm(false)} />}

        {/* Treatment Plans List */}
        <div className="grid grid-cols-1 gap-4">
          {treatmentPlans.map((plan) => (
            <Card key={plan.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{plan.patient}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{plan.type}</Badge>
                        <Badge className="bg-green-100 text-green-800">{plan.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{plan.progress}%</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Giai đoạn hiện tại:</span>
                    <p className="font-medium">{plan.stage}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Ngày bắt đầu:</span>
                    <p className="font-medium">{plan.startDate}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Thời gian dự kiến:</span>
                    <p className="font-medium">{plan.expectedDuration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DoctorLayout>
  )
}
