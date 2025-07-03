import { fetchWrapper } from ".";
import type { ApiResponse, PatientDashboardPayloadResponse } from "./types";

export const getPatientDashBoardData =async (): Promise<ApiResponse<PatientDashboardPayloadResponse>> => {
  const response = await fetchWrapper('patient-management/am-i-busy',{},true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch patient dashboard data');
  }
  return response.json()
}