// Mock treatment APIs

interface Service {
  id: string
  name: string
  price: number
  unit: string
}

interface Drug {
  id: string
  name: string
  price: number
  unit: string
}

interface Treatment {
  id: string
  patient_id: string
  protocol_id: string
  start_date: string
  end_date?: string
  diagnosis: string
  paymentMode: string
  status: string
  current_phase: string
  doctor_id: string
}

interface TreatmentPhase {
  id: string
  title: string
  description: string
  total_amount: number
  is_complete: boolean
  position: number
  refund_percentage: number
  phase_modifier_percentage: number
  treatment_id: string
}

interface Patient {
  id: string
  email: string
  name: string
  phone?: string
  age?: number
}

// Mock services for the treatment plans
export const getAvailableServices = async (): Promise<Service[]> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    { id: "s1", name: "Siêu âm theo dõi", price: 300000, unit: "lần" },
    { id: "s2", name: "Xét nghiệm máu", price: 500000, unit: "lần" },
    { id: "s3", name: "Chọc hút trứng", price: 7000000, unit: "lần" },
    { id: "s4", name: "Thụ tinh trong ống nghiệm", price: 10000000, unit: "lần" },
    { id: "s5", name: "Nuôi cấy phôi", price: 5000000, unit: "ngày" },
    { id: "s6", name: "Chuyển phôi", price: 5000000, unit: "lần" },
    { id: "s7", name: "Bơm tinh trùng", price: 3000000, unit: "lần" },
    { id: "s8", name: "Đánh giá nội mạc tử cung", price: 2500000, unit: "lần" },
    { id: "s9", name: "Tư vấn dinh dưỡng", price: 500000, unit: "lần" },
    { id: "s10", name: "Tư vấn tâm lý", price: 600000, unit: "lần" },
  ]
}

// Mock drugs for the treatment plans
export const getAvailableDrugs = async (): Promise<Drug[]> => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    { id: "d1", name: "GnRH Agonist (Lupron)", price: 2000000, unit: "liều" },
    { id: "d2", name: "FSH (Gonal-F)", price: 1500000, unit: "liều" },
    { id: "d3", name: "hCG (Ovidrel)", price: 1000000, unit: "liều" },
    { id: "d4", name: "Progesterone", price: 500000, unit: "viên" },
    { id: "d5", name: "Clomiphene Citrate", price: 300000, unit: "liều" },
    { id: "d6", name: "LH (Luveris)", price: 1200000, unit: "liều" },
    { id: "d7", name: "Estrogen (Estradiol)", price: 450000, unit: "viên" },
    { id: "d8", name: "GnRH Antagonist (Cetrotide)", price: 1800000, unit: "liều" },
    { id: "d9", name: "Menopur", price: 1600000, unit: "liều" },
    { id: "d10", name: "Acid Folic", price: 50000, unit: "hộp" },
  ]
}

// Get all treatments for a doctor
export const getTreatments = async (doctorId?: string): Promise<Treatment[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      patient_id: "550e8400-e29b-41d4-a716-446655440011",
      protocol_id: "550e8400-e29b-41d4-a716-446655440021",
      start_date: "2024-01-10",
      end_date: "2024-03-15",
      diagnosis: "Vô sinh nguyên phát do tắc vòi trứng",
      status: "In Progress",
      paymentMode: "phase",
      current_phase: "550e8400-e29b-41d4-a716-446655440031",
      doctor_id: "doctor1",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      patient_id: "550e8400-e29b-41d4-a716-446655440012",
      protocol_id: "550e8400-e29b-41d4-a716-446655440022",
      start_date: "2024-01-15",
      end_date: "2024-02-20",
      diagnosis: "Vô sinh thứ phát do yếu tố nam giới nhẹ",
      status: "In Progress",
      paymentMode: "full",
      current_phase: "550e8400-e29b-41d4-a716-446655440041",
      doctor_id: "doctor1",
    },
  ]
}

// Get treatment by ID
export const getTreatmentById = async (treatmentId: string): Promise<Treatment | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const treatments = await getTreatments()
  return treatments.find((t) => t.id === treatmentId) || null
}

// Get patients for autocomplete
export const getPatients = async (query?: string): Promise<Patient[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const allPatients = [
    {
      id: "550e8400-e29b-41d4-a716-446655440011",
      email: "nguyenthilan@email.com",
      name: "Nguyễn Thị Lan",
      phone: "0901234567",
      age: 32,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440012",
      email: "tranvannam@email.com",
      name: "Trần Văn Nam",
      phone: "0912345678",
      age: 35,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440013",
      email: "lethihoa@email.com",
      name: "Lê Thị Hoa",
      phone: "0923456789",
      age: 28,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440014",
      email: "phamthanh@email.com",
      name: "Phạm Văn Thành",
      phone: "0934567890",
      age: 40,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440015",
      email: "vominhhang@email.com",
      name: "Võ Minh Hằng",
      phone: "0945678901",
      age: 29,
    },
  ]

  if (!query) return allPatients

  return allPatients.filter(
    (patient) =>
      patient.email.toLowerCase().includes(query.toLowerCase()) ||
      patient.name.toLowerCase().includes(query.toLowerCase()),
  )
}

// Create new treatment
export const createTreatment = async (treatmentData: {
  patient_id: string
  protocol_id: string
  diagnosis: string
  paymentMode: string
  doctor_id: string
}): Promise<Treatment> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simulate API call to create treatment
  const newTreatment: Treatment = {
    id: `treatment-${Date.now()}`,
    ...treatmentData,
    start_date: new Date().toISOString().split("T")[0],
    status: "In Progress",
    current_phase: `phase-${Date.now()}`,
  }

  return newTreatment
}

// Get treatment phases
export const getTreatmentPhases = async (treatmentId: string): Promise<TreatmentPhase[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [
    {
      id: "550e8400-e29b-41d4-a716-446655440030",
      title: "Giai đoạn 1: Khám và tư vấn",
      description: "Khám sức khỏe tổng quát và tư vấn phác đồ điều tr��",
      total_amount: 2000000,
      is_complete: true,
      position: 1,
      refund_percentage: 0.9,
      phase_modifier_percentage: 1.0,
      treatment_id: treatmentId,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440031",
      title: "Giai đoạn 2: Kích thích buồng trứng",
      description: "Sử dụng thuốc kích thích để phát triển nhiều nang noãn",
      total_amount: 15000000,
      is_complete: false,
      position: 2,
      refund_percentage: 0.7,
      phase_modifier_percentage: 1.0,
      treatment_id: treatmentId,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440032",
      title: "Giai đoạn 3: Lấy trứng và thụ tinh",
      description: "Chọc hút trứng và thực hiện thụ tinh trong phòng lab",
      total_amount: 20000000,
      is_complete: false,
      position: 3,
      refund_percentage: 0.5,
      phase_modifier_percentage: 1.0,
      treatment_id: treatmentId,
    },
  ]
}

// Define treatment protocols data structure
export const getTreatmentProtocolPhases = async (protocolId: string) => {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const protocolPhases = {
    "550e8400-e29b-41d4-a716-446655440021": [
      // IVF Long Protocol
      { id: "phase1", title: "Ức chế buồng trứng", description: "Giai đoạn ức chế buồng trứng bằng GnRH agonist" },
      {
        id: "phase2",
        title: "Kích thích buồng trứng",
        description: "Sử dụng FSH/LH để kích thích phát triển nang noãn",
      },
      { id: "phase3", title: "Thu hoạch trứng", description: "Chọc hút trứng từ buồng trứng" },
      { id: "phase4", title: "Nuôi cấy và thụ tinh", description: "Thụ tinh trứng trong phòng lab" },
      { id: "phase5", title: "Chuyển phôi", description: "Chuyển phôi vào buồng tử cung" },
    ],
    "550e8400-e29b-41d4-a716-446655440023": [
      // IVF Short Protocol
      {
        id: "phase1",
        title: "Kích thích buồng trứng",
        description: "Sử dụng FSH/LH để kích thích phát triển nang noãn",
      },
      { id: "phase2", title: "Thu hoạch trứng", description: "Chọc hút trứng từ buồng trứng" },
      { id: "phase3", title: "Nuôi cấy và thụ tinh", description: "Thụ tinh trứng trong phòng lab" },
      { id: "phase4", title: "Chuyển phôi", description: "Chuyển phôi vào buồng tử cung" },
    ],
    "550e8400-e29b-41d4-a716-446655440022": [
      // IUI Natural Protocol
      { id: "phase1", title: "Theo dõi chu kỳ", description: "Theo dõi chu kỳ tự nhiên và sự phát triển nang noãn" },
      { id: "phase2", title: "Bơm tinh trùng", description: "Bơm tinh trùng đã xử lý vào buồng tử cung" },
    ],
    "550e8400-e29b-41d4-a716-446655440024": [
      // IUI Stimulated Protocol
      { id: "phase1", title: "Kích thích nhẹ", description: "Kích thích buồng trứng với liều thấp" },
      { id: "phase2", title: "Theo dõi nang noãn", description: "Theo dõi sự phát triển của các nang noãn" },
      { id: "phase3", title: "Bơm tinh trùng", description: "Bơm tinh trùng đã xử lý vào buồng tử cung" },
    ],
  }

  return protocolPhases[protocolId as keyof typeof protocolPhases] || []
}

// Schedule service
export const scheduleService = async (scheduleData: {
  treatment_phase_id: string
  service_id: string
  appointment_datetime: string
  estimated_time: string
  notes?: string
}) => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // This would create a Schedule record in the database
  return {
    id: `schedule-${Date.now()}`,
    ...scheduleData,
    status: "Pending",
  }
}

// Assign drug
export const assignDrug = async (drugData: {
  treatment_phase_id: string
  drug_id: string
  start_date: string
  end_date: string
  dosage: string
  usage_instructions: string
  amount: number
}) => {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // This would create AssignDrug and PatientDrug records
  return {
    id: `assign-drug-${Date.now()}`,
    ...drugData,
    status: "HAS_TAKEN",
  }
}
