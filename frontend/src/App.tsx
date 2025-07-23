import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

// Layouts
import RootLayout from "./pages/RootLayout";

// Protected wrapper with role check
import ProtectedRoute from "./routes/ProtectedRoute";
// pages
import Home from "./pages/Home";
import Company from "./pages/about/Company";
import Team from "./pages/about/Team";
import Services from "./pages/pricing/Services";
import Insurance from "./pages/pricing/Insurance";
import Financing from "./pages/pricing/Financing";
import Iui from "./pages/services/iui";
import Ivf from "./pages/services/ivf";
import DoctorListPage from "./pages/doctorList/DoctorListPage";
import DoctorDetailPage from "./pages/doctorList/DoctorDetailPage";
import LoginPage from "./pages/authorization/LoginPage";
import RegisterPage from "./pages/authorization/RegisterPage";
import ForgotPasswordPage from "./pages/authorization/ForgotPasswordPage";
import ResetPasswordPage from "./pages/authorization/ResetPasswordPage";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import RequestAppointment from "./pages/patient/RequestAppointment";
import PatientContracts from "./pages/patient/contracts/PatientContracts";
import PatientContractDetail from "./pages/patient/contracts/ContractDetail";
import ContractSignPage from "./pages/patient/contracts/ContractSignPage";
import PatientProfile from "./pages/patient/profile/PatientProfile";
import TreatmentPage from "./pages/patient/treatment/TreatmentPage";
import TreatmentDetailPage from "./pages/patient/treatment/TreatmentDetailPage";
import MyAssignDrugsPage from "@/pages/patient/MyAssignDrugPage";
import PatientScheduleResult from "./pages/patient/appointments/PatientScheduleResult";

// Staff pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import CreateDoctorPage from "./pages/staff/CreateDoctorPage";
import PaymentManagement from "./pages/staff/PaymentManagement";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Schedules from "./pages/doctor/appointments/Schedules";
import PatientList from "./pages/doctor/patients/PatientList";
import PatientDetail from "./pages/doctor/patients/PatientDetail";
import TreatmentPlans from "./pages/doctor/treatment-plans/TreatmentPlans";
import CreateTreatmentPlans from "./pages/doctor/treatment-plans/CreateTreatmentPlans";
import TreatmentDetail from "./pages/doctor/treatment-plans/TreatmentDetail";
import RecordResults from "./pages/doctor/results/RecordResults";
import ResultsHistory from "./pages/doctor/results/ResultsHistory";
import DoctorProfile from "./pages/doctor/profile/DoctorProfile";

// Manager pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerContracts from "./pages/manager/contracts/ManagerContracts";
import ManagerContractDetail from "./pages/manager/contracts/ContractDetail";
import DrugsManagement from "./pages/manager/drugs/DrugManagement";
import CreateDrug from "./pages/manager/drugs/CreateDrug";
import DrugDetail from "./pages/manager/drugs/DrugDetail";
import EditDrug from "./pages/manager/drugs/EditDrug";
import StaffAssignedDrugPage from "@/pages/staff/AssignDrug/StaffAssignDrugPage";
import ManagerServicePage from "@/pages/manager/servicePages/ManagerServicePage";
import ManagerServiceCreatePage from "@/pages/manager/servicePages/ManagerServiceCreatePage";
import ManagerServiceUpdatePage from "./pages/manager/servicePages/ManagerServiceUpdatePage";
import ManagerServiceDetailPage from "./pages/manager/servicePages/ManagerServiceDetailPage";
import ProtocolsList from "./pages/manager/ManagerProtocolsPage";
import ProtocolDetailPage from "./pages/manager/ProtocolDetail";
import CreateProtocolsPage from "./pages/manager/CreateProtocolPage";
import PaymentDetail from "./pages/staff/PaymentDetail";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Story from "./pages/about/Story";
import BlogPage from "./pages/blog/page";
import BlogPostPage from "./pages/blog/[id]/page";
import MyAppointmentRequests from "./pages/patient/MyAppointmentRequestsPage";
import MyPaymentsPage from "./pages/patient/PaymentRequestPage";
import PaymentDetailPage from "./pages/patient/Payment/[id]/page";
import PaymentFailurePage from "./pages/patient/Payment/PaymentFailure";
import PaymentSuccessPage from "./pages/patient/Payment/PaymentSuccess";
import DoctorAppointmentRequest from "./pages/doctor/DoctorAppointmentRequests";
import MyRemindersPage from "./pages/patient/MyRemindersPage";
import VerifyEmailPage from "./pages/authorization/VerifyEmailPage";
import DoctorScheduleResult from "./pages/doctor/appointments/ScheduleResult";
import StaffAssignDrugDetailPage from "./pages/staff/AssignDrug/StaffAssignDrugDetailPage";
import MyAssignDrugDetailPage from "./pages/patient/MyAssignDrugDetailPage";
import DoctorAssignDrugsPage from "./pages/doctor/assignDrugs/DoctorAssignDrugsPage";
import DoctorAssignDrugDetailPage from "./pages/doctor/assignDrugs/DoctorAssignDrugDetailPage";
import MySchedulePage from "./pages/patient/MySchedulePage";
import ManageUserPage from "./pages/admin/ManageUsersPage";
import UserDetailPage from "./pages/admin/UserDetailPage";
import CreateManagerPage from "./pages/admin/CreateManagerPage";

// Layout for authenticated dashboards (no header/footer)
const DashboardLayout = () => <Outlet />;

const router = createBrowserRouter([
  // Public routes under RootLayout
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      {
        path: "about",
        children: [
          { index: true, element: <Home /> },
          { path: "company", element: <Company /> },
          { path: "team", element: <Team /> },
          { path: "story", element: <Story /> },
        ],
      },
      { path: "blog", element: <BlogPage /> },
      { path: "blog/:id", element: <BlogPostPage /> },
      {
        path: "pricing",
        children: [
          { index: true, element: <Home /> },
          { path: "services", element: <Services /> },
          { path: "insurance", element: <Insurance /> },
          { path: "financing", element: <Financing /> },
        ],
      },
      {
        path: "services",
        children: [
          { index: true, element: <Home /> },
          { path: "iui", element: <Iui /> },
          { path: "ivf", element: <Ivf /> },
        ],
      },
      { path: "doctors", element: <DoctorListPage /> },
      { path: "doctors/:id", element: <DoctorDetailPage /> },
      {
        path: "authorization",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },

  // Patient routes (ROLE_PATIENT only)
  {
    path: "patient",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_PATIENT"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <PatientDashboard /> },
      { path: "appointments/schedule", element: <RequestAppointment /> },
      { path: "appointments/my-request", element: <MyAppointmentRequests /> },
      { path: "appointments/schedules", element: <MySchedulePage /> },
      { path: "payments", element: <MyPaymentsPage /> },
      {
        path: "schedule-result/:scheduleId",
        element: <PatientScheduleResult />,
      },
      { path: "payments/payment-detail/:id", element: <PaymentDetailPage /> },
      { path: "notifications", element: <MyRemindersPage /> },
      { path: "payments/success", element: <PaymentSuccessPage /> },
      { path: "payments/failure", element: <PaymentFailurePage /> },
      {
        path: "contracts",
        children: [
          { index: true, element: <PatientContracts /> },
          { path: ":id", element: <PatientContractDetail /> },
          { path: ":id/sign", element: <ContractSignPage /> }, // New route for signing contracts
        ],
      },
      { path: "profile", element: <PatientProfile /> },
      { path: "treatment", element: <TreatmentPage /> },
      { path: "treatment/:id", element: <TreatmentDetailPage /> },
      { path: "assigned-drugs", element: <MyAssignDrugsPage /> },
      { path: "assigned-drugs/:id", element: <MyAssignDrugDetailPage /> },
      // fallback for patient subpaths
      { path: "*", element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Patient routes (ROLE_STAFF only)
  {
    path: "staff",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_STAFF"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <StaffDashboard /> },
      { path: "doctors/create", element: <CreateDoctorPage /> },
      {
        path: "payments",
        children: [
          { index: true, element: <PaymentManagement /> },
          { path: ":id", element: <PaymentDetail /> },
        ],
      },
      { path: "assigned-drugs", element: <StaffAssignedDrugPage /> },
      { path: "assigned-drugs/:id", element: <StaffAssignDrugDetailPage />, },
      // fallback for patient subpaths
      { path: "*", element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Doctor routes (ROLE_DOCTOR only)
  {
    path: "doctor",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_DOCTOR"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DoctorDashboard /> },
      { path: "schedule", element: <Schedules /> },
      {
        path: "schedule-result/:scheduleId",
        element: <DoctorScheduleResult />,
      },
      { path: "assigned-drugs", element: <DoctorAssignDrugsPage /> },
      { path: "assigned-drugs/:id", element: <DoctorAssignDrugDetailPage /> },
      { path: "pending", element: <DoctorAppointmentRequest /> },
      // Patient routes
      {
        path: "patients",
        children: [
          { index: true, element: <PatientList /> },
          { path: ":id", element: <PatientDetail /> },
        ],
      },
      // Treatment Plan routes
      {
        path: "treatment-plans",
        children: [
          { index: true, element: <TreatmentPlans /> },
          { path: "create", element: <CreateTreatmentPlans /> },
          { path: "treatment-details/:id", element: <TreatmentDetail /> },
        ],
      },
      // Results routes
      {
        path: "results",
        children: [
          { path: "record", element: <RecordResults /> },
          { path: "history", element: <ResultsHistory /> },
        ],
      },
      // Profile routes
      { path: "profile", element: <DoctorProfile /> },
      // fallback for doctor subpaths
      { path: "*", element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Manager routes (ROLE_MANAGER only)
  {
    path: "manager",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_MANAGER"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <ManagerDashboard /> },

      {
        path: "services",
        children: [
          {
            index: true,
            element: <ManagerServicePage />,
          },
          {
            path: "create",
            element: <ManagerServiceCreatePage />,
          },
          {
            path: ":id",
            element: <ManagerServiceDetailPage />,
          },
          {
            path: ":id/edit",
            element: <ManagerServiceUpdatePage />,
          },
        ],
      },
      { path: "protocols", element: <ProtocolsList /> },
      { path: "createprotocols", element: <CreateProtocolsPage /> },
      { path: "protocols/protocolDetail/:id", element: <ProtocolDetailPage /> },
      { path: "patients", element: <PatientList /> },
      {
        path: "contracts",
        children: [
          { index: true, element: <ManagerContracts /> },
          { path: ":id", element: <ManagerContractDetail /> },
        ],
      },
      {
        path: "drugs",
        children: [
          { index: true, element: <DrugsManagement /> },
          { path: "create", element: <CreateDrug /> },
          { path: ":id", element: <DrugDetail /> },
          { path: "edit/:id", element: <EditDrug /> },
        ],
      },

      // fallback for manager subpaths
      { path: "*", element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Admin routes (ROLE_ADMIN only)
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },

      {
        path: "patients",
        element: <PatientList />,
      },

      {
        path: "/admin/manage-users",
        element: <ManageUserPage />,
      },
      {
        path: "/admin/manage-users/:id",
        element: <UserDetailPage />,
      },
      {
        path: "/admin/create-manager",
        element: <CreateManagerPage />,
      },
      // fallback for admin subpaths
      { path: "*", element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Global fallback
  { path: "*", element: <Navigate to="/authorization/login" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
