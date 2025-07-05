"use client"

import { useState, useEffect } from "react"
import { Search, Download } from "lucide-react"

export default function StudentDataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([])

  // Load student data from localStorage on component mount
  useEffect(() => {
    const savedStudentData = localStorage.getItem('studentData')
    if (savedStudentData) {
      setStudents(JSON.parse(savedStudentData))
    } else {
      // Default student data if none exists
      const defaultStudents = [
        { id: 1, name: "Ajay Kumar", rollNo: "23011A6601", branch: "CSE", pnNo: 987654, paymentStatus: "Pending", monthlyBill: 0, hostel: "Boys Hostel", attendanceDays: 27 },
        { id: 2, name: "Priya Singh", rollNo: "23011A6602", branch: "ECE", pnNo: 876543, paymentStatus: "Pending", monthlyBill: 0, hostel: "Girls Hostel", attendanceDays: 25 },
        { id: 3, name: "Rahul Sharma", rollNo: "23011A6603", branch: "ME", pnNo: 765432, paymentStatus: "Pending", monthlyBill: 0, hostel: "Boys Hostel", attendanceDays: 28 },
        { id: 4, name: "Neha Gupta", rollNo: "23011A6604", branch: "CSE", pnNo: 654321, paymentStatus: "Pending", monthlyBill: 0, hostel: "Girls Hostel", attendanceDays: 24 },
        { id: 5, name: "Vikram Patel", rollNo: "23011A6605", branch: "EEE", pnNo: 543210, paymentStatus: "Pending", monthlyBill: 0, hostel: "Boys Hostel", attendanceDays: 30 },
        { id: 6, name: "Ananya Reddy", rollNo: "23011A6606", branch: "IT", pnNo: 432109, paymentStatus: "Pending", monthlyBill: 0, hostel: "Girls Hostel", attendanceDays: 27 },
        { id: 7, name: "Karthik Nair", rollNo: "23011A6607", branch: "CSE", pnNo: 321098, paymentStatus: "Pending", monthlyBill: 0, hostel: "Boys Hostel", attendanceDays: 23 },
        { id: 8, name: "Meera Joshi", rollNo: "23011A6608", branch: "ECE", pnNo: 210987, paymentStatus: "Pending", monthlyBill: 0, hostel: "Girls Hostel", attendanceDays: 26 },
      ]
      setStudents(defaultStudents)
      localStorage.setItem('studentData', JSON.stringify(defaultStudents))
    }
  }, [])

  // Listen for bill update events
  useEffect(() => {
    const handleBillsUpdated = (event) => {
      const { updatedStudentData } = event.detail
      setStudents(updatedStudentData)
    }

    window.addEventListener('billsUpdated', handleBillsUpdated)
    return () => window.removeEventListener('billsUpdated', handleBillsUpdated)
  }, [])

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostel</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.pnNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.hostel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`font-medium ${student.monthlyBill > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                      ₹{student.monthlyBill.toLocaleString()}
                    </span>
                    {student.monthlyBill === 0 && (
                      <span className="text-xs text-gray-400 ml-1">(Not calculated)</span>
                    )}
                  </td>
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
                <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
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
