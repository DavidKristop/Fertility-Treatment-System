// src/routes/ProtectedRoute.tsx
import type { FC, ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: string[]
}

interface JwtPayload {
  role: string
  exp?: number
  // … bạn có thể thêm các field khác nếu cần
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('token')
  const location = useLocation()

  if (!token) {
    // Chưa login
    return <Navigate to="/authorization/login" replace state={{ from: location }} />
  }

  let payload: JwtPayload
  try {
    payload = jwtDecode<JwtPayload>(token)
  } catch {
    // Token không giải mã được
    sessionStorage.removeItem('token')
    return <Navigate to="/authorization/login" replace />
  }

  // Kiểm tra expiry (nếu bạn dùng)
  if (payload.exp && Date.now() / 1000 > payload.exp) {
    sessionStorage.removeItem('token')
    return <Navigate to="/authorization/login" replace />
  }

  // Kiểm tra role
  if (!allowedRoles.includes(payload.role)) {
    // Redirect hoặc show trang "Không có quyền"
    return <Navigate to="/authorization/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
