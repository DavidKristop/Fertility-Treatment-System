import { fetchWrapper } from ".";

export interface FeedbackResponse {
  id: string;
  content: string;
  treatmentId: string;
  treatmentName: string;
  patientName: string;
}

export interface FeedbackQuery {
  page?: number;
}

interface FeedbackApiResponse {
  payload: {
    content: FeedbackResponse[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
  };
  success: boolean;
  message: string;
}

export async function createFeedback(treatmentId: string, content: string) {
  const response = await fetchWrapper(
    "feedback/create",
    {
      method: "POST",
      body: JSON.stringify({ treatmentId, content }),
    },
    true
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gửi phản hồi thất bại");
  }

  return response.json();
}

export async function getAllFeedbacks(query: FeedbackQuery): Promise<FeedbackApiResponse> {
  const queryParams = new URLSearchParams();

  if (query.page !== undefined) queryParams.append("page", query.page.toString());

  const response = await fetchWrapper(`feedback/getAll?${queryParams.toString()}`, undefined, true);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lấy danh sách phản hồi thất bại");
  }

  return response.json();
}
