"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Download, Eye, PenTool, CheckCircle, Clock, AlertCircle } from "lucide-react"
import PatientLayout from "@/components/patient/PatientLayout"

// Mock data
const patientName = "Nguyễn Thị Lan"
const contracts = [
  {
    id: 1,
    title: "Hợp đồng điều trị IVF",
    description: "Hợp đồng điều trị thụ tinh trong ống nghiệm - Gói cơ bản",
    createdDate: "2025-01-15",
    expiryDate: "2025-07-17",
    status: "pending", // pending, signed, expired
    amount: "150,000,000 VNĐ",
    doctor: "BS. Trần Minh Đức",
    type: "IVF Treatment",
  },
  {
    id: 2,
    title: "Hợp đồng điều trị IUI",
    description: "Hợp đồng xét nghiệm di truyền tiền làm tổ (PGT)",
    createdDate: "2025-01-10",
    expiryDate: "2025-06-10",
    status: "signed",
    amount: "25,000,000 VNĐ",
    doctor: "BS. Lê Thị Hoa",
    type: "Genetic Testing",
  },
  {
    id: 3,
    title: "Hợp đồng điều trị IVF",
    description: "Hợp đồng bảo quản phôi đông lạnh - 2 năm",
    createdDate: "2024-12-20",
    expiryDate: "2025-05-20",
    status: "expired",
    amount: "15,000,000 VNĐ",
    doctor: "BS. Nguyễn Văn An",
    type: "Embryo Storage",
  },
]


interface PatientContractsProps {
  className?: string
}

export default function PatientContracts({ className }: PatientContractsProps) {
  const [selectedContract, setSelectedContract] = useState<(typeof contracts)[0] | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "expired":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "signed":
        return "Đã ký"
      case "pending":
        return "Chờ ký"
      case "expired":
        return "Hết hạn"
      default:
        return "Không xác định"
    }
  }

  const handleSignContract = (contractId: number) => {
    // Logic to sign contract
    console.log("Signing contract:", contractId)
    // Update contract status to signed
    // You can add API call here
  }

  const handleDownloadContract = (contractId: number) => {
    // Logic to download contract
    console.log("Downloading contract:", contractId)
    // You can add download logic here
  }

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Hợp đồng" },
  ]

  return (
    <PatientLayout title="Hợp đồng" breadcrumbs={breadcrumbs}>
            <div className={className}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Hợp đồng của bệnh nhân {patientName} </h2>
      </div>

      {/* Contracts List */}
      <Card className="min-h-[600px]">
        <CardContent className="p-6">
          {contracts.length > 0 ? (
            <div className="space-y-4">

              {contracts.map((contract) => (
                <div key={contract.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{contract.title}</h3>
                        <Badge className={getStatusColor(contract.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(contract.status)}
                            {getStatusText(contract.status)}
                          </div>
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-3">{contract.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Bác sĩ:</span>
                          <div className="font-medium">{contract.doctor}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá trị:</span>
                          <div className="font-medium text-green-600">{contract.amount}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Ngày tạo:</span>
                          <div className="font-medium">{contract.createdDate}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Hết hạn:</span>
                          <div className="font-medium">{contract.expiryDate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {/* View Contract Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Xem
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{selectedContract?.title}</DialogTitle>
                            <DialogDescription>Chi tiết hợp đồng và thông tin bệnh nhân</DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => handleDownloadContract(selectedContract?.id || 0)}>
                              <Download className="h-4 w-4 mr-2" />
                              Tải xuống
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Sign Contract Dialog - Only for pending contracts */}
                      {contract.status === "pending" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <PenTool className="h-4 w-4 mr-2" />
                              Ký hợp đồng
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Xác nhận ký hợp đồng</DialogTitle>
                              <DialogDescription>
                                Bạn có chắc chắn muốn ký hợp đồng "{contract.title}"?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                                  <div className="text-sm">
                                    <p className="font-medium text-yellow-800 mb-1">Lưu ý quan trọng:</p>
                                    <p className="text-yellow-700">
                                      Sau khi ký, hợp đồng sẽ có hiệu lực pháp lý. Vui lòng đọc kỹ các điều khoản trước
                                      khi xác nhận.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Hủy</Button>
                              <Button onClick={() => handleSignContract(contract.id)}>Xác nhận ký</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}

                      {/* Download Button - Only for signed contracts */}
                      {contract.status === "signed" && (
                        <Button variant="outline" size="sm" onClick={() => handleDownloadContract(contract.id)}>
                          <Download className="h-4 w-4 mr-2" />
                          Tải xuống
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có hợp đồng nào</h3>
              <p className="text-gray-600">Các hợp đồng điều trị sẽ xuất hiện tại đây</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </PatientLayout>

  )
}
