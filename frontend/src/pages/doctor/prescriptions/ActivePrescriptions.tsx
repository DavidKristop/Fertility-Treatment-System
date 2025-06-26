"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Eye, Edit, Trash2, User, Calendar } from "lucide-react"
import { useState } from "react"

interface ActivePrescription {
  id: string
  patient: {
    name: string
    age: number
    treatmentPhase: string
  }
  drug: {
    name: string
    dosage: string
    unit: string
  }
  startDate: string
  endDate: string
  usageInstructions: string
  amount: number
  status: "active" | "completed" | "discontinued"
}

const mockPrescriptions: ActivePrescription[] = [
  {
    id: "1",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      treatmentPhase: "IVF - Giai đoạn kích thích buồng trứng",
    },
    drug: {
      name: "Gonal-F",
      dosage: "75 IU",
      unit: "vial",
    },
    startDate: "2024-01-10",
    endDate: "2024-01-20",
    usageInstructions: "Tiêm dưới da mỗi ngày vào buổi tối, cùng giờ",
    amount: 10,
    status: "active",
  },
  {
    id: "2",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      treatmentPhase: "IUI - Chuẩn bị",
    },
    drug: {
      name: "Clomid",
      dosage: "50mg",
      unit: "tablet",
    },
    startDate: "2024-01-08",
    endDate: "2024-01-15",
    usageInstructions: "Uống 1 viên mỗi ngày sau bữa sáng",
    amount: 7,
    status: "completed",
  },
  {
    id: "3",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      treatmentPhase: "IVF - Hỗ trợ hoàng thể",
    },
    drug: {
      name: "Progesterone",
      dosage: "200mg",
      unit: "capsule",
    },
    startDate: "2024-01-12",
    endDate: "2024-02-12",
    usageInstructions: "Đặt âm đạo 2 lần/ngày, sáng và tối",
    amount: 60,
    status: "active",
  },
]

export default function ActivePrescriptions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [prescriptions] = useState<ActivePrescription[]>(mockPrescriptions)

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Đơn thuốc", path: "/doctor/prescriptions" },
    { label: "Đơn đang dùng" },
  ]

  const filteredPrescriptions = prescriptions.filter(
    (prescription) =>
      prescription.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.patient.treatmentPhase.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang dùng"
      case "completed":
        return "Hoàn thành"
      case "discontinued":
        return "Đã ngừng"
      default:
        return "Không xác định"
    }
  }

  return (
    <DoctorLayout title="Đơn thuốc đang dùng" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Tìm kiếm đơn thuốc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Tìm theo tên bệnh nhân, tên thuốc, giai đoạn điều trị..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách đơn thuốc ({filteredPrescriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Thuốc</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{prescription.patient.name}</div>
                            <div className="text-sm text-muted-foreground">{prescription.patient.age} tuổi</div>
                            <div className="text-xs text-blue-600">{prescription.patient.treatmentPhase}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{prescription.drug.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {prescription.drug.dosage} - {prescription.amount} {prescription.drug.unit}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {prescription.startDate} - {prescription.endDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(prescription.status)}>
                          {getStatusText(prescription.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Chi tiết đơn thuốc</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Bệnh nhân:</Label>
                                    <p>
                                      {prescription.patient.name} ({prescription.patient.age} tuổi)
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Giai đoạn điều trị:</Label>
                                    <p>{prescription.patient.treatmentPhase}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Tên thuốc:</Label>
                                    <p>{prescription.drug.name}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Liều lượng:</Label>
                                    <p>{prescription.drug.dosage}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Số lượng:</Label>
                                    <p>
                                      {prescription.amount} {prescription.drug.unit}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Thời gian:</Label>
                                    <p>
                                      {prescription.startDate} - {prescription.endDate}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="font-semibold">Hướng dẫn sử dụng:</Label>
                                  <p className="mt-1 p-3 bg-gray-50 rounded">{prescription.usageInstructions}</p>
                                </div>

                                <div>
                                  <Badge className={getStatusColor(prescription.status)}>
                                    {getStatusText(prescription.status)}
                                  </Badge>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {prescription.status === "active" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
