// Mock data and types for schedule management

import { getLocalDateFormat } from "@/lib/utils"
import { fetchWrapper } from "."
import type { ApiResponse, PreviewScheduleResponse, ScheduleDetailResponse, ScheduleResult } from "./types"

export interface Patient {
  id: string
  name: string
  phone?: string
  email?: string
  age?: number
  avatar?: string
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  unit: string
  notes?: string
}

export interface Drug {
  id: string
  name: string
  description: string
  price: number
  unit: string
  dosage: string
  instructions: string
  amount: number
}

export interface Schedule {
  id: string
  doctor_id: string
  patient_id: string
  treatment_phase_id?: string
  appointment_datetime: string
  estimated_time?: string
  is_consultation?: boolean
  status: string // Pending, Changed, Done, Cancel
  payment_id?: string
  reason: string
  duration: number
  patient?: Patient
  services?: Service[]
  drugs?: Drug[]
}


export interface ScheduleResultInput {
  scheduleId: string
  doctorsNote: string
}

// Mock data
const mockPatients: Patient[] = [
  {
    id: "schedule-1",
    name: "Nguyễn Thị Lan",
    phone: "0901234567",
    email: "lan.nguyen@email.com",
    age: 32,
  },
  {
    id: "schedule-2",
    name: "Trần Văn Nam",
    phone: "0912345678",
    email: "nam.tran@email.com",
    age: 35,
  },
  {
    id: "schedule-3",
    name: "Lê Thị Hoa",
    phone: "0923456789",
    email: "hoa.le@email.com",
    age: 28,
  },
]

const mockServices: Service[] = [
  {
    id: "schedule-1",
    name: "Siêu âm theo dõi nang trứng",
    description: "Theo dõi sự phát triển của nang trứng trong quá trình kích thích",
    price: 300000,
    unit: "lần",
    notes: "Thực hiện vào buổi sáng, nhịn ăn 4 tiếng trước",
  },
  {
    id: "schedule-2",
    name: "Xét nghiệm hormone FSH, LH",
    description: "Xét nghiệm nồng độ hormone kích thích nang trứng",
    price: 250000,
    unit: "lần",
  },
  {
    id: "schedule-3",
    name: "Chọc hút trứng",
    description: "Thu thập trứng từ buồng trứng",
    price: 5000000,
    unit: "lần",
  },
]

const mockDrugs: Drug[] = [
  {
    id: "schedule-1",
    name: "Gonal-F 450IU",
    description: "Thuốc kích thích buồng trứng",
    price: 1200000,
    unit: "ống",
    dosage: "150IU/ngày",
    instructions: "Tiêm dưới da vào buổi tối, cùng giờ mỗi ngày",
    amount: 1,
  },
  {
    id: "schedule-2",
    name: "Lupron (GnRH Agonist)",
    description: "Thuốc ức chế hormone",
    price: 800000,
    unit: "ống",
    dosage: "0.5ml/ngày",
    instructions: "Tiêm dưới da vào buổi sáng",
    amount: 1,
  },
]

const mockSchedules: Schedule[] = [
  {
    id: "schedule-1",
    doctor_id: "doc1",
    patient_id: "1",
    appointment_datetime: "2024-01-15T09:00:00",
    status: "Done",
    reason: "Khám định kỳ và theo dõi kết quả điều trị",
    duration: 60,
    patient: mockPatients[0],
    services: [mockServices[0], mockServices[1]],
    drugs: [mockDrugs[0]],
  },
  {
    id: "schedule-2",
    doctor_id: "doc1",
    patient_id: "2",
    appointment_datetime: "2024-01-20T14:00:00",
    status: "Pending",
    reason: "Tái khám và đánh giá tiến triển",
    duration: 45,
    patient: mockPatients[1],
    services: [mockServices[1]],
    drugs: [mockDrugs[1]],
  },
  {
    id: "schedule-3",
    doctor_id: "doc1",
    patient_id: "3",
    appointment_datetime: "2025-07-05T10:30:00",
    status: "Changed",
    reason: "Khám cấp cứu - tác dụng phụ thuốc",
    duration: 30,
    patient: mockPatients[2],
    services: [mockServices[0]],
    drugs: [],
  },
]



// API functions
export const getSchedules = async (): Promise<Schedule[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockSchedules
}

export const getTodaySchedules = async (): Promise<Schedule[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  const today = new Date().toISOString().split("T")[0]
  return mockSchedules.filter((schedule) => schedule.appointment_datetime.startsWith(today))
}




export const getDoctorScheduleByDoctorId = async (doctorId: string, date: Date): Promise<ApiResponse<PreviewScheduleResponse[]>> => {
  const response = await fetchWrapper(`schedules/doctor-schedule/${doctorId}?day=${date.getDate()}&month=${date.getMonth()+1}&year=${date.getFullYear()}`, {}, true)

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch doctors');
  }

    return response.json();
}

export const getPatientScheduleInAMonth = async (from: Date, to: Date, status: string[]=["PENDING","CHANGED","CANCELLED","DONE"]):Promise<ApiResponse<ScheduleDetailResponse[]>>=>{
  const response = await fetchWrapper(`schedules/patient?from=${getLocalDateFormat(from)}&to=${getLocalDateFormat(to)}&status=${status.join('&status=')}`,{},true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch doctors');
  }

  return response.json();
}

export const getDoctorScheduleInAMonth = async (from: Date, to: Date, status: string[]=["PENDING","CHANGED","CANCELLED","DONE"]):Promise<ApiResponse<ScheduleDetailResponse[]>>=>{
  const response = await fetchWrapper(`schedules/doctor?from=${getLocalDateFormat(from)}&to=${getLocalDateFormat(to)}&status=${status.join('&status=')}`,{},true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch patients');
  }

  return response.json();
}

export const getPatientScheduleById = async (scheduleId:string):Promise<ApiResponse<ScheduleDetailResponse>>=>{
  const response = await fetchWrapper(`schedules/patient/${scheduleId}`,{},true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch patients');
  }

  return response.json();
}

export const getDoctorScheduleById = async (scheduleId:string):Promise<ApiResponse<ScheduleDetailResponse>>=>{
  const response = await fetchWrapper(`schedules/doctor/${scheduleId}`,{},true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch patients');
  }

  return response.json();
}

export async function markScheduleDone(
  scheduleId: string
): Promise<ScheduleDetailResponse> {
  const res = await fetchWrapper(
    `schedules/done/${scheduleId}`,     // ← nhớ xem baseURL của bạn
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    },
    true
  );


  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Không thể cập nhật trạng thái lịch hẹn');
  }

  return res.json();
}

export const postDoctorNote = async (
  payload: ScheduleResultInput
): Promise<ApiResponse<ScheduleResult>> => {
  const res = await fetchWrapper(
    "schedules/result",
    { method: "POST", body: JSON.stringify(payload) },
    true
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Không thể cập nhật trạng thái lịch hẹn');
  }

  return res.json();
};



