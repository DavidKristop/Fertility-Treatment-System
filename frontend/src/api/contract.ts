import { fetchWrapper } from '.';
import type { ApiPaginationResponse, ApiResponse, ContractResponse } from './types';

// Get all contracts for patient (paginated)
export const getPatientCotracts = async ({
    page = 0,
    size = 10,
    isSigned = false
}: {
    page?: number;
    size?: number;
    isSigned?: boolean;
}): Promise<ApiPaginationResponse<ContractResponse>> => {
    const response = await fetchWrapper(
        `contracts/patient?page=${page}&size=${size}&isSigned=${isSigned}`,
        {},
        true
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contracts');
    }
    return response.json();
}

// Get specific contract by ID for patient
export const getPatientContractById = async (id: string): Promise<ApiResponse<ContractResponse>> => {
    const response = await fetchWrapper(`contracts/patient/${id}`, {}, true);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch a contract');
    }
    return response.json();
}

// Get all contracts for manager (paginated)
export const getManagerContracts = async ({
    page = 0,
    size = 10,
    isSigned = false
}: {
    page?: number;
    size?: number;
    isSigned?: boolean;
}): Promise<ApiPaginationResponse<ContractResponse>> => {
    const response = await fetchWrapper(
        `contracts/manager?page=${page}&size=${size}&isSigned=${isSigned}`,
        {},
        true
    );

    if( !response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contracts');
    }

    return response.json();
};

// Get specific contract by ID for manager
export const getManagerContractById = async (id: string): Promise<ApiResponse<ContractResponse>> => {
    const response = await fetchWrapper(`contracts/manager/${id}`, {}, true);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch a contract');
    }
    return response.json();
};

// Sign a contract
export const signContract = async (id: string): Promise<ApiResponse<ContractResponse>> => {
    const response = await fetchWrapper(`contracts/sign/${id}`, 
        {
            method: 'PUT',
        },
        true
    );

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to sign contract');
    }

    return response.json();
};