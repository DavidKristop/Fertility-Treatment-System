import type { ApiPaginationResponse, ServiceReponse, ApiResponse } from "@/api/types";
import { fetchWrapper } from ".";

export const getServices = async ({
  page = 0,
  size = 10,
  name = "",
  isActive = true,
}: {
  page?: number;
  size?: number;
  name?: string;
  isActive?: boolean;
}): Promise<ApiPaginationResponse<ServiceReponse>> => {
  const url = `services?page=${page}&size=${size}&name=${encodeURIComponent(name)}&isActive=${isActive}`;
  const res = await fetchWrapper(url, {}, true);
  if (!res.ok) throw new Error("Không thể tải danh sách dịch vụ");
  return res.json();
};

export const getServiceById = async (
  id: string
): Promise<ApiResponse<ServiceReponse>> => {
  const response = await fetchWrapper(`services/${id}`, {}, true);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Không thể lấy dịch vụ");
  }
  return response.json();
};

export const createService = async (payload: {
  name: string;
  description: string;
  price: number;
  unit: string;
}) => {
  const res = await fetchWrapper("services", {
    method: "POST",
    body: JSON.stringify(payload),
  }, true);
  if (!res.ok) throw new Error("Không thể tạo dịch vụ");
  return res.json();
};

export const updateService = async (id: string, payload: {
  name: string;
  description: string;
  price: number;
  unit: string;
}) => {
  const res = await fetchWrapper(`services/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  }, true);
  if (!res.ok) throw new Error("Không thể cập nhật dịch vụ");
  return res.json();
};

export const deactivateService = async (id: string) => {
  const res = await fetchWrapper(`services/deactivate/${id}`, {
    method: "POST",
  }, true);
  if (!res.ok) throw new Error("Không thể vô hiệu hóa dịch vụ");
  return res.json();
};

export const reactivateService = async (id: string) => {
  const res = await fetchWrapper(`services/reactivate/${id}`, {
    method: "POST",
  }, true);
  if (!res.ok) throw new Error("Không thể kích hoạt lại dịch vụ");
  return res.json();
};
