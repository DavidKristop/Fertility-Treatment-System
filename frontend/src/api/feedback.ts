import { fetchWrapper } from ".";

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