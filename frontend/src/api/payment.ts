import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, PaymentResponse, PaymentStatus } from "./types";


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
    statuses: (PaymentStatus)[]
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

export const getStaffPayments = async ({
    page = 0, 
    size = 10, 
    email = "", 
    statuses = ["PENDING", "COMPLETED", "CANCELED"]
}: {
    page?: number,
    size?: number,
    email?: string,
    statuses?: ("PENDING" | "COMPLETED" | "CANCELED")[]
} = {}): Promise<ApiPaginationResponse<PaymentResponse>> => {
    const statusParams = statuses.map(status => `status=${status}`).join('&');
    const emailParam = email ? `&email=${encodeURIComponent(email)}` : '';
    
    const response = await fetchWrapper(
        `payments/manager?page=${page}&size=${size}${emailParam}&${statusParams}`,
        {}, 
        true
    );
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch manager payments');
    }
    
    return response.json();
}

export const getStaffPaymentDetail = async (id: string): Promise<ApiResponse<PaymentResponse>> => {
    const response = await fetchWrapper(`payments/manager/${id}`, {}, true);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch payment details');
    }
    
    return response.json();
}

export const processPaymentByStaff = async (
    paymentId: string,
    paymentMethod: "CASH" | "CREDIT_CARD" | "PAYPAL"
): Promise<ApiResponse<PaymentResponse>> => {
    const response = await fetchWrapper(
        `payments/manager/process/${paymentId}?paymentMethod=${paymentMethod}`,
        {
            method: "PUT",
        },
        true
    );

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process payment');
    }

    return response.json();
}

export const cancelPaymentByStaff = async (paymentId: string): Promise<ApiResponse<PaymentResponse>> => {
    const response = await fetchWrapper(
        `payments/manager/cancel/${paymentId}`,
        {
            method: "PUT",
        },
        true
    );

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel payment');
    }

    return response.json();
}