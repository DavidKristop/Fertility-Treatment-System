// Lấy danh sách treatment của patient có phân trang
export const getMyTreatments = async (params?: {
  page?: number;
  size?: number;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page !== undefined) query.append("page", String(params.page));
  if (params?.size !== undefined) query.append("size", String(params.size));
  if (params?.status) query.append("status", params.status);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/treatments/patient?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch treatments");
  return res.json();
};

// Lấy chi tiết 1 treatment theo ID
export const getTreatmentDetail = async (id: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/treatments/patient/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch treatment detail");
  return res.json();
};
