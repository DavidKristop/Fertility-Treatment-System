"use client"

import { useState, useEffect } from "react"
import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  AlertCircle,
} from "lucide-react"
import { getDoctorProfile, updateDoctorProfile } from "@/api/doctor"
import type { DoctorProfile as DoctorProfileType } from "@/api/types"

// Default/placeholder data for when profile doesn't exist
const defaultDoctorData: DoctorProfileType = {
  id: "",
  email: "",
  fullName: "",
  phone: "",
  dateOfBirth: "",
  address: "",
  avatarUrl: "/placeholder.svg?height=150&width=150",
  specialty: "",
  degree: "",
  yearOfExperience: 0,
  licenseNumber: "",
  workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:00, Thứ 7: 8:00 - 12:00",
  languages: ["Tiếng Việt"],
  certifications: [],
}

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<DoctorProfileType>(defaultDoctorData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileExists, setProfileExists] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        const profile = await getDoctorProfile()

        if (profile) {
          // Merge with default data to ensure all fields have values
          const mergedProfile = {
            ...defaultDoctorData,
            ...profile,
            // Ensure arrays are properly handled
            languages:
              profile.languages && profile.languages.length > 0 ? profile.languages : defaultDoctorData.languages,
            certifications: profile.certifications || defaultDoctorData.certifications,
            // Ensure numeric fields have proper defaults
            yearOfExperience: profile.yearOfExperience || 0,
          }
          setFormData(mergedProfile)
          setProfileExists(true)
        } else {
          // Profile doesn't exist, use default data
          setFormData(defaultDoctorData)
          setProfileExists(false)
        }
      } catch (error: any) {
        console.error("Error fetching doctor profile:", error)

        // If it's a 404 or profile not found, use default data
        if (error.message?.includes("404") || error.message?.includes("not found")) {
          setFormData(defaultDoctorData)
          setProfileExists(false)
          setError(null) // Don't show error for missing profile
        } else {
          // For other errors, show error message but still use default data
          setError("Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.")
          setFormData(defaultDoctorData)
          setProfileExists(false)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)

      const updatedProfile = await updateDoctorProfile(formData)
      setFormData(updatedProfile)
      setProfileExists(true)
      setIsEditing(false)
    } catch (error: any) {
      console.error("Error saving profile:", error)
      setError("Không thể lưu thông tin hồ sơ. Vui lòng thử lại.")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset to original data or default if profile doesn't exist
    if (!profileExists) {
      setFormData(defaultDoctorData)
    }
    setIsEditing(false)
    setError(null)
  }

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0
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
    if (!dateString) return "Chưa cập nhật"
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const breadcrumbs = [{ label: "Trang chủ", href: "/doctor/dashboard" }, { label: "Hồ sơ cá nhân" }]

  if (loading) {
    return (
      <DoctorLayout title="Hồ sơ cá nhân" breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Đang tải thông tin hồ sơ...</div>
        </div>
      </DoctorLayout>
    )
  }

  return (
    <DoctorLayout title="Hồ sơ cá nhân" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Profile Not Found Alert */}
        {!profileExists && !error && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Hồ sơ của bạn chưa được tạo. Vui lòng cập nhật thông tin để hoàn thiện hồ sơ.
            </AlertDescription>
          </Alert>
        )}

        {/* Header Card with Avatar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={formData.avatarUrl || "/placeholder.svg?height=150&width=150"}
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.fullName || "Chưa cập nhật tên"}</h1>
                <p className="text-lg text-blue-600 mb-3">{formData.specialty || "Chưa cập nhật chuyên khoa"}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{formData.degree || "Chưa cập nhật"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formData.yearOfExperience || 0} năm kinh nghiệm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Giấy phép: {formData.licenseNumber || "Chưa cập nhật"}</span>
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
                    <Button onClick={handleSave} disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? "Đang lưu..." : "Lưu"}
                    </Button>
                    <Button variant="outline" onClick={handleCancel} disabled={saving}>
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
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">{formData.fullName || "Chưa cập nhật"}</p>
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
                        placeholder="Nhập email"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.email || "Chưa cập nhật"}</span>
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
                        placeholder="Nhập số điện thoại"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.phone || "Chưa cập nhật"}</span>
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
                        {formData.dateOfBirth
                          ? `${formatDate(formData.dateOfBirth)} (${calculateAge(formData.dateOfBirth)} tuổi)`
                          : "Chưa cập nhật"}
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
                        placeholder="Nhập địa chỉ"
                      />
                    ) : (
                      <span className="text-sm text-gray-600">{formData.address || "Chưa cập nhật"}</span>
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
                    placeholder="Nhập chuyên khoa"
                  />
                ) : (
                  <p className="text-sm text-gray-600 mt-1">{formData.specialty || "Chưa cập nhật"}</p>
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
                      placeholder="Nhập bằng cấp"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.degree || "Chưa cập nhật"}</span>
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
                      onChange={(e) => handleInputChange("yearOfExperience", Number.parseFloat(e.target.value) || 0)}
                      className="flex-1"
                      placeholder="Nhập số năm kinh nghiệm"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.yearOfExperience || 0} năm</span>
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
                      placeholder="Nhập số giấy phép"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{formData.licenseNumber || "Chưa cập nhật"}</span>
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
            {formData.certifications && formData.certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <Award className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">{cert}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có chứng chỉ nào được thêm</p>
                {isEditing && <p className="text-sm mt-2">Bạn có thể thêm chứng chỉ sau khi lưu thông tin cơ bản</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
