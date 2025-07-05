"use client"

import { useState, useEffect } from "react"
import { User, Lock, AlertCircle } from "lucide-react"

export default function StudentLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [availableStudents, setAvailableStudents] = useState([])

  // Load available students for demo purposes
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    if (savedStudentData) {
      setAvailableStudents(JSON.parse(savedStudentData))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Find student by roll number
    const student = availableStudents.find(s => s.rollNo === formData.rollNo)
    
    if (!student) {
      setError("Invalid roll number. Please check and try again.")
      return
    }

    // For demo purposes, any password works
    if (!formData.password) {
      setError("Password is required.")
      return
    }

    // Login successful
    onLogin({ ...formData, student })
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Student Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Roll Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="23011A6601"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center text-red-800">
                  <AlertCircle size={18} className="mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
