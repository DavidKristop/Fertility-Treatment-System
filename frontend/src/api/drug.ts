import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, DrugResponse, DrugCreateRequest } from "./types";

export const getDrugs = async ({ 
  page = 0, 
  size = 10, 
  name = "", 
  isActive = true 
}: {
  page?: number,
  size?: number,
  name?: string,
  isActive?: boolean
} = {}): Promise<ApiPaginationResponse<DrugResponse>> => {
  const response = await fetchWrapper(
    `drugs?page=${page}&size=${size}&name=${encodeURIComponent(name)}&isActive=${isActive}`,
    {}, 
    true
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch drugs');
  }
  
  return response.json();
}

export const getDrugDetail = async (id: string): Promise<ApiResponse<DrugResponse>> => {
  const response = await fetchWrapper(`drugs/${id}`, {}, true);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch drug details');
  }
  
  return response.json();
}

export const createDrug = async (drugData: DrugCreateRequest): Promise<ApiResponse<DrugResponse>> => {
  const response = await fetchWrapper(
    'drugs',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drugData),
    },
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create drug');
  }

  return response.json();
}