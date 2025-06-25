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

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard"
import TodayAppointments from "./pages/doctor/appointments/TodayAppointments"
<<<<<<< HEAD
import RequestAppointment from "./pages/patient/RequestAppointment"
import PatientList from "./pages/doctor/patients/PatientList"
import PatientDashboard from "./pages/patient/PatientDashboard"
import ManagerDashboard from "./pages/manager/ManagerDashboard"



// layouts
import RootLayout from './pages/RootLayout'
import BlogPage from './pages/blog/page'
import BlogPostPage from './pages/blog/[id]/page'
import AdminDashboard from "./pages/admin/AdminDashboard"
=======
import Calendar from "./pages/doctor/appointments/Calendar"
import PatientList from "./pages/doctor/patients/PatientList"
import ViewContracts from "./pages/doctor/contracts/ViewContracts"
import TreatmentPlans from "./pages/doctor/treatment-plans/TreatmentPlans"
import RecordResults from "./pages/doctor/results/RecordResults"
import DoctorProfile from "./pages/doctor/profile/DoctorProfile"
import BookedAppointments from "./pages/doctor/appointments/BookedAppointments"
import PendingApprovals from "./pages/doctor/appointments/PendingApprovals"
import CreateTreatmentPlans from "./pages/doctor/treatment-plans/CreateTreatmentPlans"
import ActivePrescriptions from "./pages/doctor/prescriptions/ActivePrescriptions"
import CreatePrescription from "./pages/doctor/prescriptions/CreatePrescription"
import ReminderHistory from "./pages/doctor/notifications/ReminderHistory"
import Inbox from "./pages/doctor/notifications/Inbox"
import DoctorBlog from "./pages/doctor/blog/DoctorBlog"

// layouts
import RootLayout from "./pages/RootLayout"
import BlogPage from "./pages/blog/page"
import BlogPostPage from "./pages/blog/[id]/page"

>>>>>>> 92a5d4a39110881547eda5b01c135f41f314a862

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
      // Appointments routes
      {
        path: "appointments",
        children: [
          {
            path: "today",
            element: <TodayAppointments />,
          },
          {
            path: "booked",
            element: <BookedAppointments />,
          },
          {
            path: "calendar",
            element: <Calendar />,
          },
          {
            path: "pending",
            element: <PendingApprovals />,
          },
        ],
      },
      // Patient routes
      {
        path: "patients",
        children: [
          {
            index: true,
            element: <PatientList />,
          },
        ],
      },
      // Contract routes
      {
        path: "contracts",
        element: <ViewContracts />,
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
            path: "create-plans",
            element: <CreateTreatmentPlans />,
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
        ],
      },
      // Profile routes
      {
        path: "profile",
        element: <DoctorProfile />,
      },
      // Prescription routes
      {
        path: "prescriptions",
        children: [
          {
            path: "active",
            element: <ActivePrescriptions />,
          },
          {
            path: "new",
            element: <CreatePrescription />,
          },
        ],
      },
      // Notification routes
      {
        path: "notifications",
        children: [
          {
            path: "reminders",
            element: <ReminderHistory />,
          },
          {
            path: "inbox",
            element: <Inbox />,
          },
        ],
      },
      // Blog routes
      {
        path: "blog",
        element: <DoctorBlog />,
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
        path: "patients",
        element: <PatientList />,
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
        path: "appointments/today",
        element: <TodayAppointments />,
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
        path: "appointments/today",
        element: <TodayAppointments />,
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

export default App
