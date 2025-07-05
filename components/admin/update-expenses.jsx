"use client"

import { useState, useEffect } from "react"
import { Calendar, DollarSign, Calculator, Users } from "lucide-react"

export default function UpdateExpenses() {
  const [formData, setFormData] = useState({
    hostel: "boys",
    month: new Date().toISOString().slice(0, 7), // Current month in YYYY-MM format
    totalExpense: "",
  })

  const [calculationDetails, setCalculationDetails] = useState(null)
  const [studentData, setStudentData] = useState([])

  // Load student data from localStorage on component mount
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    if (savedStudentData) {
      setStudentData(JSON.parse(savedStudentData))
    } else {
      // Default student data if none exists
      const defaultStudents = [
        { id: 1, name: "Ajay Kumar", rollNo: "23011A6601", branch: "CSE", hostel: "Boys Hostel", attendanceDays: 27, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 2, name: "Priya Singh", rollNo: "23011A6602", branch: "ECE", hostel: "Girls Hostel", attendanceDays: 25, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 3, name: "Rahul Sharma", rollNo: "23011A6603", branch: "ME", hostel: "Boys Hostel", attendanceDays: 28, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 4, name: "Neha Gupta", rollNo: "23011A6604", branch: "CSE", hostel: "Girls Hostel", attendanceDays: 24, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 5, name: "Vikram Patel", rollNo: "23011A6605", branch: "EEE", hostel: "Boys Hostel", attendanceDays: 30, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 6, name: "Ananya Reddy", rollNo: "23011A6606", branch: "IT", hostel: "Girls Hostel", attendanceDays: 27, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 7, name: "Karthik Nair", rollNo: "23011A6607", branch: "CSE", hostel: "Boys Hostel", attendanceDays: 23, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
        { id: 8, name: "Meera Joshi", rollNo: "23011A6608", branch: "ECE", hostel: "Girls Hostel", attendanceDays: 26, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
      ]
      setStudentData(defaultStudents)
      localStorage.setItem('studentData', JSON.stringify(defaultStudents))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setCalculationDetails(null) // Clear previous calculation when form changes
  }

  // Calculate bills based on the formula
  const calculateBills = (totalExpense, hostelType) => {
    const totalDays = 30 // Assuming 30 days per month
    const hostelStudents = studentData.filter(student => 
      student.hostel.toLowerCase().includes(hostelType.toLowerCase())
    )
    
    if (hostelStudents.length === 0) {
      return null
    }

    const totalAttendanceDays = hostelStudents.reduce((sum, student) => sum + student.attendanceDays, 0)
    
    // Formula: (Total Monthly Expenses / Total Days in Month / Total Students) * Present Days of Student
    // Simplified: (Total Monthly Expenses / Total Attendance Days) * Present Days of Student
    const baseRate = totalExpense / totalAttendanceDays

    const calculatedBills = hostelStudents.map(student => ({
      ...student,
      monthlyBill: Math.round(baseRate * student.attendanceDays),
      calculatedAt: new Date().toISOString(),
      calculationMonth: formData.month
    }))

    return {
      totalExpense: totalExpense,
      hostelType: hostelType,
      totalStudents: hostelStudents.length,
      totalAttendanceDays: totalAttendanceDays,
      baseRate: baseRate,
      calculatedBills: calculatedBills,
      calculationMonth: formData.month
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.totalExpense || formData.totalExpense <= 0) {
      alert("Please enter a valid total expense amount")
      return
    }

    const calculation = calculateBills(Number(formData.totalExpense), formData.hostel)
    
    if (!calculation) {
      alert(`No students found in ${formData.hostel} hostel`)
      return
    }

    // Update student data with calculated bills
    const updatedStudentData = studentData.map(student => {
      const calculatedStudent = calculation.calculatedBills.find(s => s.id === student.id)
      return calculatedStudent || student
    })

    // Save updated data to localStorage
    localStorage.setItem('studentData', JSON.stringify(updatedStudentData))
    
    // Save calculation details for this month
    const monthlyCalculations = JSON.parse(localStorage.getItem('monthlyCalculations') || '{}')
    monthlyCalculations[formData.month] = {
      ...calculation,
      hostelType: formData.hostel
    }
    localStorage.setItem('monthlyCalculations', JSON.stringify(monthlyCalculations))

    setCalculationDetails(calculation)
    setStudentData(updatedStudentData)

    // Dispatch custom event to notify other components
    console.log('Dispatching billsUpdated event with:', { calculation, updatedStudentData })
    window.dispatchEvent(new CustomEvent('billsUpdated', {
      detail: { calculation, updatedStudentData }
    }))
    console.log('Event dispatched successfully')

    alert(`Bills calculated and updated for ${formData.hostel} hostel for ${formData.month}!`)
    setFormData((prev) => ({ ...prev, totalExpense: "" }))
  }

  // Preview calculation without saving
  const handlePreview = () => {
    if (!formData.totalExpense || formData.totalExpense <= 0) {
      alert("Please enter a valid total expense amount")
      return
    }

    const calculation = calculateBills(Number(formData.totalExpense), formData.hostel)
    setCalculationDetails(calculation)
  }

  const hostelStudents = studentData.filter(student => 
    student.hostel.toLowerCase().includes(formData.hostel.toLowerCase())
  )

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Monthly Expenses & Calculate Bills</h3>

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

        {/* Student Summary */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <Users size={18} className="text-blue-600" />
            <h4 className="font-medium text-blue-800">Student Summary for {formData.hostel === 'boys' ? 'Boys' : 'Girls'} Hostel</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Students:</span>
              <span className="font-medium ml-1">{hostelStudents.length}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Attendance Days:</span>
              <span className="font-medium ml-1">{hostelStudents.reduce((sum, s) => sum + s.attendanceDays, 0)}</span>
            </div>
            <div>
              <span className="text-gray-600">Average Attendance:</span>
              <span className="font-medium ml-1">
                {hostelStudents.length > 0 ? Math.round(hostelStudents.reduce((sum, s) => sum + s.attendanceDays, 0) / hostelStudents.length) : 0} days
              </span>
            </div>
            <div>
              <span className="text-gray-600">Total Days:</span>
              <span className="font-medium ml-1">30 days</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2 mb-2">
            <Calculator size={18} className="text-green-600" />
            <h3 className="text-lg font-medium text-green-800">Automatic Bill Calculation</h3>
          </div>
          <p className="text-sm text-gray-600">
            Bills are automatically calculated using the formula:
            <br />
            <span className="font-medium">Student Bill = (Total Monthly Expenses / Total Attendance Days) × (Present Days of Student)</span>
            <br />
            <span className="text-xs text-gray-500 mt-1 block">
              This ensures fair distribution based on actual attendance, not just enrollment.
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePreview}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Preview Calculation
          </button>
          <button
            type="submit"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Calculate & Update Bills
          </button>
        </div>
      </form>

      {/* Calculation Preview */}
      {calculationDetails && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800 mb-3">Calculation Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">Total Expense:</span>
              <span className="font-medium ml-1">₹{calculationDetails.totalExpense.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Attendance Days:</span>
              <span className="font-medium ml-1">{calculationDetails.totalAttendanceDays}</span>
            </div>
            <div>
              <span className="text-gray-600">Base Rate per Day:</span>
              <span className="font-medium ml-1">₹{calculationDetails.baseRate.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-yellow-100">
                <tr>
                  <th className="px-3 py-2 text-left">Student</th>
                  <th className="px-3 py-2 text-left">Attendance Days</th>
                  <th className="px-3 py-2 text-left">Calculated Bill</th>
                </tr>
              </thead>
              <tbody>
                {calculationDetails.calculatedBills.map((student) => (
                  <tr key={student.id} className="border-b border-yellow-200">
                    <td className="px-3 py-2">{student.name}</td>
                    <td className="px-3 py-2">{student.attendanceDays}</td>
                    <td className="px-3 py-2 font-medium">₹{student.monthlyBill.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
