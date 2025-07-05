"use client"

import { useState, useEffect } from "react"
import { DollarSign, Calendar, Users, Calculator, Table } from "lucide-react"

export default function BillBreakdown({ studentRollNo }) {
  const [studentData, setStudentData] = useState(null)
  const [monthlyCalculation, setMonthlyCalculation] = useState(null)
  const [currentMonth] = useState(new Date().toISOString().slice(0, 7))
  const [billingHistory, setBillingHistory] = useState([])

  // Load student data and calculations from localStorage based on roll number
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    const savedCalculations = localStorage.getItem('monthlyCalculations')
    
    if (savedStudentData && studentRollNo) {
      const allStudents = JSON.parse(savedStudentData)
      const currentStudent = allStudents.find(s => s.rollNo === studentRollNo)
      setStudentData(currentStudent)
    }
    
    if (savedCalculations) {
      const calculations = JSON.parse(savedCalculations)
      setMonthlyCalculation(calculations[currentMonth])
    }

    // Load billing history from localStorage or create default
    const savedBillingHistory = localStorage.getItem(`billingHistory_${studentRollNo}`)
    if (savedBillingHistory) {
      const existingHistory = JSON.parse(savedBillingHistory)
      console.log('Loading existing billing history:', existingHistory)
      setBillingHistory(existingHistory)
    } else {
      // Create default billing history up to June
      const defaultHistory = [
        { month: "January", year: 2025, attendanceDays: 25, totalDays: 31, billAmount: 8500, status: "Paid", paymentDate: "2025-01-15" },
        { month: "February", year: 2025, attendanceDays: 28, totalDays: 29, billAmount: 9200, status: "Paid", paymentDate: "2025-02-12" },
        { month: "March", year: 2025, attendanceDays: 30, totalDays: 31, billAmount: 9500, status: "Paid", paymentDate: "2025-03-10" },
        { month: "April", year: 2025, attendanceDays: 27, totalDays: 30, billAmount: 8800, status: "Paid", paymentDate: "2025-04-14" },
        { month: "May", year: 2025, attendanceDays: 29, totalDays: 31, billAmount: 9300, status: "Paid", paymentDate: "2025-05-11" },
        { month: "June", year: 2025, attendanceDays: 26, totalDays: 30, billAmount: 8700, status: "Paid", paymentDate: "2025-06-13" },
      ]
      console.log('Creating default billing history:', defaultHistory)
      setBillingHistory(defaultHistory)
      localStorage.setItem(`billingHistory_${studentRollNo}`, JSON.stringify(defaultHistory))
    }
  }, [currentMonth, studentRollNo])

  // Function to add or update bill in history
  const addBillToHistory = (calculation, currentStudent) => {
    if (!currentStudent || currentStudent.monthlyBill <= 0) return

    const newBillEntry = {
      month: new Date(calculation.calculationMonth + "-01").toLocaleDateString('en-US', { month: 'long' }),
      year: new Date(calculation.calculationMonth + "-01").getFullYear(),
      attendanceDays: currentStudent.attendanceDays,
      totalDays: currentStudent.totalDays,
      billAmount: currentStudent.monthlyBill,
      status: "Pending",
      paymentDate: null,
      calculatedAt: currentStudent.calculatedAt
    }

    console.log('Adding new bill entry:', newBillEntry)

    setBillingHistory(prevHistory => {
      // Check if this month already exists in history
      const existingIndex = prevHistory.findIndex(entry => 
        entry.month === newBillEntry.month && entry.year === newBillEntry.year
      )

      let updatedHistory
      if (existingIndex >= 0) {
        // Update existing entry
        updatedHistory = [...prevHistory]
        updatedHistory[existingIndex] = newBillEntry
        console.log('Updated existing bill entry at index:', existingIndex)
      } else {
        // Add new entry
        updatedHistory = [...prevHistory, newBillEntry]
        console.log('Added new bill entry to history')
      }

      // Sort by date (newest first)
      updatedHistory.sort((a, b) => {
        const dateA = new Date(a.year, getMonthNumber(a.month))
        const dateB = new Date(b.year, getMonthNumber(b.month))
        return dateB - dateA
      })

      console.log('Final updated history:', updatedHistory)
      
      // Save to localStorage
      localStorage.setItem(`billingHistory_${studentRollNo}`, JSON.stringify(updatedHistory))
      return updatedHistory
    })
  }

  // Listen for bill update events
  useEffect(() => {
    console.log('Setting up event listeners for student:', studentRollNo)
    
    const handleBillsUpdated = (event) => {
      console.log('Bills updated event received:', event.detail)
      console.log('Current student roll no:', studentRollNo)
      
      const savedStudentData = localStorage.getItem('studentData')
      const savedCalculations = localStorage.getItem('monthlyCalculations')
      
      if (savedStudentData && studentRollNo) {
        const allStudents = JSON.parse(savedStudentData)
        const currentStudent = allStudents.find(s => s.rollNo === studentRollNo)
        console.log('Found current student in updated data:', currentStudent)
        setStudentData(currentStudent)
      }
      
      if (savedCalculations) {
        const calculations = JSON.parse(savedCalculations)
        setMonthlyCalculation(calculations[currentMonth])
      }

      // Add new calculated bill to history
      const { calculation } = event.detail
      if (calculation && studentRollNo) {
        console.log('Processing calculation for student:', studentRollNo)
        console.log('Calculation details:', calculation)
        const currentStudent = calculation.calculatedBills.find(s => s.rollNo === studentRollNo)
        console.log('Found student in calculation:', currentStudent)
        
        if (currentStudent && currentStudent.monthlyBill > 0) {
          console.log('Calling addBillToHistory with:', { calculation, currentStudent })
          addBillToHistory(calculation, currentStudent)
        } else {
          console.log('No valid student found or bill amount is 0')
        }
      } else {
        console.log('No calculation or studentRollNo available')
      }
    }

    // Listen for payment status updates from caretaker
    const handlePaymentStatusUpdated = () => {
      console.log('Payment status updated event received')
      const savedStudentData = localStorage.getItem('studentData')
      if (savedStudentData && studentRollNo) {
        const allStudents = JSON.parse(savedStudentData)
        const currentStudent = allStudents.find(s => s.rollNo === studentRollNo)
        if (currentStudent) {
          setStudentData(currentStudent)
          
          // Update billing history with new payment status
          setBillingHistory(prevHistory => {
            const updatedHistory = prevHistory.map(entry => {
              // Update the most recent pending entry if payment status changed to Paid
              if (entry.status === "Pending" && currentStudent.paymentStatus === "Paid") {
                return {
                  ...entry,
                  status: "Paid",
                  paymentDate: new Date().toISOString().slice(0, 10)
                }
              }
              return entry
            })
            
            localStorage.setItem(`billingHistory_${studentRollNo}`, JSON.stringify(updatedHistory))
            return updatedHistory
          })
        }
      }
    }

    window.addEventListener('billsUpdated', handleBillsUpdated)
    window.addEventListener('paymentStatusUpdated', handlePaymentStatusUpdated)
    
    console.log('Event listeners added for billsUpdated and paymentStatusUpdated')
    
    return () => {
      console.log('Cleaning up event listeners')
      window.removeEventListener('billsUpdated', handleBillsUpdated)
      window.removeEventListener('paymentStatusUpdated', handlePaymentStatusUpdated)
    }
  }, [currentMonth, studentRollNo])

  // Check for existing calculated bills when component mounts
  useEffect(() => {
    const savedCalculations = localStorage.getItem('monthlyCalculations')
    if (savedCalculations && studentRollNo) {
      const calculations = JSON.parse(savedCalculations)
      const currentCalculation = calculations[currentMonth]
      
      if (currentCalculation) {
        console.log('Found existing calculation for current month:', currentCalculation)
        const currentStudent = currentCalculation.calculatedBills?.find(s => s.rollNo === studentRollNo)
        console.log('Found student in existing calculation:', currentStudent)
        
        if (currentStudent && currentStudent.monthlyBill > 0) {
          console.log('Adding existing calculation to billing history')
          addBillToHistory(currentCalculation, currentStudent)
        }
      }
    }
  }, [currentMonth, studentRollNo])

  // Helper function to get month number
  const getMonthNumber = (monthName) => {
    const months = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    }
    return months[monthName] || 0
  }

  if (!studentData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Bill</h2>
        <div className="text-center text-gray-500 py-8">
          <Calculator size={48} className="mx-auto mb-4 text-gray-300" />
          <p>Loading bill information...</p>
        </div>
      </div>
    )
  }

  const attendancePercentage = Math.round((studentData.attendanceDays / studentData.totalDays) * 100)
  const hasCalculatedBill = studentData.monthlyBill > 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Bill - {currentMonth}</h2>

      {/* Student Info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-blue-600" />
          <h3 className="font-medium text-blue-800">Student Information</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Name:</span>
            <span className="font-medium ml-1">{studentData.name}</span>
          </div>
          <div>
            <span className="text-gray-600">Hostel:</span>
            <span className="font-medium ml-1">{studentData.hostel}</span>
          </div>
          <div>
            <span className="text-gray-600">Roll No:</span>
            <span className="font-medium ml-1">{studentData.rollNo}</span>
          </div>
          <div>
            <span className="text-gray-600">Branch:</span>
            <span className="font-medium ml-1">{studentData.branch}</span>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={18} className="text-green-600" />
          <h3 className="font-medium text-green-800">Current Month Attendance</h3>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Present Days:</span>
            <span className="font-medium ml-1">{studentData.attendanceDays}</span>
          </div>
          <div>
            <span className="text-gray-600">Total Days:</span>
            <span className="font-medium ml-1">{studentData.totalDays}</span>
          </div>
          <div>
            <span className="text-gray-600">Attendance:</span>
            <span className="font-medium ml-1">{attendancePercentage}%</span>
          </div>
        </div>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${attendancePercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Bill Calculation */}
      {hasCalculatedBill ? (
        <div className="space-y-4 mb-6">
          {/* Calculation Details */}
          {monthlyCalculation && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-center gap-2 mb-3">
                <Calculator size={18} className="text-yellow-600" />
                <h3 className="font-medium text-yellow-800">Calculation Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Monthly Expense:</span>
                  <span className="font-medium ml-1">₹{monthlyCalculation.totalExpense?.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Base Rate per Day:</span>
                  <span className="font-medium ml-1">₹{monthlyCalculation.baseRate?.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Students:</span>
                  <span className="font-medium ml-1">{monthlyCalculation.totalStudents}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Attendance Days:</span>
                  <span className="font-medium ml-1">{monthlyCalculation.totalAttendanceDays}</span>
                </div>
              </div>
            </div>
          )}

          {/* Bill Amount */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-purple-800">Your Monthly Bill</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Calculated based on your attendance: {studentData.attendanceDays} days
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{studentData.monthlyBill.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  Due: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className={`p-4 rounded-md border ${
            studentData.paymentStatus === 'Paid' 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-800">Payment Status</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {studentData.paymentStatus === 'Paid' 
                    ? 'Payment received successfully' 
                    : 'Payment pending'
                  }
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                studentData.paymentStatus === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {studentData.paymentStatus}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8 mb-6">
          <DollarSign size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="font-medium mb-2">Bill Not Yet Calculated</p>
          <p className="text-sm">
            Your monthly bill will be calculated by the administrator based on the total expenses and attendance.
          </p>
        </div>
      )}

      {/* Billing History Table */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Table size={18} className="text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Billing History</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {billingHistory.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.month} {entry.year}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {entry.attendanceDays}/{entry.totalDays} days
                    <div className="text-xs text-gray-400">
                      ({Math.round((entry.attendanceDays / entry.totalDays) * 100)}%)
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{entry.billAmount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {entry.paymentDate ? new Date(entry.paymentDate).toLocaleDateString() : "Pending"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
