import { fetchWrapper } from ".";
import type { ApiPaginationResponse, PatientProfile } from "./types";


export const getPatients = async (email:string, page = 0, size = 10): Promise<ApiPaginationResponse<PatientProfile>> => {
    const response = await fetchWrapper(`patient-management?email=${email}&page=${page}&size=${size}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch patients');
    }
    return response.json();
}