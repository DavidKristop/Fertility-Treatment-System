import type { ScheduleResponse } from "./schedule";

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
export interface ServiceReponse {
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
  unit?: string;
  active?: boolean;
}

export interface PatientDrugResponse {
  id: string;
  drug: DrugResponse;
  dosage: string;
  usageInstructions: string;
  amount: number;
}

export interface AssignDrugReponse {
  id: string;
  status: string;
  completeDate: string;
  patientDrugs: PatientDrugResponse[];
}

// ==================== SCHEDULE TYPES ====================
export interface TreatmentScheduleResponse{
  id: string;
  appointmentDatetime: string; 
  estimatedTime: string;
  status: "PENDING" | "ACCEPTED" | "DENIED";
  services?: ServiceReponse[];
}

export interface DoctorScheduleResponse extends ScheduleResponse{
  scheduleResult:{
    doctorsNote:string;
  }
  patient: PatientProfile,
  doctor: DoctorProfile,
  services: ServiceReponse
}

// ==================== PROTOCOL & PHASE TYPES ====================
export interface PhaseReponse {
  id: string;
  title: string;
  description: string;
  position: number;
  phaseModifierPercentage: number;
  refundPercentage?: number;
  services?: ServiceReponse[];
  drugs?: DrugResponse[];
  schedules?: ServiceReponse[];
  assignDrugs?: AssignDrugReponse[];
  unsetServices?: ServiceReponse[];
}

export interface ProtocolReponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  phases: PhaseReponse[];
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
  protocol: ProtocolReponse;
  phases: PhaseReponse[];
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

export interface PatientDashboardPayloadResponse {
  requestAppointment: RequestAppointmentResponse;
  treatment: Treatment;
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
  paymentMethod: string;
  status: string;
  userId: string;
  scheduleServices: ServiceReponse[];
  assignDrugs: AssignDrugReponse[];
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