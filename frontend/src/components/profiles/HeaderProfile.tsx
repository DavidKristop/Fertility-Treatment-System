import type { UserResponse } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import  Avatar  from "@/assets/avatar.png";
import { Calendar } from "lucide-react";

export const HeaderProfile = ({user}: {user: UserResponse})=>{

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
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            <img
              src={Avatar}
              alt=""
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <Button
              size="sm"
              className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
            >
            </Button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.fullName}</h1>
            <p className="text-lg text-blue-600 mb-3">Nhân viên</p>

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
}