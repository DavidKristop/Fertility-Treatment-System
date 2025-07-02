import { fetchWrapper } from ".";
import type { ApiPaginationResponse, DoctorProfile } from "./types";


export const getDoctors = async (): Promise<ApiPaginationResponse<DoctorProfile>> => {
    const response = await fetchWrapper('doctor-management/patient/all-doctors', {}, true);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch doctors');
    }

    return response.json();
};
