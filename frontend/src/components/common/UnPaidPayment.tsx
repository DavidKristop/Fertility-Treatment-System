import { Receipt } from "lucide-react";
import FormSection from "../doctor/common/FormSection";
import type { PaymentPreviewResponse } from "@/api/types";


export default function UnPaidPayment({payments, onClick}: {payments: PaymentPreviewResponse[], onClick: (payment: PaymentPreviewResponse) => void}) {

    return  <FormSection title="Thanh toán" icon={Receipt}>
        <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium mb-4">
                Các thanh toán chưa hoàn thành
            </h3>
            <div className="space-y-4">
            {payments?.filter(p => p.status === "PENDING")?.map(p => (
                <div key={p.id} onClick={() => onClick(p)} className="flex items-center gap-4 cursor-pointer">
                    <p className="font-medium text-red-500">Thanh toán {p.id} ({p.amount.toLocaleString("vi-VN")}₫)</p>
                </div>
            ))}
            </div>
        </div>
  </FormSection>
}