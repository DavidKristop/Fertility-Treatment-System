import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const HOME_BY_ROLE: Record<string,string> = {
  ROLE_PATIENT: '/patient/dashboard',
  ROLE_DOCTOR:  '/doctor/dashboard',
  ROLE_MANAGER: '/manager/dashboard',
  ROLE_ADMIN:   '/admin/dashboard',
  ROLE_STAFF:   '/staff/dashboard'
}

export default function ProtectedRoute({
  children,
  allowedRoles
}: {
  children: React.ReactNode
  allowedRoles: string[]
}) {
  const token = localStorage.getItem('access_token')
  const location = useLocation()

  if (!token) {
    return <Navigate to="/authorization/login" replace state={{from: location}}/>
  }

  let payload: { role: string }
  try {
    payload = jwtDecode<{ role: string }>(token)
  } catch {
    localStorage.removeItem('access_token')
    return <Navigate to="/authorization/login" replace/>
  }

  if (!allowedRoles.includes(payload.role)) {
    // redirect về dashboard của chính role đó
    const home = HOME_BY_ROLE[payload.role] || '/home'
    return <Navigate to={home} replace />
  }

  return <>{children}</>
}
