"use client"

import { useState } from "react"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Stethoscope,
  Award,
  Clock,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Key,
} from "lucide-react"

// Mock data dựa trên ERD
const doctorData = {
  // Từ bảng User
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "dr.nguyen@ucare.vn",
  phone: "0901234567",
  fullName: "BS. Nguyễn Văn An",
  dateOfBirth: "1985-03-15",
  address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  avatarUrl: "/placeholder.svg?height=150&width=150",

  // Từ bảng DoctorProfile
  specialty: "Sản phụ khoa - Hỗ trợ sinh sản",
  degree: "Tiến sĩ Y khoa (PhD)",
  yearOfExperience: 12.5,
  licenseNumber: "SP-12345-HCMC",

  // Thông tin bổ sung
  workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:00, Thứ 7: 8:00 - 12:00",
  languages: ["Tiếng Việt", "English", "中文"],
  certifications: ["Chứng chỉ IVF quốc tế", "Chứng chỉ Siêu âm thai nhi", "Chứng chỉ Phẫu thuật nội soi"],
}

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [formData, setFormData] = useState(doctorData)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // TODO: API call to update profile
    console.log("Saving profile data:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(doctorData)
    setIsEditing(false)
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const breadcrumbs = [{ label: "Trang chủ", href: "/doctor/dashboard" }, { label: "Hồ sơ cá nhân" }]

  return (
    <DoctorLayout title="Hồ sơ cá nhân" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Card with Avatar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={formData.avatarUrl || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => {
                    /* TODO: Handle avatar upload */
                  }}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.fullName}</h1>
                <p className="text-lg text-blue-600 mb-3">{formData.specialty}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{formData.degree}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formData.yearOfExperience} năm kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Giấy phép: {formData.licenseNumber}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Chỉnh sửa
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Lưu
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Hủy
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="fullName">Họ và tên</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">{formData.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.phone}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">
                        {formatDate(formData.dateOfBirth)} ({calculateAge(formData.dateOfBirth)} tuổi)
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Địa chỉ</Label>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    {isEditing ? (
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.address}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Thông tin nghề nghiệp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="specialty">Chuyên khoa</Label>
                {isEditing ? (
                  <Input
                    id="specialty"
                    value={formData.specialty}
                    onChange={(e) => handleInputChange("specialty", e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-1">{formData.specialty}</p>
                )}
              </div>

              <div>
                <Label htmlFor="degree">Bằng cấp</Label>
                <div className="flex items-center gap-2 mt-1">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="degree"
                      value={formData.degree}
                      onChange={(e) => handleInputChange("degree", e.target.value)}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.degree}</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="yearOfExperience">Số năm kinh nghiệm</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="yearOfExperience"
                      type="number"
                      step="0.5"
                      value={formData.yearOfExperience}
                      onChange={(e) => handleInputChange("yearOfExperience", e.target.value)}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.yearOfExperience} năm</span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="licenseNumber">Số giấy phép hành nghề</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="h-4 w-4 text-gray-400" />
                  {isEditing ? (
                    <Input
                      id="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                      className="flex-1"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.licenseNumber}</span>
                  )}
                </div>
              </div>

              <div>
                <Label>Giờ làm việc</Label>
                <p className="text-sm text-gray-600 mt-1">{formData.workingHours}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Chứng chỉ & Bằng cấp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
