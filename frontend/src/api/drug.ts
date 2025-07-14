import { fetchWrapper } from ".";
import type { ApiPaginationResponse, DrugResponse } from "./types";

export const getDrugs = async(
    page=0,
    size=10,
    name:string=""
):Promise<ApiPaginationResponse<DrugResponse>>=>{
    const response = await fetchWrapper(`drugs?page=${page}&size=${size}&name=${name}`, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch drugs');
    }
    return response.json();
}