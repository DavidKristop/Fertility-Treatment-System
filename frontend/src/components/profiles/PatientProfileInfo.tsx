import type { PatientProfileResponse } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  User,
  BookOpen,
} from "lucide-react";

export default function PatientProfileInfo({patient}:{patient:PatientProfileResponse}){
    return <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <User className="h-5 w-5" />
        Thông tin bệnh nhân
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="medicalHistory">Lịch sử bệnh</Label>
          <div className="flex items-center gap-2 mt-1">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{patient.medicalHistory}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
}