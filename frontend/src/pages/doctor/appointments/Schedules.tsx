
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { me } from "@/api/auth"
import MyScheduler from "@/components/Scheduler"
import { getDoctorScheduleInAMonth, type ScheduleResponse } from "@/api/schedule"
import DoctorLayout from "@/components/doctor/DoctorLayout"




export default function PatientDashboard() {
  const [doctorName, setDoctorName] = useState<string>("")
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate()


  useEffect(() => {
    ;(async () => {
      try {
        const user = await me()             // sẽ gửi header Bearer <token>
        setDoctorName(user.fullName)         // dùng email làm display name
      } catch {
        navigate('/authorization/login', { replace: true })
      }
    })()
  }, [navigate])

  
  const handleScheduleNavigate = useCallback((newDate:Date)=>{
    setCurrentDate(newDate)
  },[setCurrentDate])
  
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // JS months are 0-based
        const res = await getDoctorScheduleInAMonth(year, month);
        // Map API data to react-big-calendar event format
        const mappedEvents = (res.payload || []).map((item: ScheduleResponse) => ({
          id: item.id,
          title: "Hẹn với bệnh nhân "+item.patient.fullName,
          start: new Date(item.appointmentDateTime),
          end: new Date(item.estimatedTime), 
        }));
        console.log("mappedEvents =", mappedEvents);
        setEvents(mappedEvents);
      } catch (err) {
        // handle error
      }
    };
    fetchSchedules();
  }, [currentDate]);
  
  if (!doctorName) {
    return (
      <DoctorLayout title="Trang tổng quan">
        <div>Đang tải thông tin người dùng…</div>
      </DoctorLayout>
    )
  }

  interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
  }

  const handleScheduleClick = (event: CalendarEvent) => {
    navigate(`/doctor/schedule-result/${event.id}`);
  };

  return (
    <DoctorLayout title="Trang tổng quan" breadcrumbs={[{ label: "Trang tổng quan" }]}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Xin Chào, {doctorName}</h1>
        </div>

        

        
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  <MyScheduler
                    events={events}
                    date={currentDate}
                    onNavigate={handleScheduleNavigate}
                    onSelectEvent={handleScheduleClick}
                  />
                </div>
        

        
        <Card>
          <CardHeader>
            <CardTitle>Chú thích</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                <span className="text-sm">Ngày uống thuốc</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
                <span className="text-sm">Ngày có hẹn với bác sĩ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}