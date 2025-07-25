import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "@/api/service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function ManagerServiceCreatePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !description || !price || !unit) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      await createService({ name, description, price: Number(price), unit });
      toast.success("Tạo dịch vụ thành công");
      setName("");
      setDescription("");
      setPrice("");
      setUnit("");
    } catch (err: any) {
      toast.error(err.message || "Tạo dịch vụ thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setTitle("Thêm dịch vụ mới")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý dịch vụ" },
    ])
  },[])

  return (
    <div className="max-w-xl p-4 space-y-4">
      <Input
        placeholder="Tên dịch vụ"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Mô tả"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Giá (VND)"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        placeholder="Đơn vị (lần / buổi / gói...)"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Đang tạo..." : "Tạo dịch vụ"}
      </Button>

      <Button
          variant="outline"
          onClick={() => navigate("/manager/services")}
          disabled={loading}
      >
          Quay lại danh sách
      </Button>
    </div>
  );
}
