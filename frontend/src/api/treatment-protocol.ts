import { fetchWrapper } from ".";
import type { ApiPaginationResponse, ProtocolResponse } from "./types";


export const getProtocols = async (
    page = 0,
    size = 10,
    title = ""
):Promise<ApiPaginationResponse<ProtocolResponse>>=>{
    const response = await fetchWrapper(`protocols?page=${page}&size=${size}&title=${title}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch protocols');
    }
    return response.json();
}