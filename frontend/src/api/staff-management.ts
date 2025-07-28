import type { StaffRegisterFormValues } from "@/lib/validations/auth";
import { fetchWrapper } from ".";
import type { ApiResponse, UserResponse } from "./types";

export const createStaff = async (newStaff:StaffRegisterFormValues):Promise<ApiResponse<UserResponse>>=>{
    const res = await fetchWrapper("staff-management/new-staff", {
        method: "POST",
        body: JSON.stringify(newStaff),
      }, true);
    if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Không thể tạo tài khoản nhân viên");
    }

    return res.json();
}