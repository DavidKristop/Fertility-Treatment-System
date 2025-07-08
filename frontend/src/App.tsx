
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom';

// Layouts
import RootLayout from './pages/RootLayout';

// Protected wrapper with role check
import ProtectedRoute from './routes/ProtectedRoute';
// pages
import Home from "./pages/Home"
import Company from "./pages/about/Company"
import Team from "./pages/about/Team"
import Services from "./pages/pricing/Services"
import Insurance from "./pages/pricing/Insurance"
import Financing from "./pages/pricing/Financing"
import Iui from "./pages/services/iui"
import Ivf from "./pages/services/ivf"
import DoctorListPage from "./pages/doctorList/DoctorListPage"
import DoctorDetailPage from "./pages/doctorList/DoctorDetailPage"
import LoginPage from "./pages/authorization/LoginPage"
import RegisterPage from "./pages/authorization/RegisterPage"
import ForgotPasswordPage from "./pages/authorization/ForgotPasswordPage"
import ResetPasswordPage from "./pages/authorization/ResetPasswordPage"

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import RequestAppointment from './pages/patient/RequestAppointment';
import PatientContracts from './pages/patient/contracts/PatientContracts';
import ContractHistory from './pages/patient/contracts/ContractHistory';
import PatientProfile from './pages/patient/profile/PatientProfile';

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import Schedules from './pages/doctor/appointments/Schedules';
import ScheduleResult from './pages/doctor/appointments/ScheduleResult';
import PendingApprovals from './pages/doctor/pending/PendingApprovals';
import PatientList from './pages/doctor/patients/PatientList';
import PatientDetail from './pages/doctor/patients/PatientDetail';
import TreatmentPlans from './pages/doctor/treatment-plans/TreatmentPlans';
import CreateTreatmentPlans from './pages/doctor/treatment-plans/CreateTreatmentPlans';
import TreatmentDetail from './pages/doctor/treatment-plans/TreatmentDetail';
import RecordResults from './pages/doctor/results/RecordResults';
import ResultsHistory from './pages/doctor/results/ResultsHistory';
import DoctorProfile from './pages/doctor/profile/DoctorProfile';
import ReminderHistory from './pages/doctor/notifications/ReminderHistory';

// Manager pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerContracts from './pages/manager/contracts/ManagerContracts';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Story from './pages/about/Story';
import BlogPage from './pages/blog/page';
import BlogPostPage from './pages/blog/[id]/page';
import MyAppointmentRequests from './pages/patient/MyAppointmentRequestsPage';
import MyPaymentsPage from './pages/patient/PaymentRequestPage';
import PaymentDetailPage from './pages/patient/Payment/[id]/page';
import PaymentFailurePage from './pages/patient/Payment/PaymentFailure';
import PaymentSuccessPage from './pages/patient/Payment/PaymentSuccess';
import DoctorAppointmentRequest from './pages/doctor/DoctorAppointmentRequests';
import MyRemindersPage from './pages/patient/MyRemindersPage';
import VerifyEmailPage from './pages/authorization/VerifyEmailPage';

// Layout for authenticated dashboards (no header/footer)
const DashboardLayout = () => <Outlet />;

const router = createBrowserRouter([
  // Public routes under RootLayout
  {
    path: '/',
    element: <RootLayout />,  
    children: [
      { index: true, element: <Home /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      {
        path: 'about',
        children: [
          { index: true, element: <Home /> },
          { path: 'company', element: <Company /> },
          { path: 'team', element: <Team /> },
          { path: 'story', element: <Story /> },
        ],
      },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogPostPage /> },
      {
        path: 'pricing',
        children: [
          { index: true, element: <Home /> },
          { path: 'services', element: <Services /> },
          { path: 'insurance', element: <Insurance /> },
          { path: 'financing', element: <Financing /> },
        ],
      },
      {
        path: 'services',
        children: [
          { index: true, element: <Home /> },
          { path: 'iui', element: <Iui /> },
          { path: 'ivf', element: <Ivf /> },
        ],
      },
      { path: 'doctors', element: <DoctorListPage /> },
      { path: 'doctors/:id', element: <DoctorDetailPage /> },
      {
        path: 'authorization',
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
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
    path: 'patient',
    element: (
      <ProtectedRoute allowedRoles={['ROLE_PATIENT']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <PatientDashboard /> },
      { path: 'appointments/schedule', element: <RequestAppointment /> },
      { path: 'appointments/my-request', element: <MyAppointmentRequests/>},
      { path: 'payments', element: <MyPaymentsPage/>},
      { path: 'payments/payment-detail/:id', element: <PaymentDetailPage/>},
      { path: 'notifications', element: <MyRemindersPage/>},
      { path: 'payments/success', element: <PaymentSuccessPage/>},
      { path: 'payments/failure', element: <PaymentFailurePage/>},
      { path:
        'contracts', 
        children: [
          { index: true, element: <PatientContracts /> },
          { path: 'history', element: <ContractHistory /> },
        ]
      },
      { path: 'profile', element: <PatientProfile /> },
      // fallback for patient subpaths
      { path: '*', element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Doctor routes (ROLE_DOCTOR only)
  {
    path: 'doctor',
    element: (
      <ProtectedRoute allowedRoles={['ROLE_DOCTOR']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DoctorDashboard />,
      },
      // Schedule routes
      {
        path: "schedule",
        element: <Schedules />,
      },
      // Schedule Result routes
      {
        path: "schedule-result/:id",
        element: <ScheduleResult />,
      },
      // Pending Approvals routes
      {
          path: "pending",
          element: <DoctorAppointmentRequest />,
      },
      // Patient routes
      {
        path: "patients",
        children: [
          {
            index: true,
            element: <PatientList />,
          },
          {
            path: ":id",
            element: <PatientDetail />,
          }
        ],
      },
      // Treatment Plan routes
      {
        path: "treatment-plans",
        children: [
          {
            index: true,
            element: <TreatmentPlans />,
          },
          {
            path: "create",
            element: <CreateTreatmentPlans />,
          },
          {
            path: "treatment-details/:id",
            element: <TreatmentDetail />, 
          },
        ],
      },
      // Results routes
      {
        path: "results",
        children: [
          {
            path: "record",
            element: <RecordResults />,
          },
          {
            path: "history",
            element: <ResultsHistory />,
          }
        ],
      },
      // Profile routes
      {
        path: "profile",
        element: <DoctorProfile />,
      },
      // Notification routes
      {
        path: "notifications",
        children: [
          {
            path: "reminders",
            element: <ReminderHistory />,
          },
        ],
      },
      // fallback for doctor subpaths
      { path: '*', element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Manager routes (ROLE_MANAGER only)
  {
    path: 'manager',
    element: (
      <ProtectedRoute allowedRoles={['ROLE_MANAGER']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      
      {
        path: "patients",
        element: <PatientList />,
      },
      { 
        path: 'contracts', 
        element: <ManagerContracts /> 
      },
      // fallback for manager subpaths
      { path: '*', element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Admin routes (ROLE_ADMIN only)
  {
    path: 'admin',
    element: (
      <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
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
      // fallback for admin subpaths
      { path: '*', element: <Navigate to="/authorization/login" replace /> },
    ],
  },

  // Global fallback
  { path: '*', element: <Navigate to="/authorization/login" replace /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}