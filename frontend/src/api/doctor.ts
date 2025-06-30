import { fetchWrapper } from "."
import type { DoctorProfile } from "./types"

export const getDoctorProfile = async (): Promise<DoctorProfile> => {
  const response = await fetchWrapper(
    "doctor/profile",
    {
      method: "GET",
    },
    true,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch doctor profile")
  }

  return response.json()
}

export const updateDoctorProfile = async (data: Partial<DoctorProfile>): Promise<DoctorProfile> => {
  const response = await fetchWrapper(
    "doctor/profile",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    true,
  )

  if (!response.ok) {
    throw new Error("Failed to update doctor profile")
  }

  return response.json()
}
