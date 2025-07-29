import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import  Avatar  from "@/assets/avatar.png";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Camera,
} from "lucide-react";
import { me } from "@/api/auth";



export default function ManagerProfile() {

  const {setTitle,setBreadCrumbs} = useAuthHeader()
  useEffect(() => {
    setTitle("Hồ sơ & cài đặt");
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Hồ sơ cài đặt" },
    ])
  }, [setTitle, setBreadCrumbs])
  const [user, setUser] = useState<{ fullName: string; role: string; email: string; phone: string; address: string; dateOfBirth: string } | null>(null);



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


    useEffect(() => {
      (async () => {
        try {
          const current = await me();
          setUser(current);
          console.log("Fetched user:", current);
          console.log("  → phone =", current.phone);
        } catch {
          setUser(null);
        }
      })();
    }, []);

      if (!user) {
        return <p>Đang tải...</p>;
      }
  return (
      <div className="space-y-6">
        {/* Header Card with Avatar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <img
                  src={Avatar} // Use a placeholder or user avatar URL
                  alt=""
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.fullName}</h1>
                <p className="text-lg text-blue-600 mb-3">Quản trị</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(user.dateOfBirth)} ({calculateAge(user.dateOfBirth)} tuổi)</span>
                  </div>

                </div>
              </div>


            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
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
          
        </div>
      </div>
  );
}