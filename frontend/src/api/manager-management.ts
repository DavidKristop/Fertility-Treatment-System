import type { ManagerRegisterFormValues } from "@/lib/validations/auth";
import { fetchWrapper } from ".";
import type { ApiResponse, UserResponse } from "./types";

export const createManager = async (newManager:ManagerRegisterFormValues):Promise<ApiResponse<UserResponse>>=>{
    const res = await fetchWrapper("manager-management/new-manager", {
        method: "POST",
        body: JSON.stringify(newManager),
      }, true);
    if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || "Không thể tạo tài khoản quản lý");
    }

    return res.json();
}