

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

export interface TreatmentServiceResponse extends ServiceResponse{
  serviceId:string
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
  id: string;
  drug: DrugResponse;
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
  payment: PaymentPreviewResponse;
}

export interface DrugCreateRequest {
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface DrugUpdateRequest {
  name: string;
  description: string;
  price: number;
  unit: string;
}

// ==================== SCHEDULE & APPOINTMENT TYPES ====================

export interface TreatmentResponse {
  id: string;
  title:string;
  startDate: string;
  endDate: string;
  description: string;
  patient: PatientProfile;
  doctor: DoctorProfile;
  protocol: ProtocolResponse;
  contractId: string;
  signedContract: boolean;
  phases: PhaseResponse[];
  currentPhase: PhaseResponse;
  status: TreatmentStatus;
}

export interface RequestAppointmentResponse {
  id: string;
  doctor: DoctorProfile;
  patient: PatientProfile;
  rejectedReason: string;
  appointmentDatetime: string;
  status: AppointmentStatus;
  schedule?: {
    id: string;
    title:string;
    appointmentDateTime: string;
    estimatedTime: string;
    status: ScheduleStatus;
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
  complete?:boolean;
  assignDrugs?: AssignDrugResponse[];
  unsetServices?: TreatmentServiceResponse[];
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
  phases: ProtocolPhaseResponse[];
  estimatedPrice: number;
  active: boolean;
}

// ==================== SCHEDULES ==========================

export interface ScheduleResponse{
  id: string;
  title:string;
  appointmentDateTime: string; 
  estimatedTime: string;       
  status: ScheduleStatus;
}

export interface TreatmentScheduleResponse extends ScheduleResponse{
  services: TreatmentServiceResponse[];
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
  status: TreatmentStatus;

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
  treatment: string;
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
  status: TreatmentStatus;
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
  status: PaymentStatus;
}

export interface PaymentResponse {
  id: string;
  amount: number;
  description: string;
  paymentDate: string;
  paymentDeadline: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
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
  title:string,
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
  scheduleId: string|"",
  title: string,
  appointmentDateTime: Date,
  estimatedTime: Date,
  scheduleServices: (ScheduleServiceSetRequest)[]
}

export interface ScheduleServiceSetRequest{
  id: string|"",
  serviceId: string,
  name:string,
  inputId:string,
  isUnset:boolean
}

export interface AssignDrugSetRequest{
  assignDrugId: string|"",
  title:string,
  patientDrugs: (DrugSetRequest)[]
}

export interface DrugSetRequest{
  id: string|"",
  drugId: string,
  usageInstructions: string,
  name:string,
  startDate: string,
  endDate: string,
  dosage: string,
  amount: number
}
// ==================== DASHBOARD TYPES ====================
export interface PatientDashboardPayloadResponse {
  requestAppointment: RequestAppointmentResponse;
  treatment: TreatmentResponse;
}

export interface PatientEventResponse{
  treatmentPatientDrugResponse: PatientDrugResponse[];
  scheduleResponse: ScheduleDetailResponse[]
}

// ==================== STATUS ENUMS ====================

export type ScheduleStatus = "PENDING" | "CHANGED" | "CANCELLED" | "DONE";

export type TreatmentStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "AWAITING_CONTRACT_SIGNED";

export type AppointmentStatus = "PENDING" | "ACCEPTED" | "DENIED";

export type AssignDrugStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export type PaymentMethod = "CASH" | "CREDIT_CARD";

export type PaymentStatus = "PENDING" | "COMPLETED" | "CANCELED";
