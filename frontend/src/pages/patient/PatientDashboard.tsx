import PatientLayout from "@/components/patient/PatientLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { me } from "@/api/auth"
import MyScheduler from "@/components/Scheduler"
import { getPatientScheduleInAMonth, type ScheduleResponse } from "@/api/schedule"


// Mock data
const hasActiveTreatment = true
const treatmentProgress = {
  currentStage: "Giai đoạn 2: Kích thích buồng trứng",
  completed: 2,
  total: 5,
  phases: [
    { name: "Khám sơ bộ", status: "completed" },
    { name: "Kích thích buồng trứng", status: "current" },
    { name: "Thu thập trứng", status: "pending" },
    { name: "Thụ tinh", status: "pending" },
    { name: "Chuyển phôi", status: "pending" },
  ],
}

export default function PatientDashboard() {
  const [patientName, setPatientName] = useState<string>("")
  const [events, setEvents] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate()
  const getPhaseStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      default:
        return "bg-gray-300"
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const user = await me()             // sẽ gửi header Bearer <token>
        setPatientName(user.fullName)         // dùng email làm display name
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
        const res = await getPatientScheduleInAMonth(year, month);
        // Map API data to react-big-calendar event format
        const mappedEvents = (res.payload || []).map((item: ScheduleResponse) => ({
          id: item.id,
          title: "Hẹn với bác sĩ "+item.doctor.fullName,
          start: new Date(item.appointmentDateTime),
          end: new Date(item.estimatedTime), 
        }));
        setEvents(mappedEvents);
      } catch (err) {
        // handle error
      }
    };
    fetchSchedules();
  }, [currentDate]);
  
  if (!patientName) {
    return (
      <PatientLayout title="Trang tổng quan">
        <div>Đang tải thông tin người dùng…</div>
      </PatientLayout>
    )
  }

  return (
    <PatientLayout title="Trang tổng quan" breadcrumbs={[{ label: "Trang tổng quan" }]}>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <h1 className="text-2xl font-bold text-gray-900">Xin Chào, {patientName}</h1>
        </div>

        {/* Treatments */}
        <Card className="p-6">
            <CardContent className="p-0">
              {hasActiveTreatment ? (
                <div className="text-center">
                  <h2 className="text-lg font-medium mb-4">Điều trị hiện tại của bạn và các giai đoạn</h2>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Tiến độ điều trị</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {treatmentProgress.phases.map((phase, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getPhaseStatus(phase.status)}`} />
                          {index < treatmentProgress.phases.length - 1 && (
                            <div className="w-8 h-0.5 bg-gray-300 mx-1" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-medium">{treatmentProgress.currentStage}</div>
                    <div className="text-sm text-gray-500">
                      Giai đoạn {treatmentProgress.completed}/{treatmentProgress.total}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {treatmentProgress.phases.map((phase, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          phase.status === "completed"
                            ? "bg-green-50 border-green-200"
                            : phase.status === "current"
                              ? "bg-blue-50 border-blue-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getPhaseStatus(phase.status)}`} />
                          <span className="font-medium">{phase.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Bạn chưa có điều trị nào đang diễn ra</p>
                  <Link to="/patient/appointments/schedule">
                    <Button className="cursor-pointer">Đặt lịch hẹn</Button>
                  </Link>
                  
                </div>
              )}
            </CardContent>
        </Card>

        
                <div className="flex flex-col lg:flex-row gap-4 justify-between">
                  <MyScheduler
                    events={events}
                    date={currentDate}
                    onNavigate={handleScheduleNavigate}
                    onSelectEvent={() => {
                      navigate(`/patient/schedule`);
                    }}
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
    </PatientLayout>
  )
}
