"use client"

import { useState } from "react"
import { Search, Save } from "lucide-react"
import ComplaintsTable from "../admin/complaints-table"
import EnquiryTable from "../admin/enquiry-table"

export default function StudentDataTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample student data with editable fields
  const initialStudents = [
    { id: 1, name: "Ajay Kumar", rollNo: 101, branch: "CSE", attendance: 90, monthlyBill: 9000, paymentStatus: "Paid" },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: 102,
      branch: "ECE",
      attendance: 85,
      monthlyBill: 8500,
      paymentStatus: "Pending",
    },
    {
      id: 3,
      name: "Rahul Sharma",
      rollNo: 103,
      branch: "ME",
      attendance: 95,
      monthlyBill: 9500,
      paymentStatus: "Paid",
    },
    {
      id: 4,
      name: "Neha Gupta",
      rollNo: 104,
      branch: "CSE",
      attendance: 80,
      monthlyBill: 8000,
      paymentStatus: "Pending",
    },
    {
      id: 5,
      name: "Vikram Patel",
      rollNo: 105,
      branch: "EEE",
      attendance: 100,
      monthlyBill: 10000,
      paymentStatus: "Paid",
    },
    {
      id: 6,
      name: "Ananya Reddy",
      rollNo: 106,
      branch: "IT",
      attendance: 92,
      monthlyBill: 9200,
      paymentStatus: "Paid",
    },
    {
      id: 7,
      name: "Karthik Nair",
      rollNo: 107,
      branch: "CSE",
      attendance: 78,
      monthlyBill: 7800,
      paymentStatus: "Pending",
    },
    {
      id: 8,
      name: "Meera Joshi",
      rollNo: 108,
      branch: "ECE",
      attendance: 88,
      monthlyBill: 8800,
      paymentStatus: "Paid",
    },
  ]

  const [students, setStudents] = useState(initialStudents)
  const [editableStudents, setEditableStudents] = useState(initialStudents)

  // Filter students based on search term
  const filteredStudents = editableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().includes(searchTerm) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleInputChange = (id, field, value) => {
    setEditableStudents((prevStudents) =>
      prevStudents.map((student) => (student.id === id ? { ...student, [field]: value } : student)),
    )
  }

  const calculateBill = (attendance) => {
    // Example calculation: 100 per attendance percentage
    return attendance * 100
  }

  const handleAttendanceChange = (id, value) => {
    const attendance = Math.min(Math.max(Number.parseInt(value) || 0, 0), 100)
    const monthlyBill = calculateBill(attendance)

    setEditableStudents((prevStudents) =>
      prevStudents.map((student) => (student.id === id ? { ...student, attendance, monthlyBill } : student)),
    )
  }

  const handleSaveChanges = () => {
    setStudents(editableStudents)
    alert("Student data updated successfully!")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
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

        <button
          onClick={handleSaveChanges}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance (%)
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={student.attendance}
                      onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                      min="0"
                      max="100"
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
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
                  No students found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
