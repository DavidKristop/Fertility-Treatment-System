import { fetchWrapper } from ".";
import type { ApiPaginationResponse, DoctorProfile, ApiResponse, DoctorResponse } from "./types";

export const getDoctors = async (): Promise<ApiPaginationResponse<DoctorProfile>> => {
    const response = await fetchWrapper('doctor-management/patient/all-doctors', {}, true);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch doctors');
    }

    return response.json();
};

export const createDoctor = async (payload: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string; // ISO format yyyy-mm-dd
  password: string;
  specialty: string;
  degree: string;
  yearsOfExperience: number;
  licenseNumber: string;
}): Promise<ApiResponse<DoctorResponse>> => {
  const res = await fetchWrapper("doctor-management/new-doctor", {
    method: "POST",
    body: JSON.stringify(payload),
  }, true);

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Không thể tạo tài khoản bác sĩ");
  }

  return res.json();
};