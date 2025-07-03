// Mock data and types for schedule management

import { fetchWrapper } from "."
import type { ApiResponse } from "./types"

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

export interface ScheduleResponse {
  id: string,
  appointmentDateTime: string,
  estimatedTime: string,
  status: string,
}

export interface ScheduleResult {
  id: string
  doctors_note: string
  schedule_id: string
  attachments?: ScheduleResultAttachment[]
}

export interface ScheduleResultAttachment {
  id: string
  attachment_url: string
  schedule_result_id: string
}

export interface ScheduleResultRequest {
  schedule_id: string
  doctors_note: string
  attachments?: File[]
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

const mockScheduleResults: ScheduleResult[] = [
  {
    id: "schedule-1",
    doctors_note:
      "Bệnh nhân phản ứng tốt với điều trị. Nang trứng phát triển bình thường. Tiếp tục theo dõi và điều chỉnh liều thuốc theo kết quả siêu âm.",
    schedule_id: "1",
    attachments: [
      {
        id: "1",
        attachment_url: "/files/ultrasound-20240115.jpg",
        schedule_result_id: "1",
      },
    ],
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

export const getScheduleById = async (id: string): Promise<Schedule | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockSchedules.find((schedule) => schedule.id === id) || null
}

export const getScheduleResult = async (scheduleId: string): Promise<ScheduleResult | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockScheduleResults.find((result) => result.schedule_id === scheduleId) || null
}

export const createScheduleResult = async (data: ScheduleResultRequest): Promise<ScheduleResult> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newResult: ScheduleResult = {
    id: Date.now().toString(),
    doctors_note: data.doctors_note,
    schedule_id: data.schedule_id,
    attachments:
      data.attachments?.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        attachment_url: `/files/${file.name}`,
        schedule_result_id: Date.now().toString(),
      })) || [],
  }

  mockScheduleResults.push(newResult)
  return newResult
}

export const updateScheduleStatus = async (scheduleId: string, status: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const schedule = mockSchedules.find((s) => s.id === scheduleId)
  if (schedule) {
    schedule.status = status
  }
}


export const getDoctorScheduleByDoctorId = async (doctorId: string, date: Date): Promise<ApiResponse<ScheduleResponse[]>> => {
  const response = await fetchWrapper(`schedules/doctor-schedule/${doctorId}?day=${date.getDate()}&month=${date.getMonth()+1}&year=${date.getFullYear()}`, {}, true)

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch doctors');
  }

    return response.json();
}