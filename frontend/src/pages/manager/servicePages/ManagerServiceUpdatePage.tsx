import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "@/api/service";
import ManagerLayout from "@/components/manager/ManagerLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function ManagerServiceUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getServiceById(id)
        .then((res) => {
            if (!res.payload) {
            toast.error("Không tìm thấy dịch vụ");
            navigate("/manager/services");
            return;
            }

            const s = res.payload;
            setName(s.name);
            setDescription(s.description);
            setPrice(s.price);
            setUnit(s.unit);
        })
        .catch(() => {
            toast.error("Không thể tải thông tin dịch vụ");
            navigate("/manager/services");
        });
  }, [id]);

  const handleSubmit = async () => {
    if (!name || !description || !price || !unit) {
      toast.warning("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      await updateService(id!, {
        name,
        description,
        price: Number(price),
        unit,
      });
      toast.success("Cập nhật dịch vụ thành công");
      navigate("/manager/services");
    } catch (err: any) {
      toast.error(err.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagerLayout title="Cập nhật dịch vụ">
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
          {loading ? "Đang cập nhật..." : "Cập nhật dịch vụ"}
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/manager/services")}
          disabled={loading}
        >
          Quay lại danh sách
        </Button>
      </div>
    </ManagerLayout>
  );
}
