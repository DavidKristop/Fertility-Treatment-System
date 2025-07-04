import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentDetail, getVNPayPaymentUrl } from "@/api/payment";
import type { PaymentResponse } from "@/api/types";
import PatientLayout from "@/components/patient/PatientLayout";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<PaymentResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [processingPayment,setProcessingPayment] = useState(false)
  const [error, setError] = useState<string | null>(null);

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Thanh toán", path: "/patient/payments" },
    { label: `Chi tiết: ${id}`, path: `/patient/payments/payment-detail/${id}` },
  ];

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getPaymentDetail(id)
      .then((res) => setPayment(res?.payload))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu")
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleVNPay = async () => {
    if(id){
      try {
        setProcessingPayment(true)
        const vnpayUrl = await getVNPayPaymentUrl(id);
        if(vnpayUrl?.payload) window.location.href = vnpayUrl?.payload;
        else throw new Error("Không thể giải quyết thanh toán")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
      }
      finally{
        setProcessingPayment(false)
      }
    }
  };

  return (
    <PatientLayout title="Chi tiết thanh toán" breadcrumbs={breadcrumbs}>
      <div className="max-w-3xl mx-auto p-4">
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && payment && (
          <div className="space-y-6">
            <div className="border rounded-lg p-4 bg-white shadow">
              <h2 className="text-xl font-bold mb-2">
                Thanh toán #{payment.id}
              </h2>
              <div className="mb-2">
                <span className="font-medium">Số tiền: </span>
                <span className="text-blue-600 font-semibold">
                  {payment.amount.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium">Mô tả: </span>
                {payment.description}
              </div>
              <div className="mb-2">
                <span className="font-medium">Ngày thanh toán: </span>
                {payment.paymentDate
                  ? new Date(payment.paymentDate).toLocaleString("vi-VN")
                  : "-"}
              </div>
              <div className="mb-2">
                <span className="font-medium">Hạn thanh toán: </span>
                {payment.paymentDeadline
                  ? new Date(payment.paymentDeadline).toLocaleString("vi-VN")
                  : "-"}
              </div>
              <div className="mb-2">
                <span className="font-medium">Phương thức: </span>
                {payment.paymentMethod}
              </div>
              <div className="mb-2">
                <span className="font-medium">Trạng thái: </span>
                {payment.status === "PENDING" && (
                  <span className="text-yellow-600">Chờ thanh toán</span>
                )}
                {payment.status === "COMPLETED" && (
                  <span className="text-green-600">Đã thanh toán</span>
                )}
                {payment.status === "CANCELED" && (
                  <span className="text-red-600">Đã hủy</span>
                )}
              </div>
              <div className="mb-2 text-sm text-gray-500">
                Tạo lúc: {new Date(payment.createdAt).toLocaleString("vi-VN")}
              </div>
              <div className="mb-2 text-sm text-gray-500">
                Cập nhật: {new Date(payment.updatedAt).toLocaleString("vi-VN")}
              </div>
              {payment.status === "PENDING" && (
                <Button className="mt-4" onClick={handleVNPay}>
                  Thanh toán với VNPay
                </Button>
              )}
            </div>

            {/* Services */}
            <div className="border rounded-lg p-4 bg-white shadow">
              <h3 className="font-semibold mb-2">Dịch vụ thanh toán</h3>
              {payment.scheduleServices?.length ? (
                payment.scheduleServices.map((service) => (
                  <div key={service.id} className="mb-4">
                    <span className="font-medium">{service.name}</span>
                    {service.price !== undefined &&
                        <> - {service.price.toLocaleString("vi-VN")} đ</>
                    }
                    <span className="text-gray-500"> ({service.unit})</span>
                    <p>{service.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">Không có lịch hẹn nào</div>
              )}
            </div>

            {/* Drugs */}
            <div className="border rounded-lg p-4 bg-white shadow">
              <h3 className="font-semibold mb-2">Thuốc thanh toán</h3>
              {payment.assignDrugs?.length ? (
                payment.assignDrugs.map((assign) => (
                  <div key={assign.id} className="mb-4">
                    <div className="font-medium mb-1">
                      Đơn thuốc #{assign.id} -{" "}
                      {assign.status === "PENDING" && (
                        <span className="text-yellow-600">Chờ hoàn thành</span>
                      )}
                      {assign.status === "COMPLETED" && (
                        <span className="text-green-600">Đã hoàn thành</span>
                      )}
                    </div>
                    {assign.patientDrugs?.length ? (
                      <ul className="list-disc ml-6">
                        {assign.patientDrugs.map((pd) => (
                          <li key={pd.id}>
                            <span className="font-medium">{pd.drug.name}</span>
                            {pd.drug.price !== undefined &&
                              <> - {pd.drug.price.toLocaleString("vi-VN")} đ</>
                            }
                            <span className="text-gray-500">
                              {pd.dosage ? `, Liều: ${pd.dosage}` : ""}
                              {pd.usageInstructions ? `, Cách dùng: ${pd.usageInstructions}` : ""}
                              {pd.amount ? `, SL: ${pd.amount}` : ""}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500">Không có thuốc</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-500">Không có đơn thuốc</div>
              )}
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
}