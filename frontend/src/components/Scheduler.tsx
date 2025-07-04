import { Calendar, dateFnsLocalizer, Views, type CalendarProps } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { vi } from 'date-fns/locale'
import { useCallback, useState } from 'react'


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
        views={[Views.MONTH]}
        {...props}
        localizer={localizer}
      />
  )
}