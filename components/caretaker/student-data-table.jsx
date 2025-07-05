"use client"

import { useState, useEffect } from "react"
import { Search, Save, Calculator } from "lucide-react"
import ComplaintsTable from "../admin/complaints-table"
import EnquiryTable from "../admin/enquiry-table"

export default function StudentDataTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample student data with editable fields
  const initialStudents = [
    { id: 1, name: "Ajay Kumar", rollNo: "23011A6601", branch: "CSE", hostel: "Boys Hostel", attendanceDays: 27, totalDays: 30, monthlyBill: 0, paymentStatus: "Pending" },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: "23011A6602",
      branch: "ECE",
      hostel: "Girls Hostel",
      attendanceDays: 25,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      rollNo: "23011A6603",
      branch: "ME",
      hostel: "Boys Hostel",
      attendanceDays: 28,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 4,
      name: "Neha Gupta",
      rollNo: "23011A6604",
      branch: "CSE",
      hostel: "Girls Hostel",
      attendanceDays: 24,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 5,
      name: "Vikram Patel",
      rollNo: "23011A6605",
      branch: "EEE",
      hostel: "Boys Hostel",
      attendanceDays: 30,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 6,
      name: "Ananya Reddy",
      rollNo: "23011A6606",
      branch: "IT",
      hostel: "Girls Hostel",
      attendanceDays: 27,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 7,
      name: "Karthik Nair",
      rollNo: "23011A6607",
      branch: "CSE",
      hostel: "Boys Hostel",
      attendanceDays: 23,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
    {
      id: 8,
      name: "Meera Joshi",
      rollNo: "23011A6608",
      branch: "ECE",
      hostel: "Girls Hostel",
      attendanceDays: 26,
      totalDays: 30,
      monthlyBill: 0,
      paymentStatus: "Pending",
    },
  ]

  const [students, setStudents] = useState(initialStudents)
  const [editableStudents, setEditableStudents] = useState(initialStudents)
  const [selectedBranch, setSelectedBranch] = useState("All")
  const [selectedHostel, setSelectedHostel] = useState("All")
  const [monthlyCalculations, setMonthlyCalculations] = useState({})

  // Load student data and calculations from localStorage on component mount
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    const savedCalculations = localStorage.getItem('monthlyCalculations')
    
    if (savedStudentData) {
      const parsedData = JSON.parse(savedStudentData)
      setStudents(parsedData)
      setEditableStudents(parsedData)
    }
    
    if (savedCalculations) {
      setMonthlyCalculations(JSON.parse(savedCalculations))
    }
  }, [])

  // Listen for bill update events
  useEffect(() => {
    const handleBillsUpdated = (event) => {
      const { updatedStudentData } = event.detail
      setStudents(updatedStudentData)
      setEditableStudents(updatedStudentData)
      
      // Reload calculations
      const savedCalculations = localStorage.getItem('monthlyCalculations')
      if (savedCalculations) {
        setMonthlyCalculations(JSON.parse(savedCalculations))
      }
    }

    window.addEventListener('billsUpdated', handleBillsUpdated)
    return () => window.removeEventListener('billsUpdated', handleBillsUpdated)
  }, [])

  // Get unique branches and hostels for filters
  const branches = ["All", ...new Set(students.map(student => student.branch))]
  const hostels = ["All", ...new Set(students.map(student => student.hostel))]

  // Filter students based on search term, branch, and hostel
  const filteredStudents = editableStudents.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedBranch === "All" || student.branch === selectedBranch) &&
      (selectedHostel === "All" || student.hostel === selectedHostel)
  )

  // Separate students by hostel
  const boysHostelStudents = filteredStudents.filter(student => student.hostel === "Boys Hostel")
  const girlsHostelStudents = filteredStudents.filter(student => student.hostel === "Girls Hostel")

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value)
  }

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value)
  }

  const handleInputChange = (id, field, value) => {
    setEditableStudents((prevStudents) =>
      prevStudents.map((student) => (student.id === id ? { ...student, [field]: value } : student)),
    )
    
    // Dispatch event for payment status changes
    if (field === "paymentStatus") {
      window.dispatchEvent(new CustomEvent('paymentStatusUpdated', {
        detail: { studentId: id, newStatus: value }
      }))
    }
  }

  const handleAttendanceChange = (id, value) => {
    const attendanceDays = Math.min(Math.max(Number.parseInt(value) || 0, 0), 30)
    
    setEditableStudents((prevStudents) =>
      prevStudents.map((student) => 
        student.id === id ? { ...student, attendanceDays } : student
      ),
    )
  }

  const handleSaveChanges = () => {
    setStudents(editableStudents)
    
    // Save updated data to localStorage
    localStorage.setItem('studentData', JSON.stringify(editableStudents))
    
    // Update student dashboard data
    const updatedData = editableStudents.map(student => ({
      ...student,
      attendancePercentage: Math.round((student.attendanceDays / student.totalDays) * 100)
    }))
    
    console.log('Updated student dashboard data:', updatedData)
    alert("Student data updated successfully!")
  }

  // Get current month's calculation info
  const currentMonth = new Date().toISOString().slice(0, 7)
  const currentCalculation = monthlyCalculations[currentMonth]

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full"
              placeholder="Search students..."
            />
          </div>
          <select
            value={selectedBranch}
            onChange={handleBranchChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select
            value={selectedHostel}
            onChange={handleHostelChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {hostels.map(hostel => (
              <option key={hostel} value={hostel}>{hostel}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSaveChanges}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Bill Calculation Summary */}
      {currentCalculation && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={18} className="text-blue-600" />
            <h4 className="font-medium text-blue-800">Current Month Bill Calculation ({currentMonth})</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Total Expense:</span>
              <span className="font-medium ml-1">₹{currentCalculation.totalExpense?.toLocaleString() || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Hostel:</span>
              <span className="font-medium ml-1">{currentCalculation.hostelType === 'boys' ? 'Boys' : 'Girls'} Hostel</span>
            </div>
            <div>
              <span className="text-gray-600">Total Students:</span>
              <span className="font-medium ml-1">{currentCalculation.totalStudents || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600">Base Rate:</span>
              <span className="font-medium ml-1">₹{currentCalculation.baseRate?.toFixed(2) || 'N/A'}/day</span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Show Boys Hostel section only when "All" or "Boys Hostel" is selected */}
        {(selectedHostel === "All" || selectedHostel === "Boys Hostel") && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Boys Hostel</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance Days (out of 30)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Bill (₹)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {boysHostelStudents.length > 0 ? (
                    boysHostelStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={student.attendanceDays}
                            onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                            min="0"
                            max="30"
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <span className="text-sm text-gray-500 ml-2">/ {student.totalDays}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`font-medium ${student.monthlyBill > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            ₹{student.monthlyBill.toLocaleString()}
                          </span>
                          {student.monthlyBill === 0 && (
                            <span className="text-xs text-gray-400 ml-1">(Not calculated)</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={student.paymentStatus}
                            onChange={(e) => handleInputChange(student.id, "paymentStatus", e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found in Boys Hostel matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Show Girls Hostel section only when "All" or "Girls Hostel" is selected */}
        {(selectedHostel === "All" || selectedHostel === "Girls Hostel") && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Girls Hostel</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance Days (out of 30)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Bill (₹)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {girlsHostelStudents.length > 0 ? (
                    girlsHostelStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={student.attendanceDays}
                            onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                            min="0"
                            max="30"
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                          <span className="text-sm text-gray-500 ml-2">/ {student.totalDays}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`font-medium ${student.monthlyBill > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            ₹{student.monthlyBill.toLocaleString()}
                          </span>
                          {student.monthlyBill === 0 && (
                            <span className="text-xs text-gray-400 ml-1">(Not calculated)</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={student.paymentStatus}
                            onChange={(e) => handleInputChange(student.id, "paymentStatus", e.target.value)}
                            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          >
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found in Girls Hostel matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
