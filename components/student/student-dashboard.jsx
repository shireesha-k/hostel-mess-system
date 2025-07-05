"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import StudentLogin from "@/components/student/student-login"
import StudentProfile from "@/components/student/student-profile"
import PaymentStatus from "@/components/student/payment-status"
import BillBreakdown from "@/components/student/bill-breakdown"

export default function StudentDashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("student")
  const [loggedInStudent, setLoggedInStudent] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== "student") {
      router.push(`/${tab.toLowerCase()}`)
    }
  }

  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials against a backend
    console.log("Login attempt with:", credentials)

    // Use the actual student data from login
    const student = credentials.student
    
    // Create student data with attendance history
    const studentData = {
      ...student,
      pnNo: 987654, // Mock PN number
      attendance: {
        January: 85,
        February: 90,
        March: 95,
        April: 88,
        May: 92,
        June: 78,
        July: 82,
        August: 94,
        September: 89,
        October: 91,
      },
      dueDate: "2023-11-15",
      bills: [
        { month: "October", amount: 9100, status: "Paid", date: "2023-10-10" },
        { month: "September", amount: 8900, status: "Paid", date: "2023-09-12" },
        { month: "August", amount: 9400, status: "Paid", date: "2023-08-15" },
      ],
      currentBill: {
        month: "November",
        totalAmount: 9500,
        breakdown: [
          { item: "Food Charges", amount: 8000 },
          { item: "Maintenance", amount: 1000 },
          { item: "Electricity", amount: 500 },
        ],
      },
    }

    setLoggedInStudent(studentData)
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
        <StudentLogin onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-3xl font-bold text-blue-700">Student Dashboard</h1>
            <button
              onClick={() => {
                setIsLoggedIn(false)
                setLoggedInStudent(null)
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600">
            Welcome, {loggedInStudent.name} ({loggedInStudent.rollNo})
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Row: Student Profile and Payment Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Profile */}
            <div className="w-full">
              <StudentProfile student={loggedInStudent} />
            </div>

            {/* Payment Status */}
            <div className="w-full">
              <PaymentStatus 
                status={loggedInStudent.paymentStatus} 
                dueDate={loggedInStudent.dueDate}
                studentRollNo={loggedInStudent.rollNo}
              />
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="w-full">
            <BillBreakdown studentRollNo={loggedInStudent.rollNo} />
          </div>
        </div>
      </main>
    </div>
  )
}

