import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, DrugResponse, DrugCreateRequest, DrugUpdateRequest } from "./types";

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

export const updateDrug = async (id: string, drugData: DrugUpdateRequest): Promise<ApiResponse<DrugResponse>> => {
  const response = await fetchWrapper(
    `drugs/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(drugData),
    },
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update drug');
  }

  return response.json();
}

export const deactivateDrug = async (id: string): Promise<ApiResponse<string>> => {
  const response = await fetchWrapper(
    `drugs/deactivate/${id}`,
    {
      method: 'POST',
    },
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to deactivate drug');
  }

  return response.json();
}

export const reactivateDrug = async (id: string): Promise<ApiResponse<string>> => {
  const response = await fetchWrapper(
    `drugs/reactivate/${id}`,
    {
      method: 'POST',
    },
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to reactivate drug');
  }

  return response.json();
}
