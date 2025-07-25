import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProtocolById } from "@/api/auth";
import type { ProtocolResponse } from "@/api/types";
import { useAuthHeader } from "@/lib/context/AuthHeaderContext";

export default function ProtocolDetail() {
  const { id } = useParams<{ id: string }>();
  const [protocol, setProtocol] = useState<ProtocolResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  useEffect(()=>{
    setTitle("Chi tiết Protocol")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/manager/dashboard" },
      { label: "Quản lý Protocols", path: "/manager/protocols" },
      { label: protocol?.title || "Loading…" },
    ])
  },[protocol])

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchProtocolById(id)
      .then((data) => setProtocol(data))
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Lỗi khi tải dữ liệu");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="mx-auto p-4">
      {loading && <p>Đang tải chi tiết…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && protocol && (
        <>
          {/* Thông tin chung */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{protocol.title}</h2>
            <p className="text-gray-700 mb-2">{protocol.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <div>
                Tạo lúc:{" "}
                {protocol.createdAt
                  ? new Date(protocol.createdAt).toLocaleString("vi-VN")
                  : "-"}
              </div>
              <div>
                Cập nhật:{" "}
                {protocol.updatedAt
                  ? new Date(protocol.updatedAt).toLocaleString("vi-VN")
                  : "-"}
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">Giá ước tính: </span>
              {protocol.estimatedPrice.toLocaleString("vi-VN")} đ
            </div>
            <div className="mt-1 text-sm">
              <span className="font-medium">Trạng thái: </span>
              {protocol.active ? (
                <span className="text-green-600">Hoạt động</span>
              ) : (
                <span className="text-gray-500">Không hoạt động</span>
              )}
            </div>
          </div>

          {/* Phases */}
          <div className="space-y-6">
            {protocol.phases.map((phase) => (
              <div
                key={phase.id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-1">
                  Giai đoạn {phase.position}: {phase.title}
                </h3>
                <p className="text-gray-700 mb-2">{phase.description}</p>
                <div className="text-sm mb-2">
                  <span className="font-medium">Điều chỉnh phần trăm: </span>
                  {phase.phaseModifierPercentage * 100}%
                </div>

                {/* Services */}
                {phase.services && phase.services.length > 0 && (
                  <div className="mb-2">
                    <div className="font-medium mb-1">Services:</div>
                    <ul className="list-disc list-inside">
                      {phase.services.map((s) => (
                        <li key={s.id}>
                          {s.name} – {s.description} –{" "}
                          {s.price.toLocaleString("vi-VN")} đ
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Drugs */}
                {phase.drugs && phase.drugs.length > 0 && (
                  <div>
                    <div className="font-medium mb-1">Drugs:</div>
                    <ul className="list-disc list-inside">
                      {phase.drugs.map((d) => (
                        <li key={d.id}>
                          {d.name} – {d.description} –{" "}
                          {d.price.toLocaleString("vi-VN")} đ
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/manager/protocols"
              className="text-blue-600 hover:underline"
            >
              ← Quay lại danh sách Protocols
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
