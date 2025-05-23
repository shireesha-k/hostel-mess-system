"use client"

import { useState } from "react"
import { Search, Save } from "lucide-react"
import ComplaintsTable from "../admin/complaints-table"
import EnquiryTable from "../admin/enquiry-table"

export default function StudentDataTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample student data with editable fields
  const initialStudents = [
    { id: 1, name: "Ajay Kumar", rollNo: 101, branch: "CSE", hostel: "Boys Hostel", attendanceDays: 27, totalDays: 30, monthlyBill: 9000, paymentStatus: "Paid" },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: 102,
      branch: "ECE",
      hostel: "Girls Hostel",
      attendanceDays: 25,
      totalDays: 30,
      monthlyBill: 8500,
      paymentStatus: "Pending",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      rollNo: 103,
      branch: "ME",
      hostel: "Boys Hostel",
      attendanceDays: 28,
      totalDays: 30,
      monthlyBill: 9500,
      paymentStatus: "Paid",
    },
    {
      id: 4,
      name: "Neha Gupta",
      rollNo: 104,
      branch: "CSE",
      hostel: "Girls Hostel",
      attendanceDays: 24,
      totalDays: 30,
      monthlyBill: 8000,
      paymentStatus: "Pending",
    },
    {
      id: 5,
      name: "Vikram Patel",
      rollNo: 105,
      branch: "EEE",
      hostel: "Boys Hostel",
      attendanceDays: 30,
      totalDays: 30,
      monthlyBill: 10000,
      paymentStatus: "Paid",
    },
    {
      id: 6,
      name: "Ananya Reddy",
      rollNo: 106,
      branch: "IT",
      hostel: "Girls Hostel",
      attendanceDays: 27,
      totalDays: 30,
      monthlyBill: 9200,
      paymentStatus: "Paid",
    },
    {
      id: 7,
      name: "Karthik Nair",
      rollNo: 107,
      branch: "CSE",
      hostel: "Boys Hostel",
      attendanceDays: 23,
      totalDays: 30,
      monthlyBill: 7800,
      paymentStatus: "Pending",
    },
    {
      id: 8,
      name: "Meera Joshi",
      rollNo: 108,
      branch: "ECE",
      hostel: "Girls Hostel",
      attendanceDays: 26,
      totalDays: 30,
      monthlyBill: 8800,
      paymentStatus: "Paid",
    },
  ]

  const [students, setStudents] = useState(initialStudents)
  const [editableStudents, setEditableStudents] = useState(initialStudents)
  const [selectedBranch, setSelectedBranch] = useState("All")
  const [selectedHostel, setSelectedHostel] = useState("All")

  // Get unique branches and hostels for filters
  const branches = ["All", ...new Set(initialStudents.map(student => student.branch))]
  const hostels = ["All", ...new Set(initialStudents.map(student => student.hostel))]

  // Filter students based on search term, branch, and hostel
  const filteredStudents = editableStudents.filter(
    (student) =>
      (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toString().includes(searchTerm) ||
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
  }

  const calculateBill = (attendanceDays, totalDays) => {
    // Example calculation: 100 per attendance day
    return Math.round((attendanceDays / totalDays) * 100 * 100)
  }

  const handleAttendanceChange = (id, value) => {
    const attendanceDays = Math.min(Math.max(Number.parseInt(value) || 0, 0), 30)
    const student = editableStudents.find(s => s.id === id)
    const monthlyBill = calculateBill(attendanceDays, student.totalDays)

    setEditableStudents((prevStudents) =>
      prevStudents.map((student) => 
        student.id === id ? { ...student, attendanceDays, monthlyBill } : student
      ),
    )
  }

  const handleSaveChanges = () => {
    setStudents(editableStudents)
    // Update student dashboard data
    const updatedData = editableStudents.map(student => ({
      ...student,
      attendancePercentage: Math.round((student.attendanceDays / student.totalDays) * 100)
    }))
    // Here you would typically make an API call to update the student dashboard
    console.log('Updated student dashboard data:', updatedData)
    alert("Student data updated successfully!")
  }

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
                          {student.monthlyBill.toLocaleString()}
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
                          {student.monthlyBill.toLocaleString()}
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
