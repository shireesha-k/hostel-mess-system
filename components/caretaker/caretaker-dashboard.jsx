"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import CaretakerLogin from "@/components/caretaker/caretaker-login"
import StudentDataTable from "@/components/caretaker/student-data-table"

export default function CaretakerDashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("caretaker")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== "caretaker") {
      router.push(`/${tab.toLowerCase()}`)
    }
  }

  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials against a backend
    console.log("Login attempt with:", credentials)
    setIsLoggedIn(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
        <CaretakerLogin onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Caretaker Dashboard</h1>
          <p className="text-gray-600">Manage student data and calculate bills</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Student Data Management</h2>

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

          <StudentDataTable />
        </div>
      </main>
    </div>
  )
}
