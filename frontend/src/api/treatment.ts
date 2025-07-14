import { fetchWrapper } from ".";
import type { ApiResponse, Treatment, ApiPaginationResponse, TreatmentCreateRequest } from "@/api/types";

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



export const createTreatment = async (newTreatment: TreatmentCreateRequest): Promise<ApiResponse<Treatment>>=>{
  const response = await fetchWrapper("treatments", {
    method: "POST",
    body: JSON.stringify(newTreatment),
  }, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create treatment');
  }

  return response.json();
}

export const getTreatmentICreated = async (
  page = 0,
  size = 10,
  patientEmail = "",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
): Promise<ApiPaginationResponse<Treatment>> => {
  const response = await fetchWrapper(`treatments/doctor?page=${page}&size=${size}&email=${patientEmail}&status=${status.join('&status=')}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatments');
  }
  return response.json();
}

export const existByPatientId = async (
  patientId="",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
): Promise<ApiResponse<boolean>> => {
  const response = await fetchWrapper(`treatments/doctor/exist/${patientId}?status=${status.join('&status=')}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatments');
  }
  return response.json();
}
