import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, PaymentResponse } from "./types";


export const getPaymentDetail = async (id: string): Promise<ApiResponse<PaymentResponse>>=>{
    const response = await fetchWrapper(`payments/patient/${id}`,{},true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch patient payments');
    }
    return response.json();
}

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

export const getVNPayPaymentUrl = async (paymentId:string): Promise<ApiResponse<string>>=>{
    const response = await fetchWrapper(`payments/patient/process/vnpay/`+paymentId,{method: "PUT"},true);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch patient payments');
    }
    return response.json();
}