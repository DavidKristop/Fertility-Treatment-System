import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import Company from './pages/about/Company'
import Team from './pages/about/Team'
import Services from './pages/pricing/Services'
import Insurance from './pages/pricing/Insurance'
import Financing from './pages/pricing/Financing'
import Iui from './pages/services/Iui'
import Ivf from './pages/services/Ivf'
import Hcm from './pages/news/Hcm'
import Hanoi from './pages/news/Hanoi'
import Danang from './pages/news/Danang'
import Nhatrang from './pages/news/Nhatrang'

// layouts
import RootLayout from './pages/RootLayout'

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
            element: <Company />
          },
          {
            path: "team",
            element: <Team />,
          },
        ],
      },
      {
        path: "pricing",
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "services",
            element: <Services />
          },
          {
            path: "insurance",
            element: <Insurance />
          },
          {
            path: "financing",
            element: <Financing />
          },
        ]
      },
      {
        path: "services",
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "iui",
            element: <Iui />
          },
          {
            path: "ivf",
            element: <Ivf />
          }
        ]
      },
      {
        path: "news",
        children: [
          {
            index: true,
            element: <Home />
          }, 
          {
            path: "hcm",
            element: <Hcm />
          },
          {
            path: "hanoi",
            element: <Hanoi />
          },
          {
            path: "danang",
            element: <Danang />
          },
          {
            path: "nhatrang",
            element: <Nhatrang />
          }
        ]
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
