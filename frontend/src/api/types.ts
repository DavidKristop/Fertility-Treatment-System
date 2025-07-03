export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD từ input type="date"
  confirmPassword: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  phone: string;
  address: string;
  dateOfBirth: string; // Định dạng YYYY-MM-DD
  createdAt: string; // ISO 8601 date string
}

export interface AuthResponse {
  payload: {
    accessToken: string;
    email: string;
    role: string;
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

export interface ScheduleResponse{
  id: string;
  doctor: DoctorProfile;
  patient: PatientProfile;
  rejectedReason: string;
  appointmentDatetime: string; 
  status: "PENDING" | "ACCEPTED" | "DENIED";
  services?: ServiceReponse[];
}


// Add these interfaces to your existing types

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

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

export interface PhaseReponse {
  id: string;
  title: string;
  description: string;
  position: number;
  phaseModifierPercentage: number;
  refundPercentage?: number;
  services?: ServiceReponse[];
  drugs?: DrugResponse[];
  schedules?: ScheduleResponse[];
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
  status: string;
  schedule: ScheduleResponse;
}

export interface PatientDashboardPayloadResponse {
  requestAppointment: RequestAppointmentResponse;
  treatment: Treatment;
}
