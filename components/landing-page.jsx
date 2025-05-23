"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import NewsTicker from "@/components/news-ticker"
import MessOfficials from "@/components/mess-officials"

export default function LandingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== "home") {
      router.push(`/${tab.toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Hostel Mess Management System</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Efficiently manage hostel mess operations, attendance, and payments
          </p>
        </div>

        <NewsTicker />

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
            Welcome to the Hostel Mess Management Portal
          </h2>
          <p className="text-gray-600 mb-4">
            This system helps manage all aspects of hostel mess operations including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-medium text-blue-700 mb-2">For Administrators</h3>
              <p className="text-gray-600">Manage expenses, update bills, and oversee operations</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-medium text-green-700 mb-2">For Caretakers</h3>
              <p className="text-gray-600">Update student data, manage attendance, and calculate bills</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-medium text-red-700 mb-2">For Students</h3>
              <p className="text-gray-600">View attendance, check payment status, and submit complaints</p>
            </div>
          </div>
        </div>

        <MessOfficials />
      </main>

      <footer className="bg-blue-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Hostel Mess Management System</p>
          <p className="text-sm mt-2">Developed for efficient hostel operations</p>
        </div>
      </footer>
    </div>
  )
}
