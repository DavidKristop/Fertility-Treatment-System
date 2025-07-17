import { getLocalDateFormat } from "@/lib/utils";
import { fetchWrapper } from ".";
import type { ApiPaginationResponse, ApiResponse, PatientEventResponse, PatientProfile, ScheduleStatus } from "./types";


export const getPatients = async (email:string, page = 0, size = 10): Promise<ApiPaginationResponse<PatientProfile>> => {
    const response = await fetchWrapper(`patient-management?email=${email}&page=${page}&size=${size}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch patients');
    }
    return response.json();
}

export const getEvents = async (
    from: Date,
    to: Date,
    scheduleStatus: ScheduleStatus[] = ["PENDING","CHANGED","CANCELLED","DONE"]
): Promise<ApiResponse<PatientEventResponse>> => {
    const response = await fetchWrapper(`patient-management/patient/events?from=${getLocalDateFormat(from)}&to=${getLocalDateFormat(to)}&scheduleStatus=${scheduleStatus.join('&scheduleStatus=')}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch events');
    }
    return response.json();
}