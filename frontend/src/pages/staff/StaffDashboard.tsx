"use client"

import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { me } from "@/api/auth"
import { getAllDoctors } from "@/api/doctor-management"
import { getStaffSchedule } from "@/api/schedule"
import type { DoctorBasic } from "@/api/doctor-management"
import type { ScheduleDetailResponse } from "@/api/types"
import ScheduleCardList from "@/components/staff/schedules/ScheduleCardList"
import DoctorFilter from "@/components/staff/schedules/DoctorFilter"
import { toast } from "react-toastify"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

const StaffDashboard = () => {
  const navigate = useNavigate()
  const [staffName, setStaffName] = useState("")
  const [schedules, setSchedules] = useState<ScheduleDetailResponse[]>([])
  const [doctors, setDoctors] = useState<DoctorBasic[]>([])
  const [selectedDoctorId, setSelectedDoctorId] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const {setTitle,setBreadCrumbs} = useAuthHeader()
  
  useEffect(() => {
    setTitle("Trang tổng quan")
    setBreadCrumbs([
      { label: "Trang tổng quan", path: "/staff/dashboard" },
    ])
  }, [setTitle, setBreadCrumbs])
  const pageSize = 10


  useEffect(() => {
    (async () => {
      try {
        const user = await me()
        setStaffName(user.fullName)
      } catch {
        navigate("/authorization/login", { replace: true })
      }
    })()
  }, [navigate])

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllDoctors()
        setDoctors(res.payload || [])
      } catch {
        toast.error("Không thể tải danh sách bác sĩ")
      }
    })()
  }, [])

  const fetchSchedules = useCallback(
    async (page: number = 0) => {
      if (!selectedDoctorId) return

      try {
        setLoading(true)
        setError(null)

        const today = new Date()
        const from = new Date(today.getFullYear(), today.getMonth(), 1)
        const to = new Date(today.getFullYear(), today.getMonth() + 1, 0)

        const res = await getStaffSchedule(from, to, undefined, selectedDoctorId)

        if (res.success && res.payload) {
          setSchedules(res.payload)
          setCurrentPage(page)
        } else {
          setError("Không có dữ liệu lịch hẹn")
        }
      } catch {
        setError("Lỗi khi tải lịch hẹn")
      } finally {
        setLoading(false)
      }
    },
    [selectedDoctorId]
  )

  useEffect(() => {
    if (selectedDoctorId) fetchSchedules(0)
  }, [selectedDoctorId, fetchSchedules])

  const handleViewDetails = (scheduleId: string) => {
    navigate(`/staff/schedule-detail/${scheduleId}`)
  }

  const paginatedSchedules = schedules.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  )

  const totalPages = Math.ceil(schedules.length / pageSize)

  return (
      <div className="space-y-6">
        {staffName && (
          <div className="text-lg font-semibold text-gray-700">
            Xin chào, {staffName}
          </div>
        )}

        <DoctorFilter
          doctors={doctors}
          selectedDoctorId={selectedDoctorId}
          onDoctorChange={setSelectedDoctorId}
        />

        {error && (
          <div className="rounded bg-gray-50 border p-3 text-red-600 font-medium">{error}</div>
        )}

        <ScheduleCardList
          schedules={paginatedSchedules}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onViewDetails={handleViewDetails}
          isLoading={loading}
        />
      </div>
  )
}

export default StaffDashboard
