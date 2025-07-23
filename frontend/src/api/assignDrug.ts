import { fetchWrapper } from ".";
import type { ApiPaginationResponse, ApiResponse, AssignDrugDetailResponse } from "./types";

export const getAllMyAssignedDrugs = async ({
  page = 0,
  size = 10,
  status = ["PENDING", "COMPLETED", "CANCELLED"],
  title = "",
}: {
  page: number;
  size: number;
  status?: ("PENDING" | "COMPLETED" | "CANCELLED")[];
  title: string;
}): Promise<ApiPaginationResponse<AssignDrugDetailResponse>> => {
  const statusParams = status.map(status => `status=${status}`).join('&');
  const response = await fetchWrapper(
    `assign-drug/patient?page=${page}&title=${title}&size=${size}&${statusParams}`,
    {},
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch assigned drugs");
  }
  return response.json();
};

export const getAssignDrugById = async (id: string): Promise<ApiResponse<AssignDrugDetailResponse>> => {
  const response = await fetchWrapper(`assign-drug/patient/${id}`, {}, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy thông tin thuốc");
  }

  return response.json()
};

export const getAllAssignedDrugsForDoctor = async({
  page = 0,
  size = 10,
  status = ["PENDING", "COMPLETED", "CANCELLED"],
  title = "",
}: {
  page?: number;
  size?: number;
  status?: ("PENDING" | "COMPLETED" | "CANCELLED")[];
  title?: string;
}): Promise<ApiPaginationResponse<AssignDrugDetailResponse>> => {
  const statusParams = status.map(status => `status=${status}`).join('&');
  const url = `assign-drug/doctor?page=${page}&title=${title}&size=${size}&${statusParams}`;

  const response = await fetchWrapper(url, {}, true);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy danh sách thuốc");
  }
  return response.json();
};

// Manager: lấy danh sách thuốc được kê
export const getAllAssignedDrugsForStaff = async ({
  page = 0,
  size = 10,
  status = ["PENDING", "COMPLETED", "CANCELLED"],
  title = "",
}: {
  page?: number;
  size?: number;
  status?: ("PENDING" | "COMPLETED" | "CANCELLED")[];
  title?: string;
}): Promise<ApiPaginationResponse<AssignDrugDetailResponse>> => {
  const statusParams = status.map(status => `status=${status}`).join('&');
  const url = `assign-drug/manager?page=${page}&title=${title}&size=${size}&${statusParams}`;

  const response = await fetchWrapper(url, {}, true);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy danh sách thuốc");
  }
  return response.json();
};

export const getAssignDrugByIdForStaff = async (id: string): Promise<ApiResponse<AssignDrugDetailResponse>> => {
  const response = await fetchWrapper(`assign-drug/manager/${id}`, {}, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy thông tin thuốc");
  }

  return response.json()
};

export const getAssignDrugByIdForDoctor = async (id: string): Promise<ApiResponse<AssignDrugDetailResponse>> => {
  const response = await fetchWrapper(`assign-drug/doctor/${id}`, {}, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy thông tin thuốc");
  }

  return response.json()
};


export const markAssignDrugAsTaken = async (id: string): Promise<ApiResponse<AssignDrugDetailResponse>> => {
  const response = await fetchWrapper(`assign-drug/manager/complete/${id}`, {
    method: "PUT",
  }, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi đánh dấu là đã dùng thuốc");
  }

  return response.json()
};

export const cancelAssignDrug = async (id: string): Promise<ApiResponse<AssignDrugDetailResponse>> => {
  const response = await fetchWrapper(`assign-drug/manager/cancel/${id}`, {
    method: "PUT",
  }, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi huỷ thuốc");
  }

  return response.json()
};