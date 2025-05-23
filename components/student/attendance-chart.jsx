"use client"
import { Calendar } from "lucide-react"

export default function AttendanceChart({ attendance }) {
  const months = Object.keys(attendance)
  const values = Object.values(attendance)

  // Find the highest attendance value for scaling
  const maxAttendance = Math.max(...values)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Attendance</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>Monthly</span>
        </div>
      </div>

      <div className="h-48 flex items-end space-x-2">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-red-500 rounded-t-sm"
              style={{
                height: `${(attendance[month] / 100) * 100}%`,
                backgroundColor: attendance[month] >= 90 ? "#10B981" : attendance[month] >= 75 ? "#F59E0B" : "#EF4444",
              }}
            ></div>
            <div className="text-xs mt-1 text-gray-600 truncate w-full text-center">{month.substring(0, 3)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <div>0%</div>
        <div>25%</div>
        <div>50%</div>
        <div>75%</div>
        <div>100%</div>
      </div>
    </div>
  )
}
