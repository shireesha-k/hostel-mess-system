"use client"
import { Calendar } from "lucide-react"

export default function AttendanceChart() {
  // Example data
  const attendance = {
    "January": 85,
    "February": 92,
    "March": 78,
    "April": 88,
    "May": 95,
    "June": 82
  }

  const billAmounts = {
    "January": 5000,
    "February": 5000,
    "March": 5000,
    "April": 5000,
    "May": 5000,
    "June": 5000
  }

  const paymentStatus = {
    "January": "Paid",
    "February": "Paid",
    "March": "Pending",
    "April": "Paid",
    "May": "Unpaid",
    "June": "Pending"
  }

  const paymentDates = {
    "January": "2024-01-15",
    "February": "2024-02-12",
    "March": "-",
    "April": "2024-04-18",
    "May": "-",
    "June": "-"
  }

  const months = Object.keys(attendance)

  // Helper function to get days in a month
  const getDaysInMonth = (month) => {
    const monthMap = {
      "January": 31,
      "February": 29, // 2024 is a leap year
      "March": 31,
      "April": 30,
      "May": 31,
      "June": 30
    }
    return monthMap[month]
  }

  // Helper function to format date
  const formatDate = (dateStr) => {
    if (dateStr === "-") return "-"
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Attendance & Billing Details</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-1" />
          <span>Monthly</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Present</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {months.map((month) => {
              const totalDays = getDaysInMonth(month)
              const daysPresent = Math.round((attendance[month] / 100) * totalDays)
              const attendancePercentage = attendance[month]
              
              return (
                <tr key={month}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      attendancePercentage >= 90 ? 'bg-green-100 text-green-800' :
                      attendancePercentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {daysPresent} / {totalDays} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{billAmounts[month].toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paymentStatus[month] === 'Paid' ? 'bg-green-100 text-green-800' :
                      paymentStatus[month] === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {paymentStatus[month]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(paymentDates[month])}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
