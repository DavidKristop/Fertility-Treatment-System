// Schedule API for appointment management

// Interfaces cập nhật theo ERD
export interface Patient {
  id: string // ERD: uuid
  name: string
  age: number
  phone: string
  email?: string
  avatar?: string
}

export interface Doctor {
  id: string // ERD: uuid
  name: string
  specialty: string
  licenseNumber: string
}

export interface Service {
  id: string // ERD: uuid
  name: string
  price: number
  description: string // ERD: thêm description
  unit: string // ERD: thêm unit
  isActive: boolean // ERD: thêm isActive
  notes?: string
}

export interface Drug {
  id: string // ERD: uuid
  name: string
  description: string // ERD: thêm description
  price: number // ERD: thêm price
  isActive: boolean // ERD: thêm isActive
  unit: string // ERD: thêm unit
  dosage: string
  instructions: string
  amount: number
}

export interface Schedule {
  id: string // ERD: uuid
  doctor_id: string // ERD: uuid
  patient_id: string // ERD: uuid
  treatment_phase_id: string // ERD: uuid
  appointment_datetime: string // ERD: datetime
  estimated_time: string // ERD: datetime
  is_consultation: boolean // ERD: binary
  status: "Pending" | "Changed" | "Done" | "Cancel" // ERD: varchar
  payment_id?: string // ERD: uuid - optional relation
  
  // Các trường bổ sung để hiển thị trên UI (không có trong ERD)
  patient: Patient
  doctor: Doctor
  services: Service[]
  drugs: Drug[]
  reason: string
  duration: number
}

export interface ScheduleResult {
  id: string // ERD: uuid
  doctors_note: string // ERD: varchar
  schedule_id: string // ERD: uuid
  attachments?: ScheduleResultAttachment[] // ERD: quan hệ 1-n
}

// Thêm interface mới từ ERD
export interface ScheduleResultAttachment {
  id: string // ERD: uuid
  attachment_url: string // ERD: varchar
  schedule_result_id: string // ERD: uuid
}

export interface ScheduleService {
  id: string // ERD: uuid (thay vì int)
  schedule_id: string // ERD: uuid (thay vì int)
  service_id: string // ERD: uuid (thay vì int)
  notes: string // ERD: varchar
}

export interface ScheduleResultRequest {
  schedule_id: string
  doctors_note: string
  attachments?: File[]
}

// Mock data for today's appointments
const mockSchedules: Schedule[] = [
  {
    id: "1",
    doctor_id: "doc123",
    patient_id: "pat001",
    treatment_phase_id: "phase-001",
    appointment_datetime: new Date().toISOString().split("T")[0] + "T09:00:00",
    estimated_time: new Date().toISOString().split("T")[0] + "T09:30:00",
    is_consultation: false,
    status: "Pending",
    patient: {
      id: "pat001",
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
    },
    doctor: {
      id: "doc123",
      name: "Bác sĩ Nguyễn Văn A",
      specialty: "Sản phụ khoa",
      licenseNumber: "MD12345",
    },
    services: [
      {
        id: "svc001",
        name: "Tái khám IVF - Giai đoạn 2",
        price: 500000,
        description: "Kiểm tra quá trình IVF giai đoạn 2",
        unit: "lần",
        isActive: true,
        notes: "Kiểm tra phát triển phôi thai",
      },
      {
        id: "svc002",
        name: "Siêu âm kiểm tra",
        price: 200000,
        description: "Siêu âm 4D để kiểm tra thai nhi",
        unit: "lần", 
        isActive: true,
        notes: "Siêu âm 4D",
      },
    ],
    drugs: [
      {
        id: "drug001",
        name: "Folic Acid",
        dosage: "5mg",
        description: "Vitamin hỗ trợ phát triển thai nhi",
        price: 50000,
        unit: "viên",
        isActive: true,
        instructions: "Uống 1 viên mỗi ngày sau bữa sáng",
        amount: 30,
      },
      {
        id: "drug002",
        name: "Vitamin D3",
        dosage: "1000IU",
        description: "Vitamin D hỗ trợ hấp thu canxi",
        price: 60000,
        unit: "viên",
        isActive: true,
        instructions: "Uống 1 viên mỗi ngày sau bữa tối",
        amount: 60,
      },
    ],
    reason: "Tái khám IVF - Giai đoạn 2",
    duration: 30,
  },
  // Các mock data khác vẫn giữ nguyên, nhưng cần cập nhật theo format mới
  // ... (giữ nguyên phần còn lại của mock data)
]

// API functions - cập nhật và bổ sung
export const getScheduleById = async (id: string): Promise<Schedule | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const schedule = mockSchedules.find((s) => s.id === id)
  return schedule || null
}

export const getTodaySchedules = async (): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules
}

// Bổ sung API getSchedules theo ERD
export const getSchedules = async (): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules
}

// Bổ sung API getSchedulesByDoctor
export const getSchedulesByDoctor = async (doctorId: string): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules.filter(schedule => schedule.doctor_id === doctorId)
}

// Bổ sung API getSchedulesByPatient
export const getSchedulesByPatient = async (patientId: string): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules.filter(schedule => schedule.patient_id === patientId)
}

// Bổ sung API getSchedulesByDateRange
export const getSchedulesByDateRange = async (
  startDate: string,
  endDate: string
): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules.filter(schedule => {
    const appointmentDate = new Date(schedule.appointment_datetime)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return appointmentDate >= start && appointmentDate <= end
  })
}

// Cập nhật API createScheduleResult thêm attachments
export const createScheduleResult = async (data: ScheduleResultRequest): Promise<ScheduleResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const attachments = data.attachments?.map((file) => ({
    id: `att_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    attachment_url: `uploads/${file.name}`,
    schedule_result_id: `result_${Date.now()}`
  })) || []

  const result: ScheduleResult = {
    id: `result_${Date.now()}`,
    doctors_note: data.doctors_note,
    schedule_id: data.schedule_id,
    attachments: attachments
  }

  return result
}

// Cập nhật API getScheduleResult để trả về đúng cấu trúc
export const getScheduleResult = async (scheduleId: string): Promise<ScheduleResult | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  
  // Mẫu kết quả trả về
  const result: ScheduleResult = {
    id: `result_${scheduleId}`,
    doctors_note: "Bệnh nhân có dấu hiệu phát triển tốt. Cần tiếp tục theo dõi.",
    schedule_id: scheduleId,
    attachments: [
      {
        id: `att_001_${scheduleId}`,
        attachment_url: "uploads/sieu-am.jpg",
        schedule_result_id: `result_${scheduleId}`
      },
      {
        id: `att_002_${scheduleId}`,
        attachment_url: "uploads/xet-nghiem.pdf",
        schedule_result_id: `result_${scheduleId}`
      }
    ]
  }
  
  return Math.random() > 0.3 ? result : null // 70% trả về kết quả, 30% trả về null
}

// Bổ sung API updateScheduleStatus
export const updateScheduleStatus = async (
  scheduleId: string, 
  status: "Pending" | "Changed" | "Done" | "Cancel"
): Promise<Schedule> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = mockSchedules.findIndex(s => s.id === scheduleId)
  if (index === -1) throw new Error('Schedule not found')
  
  mockSchedules[index] = {
    ...mockSchedules[index],
    status
  }
  
  return mockSchedules[index]
}