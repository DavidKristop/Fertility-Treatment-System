"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import PatientLayout from "@/components/patient/PatientLayout"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getDoctors } from "@/api/doctor-management"
import type { DoctorProfile } from "@/api/types"
import { getDoctorScheduleByDoctorId } from "@/api/schedule"
import { Accordion } from "@/components/ui/accordion"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { createRequestAppointment } from "@/api/request-appointment"
import { getPatientDashBoardData } from "@/api/patient-dashboard"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css";
import { vi } from "date-fns/locale"
import { toast } from "react-toastify"


export default function RequestAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: string[] }>({
    Morning: [],
    Afternoon: [],
    Evening: [],
  })
  const [doctors, setDoctors] = useState<DoctorProfile[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPendingRequest, setHasPendingRequest] = useState(false)
  const [hasInProgressTreatment, setHasInProgressTreatment] = useState(false)
  const [hasPendingRequestSchedule, setHasPendingRequestSchedule] = useState(false)
  const navigate = useNavigate()

  const fetchPatientDashBoardStatus = async()=>{
    setLoading(true)
    
    try{
      const data = await getPatientDashBoardData()
      setHasInProgressTreatment(data?.payload?.treatment!=null || false)
      setHasPendingRequest(data?.payload?.requestAppointment!=null || false)
      setHasPendingRequestSchedule(data?.payload?.requestAppointment?.schedule!=null || false)
    }
    catch(err){
      console.log(err)
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu")
    }
    finally{
      setLoading(false)
    }
  }

  const fetchAvailableSlots = async (date: Date, doctorId: string) => {
    setLoading(true)
    try {
      const data = await getDoctorScheduleByDoctorId(doctorId, date)
      setTimeSlots(
        generateTimeSlots(date, 
        data?.payload?.map(appt => ({ appointmentDateTime: appt.appointmentDateTime })) || [],
        8,
        18,
        10,
        30
      ))
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải dữ liệu")
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors()
      if (!data.success) {
        throw new Error("Failed to fetch doctors")
      }
      setDoctors(data?.payload?.content || [])
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách bác sĩ")
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedDoctor) {

      return
    }

    setLoading(true)
    try {
      const [hour, minute] = selectedTime.split(" - ")[0]
      .split(":").slice(0, 2).map(Number);
      const appointmentDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        hour,
        minute,
        0,
        0
      );
      // Giả lập API response
      const response = await createRequestAppointment({
        doctorId: selectedDoctor,
        appointmentDatetime: appointmentDateTime,
      })
      if (!response.success) {
        throw new Error(response.message || "Đã xảy ra lỗi khi đặt lịch")
      }
      toast.success(response.message)
      // Reset form sau khi đặt thành công
      setSelectedDate(undefined)
      setSelectedTime(null)
      setSelectedDoctor(null)
      setTimeSlots({ Morning: [], Afternoon: [], Evening: [] })
      setHasPendingRequest(true)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Đã xảy ra lỗi khi đặt lịch")
    } finally {
      setLoading(false)
    }
  }

  function generateTimeSlots(
    date: Date,
    appointments: { appointmentDateTime: string }[],
    openHour = 8,
    closeHour = 18,
    slotMinutes = 10,
    appointmentMinutes = 30
  ) {
    const slots: string[] = [];
    const appts = appointments.map((a) => {
      const start = new Date(a.appointmentDateTime);
      const end = new Date(start.getTime() + appointmentMinutes * 60000);
      return { start, end };
    });

    for (let hour = openHour; hour < closeHour; hour++) {
      for (let min = 0; min < 60; min += slotMinutes) {
        const slotStart = new Date(date);
        slotStart.setHours(hour);
        slotStart.setMinutes(min);
        const slotEnd = new Date(slotStart.getTime() + appointmentMinutes * 60000);
        // Check overlap
        const overlap = appts.some(
          (appt) => (slotStart <= appt.end && appt.start <= slotEnd)
          || (appt.start <= slotEnd && slotStart <= appt.end)
          || (slotStart <= appt.start && appt.end <= slotEnd)
        );

        const closingTime = new Date(date);
        closingTime.setHours(closeHour,0,0,0);
        if (!overlap && slotEnd <= closingTime) {
          slots.push(slotStart.toTimeString().slice(0, 5) + " - " + slotEnd.toTimeString().slice(0, 5));
        }
      }
    }
    // Group slots
    return {
      Morning: slots.filter((t) => +t.split(":")[0] < 12),
      Afternoon: slots.filter((t) => +t.split(":")[0] >= 12 && +t.split(":")[0] < 17),
      Evening: slots.filter((t) => +t.split(":")[0] >= 17),
    };
  }

  const handleBack = () => {
    navigate("/patient/dashboard")
  }

  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      fetchAvailableSlots(selectedDate, selectedDoctor)
    }
    setSelectedTime(null)
  }, [selectedDate, selectedDoctor])

  useEffect(() => {
    fetchDoctors()
    fetchPatientDashBoardStatus()
  }, []) 

  const breadcrumbs = [
    { label: "Trang tổng quan", path: "/patient/dashboard" },
    { label: "Lịch hẹn" },
    { label: "Đặt lịch hẹn" },
  ]

  return (
    <PatientLayout title="Đặt lịch hẹn" breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Thời gian và ngày nào phù hợp với bạn?</h1>

        <div className="flex justify-center gap-8">
          {/* Calendar */}
          <DayPicker
            locale={vi}
            disabled={[{dayOfWeek:[0,6]}, 
            new Date(), 
            new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
            {before: new Date()}]}
            navLayout="around"
            animate
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />

          {/* Time Slots and Doctor Selection */}
          <div className="bg-white p-4 rounded-lg shadow w-64">
            { hasInProgressTreatment ? (
              <p className="text-center text-blue-500">Bạn đang trong một khóa điều trị.</p>
            ): hasPendingRequestSchedule ? (
              <p className="text-center text-blue-500">Bác sĩ bạn chọn đã chấp nhận yêu cầu tư vấn và khám tổng quát của bạn.</p>
            ) : hasPendingRequest ? (
              <p className="text-center text-blue-500">Bạn đã có một yêu cầu đang chờ xử lý. <Link className="text-red-500" to="/patient/appointments/my-request">Xem lịch hẹn đặt của bạn tại đây</Link></p>
            ) : !selectedDate ? (
              <p className="text-center">Vui lòng chọn 1 ngày</p>
            ) : (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">Chọn bác sĩ</h3>
                  <Select onValueChange={setSelectedDoctor} value={selectedDoctor || undefined}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn bác sĩ" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {loading ? (
                <p className="text-center">Đang tải...</p>
              ) : !selectedDoctor ? (
                <p className="text-center">Vui lòng chọn bác sĩ</p>
              ) : (
                <Accordion 
                  type="single" 
                  collapsible 
                  className="border rounded-lg p-4 mb-4"
                >
                  {["Morning", "Afternoon", "Evening"].map((session) => (
                    <AccordionItem key={session} value={session} className="border-b my-2 last:border-b-0">
                      <AccordionTrigger className="cursor-pointer">
                        <h3 className="font-semibold">
                          {session === "Morning"
                            ? "Buổi sáng"
                            : session === "Afternoon"
                            ? "Buổi chiều"
                            : "Buổi tối"}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 mt-2 overflow-y-auto max-h-40">
                          {timeSlots[session].length ? (
                            timeSlots[session].map((time) => (
                              <button
                                key={time}
                                type="button"
                                className={`px-3 py-1 w-full rounded-full border ${
                                  selectedTime === time
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </button>
                            ))
                          ) : (
                            <span className="text-gray-400 text-sm">Không có khung giờ nào khả dụng</span>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                 </Accordion>
              )}
            </>)}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-600">
          Lưu ý: Nếu yêu cầu của bạn được chấp nhận, bạn sẽ phải <span className="text-red-500">trả phí 250.000 đ</span> cho phí siêu âm trong <span className="text-red-500">48h</span> kể từ khi bác sĩ đã chấp nhận yêu cầu của bạn.
        </div>

        <div className="mt-6 text-center space-x-4">
          <Button variant="outline" className="px-6 py-2" onClick={handleBack}>
            Quay lại
          </Button>
          <Button
            className="px-6 py-2"
            onClick={handleSubmit}
            disabled={!selectedDate || !selectedTime || !selectedDoctor || loading}
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </PatientLayout>
  )
}