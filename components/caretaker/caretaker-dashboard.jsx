"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import CaretakerLogin from "@/components/caretaker/caretaker-login"
import StudentDataTable from "@/components/caretaker/student-data-table"
import ComplaintsTable from "../admin/complaints-table"
import EnquiryTable from "../admin/enquiry-table"

export default function CaretakerDashboard() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("caretaker")
  const [activeSection, setActiveSection] = useState("students")

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
              <h1 className="text-3xl font-bold text-blue-700">CareTaker Dashboard</h1>
              <p className="text-gray-600">Manage hostel mess operations and expenses</p>
            </div>
    
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b">
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
                    activeSection === "enquiry" ? "bg-blue-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveSection("enquiry")}
                >
                  View Enquiries
                </button>
              </div>
    
              <div className="p-6">
                
                {activeSection === "students" && <StudentDataTable />}
                {activeSection === "complaints" && <ComplaintsTable />}
                {activeSection === "enquiry" && <EnquiryTable />}
              </div>
            </div>
          </main>
        </div>
   
  )
}
