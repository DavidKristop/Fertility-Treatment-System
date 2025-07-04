import { useSearchParams, useNavigate } from "react-router-dom";
import PatientLayout from "@/components/patient/PatientLayout";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  // VNPay usually returns orderId or id as a query param
  const paymentId = params.get("paymentId");

  const handleBack = () => {
    if (paymentId) {
      navigate(`/patient/payments/payment-detail/${paymentId}`);
    } else {
      navigate("/patient/payments");
    }
  };

  return (
    <PatientLayout title="Thanh toán thành công">
      <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
        <p className="mb-8">Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đã được xử lý.</p>
        <Button onClick={handleBack}>Xem chi tiết thanh toán</Button>
      </div>
    </PatientLayout>
  );
}