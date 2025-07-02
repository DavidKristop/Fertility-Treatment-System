import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, ScheduleResponse } from "./types";


export const createRequestAppointment = async ({doctorId, appointmentDatetime}: {doctorId: string, appointmentDatetime: Date}): Promise<ApiResponse<void>> =>{
    const pad = (n: number) => n.toString().padStart(2, "0");
    const localString = `${appointmentDatetime.getFullYear()}-${pad(appointmentDatetime.getMonth() + 1)}-${pad(appointmentDatetime.getDate())}T${pad(appointmentDatetime.getHours())}:${pad(appointmentDatetime.getMinutes())}:00`;
    // Convert to UTC
    const response = await fetchWrapper('request-appointments', {
        method: 'POST',
        body: JSON.stringify({doctorId, appointmentDatetime: localString}),
    },true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to request appointment');
    }
    return response.json();
}

export const getMyAppointmentRequests = async ({ 
    page = 0, size = 10, doctorEmail = "", status = "PENDING" 
}: {
    page: number,
    size: number,
    doctorEmail: string,
    status: "PENDING" | "ACCEPTED" | "DENIED"
}) : Promise<ApiPaginationResponse<ScheduleResponse>> => {
    const response = await fetchWrapper(`request-appointments/my-request?page=${page}&size=${size}&doctorEmail=${doctorEmail}&status=${status}`, 
        {}, true)
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch appointment requests');
    }
    return response.json();
}