"use client"

import { useState } from "react"
import { Calendar, DollarSign } from "lucide-react"

export default function UpdateExpenses() {
  const [formData, setFormData] = useState({
    hostel: "boys",
    month: new Date().toISOString().slice(0, 7), // Current month in YYYY-MM format
    totalExpense: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Expense update:", formData)
    alert(`Expense updated for ${formData.hostel} hostel for ${formData.month}`)
    setFormData((prev) => ({ ...prev, totalExpense: "" }))
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Monthly Expenses</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Hostel</label>
            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="boys">Boys Hostel</option>
              <option value="girls">Girls Hostel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Month</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                type="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Monthly Expense (₹)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <input
              type="number"
              name="totalExpense"
              value={formData.totalExpense}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="100000"
              min="1"
              required
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">Enter the total expense for the selected month</p>
        </div>
        
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">Automatic Bill Calculation</h3>
            <p className="text-sm text-gray-600">
              Bills are automatically calculated using the formula:
              <br />
              <span className="font-medium">Bill = (Total Monthly Expense / No. of Days) × (Present Days)</span>
              <br />
              Example: If total expense = ₹1,00,000 for 30 days, and a student was present 25 days →
              <br />
              Bill = (1,00,000 / 30) × 25 = ₹83,333
            </p>

          </div>


        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Update Bill
          </button>
        </div>
      </form>
    </div>
  )
}
