import { Calendar, Views, type Event, type View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import type { PatientDrugResponse, ScheduleDetailResponse, ScheduleResponse, ScheduleStatus } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { vi } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCallback, useEffect, useState } from 'react';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    vi
  },
});

interface CustomCalendarProps {
  schedules: ScheduleDetailResponse[];
  drugs: PatientDrugResponse[];
  previewSchedule?:ScheduleResponse;
  initialDate?: Date;
  initialView?: View;
  isDoctorPov?: boolean;
  hasFilterStatus?: boolean;
  canChangeView?: boolean;
  hasDatePicker?:boolean;
  calendarStyle?: React.CSSProperties;
  onNavigate: (startDate: Date,endDate: Date,filterStatus?: ScheduleStatus | "ALL")=>void;
  onScheduleClick?: (schedule: ScheduleDetailResponse) => void;
  onDrugClick?: (drug: PatientDrugResponse) => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'PENDING':
      return 'blue';
    case 'CHANGED':
      return 'yellow';
    case 'CANCELLED':
      return 'red';
    case 'DONE':
      return 'green';
    default:
      return 'gray';
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'PENDING':
      return 'Chờ xử lý';
    case 'CHANGED':
      return 'Đã thay đổi';
    case 'CANCELLED':
      return 'Đã hủy';
    case 'DONE':
      return 'Đã hoàn thành';
    default:
      return status;
  }
}

interface CalendarEvent extends Event {
  type: 'schedule' | 'drug' | 'preview-schedule';
  status?: string;
  drug?: PatientDrugResponse;
  schedule?: ScheduleDetailResponse;
  previewSchedule?: ScheduleResponse;
}

export default function ScheduleCalendar({ schedules, drugs,previewSchedule,isDoctorPov=false,onScheduleClick, onDrugClick,onNavigate,hasFilterStatus=false, calendarStyle, initialView=Views.MONTH, canChangeView=true,initialDate,hasDatePicker }: CustomCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [currView,setCurrView] = useState<View>(initialView)
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [filterStatus, setFilterStatus] = useState<ScheduleStatus | "ALL">("ALL");
  const [scrollToTime, setScrollToTime] = useState<Date>(currentDate)

  const getEventStyle = useCallback((event: CalendarEvent) => {
    const style = {
      backgroundColor: '#fff',
      borderRadius: '4px',
      opacity: 1,
      color: 'black',
      border: '1px solid #ccc',
      display: 'block',
      padding: '4px'
    };

    if (event.type === 'schedule' && event.schedule?.status) {
      const status = event.schedule.status;
      switch (status) {
        case 'PENDING':
          style.backgroundColor = '#FFF3E0';
          style.color = '#F57C00';
          break;
        case 'CANCELLED':
          style.backgroundColor = '#FFEBEE';
          style.color = '#D32F2F';
          break;
        case 'DONE':
          style.backgroundColor = '#E8F5E9';
          style.color = '#2E7D32';
          break;
      }
    }
    else{
      style.backgroundColor = '#E3F2FD'; 
      style.color = '#1976D2'; 
    }
    return style;
  }, []);

  const eventPropGetter = useCallback((event: CalendarEvent) => {
    return { style: getEventStyle(event) };
  },[getEventStyle]);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    if (event.type === 'schedule' && onScheduleClick) {
      onScheduleClick(event.schedule as ScheduleDetailResponse);
    } else if (onDrugClick && event.type === 'drug') {
      onDrugClick(event.drug as PatientDrugResponse);
    }
  },[onScheduleClick, onDrugClick]);

  const handleOnFilterChange = useCallback((status: "ALL" | ScheduleStatus)=>{
    setFilterStatus(status)
  },[setFilterStatus])

  const handleNavigate = useCallback((newDate:Date, view:View)=>{
    switch (view) {
      case Views.MONTH:
          onNavigate(startOfMonth(newDate), endOfMonth(newDate),filterStatus)
        break;
      case Views.WEEK:
          onNavigate(startOfWeek(newDate, { weekStartsOn: 0 }), endOfWeek(newDate, { weekStartsOn: 0 }),filterStatus)
        break;
      case Views.DAY:
          onNavigate(newDate, newDate,filterStatus)
        break;
    }
    setCurrentDate(newDate)
  },[onNavigate,filterStatus])

  const handleChangeView=useCallback((view:View)=>{
    setCurrView(view)
  },[setCurrView])

  useEffect(()=>{
    handleNavigate(currentDate,currView)
  },[filterStatus,currentDate,currView])

  useEffect(()=>{
    const scheduleEvents: CalendarEvent[] = schedules.map(schedule => ({
      start: new Date(schedule.appointmentDateTime),
      end: new Date(schedule.estimatedTime),
      id: schedule.id,
      type: 'schedule',
      schedule,
    }));
    const drugEvents: CalendarEvent[] = drugs.map(drug => ({
      start: new Date(drug.startDate),
      end: new Date(drug.endDate),
      id: drug.id,
      type: 'drug',
      allDay: true,
      drug,
    }));
    const newEvents = [...scheduleEvents, ...drugEvents];

    if(previewSchedule){
      newEvents.push({
        start: new Date(previewSchedule.appointmentDateTime),
        end: new Date(previewSchedule.estimatedTime),
        type: 'preview-schedule',
        previewSchedule,
      })
      setScrollToTime(new Date(previewSchedule.appointmentDateTime))
    }

    setEvents(newEvents);
  },[schedules, drugs, previewSchedule])

  return (
    <Card className='w-full'>
      <CardHeader className='flex justify-between items-center md:flex-row flex-col'>
        <CardTitle>Thời gian biểu</CardTitle>
        {hasDatePicker && <div>
          <input type="date" value={currentDate.toISOString().split('T')[0]} onChange={(e)=>setCurrentDate(new Date(e.target.value))}/>
        </div>}
        <div className="flex items-center gap-2 mb-4 md:flex-row flex-col">
          {hasFilterStatus && <>
          <select
            className="border rounded px-2 py-1"
            value={filterStatus}
            onChange={(e)=>handleOnFilterChange(e.target.value as "ALL" | ScheduleStatus)}
          >
            {(
              [
                { key: "ALL", label: "Tất cả" },
                { key: "PENDING", label: "Chưa hoàn thành" },
                { key: "CANCELLED", label: "Đã hủy" },
                { key: "DONE", label: "Đã hoàn thành" },
              ] as const
            ).map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
          </>}
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          style={{ height: `700px`, ...calendarStyle }}
          localizer={localizer}
          scrollToTime={scrollToTime}
          events={events}
          onView={handleChangeView}
          views={canChangeView?[Views.WEEK, Views.MONTH, Views.DAY]:[currView]}
          view={currView}
          date={currentDate}
          onNavigate={handleNavigate}
          step={10}
          timeslots={1}
          min={new Date(new Date().setHours(8, 0, 0, 0))}
          max={new Date(new Date().setHours(18, 10, 0, 0))}
          selectable
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          showAllEvents={false}
          components={{
            showMore:({events})=>(
              <p onClick={()=>{
                setCurrView(Views.DAY)
                setCurrentDate(events[0]?.start || new Date())
              }} className='text-sm text-blue-500 cursor-pointer'>
                {events.length} thêm +
              </p>
            ),
            event: ({ event }) => (
              <div>
                {event.type === 'schedule' && event.schedule?.status && (
                  <Badge variant="outline" className={`text-${getStatusColor(event.schedule.status)}`.toLowerCase()}>
                    {getStatusText(event.schedule.status)}
                  </Badge>
                )}
                <div className="flex-1">
                  {event.type === 'schedule'
                    ? <>
                      <p className='text-xs'>{event.schedule?.title}</p>
                      <p className="text-xs">Bác sĩ: {event.schedule?.doctor?.fullName}</p>
                      <p className="text-xs">Bệnh nhân: {event.schedule?.patient?.fullName}</p>
                    </>
                    : event.type === 'preview-schedule'
                    ? <>
                      <p className='text-xs'>{event.previewSchedule?.title}</p>
                    </>
                    : <p className="text-xs">Thuốc: {event.drug?.drug?.name}</p>}
                </div>
              </div>
            ),
            month:{
              event:({event})=>(
                <div>
                  {event.type === 'schedule'
                    ? <>
                      <p className="text-xs">
                        {event.schedule?.title!==null?event.schedule?.title:"Hẹn với " + isDoctorPov? event.schedule?.patient?.fullName : "BS " + event.schedule?.doctor?.fullName}
                      </p>
                    </>
                    : <p className="text-xs">Thuốc: {event.drug?.drug?.name}</p>}
                </div>
              )
            }
          }}
        />
      </CardContent>
    </Card>
  );

}
