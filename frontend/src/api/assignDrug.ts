import { fetchWrapper } from ".";
import type { ApiPaginationResponse, AssignDrugResponse } from "./types";

export const getAllMyAssignedDrugs = async ({
  page = 0,
  size = 10,
  status,
}: {
  page: number;
  size: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED" | "ALL";
}): Promise<ApiPaginationResponse<AssignDrugResponse>> => {
  const statusQuery =
    status === "ALL" ? "" : `&status=${encodeURIComponent(status)}`;
  const response = await fetchWrapper(
    `assign-drugs/my-assign-drugs?page=${page}&size=${size}${statusQuery}`,
    {},
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch assigned drugs");
  }
  return response.json();
};

// Manager: lấy danh sách thuốc được kê
export const getAllAssignedDrugsForManager = async ({
  page = 0,
  size = 10,
  status,
  keyword = "",
}: {
  page?: number;
  size?: number;
  status?: "PENDING" | "COMPLETED" | "CANCELLED" | "ALL";
  keyword?: string;
}): Promise<ApiPaginationResponse<AssignDrugResponse>> => {
  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("size", size.toString());

  // ✅ Chỉ thêm status nếu KHÁC 'ALL'
  if (status && status !== "ALL") {
    query.append("status", status);
  }

  if (keyword) {
    query.append("keyword", keyword);
  }

  const url = `assign-drugs/manager?${query.toString()}`;

  const response = await fetchWrapper(url, {}, true);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi lấy danh sách thuốc");
  }
  return response.json();
};


export const markAssignDrugAsTaken = async (id: string): Promise<void> => {
  const response = await fetchWrapper(`assign-drugs/taken/${id}`, {
    method: "POST",
  }, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi đánh dấu là đã dùng thuốc");
  }
};

export const cancelAssignDrug = async (id: string): Promise<void> => {
  const response = await fetchWrapper(`assign-drugs/cancel/${id}`, {
    method: "POST",
  }, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi huỷ thuốc");
  }
};