import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, RequestAppointmentResponse } from "./types";


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

export const getAppointmentRequestToMe = async ({ 
    page = 0, size = 10, patientEmail = "", statuses = ["PENDING", "ACCEPTED", "DENIED"] 
}: {
    page: number,
    size: number,
    patientEmail: string,
    statuses: ("PENDING" | "ACCEPTED" | "DENIED")[]
}) : Promise<ApiPaginationResponse<RequestAppointmentResponse>> => {
    const response = await fetchWrapper(`request-appointments/request-to-me?page=${page}&size=${size}&patientEmail=${patientEmail}&status=${statuses.join('&status=')}`, 
        {}, true)
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch appointment requests');
    }
    return response.json();
}

export const getMyAppointmentRequests = async ({ 
    page = 0, size = 10, doctorEmail = "", statuses = ["PENDING", "ACCEPTED", "DENIED"] 
}: {
    page: number,
    size: number,
    doctorEmail: string,
    statuses: ("PENDING" | "ACCEPTED" | "DENIED")[]
}) : Promise<ApiPaginationResponse<RequestAppointmentResponse>> => {
    const response = await fetchWrapper(`request-appointments/my-request?page=${page}&size=${size}&doctorEmail=${doctorEmail}&status=${statuses.join('&status=')}`, 
        {}, true)
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch appointment requests');
    }
    return response.json();
}

export const acceptRequestAppointment = async (requestId: string):Promise<ApiResponse<RequestAppointmentResponse>> => {
    const res = await fetchWrapper(
      `request-appointments/accept/${requestId}`,
      {
        method: "PUT",
      },
      true
    ); // true: cần token
  
    if (!res.ok) {
      throw new Error("Failed to accept appointment request");
    }
  
    return res.json();
  };
  
  export const rejectRequestAppointment = async (requestId: string, reason: string):Promise<ApiResponse<RequestAppointmentResponse>> => {
    const res = await fetchWrapper(
      `request-appointments/cancel/${requestId}`,
      {
        method: "PUT",
        body: reason,
      },
      true
    );
  
    if (!res.ok) {
      throw new Error("Failed to reject appointment request");
    }
  
    return res.json();
  };
  