// src/pages/CreateProtocolPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerLayout from "@/components/manager/ManagerLayout";
import { createProtocol, fetchServices, fetchDrugs } from "@/api/auth";
import Select from 'react-select';
import type {
  CreateProtocolRequest,
  ServiceResponse,
  DrugResponse,
} from "@/api/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

export default function CreateProtocolPage() {
  const navigate = useNavigate();

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refundPercentage, setRefundPercentage] = useState(0);

  // Available services & drugs
  const [allServices, setAllServices] = useState<ServiceResponse[]>([]);
  const [allDrugs, setAllDrugs] = useState<DrugResponse[]>([]);

  // Phases data
  const [phases, setPhases] = useState<CreateProtocolRequest["phases"]>([
    {
      title: "",
      description: "",
      phaseModifierPercentage: 1,
      serviceIds: [],
      drugIds: [],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load services and drugs once
  useEffect(() => {
    fetchServices().then((res) => {
      if (res.success) {
        // Handle array or paginated payload
        const payload = res.payload;
        let list: ServiceResponse[] = [];
        if (Array.isArray(payload)) {
          list = payload;
        } else if (
          payload &&
          "content" in payload &&
          Array.isArray((payload as any).content)
        ) {
          list = (payload as any).content;
        }
        setAllServices(list);
      }
    });
    fetchDrugs().then((res) => {
      if (res.success) {
        const payload = res.payload;
        let list: DrugResponse[] = [];
        if (Array.isArray(payload)) {
          list = payload;
        } else if (
          payload &&
          "content" in payload &&
          Array.isArray((payload as any).content)
        ) {
          list = (payload as any).content;
        }
        setAllDrugs(list);
      }
    });
  }, []);

  // Update one field in a phase
  const updatePhase = (
    idx: number,
    field: keyof CreateProtocolRequest["phases"][0],
    value: any
  ) => {
    setPhases((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  // Add new empty phase
  const addPhase = () => {
    setPhases((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        phaseModifierPercentage: 1,
        serviceIds: [],
        drugIds: [],
      },
    ]);
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload: CreateProtocolRequest = {
      title,
      description,
      refundPercentage,
      phases,
    };

    try {
      await createProtocol(payload);
      navigate(`/manager/protocols`);
      toast.success("Protocol được tạo thành công");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tạo protocol");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ManagerLayout title="Tạo Protocol mới">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Tạo Protocol mới</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Description */}
          <div>
            <Label>Tiêu đề</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Phần trăm hoàn tiền (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={refundPercentage}
              onChange={(e) => setRefundPercentage(Number(e.target.value))}
            />
          </div>

          {/* Phases section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Các giai đoạn</h3>
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="border p-4 rounded bg-gray-50 space-y-4"
              >
                <div>
                  <Label>Tiêu đề phase</Label>
                  <Input
                    value={phase.title}
                    onChange={(e) => updatePhase(idx, "title", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Mô tả phase</Label>
                  <Textarea
                    value={phase.description}
                    onChange={(e) =>
                      updatePhase(idx, "description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Hệ số điều chỉnh (%)</Label>
                  <Input
                    type="number"
                    step={0.01}
                    value={phase.phaseModifierPercentage}
                    onChange={(e) =>
                      updatePhase(
                        idx,
                        "phaseModifierPercentage",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>

                {/* Trong phần Service */}
                <div>
                  <Label>Chọn Dịch vụ</Label>
                  <Select
                    isMulti
                    options={allServices.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    value={allServices
                      .map((s) => ({ value: s.id, label: s.name }))
                      .filter((opt) => phase.serviceIds?.includes(opt.value))}
                    onChange={(selected) =>
                      updatePhase(
                        idx,
                        "serviceIds",
                        selected.map((opt) => opt.value)
                      )
                    }
                    placeholder="Tìm hoặc chọn dịch vụ..."
                  />
                </div>

                <div>
                  <Label>Chọn Thuốc</Label>
                  <Select
                    isMulti
                    options={allDrugs.map((d) => ({
                      value: d.id,
                      label: d.name,
                    }))}
                    value={allDrugs
                      .map((d) => ({ value: d.id, label: d.name }))
                      .filter((opt) => phase.drugIds?.includes(opt.value))}
                    onChange={(selected) =>
                      updatePhase(
                        idx,
                        "drugIds",
                        selected.map((opt) => opt.value)
                      )
                    }
                    placeholder="Tìm hoặc chọn thuốc..."
                  />
                </div>
              </div>
            ))}

            <Button variant="outline" type="button" onClick={addPhase}>
              + Thêm giai đoạn
            </Button>
          </div>

          <div className="text-right">
            <Button type="submit" disabled={loading}>
              {loading ? "Đang tạo..." : "Tạo Protocol"}
            </Button>
          </div>
        </form>
      </div>
    </ManagerLayout>
  );
}
