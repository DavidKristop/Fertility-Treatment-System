import { fetchWrapper } from "./index";

export const acceptRequestAppointment = (requestId: string) => {
  return fetchWrapper(
    `request-appointments/accept/${requestId}`,
    {
      method: "PUT",
    },
    true
  ); // true: cần token
};

export const rejectRequestAppointment = (requestId: string, reason: string) => {
  return fetchWrapper(
    `request-appointments/cancel/${requestId}`,
    {
      method: "PUT",
      body: JSON.stringify({ reason }),
    },
    true
  );
};

function getAccessToken() {
  return localStorage.getItem("access_token") // hoặc lấy từ context
}
export const getDoctorPendingAppointments = async () => {
  const accessToken = getAccessToken();
  const res = await fetch("/api/request-appointments/request-to-me?status=PENDING&page=0&size=20", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include", // nếu backend dùng cookie cho auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pending appointments");
  }

  const result = await res.json();
  if (!result.payload || !result.payload.content) {
    throw new Error('Invalid response structure');
  }

  return result.payload.content;
};
