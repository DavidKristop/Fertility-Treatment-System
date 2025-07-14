import { fetchWrapper } from ".";
import type { ApiPaginationResponse, ServiceResponse } from "./types";

export const getServices = async(
    page=0,
    size=10,
    name:string=""
):Promise<ApiPaginationResponse<ServiceResponse>>=>{
    const response = await fetchWrapper(`services?page=${page}&size=${size}&name=${name}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch services');
    }
    return response.json();
}