import { CardContent } from "@/components/ui/card";
import TreatmentStatusBadge from "@/components/doctor/common/TreatmentStatusBadge";
import type { TreatmentResponse } from "@/api/types";
import { User, Mail, Phone, Calendar, Clock } from "lucide-react";

interface TreatmentInfoCardProps {
  treatment: TreatmentResponse;
}

export default function TreatmentInfoCard({ treatment }: TreatmentInfoCardProps) {
  return (
    <CardContent>
      <div className="space-y-6 flex justify-between">
        {/* Patient Info */}
        <div className="space-y-4">
          <h4 className="font-medium">Thông tin bệnh nhân</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.patient.fullName}</p>
                <p className="text-sm text-gray-500">Bệnh nhân</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.patient.email}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.patient.phone}</p>
                <p className="text-sm text-gray-500">Số điện thoại</p>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="space-y-4">
          <h4 className="font-medium">Thông tin bác sĩ</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.doctor.fullName}</p>
                <p className="text-sm text-gray-500">Bác sĩ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.doctor.email}</p>
                <p className="text-sm text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.doctor.specialty}</p>
                <p className="text-sm text-gray-500">Chuyên khoa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Treatment Info */}
        <div className="space-y-4">
          <h4 className="font-medium">Thông tin điều trị</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.protocol.title}</p>
                <p className="text-sm text-gray-500">Kế hoạch</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{treatment.description}</p>
                <p className="text-sm text-gray-500">Mô tả</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{new Date(treatment.startDate).toLocaleDateString('vi-VN')}</p>
                <p className="text-sm text-gray-500">Ngày bắt đầu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{new Date(treatment.endDate).toLocaleDateString('vi-VN')}</p>
                <p className="text-sm text-gray-500">Ngày kết thúc dự kiến</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TreatmentStatusBadge status={treatment.status} />
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  );
}
