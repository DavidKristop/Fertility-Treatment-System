import { getLocalDateFormat, getLocalDateTimeFormat } from "@/lib/utils";
import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, PhaseResponse, TreatmentCreateRequest, TreatmentPhaseSetRequest, TreatmentResponse } from "./types"
// Lấy danh sách treatment của patient có phân trang
export const getMyTreatments = async (params?: {
  page?: number;
  size?: number;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page !== undefined) query.append("page", String(params.page));
  if (params?.size !== undefined) query.append("size", String(params.size));
  if (params?.status) query.append("status", params.status);


  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/treatments/patient?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch treatments");
  return res.json();
};

// Lấy chi tiết 1 treatment theo ID
export const getTreatmentDetail = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/treatments/patient/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch treatment detail");
  return res.json();
};



export const createTreatment = async (newTreatment: TreatmentCreateRequest): Promise<ApiResponse<TreatmentResponse>>=>{
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
): Promise<ApiPaginationResponse<TreatmentResponse>> => {
  const response = await fetchWrapper(`treatments/doctor?page=${page}&size=${size}&email=${patientEmail}&status=${status.join('&status=')}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatments');
  }
  return response.json();
}

export const getTreatmentDetaiICreated = async(treatmentId:string):Promise<ApiResponse<TreatmentResponse>>=>{
  const response = await fetchWrapper(`treatments/doctor/${treatmentId}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatment detail');
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

export const setTreatmentPhase = async(phase: TreatmentPhaseSetRequest): Promise<ApiResponse<PhaseResponse>>=>{
  const response = await fetchWrapper(`treatment-phases/set`, {
    method: "PUT",
    body: JSON.stringify({
      ...phase,
      schedules: phase.schedules.map((schedule) => ({
        ...schedule,
        appointmentDateTime: getLocalDateTimeFormat(schedule.appointmentDateTime),
        estimatedTime: getLocalDateTimeFormat(schedule.estimatedTime),
      })),
    }),
  }, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to set treatment phase');
  }
  return response.json();
}
