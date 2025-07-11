import { Calendar, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import type { ScheduleResponse, PatientDrugResponse } from '@/api/types';
import { Badge } from '@/components/ui/badge';
import { vi } from 'date-fns/locale';

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
  schedules: ScheduleResponse[];
  drugs: PatientDrugResponse[];
  onScheduleClick?: (schedule: ScheduleResponse) => void;
  onDrugClick?: (drug: PatientDrugResponse) => void;
}

export default function CustomCalendar({ schedules, drugs, onScheduleClick, onDrugClick }: CustomCalendarProps) {
  const getEventStyle = (event: ScheduleResponse | PatientDrugResponse, start: Date, end: Date, isSelected: boolean) => {
    const style = {
      backgroundColor: '#fff',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
      padding: '0px'
    };

    if ('status' in event) { // Schedule
      switch (event.status) {
        case 'PENDING':
          style.backgroundColor = '#E3F2FD';
          style.color = '#1976D2';
          break;
        case 'CHANGED':
          style.backgroundColor = '#FFF3E0';
          style.color = '#FFA000';
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
    } else { // Drug
      style.backgroundColor = '#E1F5FE';
      style.color = '#0D47A1';
    }

    return {
      style: style
    };
  };

  const events = [...schedules, ...drugs].map(event => ({
    ...event,
    start: 'startDate' in event 
      ? parse(event.startDate, 'yyyy-MM-dd', new Date())
      : parse(event.appointmentDateTime, 'yyyy-MM-dd HH:mm:ss', new Date()),
    end: 'endDate' in event 
      ? parse(event.endDate, 'yyyy-MM-dd', new Date())
      : parse(event.estimatedTime, 'yyyy-MM-dd HH:mm:ss', new Date())
  }));

  const eventPropGetter = (event: ScheduleResponse | PatientDrugResponse, start: Date, end: Date, isSelected: boolean) => {
    return getEventStyle(event, start, end, isSelected);
  };

  const handleEventClick = (event: ScheduleResponse | PatientDrugResponse) => {
    if ('status' in event && onScheduleClick) {
      onScheduleClick(event);
    } else if (onDrugClick) {
      onDrugClick(event as PatientDrugResponse);
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={[Views.WORK_WEEK]}
      view={Views.WORK_WEEK}
      step={10}
      timeslots={1}
      min={new Date(new Date().setHours(8, 0, 0, 0))}
      max={new Date(new Date().setHours(18, 0, 0, 0))}
      selectable
      onSelectEvent={handleEventClick}
      eventPropGetter={eventPropGetter}
      components={{
        event: ({ event }) => (
          <div className="flex items-center gap-2 p-2">
            {('status' in event) && (
              <Badge variant="outline" className={`text-${getStatusColor(event.status)}`.toLowerCase()}>
                {getStatusText(event.status)}
              </Badge>
            )}
            <div className="flex-1">
              {'status' in event ? event.status : event.drug.name}
            </div>
          </div>
        )
      }}
    />
  );

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
}
