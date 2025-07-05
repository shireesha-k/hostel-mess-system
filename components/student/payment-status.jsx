"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Calendar, DollarSign } from "lucide-react"

export default function PaymentStatus({ status, dueDate, studentRollNo }) {
  const [studentData, setStudentData] = useState(null)
  const isPaid = status === "Paid"

  // Load student data from localStorage based on roll number
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    if (savedStudentData && studentRollNo) {
      const allStudents = JSON.parse(savedStudentData)
      const currentStudent = allStudents.find(s => s.rollNo === studentRollNo)
      setStudentData(currentStudent)
    }
  }, [studentRollNo])

  // Listen for bill update events
  useEffect(() => {
    const handleBillsUpdated = () => {
      const savedStudentData = localStorage.getItem('studentData')
      if (savedStudentData && studentRollNo) {
        const allStudents = JSON.parse(savedStudentData)
        const currentStudent = allStudents.find(s => s.rollNo === studentRollNo)
        setStudentData(currentStudent)
      }
    }

    window.addEventListener('billsUpdated', handleBillsUpdated)
    return () => window.removeEventListener('billsUpdated', handleBillsUpdated)
  }, [studentRollNo])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h2>

      <div className="flex items-center mb-4">
        {isPaid ? (
          <CheckCircle size={24} className="text-green-500 mr-2" />
        ) : (
          <AlertCircle size={24} className="text-red-500 mr-2" />
        )}
        <span className={`text-lg font-medium ${isPaid ? "text-green-600" : "text-red-600"}`}>{status}</span>
      </div>

      {/* Bill Amount Display */}
      {studentData && studentData.monthlyBill > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign size={18} className="text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Monthly Bill Amount:</span>
            </div>
            <span className="text-lg font-bold text-blue-600">
              ₹{studentData.monthlyBill.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {!isPaid && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center text-red-800">
            <Calendar size={18} className="mr-2" />
            <span>Due Date: {new Date(dueDate).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-red-600 mt-2">Please pay your mess bill before the due date to avoid late fees.</p>
        </div>
      )}

      {isPaid && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-600">Your payment for this month has been received. Thank you!</p>
        </div>
      )}
    </div>
  )
}
