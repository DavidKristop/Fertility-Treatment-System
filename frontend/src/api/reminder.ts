import { fetchWrapper } from ".";
import type { ApiPaginationResponse, ApiResponse, Reminder } from "./types";


export const getAllOfMyReminder = async({ 
    page = 0, size = 10 
}: {
    page: number,
    size: number,
}):Promise<ApiPaginationResponse<Reminder>>=>{
    const response = await fetchWrapper("reminder?page="+page+"&size="+size, {}, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch reminders');
    }
    return response.json();
}

export const readReminder = async(id:string):Promise<ApiResponse<Reminder>>=>{
    const response = await fetchWrapper(`reminder/read/${id}`, {
        method: "PUT",
    }, true)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to read reminder');
    }
    return response.json();
}