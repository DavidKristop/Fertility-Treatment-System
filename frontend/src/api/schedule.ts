// Schedule API for appointment management
export interface Patient {
  id: string
  name: string
  age: number
  phone: string
  email?: string
  avatar?: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  licenseNumber: string
}

export interface Service {
  id: string
  name: string
  price: number
  notes?: string
}

export interface Drug {
  id: string
  name: string
  dosage: string
  instructions: string
  amount: number
}

export interface Schedule {
  id: string
  doctor_id: string
  patient_id: string
  treatment_phase_id: string
  appointment_datetime: string
  estimated_time: string
  is_consultation: boolean
  status: "Pending" | "Changed" | "Done" | "Cancel"
  payment_id?: string
  patient: Patient
  doctor: Doctor
  services: Service[]
  drugs: Drug[]
  reason: string
  duration: number
}

export interface ScheduleResultRequest {
  schedule_id: string
  doctors_note: string
  attachments?: File[]
}

export interface ScheduleResult {
  id: string
  doctors_note: string
  schedule_id: string
  attachments?: string[]
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
        notes: "Kiểm tra phát triển phôi thai",
      },
      {
        id: "svc002",
        name: "Siêu âm kiểm tra",
        price: 200000,
        notes: "Siêu âm 4D",
      },
    ],
    drugs: [
      {
        id: "drug001",
        name: "Folic Acid",
        dosage: "5mg",
        instructions: "Uống 1 viên mỗi ngày sau bữa sáng",
        amount: 30,
      },
      {
        id: "drug002",
        name: "Vitamin D3",
        dosage: "1000IU",
        instructions: "Uống 1 viên mỗi ngày sau bữa tối",
        amount: 60,
      },
    ],
    reason: "Tái khám IVF - Giai đoạn 2",
    duration: 30,
  },
  {
    id: "2",
    doctor_id: "doc123",
    patient_id: "pat002",
    treatment_phase_id: "phase-002",
    appointment_datetime: new Date().toISOString().split("T")[0] + "T10:30:00",
    estimated_time: new Date().toISOString().split("T")[0] + "T10:50:00",
    is_consultation: true,
    status: "Pending",
    patient: {
      id: "pat002",
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
    },
    doctor: {
      id: "doc123",
      name: "Bác sĩ Nguyễn Văn A",
      specialty: "Sản phụ khoa",
      licenseNumber: "MD12345",
    },
    services: [
      {
        id: "svc003",
        name: "Tư vấn kết quả xét nghiệm",
        price: 300000,
        notes: "Phân tích kết quả xét nghiệm hormone",
      },
    ],
    drugs: [
      {
        id: "drug003",
        name: "Clomiphene",
        dosage: "50mg",
        instructions: "Uống từ ngày 3-7 của chu kỳ kinh nguyệt",
        amount: 5,
      },
    ],
    reason: "Tư vấn kết quả xét nghiệm",
    duration: 20,
  },
  {
    id: "3",
    doctor_id: "doc123",
    patient_id: "pat003",
    treatment_phase_id: "phase-003",
    appointment_datetime: new Date().toISOString().split("T")[0] + "T14:00:00",
    estimated_time: new Date().toISOString().split("T")[0] + "T14:45:00",
    is_consultation: false,
    status: "Done",
    patient: {
      id: "pat003",
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
    },
    doctor: {
      id: "doc123",
      name: "Bác sĩ Nguyễn Văn A",
      specialty: "Sản phụ khoa",
      licenseNumber: "MD12345",
    },
    services: [
      {
        id: "svc004",
        name: "Khám đầu - Tư vấn IUI",
        price: 400000,
        notes: "Tư vấn phương pháp thụ tinh nhân tạo",
      },
    ],
    drugs: [
      {
        id: "drug004",
        name: "Metformin",
        dosage: "500mg",
        instructions: "Uống 2 lần/ngày sau bữa ăn",
        amount: 60,
      },
    ],
    reason: "Khám đầu - Tư vấn IUI",
    duration: 45,
  },
  {
    id: "4",
    doctor_id: "doc123",
    patient_id: "pat004",
    treatment_phase_id: "phase-004",
    appointment_datetime: new Date().toISOString().split("T")[0] + "T15:30:00",
    estimated_time: new Date().toISOString().split("T")[0] + "T16:00:00",
    is_consultation: false,
    status: "Pending",
    patient: {
      id: "pat004",
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
    },
    doctor: {
      id: "doc123",
      name: "Bác sĩ Nguyễn Văn A",
      specialty: "Sản phụ khoa",
      licenseNumber: "MD12345",
    },
    services: [
      {
        id: "svc005",
        name: "Theo dõi sau chuyển phôi",
        price: 350000,
        notes: "Kiểm tra tình trạng sau chuyển phôi",
      },
    ],
    drugs: [
      {
        id: "drug005",
        name: "Progesterone",
        dosage: "200mg",
        instructions: "Đặt âm đạo 2 lần/ngày",
        amount: 30,
      },
    ],
    reason: "Theo dõi sau chuyển phôi",
    duration: 30,
  },
]

// API functions
export const getScheduleById = async (id: string): Promise<Schedule | null> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const schedule = mockSchedules.find((s) => s.id === id)
  return schedule || null
}

export const getTodaySchedules = async (): Promise<Schedule[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockSchedules
}

export const createScheduleResult = async (data: ScheduleResultRequest): Promise<ScheduleResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const result: ScheduleResult = {
    id: `result_${Date.now()}`,
    doctors_note: data.doctors_note,
    schedule_id: data.schedule_id,
    attachments: data.attachments?.map((file) => `uploads/${file.name}`) || [],
  }

  return result
}

export const getScheduleResult = async (scheduleId: string): Promise<ScheduleResult | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return null
}
