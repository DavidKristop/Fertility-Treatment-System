import type { DoctorProfileResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  User,
  BookOpen,
  Calendar,
  Award,
  BadgeCheck,
} from "lucide-react";

export default function DoctorProfileInfo({ doctor }: { doctor: DoctorProfileResponse }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Thông tin bác sĩ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="specialty">Chuyên khoa</Label>
            <div className="flex items-center gap-2 mt-1">
              <BookOpen className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{doctor.specialty}</span>
            </div>
          </div>

          <div>
            <Label htmlFor="degree">Bằng cấp</Label>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{doctor.degree}</span>
            </div>
          </div>

          <div>
            <Label htmlFor="yearsOfExperience">Năm kinh nghiệm</Label>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{doctor.yearsOfExperience} năm</span>
            </div>
          </div>

          <div>
            <Label htmlFor="licenseNumber">Số chứng chỉ hành nghề</Label>
            <div className="flex items-center gap-2 mt-1">
              <BadgeCheck className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{doctor.licenseNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}