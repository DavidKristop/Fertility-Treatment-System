import { getLocalDateTimeFormat } from "@/lib/utils";
import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, PhaseResponse, TreatmentCreateRequest, TreatmentPhaseSetRequest, TreatmentResponse, TreatmentStatus } from "./types"
// Lấy danh sách treatment của patient có phân trang
export const getMyTreatments = async ({
  page =0,
  size = 10,
  title = "",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
}: {
  page?: number;
  size?: number;
  title?: string;
  status?: TreatmentStatus[];
}): Promise<ApiPaginationResponse<TreatmentResponse>> => {

  const res = await fetchWrapper(
    `treatments/patient?page=${page}&size=${size}&title=${title}&status=${status.join('&status=')}`,
    { method: "GET" },
    true
  );

  if (!res.ok) throw new Error("Failed to fetch treatments");

  const data: ApiPaginationResponse<TreatmentResponse> = await res.json();
  return data;
};


// Lấy chi tiết 1 treatment theo ID
export const getTreatmentDetail = async (
  id: string
): Promise<ApiResponse<TreatmentResponse>> => {
  const res = await fetchWrapper(
    `treatments/patient/${id}`,
    { method: "GET" },
    true
  );

  if (!res.ok) throw new Error("Failed to fetch treatment detail");

  const data: ApiResponse<TreatmentResponse> = await res.json();
  return data;
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
  title = "",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
): Promise<ApiPaginationResponse<TreatmentResponse>> => {
  const response = await fetchWrapper(`treatments/doctor?page=${page}&size=${size}&title=${title}&status=${status.join('&status=')}`, {}, true)

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


export const moveToNextPhase = async(treatmentId:string):Promise<ApiResponse<TreatmentResponse>>=>{
  const response = await fetchWrapper(`treatments/next-phase/${treatmentId}`, {method: "PUT"}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to move to next phase');
  }
  return response.json();
}