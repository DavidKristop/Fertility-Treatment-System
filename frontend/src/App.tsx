import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Home from './pages/Home'
import Company from './pages/about/Company'
import Team from './pages/about/Team'
import Services from './pages/pricing/Services'
import Insurance from './pages/pricing/Insurance'
import Financing from './pages/pricing/Financing'
import Iui from './pages/services/iui'
import Ivf from './pages/services/ivf'
import DoctorListPage from "./pages/doctorList/DoctorListPage";
import DoctorDetailPage from "./pages/doctorList/DoctorDetailPage";
import LoginPage from './pages/authorization/LoginPage'
import RegisterPage from './pages/authorization/RegisterPage'
import ForgotPasswordPage from './pages/authorization/ForgotPasswordPage'

// layouts
import RootLayout from "./pages/RootLayout";
import BlogPage from "./pages/blog/page";
import BlogPostPage from "./pages/blog/[id]/page";

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
            element: <LoginPage />
          },
          {
            path: "register",
            element: <RegisterPage />
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />
          }
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
