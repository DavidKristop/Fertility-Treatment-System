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
import Calendar from "./pages/doctor/appointments/Calendar"
import PatientList from "./pages/doctor/patients/PatientList"
// Contract routes removed
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
import PatientDetail from "./pages/doctor/patients/PatientDetail"
// Contract detail routes removed
import ResultsHistory from "./pages/doctor/results/ResultsHistory"
import CreateAppointment from "./pages/doctor/appointments/CreateAppointment"

// layouts
import RootLayout from "./pages/RootLayout"
import BlogPage from "./pages/blog/page"
import BlogPostPage from "./pages/blog/[id]/page"


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
          {
            path: "create",
            element: <CreateAppointment />,
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
          {
            path: ":id",
            element: <PatientDetail />,
          }
        ],
      },
      // Contract routes removed
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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
