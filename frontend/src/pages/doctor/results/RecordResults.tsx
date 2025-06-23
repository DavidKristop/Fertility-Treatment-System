"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Save, Upload, User, TestTube, Activity } from "lucide-react"
import { useState } from "react"

export default function RecordResults() {
  const [selectedPatient, setSelectedPatient] = useState("")
  const [resultType, setResultType] = useState("")

  const breadcrumbs = [{ label: "Trang chủ", path: "/doctor/dashboard" }, { label: "Ghi nhận kết quả" }]

  return (
    <DoctorLayout title="Ghi nhận kết quả" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Chọn bệnh nhân
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patient">Bệnh nhân</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn bệnh nhân" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient1">Nguyễn Thị Lan - IVF</SelectItem>
                    <SelectItem value="patient2">Trần Văn Nam - IUI</SelectItem>
                    <SelectItem value="patient3">Lê Thị Hoa - Khám sàng lọc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="resultType">Loại kết quả</Label>
                <Select value={resultType} onValueChange={setResultType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại kết quả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blood_test">Xét nghiệm máu</SelectItem>
                    <SelectItem value="ultrasound">Siêu âm</SelectItem>
                    <SelectItem value="hormone">Hormone</SelectItem>
                    <SelectItem value="sperm_analysis">Phân tích tinh trùng</SelectItem>
                    <SelectItem value="embryo_transfer">Chuyển phôi</SelectItem>
                    <SelectItem value="pregnancy_test">Test thai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Form */}
        {selectedPatient && resultType && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Nhập kết quả -{" "}
                {resultType === "blood_test"
                  ? "Xét nghiệm máu"
                  : resultType === "ultrasound"
                    ? "Siêu âm"
                    : resultType === "hormone"
                      ? "Hormone"
                      : resultType === "sperm_analysis"
                        ? "Phân tích tinh trùng"
                        : resultType === "embryo_transfer"
                          ? "Chuyển phôi"
                          : "Test thai"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="testDate">Ngày xét nghiệm</Label>
                  <Input type="date" id="testDate" />
                </div>
                <div>
                  <Label htmlFor="status">Trạng thái</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Bình thường</SelectItem>
                      <SelectItem value="abnormal">Bất thường</SelectItem>
                      <SelectItem value="pending">Chờ kết quả</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dynamic fields based on result type */}
              {resultType === "blood_test" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hcg">HCG (mIU/mL)</Label>
                    <Input type="number" id="hcg" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="estradiol">Estradiol (pg/mL)</Label>
                    <Input type="number" id="estradiol" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="progesterone">Progesterone (ng/mL)</Label>
                    <Input type="number" id="progesterone" placeholder="0" />
                  </div>
                </div>
              )}

              {resultType === "ultrasound" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="follicles">Số nang trứng</Label>
                    <Input type="number" id="follicles" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="endometrium">Độ dày nội mạc tử cung (mm)</Label>
                    <Input type="number" id="endometrium" placeholder="0" />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Ghi chú</Label>
                <Textarea id="notes" placeholder="Ghi chú về kết quả..." className="min-h-[100px]" />
              </div>

              <div>
                <Label htmlFor="files">Tải lên file kết quả</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kéo thả file hoặc click để chọn</p>
                  <p className="text-xs text-gray-400">PDF, JPG, PNG (tối đa 10MB)</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu kết quả
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Xem trước
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Kết quả gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  patient: "Nguyễn Thị Lan",
                  type: "Xét nghiệm máu",
                  date: "2024-01-15",
                  status: "normal",
                },
                {
                  patient: "Trần Văn Nam",
                  type: "Phân tích tinh trùng",
                  date: "2024-01-14",
                  status: "abnormal",
                },
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TestTube className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{result.patient}</p>
                      <p className="text-sm text-muted-foreground">{result.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={result.status === "normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {result.status === "normal" ? "Bình thường" : "Bất thường"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{result.date}</span>
                    <Button variant="outline" size="sm">
                      Xem
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
