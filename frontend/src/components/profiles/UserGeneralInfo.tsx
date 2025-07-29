import type { UserResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

export default function UserGeneralInfo({user}: {user: UserResponse}){
    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return <Card>
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
          <p className="text-sm text-gray-600 mt-1">{user.fullName}</p>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2 mt-1">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <div className="flex items-center gap-2 mt-1">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.phone}</span>
          </div>
        </div>

        <div>
          <Label htmlFor="dateOfBirth">Ngày sinh</Label>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {formatDate(user.dateOfBirth)} ({calculateAge(user.dateOfBirth)} tuổi)
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <div className="flex items-start gap-2 mt-1">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
            <span className="text-sm text-gray-600">{user.address}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
}
