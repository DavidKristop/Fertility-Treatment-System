"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CustomCalendarPickerProps {
  value: string | null
  onChange: (date: string) => void
  highlightedDates?: number[]
  initialDate?: Date
}

export function CustomCalendarPicker({
  value,
  onChange,
  highlightedDates = [],
  initialDate = new Date()
}: CustomCalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(initialDate)
  
  const calendarDays = Array.from(
    { length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() },
    (_, i) => i + 1
  )

  const handleDateSelect = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(date.toISOString().split("T")[0])
  }

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Reset to current month if value is cleared
  useEffect(() => {
    if (!value) {
      setCurrentMonth(initialDate)
    }
  }, [value, initialDate])

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex justify-between mb-2 items-center">
        <Button variant="ghost" size="sm" onClick={handlePreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span>{currentMonth.toLocaleString("vi-VN", { month: "long", year: "numeric" })}</span>
        <Button variant="ghost" size="sm" onClick={handleNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
          <div key={day} className="font-bold text-sm">
            {day}
          </div>
        ))}
        {calendarDays.map((day) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const dateString = date.toISOString().split("T")[0]
          const isSelected = value === dateString
          const isHighlighted = highlightedDates.includes(day)
          
          return (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`p-2 rounded-full ${
                isSelected 
                  ? "bg-blue-500 text-white" 
                  : isHighlighted 
                  ? "bg-yellow-200" 
                  : "hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
