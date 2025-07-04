import { useSearchParams, useNavigate } from "react-router-dom";
import PatientLayout from "@/components/patient/PatientLayout";
import { Button } from "@/components/ui/button";

export default function PaymentFailurePage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const paymentId = params.get("paymentId");

  const handleBack = () => {
    if (paymentId) {
      navigate(`/patient/payments/payment-detail/${paymentId}`);
    } else {
      navigate("/patient/payments");
    }
  };

  return (
    <PatientLayout title="Thanh toán thất bại">
      <div className="max-w-md mx-auto p-8 mt-16 bg-white rounded shadow text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Thanh toán thất bại!</h1>
        <p className="mb-8">Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        <Button onClick={handleBack}>Quay lại chi tiết thanh toán</Button>
      </div>
    </PatientLayout>
  );
}