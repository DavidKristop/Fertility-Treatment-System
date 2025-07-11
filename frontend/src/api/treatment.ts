// Mock data for treatment-related API calls

import { fetchWrapper } from "."
import type { ApiPaginationResponse, ApiResponse, PhaseReponse, Treatment, TreatmentCreateRequest, TreatmentPhaseSetRequest } from "./types"

export interface TreatmentPlan {
  id: string
  patient_id: string
  patient_name: string
  patient_email: string
  protocol_id: string
  protocol_name: string
  diagnosis: string
  description: string
  start_date: string
  status: "In Progress" | "Completed" | "Paused" | "Cancelled"
  current_phase: string
  progress: number
  next_appointment?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  price: number
  unit: string
  category: string
}

export interface Drug {
  id: string
  name: string
  price: number
  unit: string
  category: string
}

export interface TreatmentPhase {
  id: string
  title: string
  description: string
  order: number
}

// Mock treatment plans data
const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: "tp-001",
    patient_id: "550e8400-e29b-41d4-a716-446655440011",
    patient_name: "Nguyễn Thị Lan",
    patient_email: "lan.nguyen@email.com",
    protocol_id: "550e8400-e29b-41d4-a716-446655440021",
    protocol_name: "IVF Long Protocol",
    diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
    description: "Kế hoạch điều trị IVF với phác đồ dài hạn, bao gồm kích thích buồng trứng và chuyển phôi",
    start_date: "2024-01-15",
    status: "In Progress",
    current_phase: "Kích thích buồng trứng",
    progress: 45,
    next_appointment: "2024-02-10",
    created_at: "2024-01-10T08:00:00Z",
    updated_at: "2024-02-05T10:30:00Z",
  },
  {
    id: "tp-002",
    patient_id: "550e8400-e29b-41d4-a716-446655440012",
    patient_name: "Trần Văn Nam",
    patient_email: "minh.tran@email.com",
    protocol_id: "550e8400-e29b-41d4-a716-446655440022",
    protocol_name: "IUI Natural Protocol",
    diagnosis: "Vô sinh thứ phát do yếu tố nam",
    description: "Kế hoạch điều trị IUI tự nhiên với theo dõi rụng trứng",
    start_date: "2024-02-01",
    status: "In Progress",
    current_phase: "Theo dõi rụng trứng",
    progress: 30,
    next_appointment: "2024-02-15",
    created_at: "2024-01-25T09:15:00Z",
    updated_at: "2024-02-08T14:20:00Z",
  },
  {
    id: "tp-003",
    patient_id: "550e8400-e29b-41d4-a716-446655440013",
    patient_name: "Lê Thị Hoa",
    patient_email: "hoa.le@email.com",
    protocol_id: "550e8400-e29b-41d4-a716-446655440023",
    protocol_name: "IVF Short Protocol",
    diagnosis: "Vô sinh nguyên phát do tuổi cao",
    description: "Kế hoạch điều trị IVF với phác đồ ngắn hạn phù hợp với tuổi",
    start_date: "2024-01-20",
    status: "Completed",
    current_phase: "Hoàn thành",
    progress: 100,
    created_at: "2024-01-15T11:00:00Z",
    updated_at: "2024-03-20T16:45:00Z",
  },
]

// Mock services data
const mockServices: Service[] = [
  { id: "srv-001", name: "Siêu âm theo dõi nang trứng", price: 200000, unit: "lần", category: "Chẩn đoán" },
  { id: "srv-002", name: "Xét nghiệm hormone FSH, LH", price: 350000, unit: "lần", category: "Xét nghiệm" },
  { id: "srv-003", name: "Chọc hút trứng", price: 5000000, unit: "lần", category: "Thủ thuật" },
  { id: "srv-004", name: "Chuyển phôi", price: 3000000, unit: "lần", category: "Thủ thuật" },
  { id: "srv-005", name: "Thụ tinh nhân tạo (IUI)", price: 2500000, unit: "lần", category: "Thủ thuật" },
  { id: "srv-006", name: "Xét nghiệm Beta HCG", price: 150000, unit: "lần", category: "Xét nghiệm" },
  { id: "srv-007", name: "Siêu âm thai", price: 300000, unit: "lần", category: "Chẩn đoán" },
  { id: "srv-008", name: "Tư vấn dinh dưỡng", price: 500000, unit: "buổi", category: "Tư vấn" },
]

// Mock drugs data
const mockDrugs: Drug[] = [
  { id: "drug-001", name: "Gonal-F 450IU", price: 1200000, unit: "lọ", category: "Kích thích buồng trứng" },
  { id: "drug-002", name: "Puregon 300IU", price: 1000000, unit: "lọ", category: "Kích thích buồng trứng" },
  { id: "drug-003", name: "Cetrotide 0.25mg", price: 800000, unit: "lọ", category: "Ngăn rụng trứng sớm" },
  { id: "drug-004", name: "Ovitrelle 250mcg", price: 600000, unit: "lọ", category: "Kích thích rụng trứng" },
  { id: "drug-005", name: "Duphaston 10mg", price: 150000, unit: "hộp", category: "Hỗ trợ hoàng thể" },
  { id: "drug-006", name: "Folic Acid 5mg", price: 50000, unit: "hộp", category: "Vitamin" },
  { id: "drug-007", name: "Progesterone 200mg", price: 200000, unit: "hộp", category: "Hỗ trợ hoàng thể" },
  { id: "drug-008", name: "Estradiol 2mg", price: 180000, unit: "hộp", category: "Hormone" },
]

// Mock treatment protocol phases
const mockProtocolPhases: Record<string, TreatmentPhase[]> = {
  "550e8400-e29b-41d4-a716-446655440021": [
    // IVF Long Protocol
    { id: "phase-001", title: "Chuẩn bị", description: "Khám sàng lọc, xét nghiệm cơ bản", order: 1 },
    { id: "phase-002", title: "Ức chế buồng trứng", description: "Sử dụng thuốc ức chế GnRH", order: 2 },
    { id: "phase-003", title: "Kích thích buồng trứng", description: "Tiêm thuốc kích thích FSH/LH", order: 3 },
    { id: "phase-004", title: "Theo dõi nang trứng", description: "Siêu âm và xét nghiệm hormone", order: 4 },
    { id: "phase-005", title: "Chọc hút trứng", description: "Thủ thuật lấy trứng", order: 5 },
    { id: "phase-006", title: "Thụ tinh và nuôi cấy phôi", description: "Kết hợp tinh trùng và trứng", order: 6 },
    { id: "phase-007", title: "Chuyển phôi", description: "Đưa phôi vào tử cung", order: 7 },
    { id: "phase-008", title: "Theo dõi thai", description: "Xét nghiệm và siêu âm thai", order: 8 },
  ],
  "550e8400-e29b-41d4-a716-446655440023": [
    // IVF Short Protocol
    { id: "phase-101", title: "Chuẩn bị", description: "Khám sàng lọc, xét nghiệm cơ bản", order: 1 },
    { id: "phase-102", title: "Kích thích buồng trứng", description: "Tiêm thuốc kích thích FSH/LH", order: 2 },
    { id: "phase-103", title: "Theo dõi nang trứng", description: "Siêu âm và xét nghiệm hormone", order: 3 },
    { id: "phase-104", title: "Chọc hút trứng", description: "Thủ thuật lấy trứng", order: 4 },
    { id: "phase-105", title: "Thụ tinh và nuôi cấy phôi", description: "Kết hợp tinh trùng và trứng", order: 5 },
    { id: "phase-106", title: "Chuyển phôi", description: "Đưa phôi vào tử cung", order: 6 },
    { id: "phase-107", title: "Theo dõi thai", description: "Xét nghiệm và siêu âm thai", order: 7 },
  ],
  "550e8400-e29b-41d4-a716-446655440022": [
    // IUI Natural Protocol
    { id: "phase-201", title: "Chuẩn bị", description: "Khám sàng lọc, xét nghiệm cơ bản", order: 1 },
    { id: "phase-202", title: "Theo dõi rụng trứng", description: "Siêu âm theo dõi chu kỳ tự nhiên", order: 2 },
    { id: "phase-203", title: "Thụ tinh nhân tạo", description: "Đưa tinh trùng vào tử cung", order: 3 },
    { id: "phase-204", title: "Theo dõi thai", description: "Xét nghiệm và siêu âm thai", order: 4 },
  ],
  "550e8400-e29b-41d4-a716-446655440024": [
    // IUI Stimulated Protocol
    { id: "phase-301", title: "Chuẩn bị", description: "Khám sàng lọc, xét nghiệm cơ bản", order: 1 },
    { id: "phase-302", title: "Kích thích buồng trứng nhẹ", description: "Sử dụng liều thấp FSH", order: 2 },
    { id: "phase-303", title: "Theo dõi nang trứng", description: "Siêu âm và xét nghiệm hormone", order: 3 },
    { id: "phase-304", title: "Thụ tinh nhân tạo", description: "Đưa tinh trùng vào tử cung", order: 4 },
    { id: "phase-305", title: "Theo dõi thai", description: "Xét nghiệm và siêu âm thai", order: 5 },
  ],
}

// API functions
export const getTreatmentPlans = async (): Promise<TreatmentPlan[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockTreatmentPlans
}

export const getTreatmentPlan = async (id: string): Promise<TreatmentPlan | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockTreatmentPlans.find((plan) => plan.id === id) || null
}

export const getAvailableServices = async (): Promise<Service[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockServices
}

export const getAvailableDrugs = async (): Promise<Drug[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockDrugs
}

export const getTreatmentProtocolPhases = async (protocolId: string): Promise<TreatmentPhase[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))
  return mockProtocolPhases[protocolId] || []
}

export const createTreatmentPlan = async (data: Partial<TreatmentPlan>): Promise<TreatmentPlan> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newPlan: TreatmentPlan = {
    id: `tp-${Date.now()}`,
    patient_id: data.patient_id || "",
    patient_name: data.patient_name || "",
    patient_email: data.patient_email || "",
    protocol_id: data.protocol_id || "",
    protocol_name: data.protocol_name || "",
    diagnosis: data.diagnosis || "",
    description: data.description || "",
    start_date: data.start_date || new Date().toISOString().split("T")[0],
    status: "In Progress",
    current_phase: "Chuẩn bị",
    progress: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  mockTreatmentPlans.push(newPlan)
  return newPlan
}

export const updateTreatmentPlan = async (id: string, data: Partial<TreatmentPlan>): Promise<TreatmentPlan | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const index = mockTreatmentPlans.findIndex((plan) => plan.id === id)
  if (index === -1) return null

  mockTreatmentPlans[index] = {
    ...mockTreatmentPlans[index],
    ...data,
    updated_at: new Date().toISOString(),
  }

  return mockTreatmentPlans[index]
}

export const deleteTreatmentPlan = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const index = mockTreatmentPlans.findIndex((plan) => plan.id === id)
  if (index === -1) return false

  mockTreatmentPlans.splice(index, 1)
  return true
}


export const createTreatment = async (newTreatment: TreatmentCreateRequest): Promise<ApiResponse<Treatment>>=>{
  const response = await fetchWrapper("treatments", {
    method: "POST",
    body: JSON.stringify(newTreatment),
  }, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create treatment');
  }

  return response.json();
}

export const getTreatmentICreated = async (
  page = 0,
  size = 10,
  patientEmail = "",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
): Promise<ApiPaginationResponse<Treatment>> => {
  const response = await fetchWrapper(`treatments/doctor?page=${page}&size=${size}&email=${patientEmail}&status=${status.join('&status=')}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatments');
  }
  return response.json();
}

export const getTreatmentDetaiICreated = async(treatmentId:string):Promise<ApiResponse<Treatment>>=>{
  const response = await fetchWrapper(`treatments/doctor/${treatmentId}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatment detail');
  }
  return response.json();
}

export const existByPatientId = async (
  patientId="",
  status = ["IN_PROGRESS", "COMPLETED", "CANCELLED", "AWAITING_CONTRACT_SIGNED"]
): Promise<ApiResponse<boolean>> => {
  const response = await fetchWrapper(`treatments/doctor/exist/${patientId}?status=${status.join('&status=')}`, {}, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch treatments');
  }
  return response.json();
}

export const setTreatmentPhase = async(phase: TreatmentPhaseSetRequest): Promise<ApiResponse<PhaseReponse>>=>{
  const response = await fetchWrapper(`treatment-phases/set`, {
    method: "PUT",
    body: JSON.stringify(phase),
  }, true)

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to set treatment phase');
  }
  return response.json();
}
