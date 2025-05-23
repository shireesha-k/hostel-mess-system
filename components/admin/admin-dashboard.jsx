"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import AdminLogin from "@/components/admin/admin-login"
import UpdateExpenses from "@/components/admin/update-expenses"
import StudentDataTable from "@/components/admin/student-data-table"
import ComplaintsTable from "@/components/admin/complaints-table"
import UpdateNews from "@/components/admin/update-news"
import EnquiryTable from "@/components/admin/enquiry-table"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("administrator")
  const [activeSection, setActiveSection] = useState("expenses")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== "administrator") {
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
        <AdminLogin onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Administrator Dashboard</h1>
          <p className="text-gray-600">Manage hostel mess operations and expenses</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeSection === "expenses" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("expenses")}
            >
              Update Expenses
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeSection === "students" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("students")}
            >
              Student Data
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeSection === "complaints"
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("complaints")}
            >
              View Complaints
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeSection === "news" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("news")}
            >
              Update News
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeSection === "enquiry" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveSection("enquiry")}
            >
              View Enquiries
            </button>
          </div>

          <div className="p-6">
            {activeSection === "expenses" && <UpdateExpenses />}
            {activeSection === "students" && <StudentDataTable />}
            {activeSection === "complaints" && <ComplaintsTable />}
            {activeSection === "news" && <UpdateNews />}
            {activeSection === "enquiry" && <EnquiryTable />}
          </div>
        </div>
      </main>
    </div>
  )
}
