"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import { Send, AlertTriangle } from "lucide-react"

export default function ComplaintsForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("complaints")
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    pnNo: "",
    branch: "",
    complaint: "",
  })

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab !== "complaints") {
      router.push(`/${tab.toLowerCase()}`)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create new complaint object
    const newComplaint = {
      id: Date.now(), // Use timestamp as unique ID
      name: formData.name,
      rollNo: formData.rollNo,
      pnNo: formData.pnNo,
      branch: formData.branch,
      complaint_text: formData.complaint,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    
    // Get existing complaints from localStorage
    const existingComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    
    // Add new complaint
    existingComplaints.push(newComplaint);
    
    // Save back to localStorage
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));
    
    // Dispatch custom event to notify admin/caretaker interfaces
    window.dispatchEvent(new CustomEvent('complaintSubmitted', { detail: newComplaint }));
    
    console.log("Complaint submitted:", newComplaint);
    alert("Your complaint has been submitted successfully!")
    
    // Reset form
    setFormData({
      name: "",
      rollNo: "",
      pnNo: "",
      branch: "",
      complaint: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-700">Submit a Complaint</h1>
          <p className="text-gray-600">Let us know if you have any issues with the mess services</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="text-red-500 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Complaint Form</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PN Number</label>
                  <input
                    type="text"
                    name="pnNo"
                    value={formData.pnNo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="CSE(AI&ML)">CSE(AI&ML)</option>
                    <option value="CSC">CSC</option>
                    <option value="CSE-IDP">CSE-IDP</option>
                    <option value="ECE">ECE</option>
                    <option value="ECE-IDP">ECE-IDP</option>
                    <option value="EEE">EEE</option>
                    <option value="EEE-IDP">EEE-IDP</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Metallurgy">Metallurgy</option>
                    <option value="Civil">Civil</option>
                    <option value="Civil-Idp">Civil-Idp</option>
                    <option value="bio-Technology">Bio technology</option>
                    <option value="IT">IT</option>

                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Details</label>
                <textarea
                  name="complaint"
                  value={formData.complaint}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Please describe your issue in detail..."
                  required
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <Send size={18} />
                  <span>Submit Complaint</span>
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All complaints are reviewed by the hostel administration. You will receive a
                response within 48 hours. For urgent matters, please contact the mess officials directly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
