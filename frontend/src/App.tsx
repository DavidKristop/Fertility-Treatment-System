import { createBrowserRouter, RouterProvider } from "react-router-dom"

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

// Patient pages
import RequestAppointment from "./pages/patient/RequestAppointment"
import PatientDashboard from "./pages/patient/PatientDashboard"
import PatientProfile from "./pages/patient/profile/PatientProfile"
import PatientContracts from "./pages/patient/contracts/PatientContracts"

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import Schedules from "./pages/doctor/appointments/Schedules"
import PatientList from "./pages/doctor/patients/PatientList"
import TreatmentPlans from "./pages/doctor/treatment-plans/TreatmentPlans"
import RecordResults from "./pages/doctor/results/RecordResults"
import DoctorProfile from "./pages/doctor/profile/DoctorProfile"
import PendingApprovals from "./pages/doctor/pending/PendingApprovals"
import CreateTreatmentPlans from "./pages/doctor/treatment-plans/CreateTreatmentPlans"
import ReminderHistory from "./pages/doctor/notifications/ReminderHistory"
import PatientDetail from "./pages/doctor/patients/PatientDetail"
import ResultsHistory from "./pages/doctor/results/ResultsHistory"
import TreatmentDetail from "./pages/doctor/treatment-plans/TreatmentDetail"
import ScheduleResult from "./pages/doctor/appointments/ScheduleResult"

// Manager pages
import ManagerDashboard from "./pages/manager/ManagerDashboard"

//Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard"

// layouts
import RootLayout from './pages/RootLayout'
import BlogPage from './pages/blog/page'
import BlogPostPage from './pages/blog/[id]/page'
import Story from "./pages/about/Story"




const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "company",
            element: <Company />,
          },
          {
            path: "team",
            element: <Team />,
          },
          {
            path: "story",
            element: <Story />,
          },
        ],
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "pricing",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "services",
            element: <Services />,
          },
          {
            path: "insurance",
            element: <Insurance />,
          },
          {
            path: "financing",
            element: <Financing />,
          },
        ],
      },
      {
        path: "services",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "iui",
            element: <Iui />,
          },
          {
            path: "ivf",
            element: <Ivf />,
          },
        ],
      },
      {
        path: "doctors",
        element: <DoctorListPage />,
      },
      {
        path: "doctors/:id",
        element: <DoctorDetailPage />,
      },
      {
        path: "authorization",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
    ],
  },
  // Doctor Dashboard Routes
  {
    path: "doctor",
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
          element: <PendingApprovals />,
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
    ],
  },
    // Patient Dashboard Routes
  {
    path: "patient",
    children: [
      {
        path: "dashboard",
        element: <PatientDashboard />,
      },
      {
        path: "appointments/schedule",
        element: <RequestAppointment />,
      },
      {
        path: "contracts",
        element: <PatientContracts />,
      },
      {
        path: "profile",
        element: <PatientProfile />,
      },
    ],
  },
      // Manager Dashboard Routes
  {
    path: "manager",
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard />,
      },
      
      {
        path: "patients",
        element: <PatientList />,
      },
    ],
  },
        // Admin Dashboard Routes
  {
    path: "admin",
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      
      {
        path: "patients",
        element: <PatientList />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
