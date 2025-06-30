export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
  phone: string
  dateOfBirth: string
  address: string
}

export interface AuthResponse {
  success: boolean
  message: string
  payload: {
    accessToken: string
    role: string
    user: {
      id: string
      email: string
      fullName: string
      phone?: string
      dateOfBirth?: string
      address?: string
    }
  }
}

export interface UserProfile {
  id: string
  email: string
  fullName: string
  phone?: string
  dateOfBirth?: string
  address?: string
  avatarUrl?: string
}

export interface DoctorProfile extends UserProfile {
  specialty?: string
  degree?: string
  yearOfExperience?: number
  licenseNumber?: string
  workingHours?: string
  languages?: string[]
  certifications?: string[]
}

export interface Schedule {
  id: string
  appointment_datetime: string
  duration: number
  reason: string
  status: string
  patient?: {
    name: string
    phone: string
  }
}

export interface Treatment {
  id: string
  name: string
  description: string
  status: string
  startDate: string
  endDate?: string
  patient: {
    id: string
    name: string
    email: string
    phone: string
  }
  doctor: {
    id: string
    name: string
    specialty: string
  }
  phases: TreatmentPhase[]
}

export interface TreatmentPhase {
  id: string
  name: string
  description: string
  startDate: string
  endDate?: string
  status: string
  order: number
}
