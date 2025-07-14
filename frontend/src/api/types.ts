

// ==================== AUTH & USER TYPES ====================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD từ input type="date"
  confirmPassword: string;
}

export interface AuthResponse {
  payload: {
    accessToken: string;
    email: string;
    role: string;
    fullName: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    userId: string;
  };
  message: string;
  success: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  role: string;
  fullName?: string; // Add this as fallback
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  avatarUrl?: string;
  // Other potential fields
}

export interface DoctorProfile extends UserProfile {
  specialty: string;
  degree: string;
  yearsOfExperience: number;
  licenseNumber: string;
}

export interface PatientProfile extends UserProfile {
  medicalHistory: string;
}

export interface DoctorResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialty: string;
  degree: string;
  yearsOfExperience: number;
  licenseNumber: string;
}
// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  payload?: T;
}

export interface ApiPaginationResponse<T> {
  success: boolean;
  message: string;
  payload: {
    totalElements: number;
    pageable:{
      offset: 0;
      pageNumber: number;
    };
    totalPages: number;
    content: T[];
  };
}

// ==================== SERVICE & DRUG TYPES ====================
export interface ServiceResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  active: boolean;
}

export interface DrugResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  active: boolean;
}

export interface PatientDrugResponse {
  dosage: string;
  usageInstructions: string;
  amount: number;
  drugName: string;
  drugPrice: number;
  startDate: string;
  endDate: string;
}

export interface AssignDrugResponse {
  id: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  completeDate?: string;
  createdAt?: string;
  treatmentPhaseName?: string;
  patientName?: string;
  patientDrugs: PatientDrugResponse[];
}

export interface DrugCreateRequest {
  name: string;
  description: string;
  price: number;
  unit: string;
}

// ==================== SCHEDULE & APPOINTMENT TYPES ====================
export interface TreatmentScheduleResponse{
  id: string;
  appointmentDatetime: string; 
  estimatedTime: string;
  status: "PENDING" | "ACCEPTED" | "DENIED";
  services?: ServiceResponse[];
}

export interface RequestAppointmentResponse {
  id: string;
  doctor: DoctorProfile;
  patient: PatientProfile;
  rejectedReason: string;
  appointmentDatetime: string;
  status: "PENDING" | "ACCEPTED" | "DENIED";
  schedule: TreatmentScheduleResponse;
}

// ==================== PROTOCOL & PHASE TYPES ====================
export interface PhaseResponse {
  id: string;
  title: string;
  description: string;
  position: number;
  phaseModifierPercentage: number;
  refundPercentage: number;
  services?: ServiceResponse[];
  drugs?: DrugResponse[];
  schedules?: ServiceResponse[];
  assignDrugs?: AssignDrugResponse[];
  unsetServices?: ServiceResponse[];
}

export interface CreateProtocolRequest {
  title: string;
  description: string;
  refundPercentage?: number;
  phases: {
    title: string;
    description: string;
    phaseModifierPercentage: number;
    serviceIds?: string[];
    drugIds?: string[];
  }[];
}


export interface ProtocolResponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  phases: PhaseResponse[];
  estimatedPrice: number;
  active: boolean;
}

// ==================== TREATMENT TYPES ====================
export interface Treatment {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
  patient: PatientProfile;
  doctor: DoctorProfile;
  protocol: ProtocolResponse;
  phases: PhaseResponse[];
}

export interface TreatmentPlan {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "AWAITING_CONTRACT_SIGNED";

  patient: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;
  };

  doctor: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string;
    specialty: string;
  };

  protocol: {
    id: string;
    title: string;
    estimatedPrice: number;
  };
}

// ==================== CONTRACT TYPES ====================
export interface ContractResponse {
  id: string;
  signDeadline: string;
  treatment: Treatment;
  contractUrl: string;
  signed: boolean;
}

// ==================== PAYMENT & REFUND TYPES ====================
export interface RefundResponse {
  id: string;
  amount: number;
  refundDate: string;
  refundMethod: string;
  reason: string;
  userId: string;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  description: string;
  paymentDate: string;
  paymentDeadline: string;
  paymentMethod: "CASH" | "CREDIT_CARD" | "PAYPAL" | null;
  status: "PENDING" | "COMPLETED" | "CANCELED";
  userId: string;
  scheduleServices: ServiceResponse[];
  assignDrugs: AssignDrugResponse[];
  refunds: RefundResponse[];
  createdAt: string;
  updatedAt: string;
}


// ==================== NOTIFICATION TYPES ====================
export interface Reminder{
  id: string,
  title:string,
  content:string,
  read:boolean
}

// ==================== DASHBOARD TYPES ====================
export interface PatientDashboardPayloadResponse {
  requestAppointment: RequestAppointmentResponse;
  treatment: Treatment;
}

