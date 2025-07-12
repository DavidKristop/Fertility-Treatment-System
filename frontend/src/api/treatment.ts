import { fetchWrapper } from ".";
import type { ApiResponse, Treatment, ApiPaginationResponse } from "@/api/types";

export const getMyTreatments = async (
  params?: { page?: number; size?: number; status?: string }
): Promise<ApiPaginationResponse<Treatment>> => {
  const query = new URLSearchParams();
  if (params?.page !== undefined) query.append("page", String(params.page));
  if (params?.size !== undefined) query.append("size", String(params.size));
  if (params?.status) query.append("status", params.status);

  const res = await fetchWrapper(
    `treatments/patient?${query.toString()}`,
    { method: "GET" },
    true
  );

  if (!res.ok) throw new Error("Failed to fetch treatments");

  const data: ApiPaginationResponse<Treatment> = await res.json();
  return data;
};


// Lấy chi tiết 1 treatment theo ID
export const getTreatmentDetail = async (
  id: string
): Promise<ApiResponse<Treatment>> => {
  const res = await fetchWrapper(
    `treatments/patient/${id}`,
    { method: "GET" },
    true
  );

  if (!res.ok) throw new Error("Failed to fetch treatment detail");

  const data: ApiResponse<Treatment> = await res.json();
  return data;
};
