import { Calendar, Views, type Event } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import type { ScheduleResponse, PatientDrugResponse, ScheduleDetailResponse } from '@/api/types';
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
  date: Date;
  onNavigate: (newDate: Date)=>void;
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
  type: 'schedule' | 'drug';
  status?: string;
  drug?: PatientDrugResponse;
  schedule?: ScheduleDetailResponse;
}

export default function ScheduleCalendar({ schedules, drugs, date, onScheduleClick, onDrugClick,onNavigate }: CustomCalendarProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([])

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
          style.backgroundColor = '#E3F2FD';
          style.color = '#1976D2';
          break;
        case 'CHANGED':
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
      style.backgroundColor = '#E8F5E9';
      style.color = '#2E7D32';
    }
    return style;
  }, []);

  const eventPropGetter = useCallback((event: CalendarEvent) => {
    return { style: getEventStyle(event) };
  },[getEventStyle]);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    if (event.type === 'schedule' && onScheduleClick) {
      onScheduleClick(event.schedule as ScheduleDetailResponse);
    } else if (onDrugClick) {
      onDrugClick(event.drug as PatientDrugResponse);
    }
  },[onScheduleClick, onDrugClick]);

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
    setEvents(newEvents);
  },[schedules, drugs])

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Thời gian biểu</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.WEEK]}
          defaultView={Views.WEEK}
          date={date}
          onNavigate={onNavigate}
          step={10}
          timeslots={1}
          min={new Date(new Date().setHours(8, 0, 0, 0))}
          max={new Date(new Date().setHours(18, 10, 0, 0))}
          selectable
          onSelectEvent={handleEventClick}
          eventPropGetter={eventPropGetter}
          components={{
            event: ({ event }) => (
              <div>
                {event.type === 'schedule' && event.schedule?.status && (
                  <Badge variant="outline" className={`text-${getStatusColor(event.schedule.status)}`.toLowerCase()}>
                    {getStatusText(event.schedule.status)}
                  </Badge>
                )}
                <div className="flex-1 mt-2">
                  {event.type === 'schedule' 
                    ? <>
                      <p className="text-xs">Bác sĩ: {event.schedule?.doctor?.fullName}</p>
                      <p className="text-xs">Bệnh nhân: {event.schedule?.patient?.fullName}</p>
                    </>
                    : <p className="text-xs">Thuốc: {event.drug?.drug?.name}</p>}
                </div>
              </div>
            )
          }}
        />
      </CardContent>
    </Card>
  );

}
