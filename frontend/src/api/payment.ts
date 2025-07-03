import { fetchWrapper } from "."
import type { ApiPaginationResponse, PaymentResponse } from "./types";


export const getAllOfMyPatientPayment = async ({ 
    page = 0, size = 10, statuses = ["PENDING", "COMPLETED", "CANCELED"] 
}: {
    page: number,
    size: number,
    statuses: ("PENDING" | "COMPLETED" | "CANCELED")[]
}): Promise<ApiPaginationResponse<PaymentResponse>> =>{
    const response = await fetchWrapper(`payments/patient?page=${page}&size=${size}&status=${statuses.join('&status=')}`,
        {}, true)
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch patient payments');
    }
    return response.json();
}