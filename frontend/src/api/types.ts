

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
  unit?: string;
  active?: boolean;
}

export interface PatientDrugResponse {
  id: string;
  drug: DrugResponse;
  dosage: string;
  usageInstructions: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface AssignDrugResponse {
  id: string;
  status: string;
  patientDrugs: PatientDrugResponse[];
  payment: PaymentPreviewResponse;
}

// ==================== SCHEDULE & APPOINTMENT TYPES ====================

export interface TreatmentResponse {
  id: string;
  startDate: string;
  endDate: string;
  description: string;
  patient: PatientProfile;
  doctor: DoctorProfile;
  protocol: ProtocolResponse;
  contractId: string;
  signedContract: boolean;
  phases: PhaseResponse[];
  unsetServices: ServiceResponse[];
  currentPhase: PhaseResponse;
  appointmentDatetime: string; 
  estimatedTime: string;
  status: "CANCELLED" | "COMPLETED" | "IN_PROGRESS" | "AWAITING_CONTRACT_SIGNED";
  services?: ServiceResponse[];
}

export interface RequestAppointmentResponse {
  id: string;
  doctor: DoctorProfile;
  patient: PatientProfile;
  rejectedReason: string;
  appointmentDatetime: string;
  status: "PENDING" | "ACCEPTED" | "DENIED";
  schedule?: {
    id: string;
    appointmentDateTime: string;
    estimatedTime: string;
    status: "PENDING" | "ACCEPTED" | "DENIED";
  };
}

// ==================== PROTOCOL & PHASE TYPES ====================
export interface PhaseResponse {
  id: string;
  title: string;
  description: string;
  position: number;
  phaseModifierPercentage: number;
  refundPercentage?: number;
  schedules?: TreatmentScheduleResponse[];
  assignDrugs?: AssignDrugResponse[];
  unsetServices?: ServiceResponse[];
}

export interface ProtocolPhaseResponse{
  id: string;
  title: string;
  description: string;
  position: number;
  phaseModifierPercentage: number;
  refundPercentage?: number;
  services?: ServiceResponse[];
  drugs?: DrugResponse[];
}

export interface ProtocolResponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  phases: ProtocolPhaseResponse[];
  estimatedPrice: number;
  active: boolean;
}

// ==================== SCHEDULES ==========================

export interface ScheduleResponse{
  id: string;
  appointmentDateTime: string; 
  estimatedTime: string;       
  status: "PENDING" | "CHANGED" | "CANCELLED" | "DONE";
}

export interface TreatmentScheduleResponse extends ScheduleResponse{
  services: ScheduleService[];
  payment: PaymentPreviewResponse[];
}

export interface ScheduleDetailResponse extends ScheduleResponse{
  patient: PatientProfile;
  doctor: DoctorProfile;
  scheduleResult: ScheduleResult;
  services: ScheduleService[];
  payment: PaymentPreviewResponse[];
  treatment: TreatmentPreviewResponse;
  treatmentPhase: TreatmentPhasePreviewResponse;
  canMoveToNextPhase: boolean;
}

export interface PreviewScheduleResponse extends ScheduleResponse{
  doctor: DoctorProfile;
}

export interface ScheduleService {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  active: boolean;
}

export interface ScheduleResult {
  id?: string
  doctorsNote: string
  schedule_id: string
  success: boolean
  attachments?: ScheduleResultAttachment[]
}

export interface ScheduleResultAttachment {
  id: string
  attachment_url: string
  schedule_result_id: string
}


// ==================== TREATMENT TYPES ====================

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
  treatmentId: string;
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

export interface TreatmentPreviewResponse{
  id: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "AWAITING_CONTRACT_SIGNED";
  contractId: string;
}

export interface TreatmentPhasePreviewResponse{
  id: string;
  title:string;
}

export interface PaymentPreviewResponse {
  id: string;
  amount: number;
  paymentDeadline: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export interface PaymentResponse {
  id: string;
  amount: number;
  description: string;
  paymentDate: string;
  paymentDeadline: string;
  paymentMethod: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
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

export interface TreatmentCreateRequest{
  paymentMode: "FULL" | "BY_PHASE",
  protocolId: string,
  userId:string,
  medicalHistory:string,
  description:string
}

export interface TreatmentPhaseSetRequest{
  phaseId: string,
  schedules: ScheduleSetRequest[],
  assignDrugs: AssignDrugSetRequest[],
}

export interface ScheduleSetRequest{
  scheduleId: string|null,
  appointmentDateTime: string,
  estimatedTime: string,
  scheduleServices: 
  ({
    id: string|null,
    serviceId: string
  })[]
}

export interface AssignDrugSetRequest{
  assignDrugId: string|null,
  patientDrugs: 
  ({
    patientDrugId: string|null,
    drugId: string,
    usageInstructions: string,
    startDate: string,
    endDate: string,
    dosage: string,
    amount: number
  })[]
}
// ==================== DASHBOARD TYPES ====================
export interface PatientDashboardPayloadResponse {
  requestAppointment: RequestAppointmentResponse;
  treatment: TreatmentResponse;
}

