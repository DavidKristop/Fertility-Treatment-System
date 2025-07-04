// src/routes/ProtectedRoute.tsx
import type { FC, ReactNode } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: string[]
}

interface JwtPayload {
  role: string
  exp?: number
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token')
  const location = useLocation()
  const navigate = useNavigate()

  // 1) Nếu chưa có token, ép về login
  if (!token) {
    return <Navigate to="/authorization/login" replace state={{ from: location }} />
  }

  // 2) Giải mã
  let payload: JwtPayload
  try {
    payload = jwtDecode<JwtPayload>(token)
  } catch {
    localStorage.removeItem('token')
    return <Navigate to="/authorization/login" replace />
  }

  // 3) Kiểm tra role
  const hasRole = allowedRoles.includes(payload.role)

  // 4) Nếu không đúng role, dùng history.back() để quay lại
  useEffect(() => {
    if (!hasRole) {
      // quay lại trang trước đó trong lịch sử
      navigate(-1)
    }
  }, [hasRole, navigate])

  // 5) Nếu đúng role thì render children, nếu không thì không render gì (vì useEffect đã điều hướng)
  if (!hasRole) return null

  return <>{children}</>
}

export default ProtectedRoute
