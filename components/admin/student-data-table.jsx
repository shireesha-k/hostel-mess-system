"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"

export default function StudentDataTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample student data
  const initialStudents = [
    { id: 1, name: "Ajay Kumar", rollNo: 101, branch: "CSE", pnNo: 987654, paymentStatus: "Paid" },
    { id: 2, name: "Priya Singh", rollNo: 102, branch: "ECE", pnNo: 876543, paymentStatus: "Pending" },
    { id: 3, name: "Rahul Sharma", rollNo: 103, branch: "ME", pnNo: 765432, paymentStatus: "Paid" },
    { id: 4, name: "Neha Gupta", rollNo: 104, branch: "CSE", pnNo: 654321, paymentStatus: "Pending" },
    { id: 5, name: "Vikram Patel", rollNo: 105, branch: "EEE", pnNo: 543210, paymentStatus: "Paid" },
    { id: 6, name: "Ananya Reddy", rollNo: 106, branch: "IT", pnNo: 432109, paymentStatus: "Paid" },
    { id: 7, name: "Karthik Nair", rollNo: 107, branch: "CSE", pnNo: 321098, paymentStatus: "Pending" },
    { id: 8, name: "Meera Joshi", rollNo: 108, branch: "ECE", pnNo: 210987, paymentStatus: "Paid" },
    { id: 9, name: "Arjun Malhotra", rollNo: 109, branch: "ME", pnNo: 109876, paymentStatus: "Pending" },
    { id: 10, name: "Divya Kapoor", rollNo: 110, branch: "CSE", pnNo: 987123, paymentStatus: "Paid" },
    { id: 11, name: "Sanjay Verma", rollNo: 111, branch: "IT", pnNo: 876234, paymentStatus: "Pending" },
    { id: 12, name: "Pooja Mehta", rollNo: 112, branch: "EEE", pnNo: 765345, paymentStatus: "Paid" },
  ]

  const [students] = useState(initialStudents)

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().includes(searchTerm) ||
      student.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.pnNo.toString().includes(searchTerm),
  )

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleExportData = () => {
    alert("Exporting student data as CSV...")
    // In a real app, you would generate and download a CSV file
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-800">Student Data</h3>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="Search students..."
            />
          </div>

          <button
            onClick={handleExportData}
            className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <Download size={18} />
            <span>Export</span>
          </button>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PN No</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.pnNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
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
