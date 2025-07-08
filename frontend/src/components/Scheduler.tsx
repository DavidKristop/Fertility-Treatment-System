import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { vi } from 'date-fns/locale'


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales:{
    vi
  },
})

export default function MyScheduler({...props}) {

  return (
      <Calendar
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: "100%" }}
        views={[Views.WORK_WEEK]}
        view={Views.WORK_WEEK}
        step={10}
        {...props}
        localizer={localizer}
      />
  )
}