"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"

export default function ComplaintsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  // Sample complaints data
  const initialComplaints = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNo: 103,
      pnNo: 765432,
      branch: "ME",
      complaint: "Food quality is poor and not hygienic",
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Priya Singh",
      rollNo: 102,
      pnNo: 876543,
      branch: "ECE",
      complaint: "Mess is not clean",
      status: "Resolved",
    },
    {
      id: 3,
      studentName: "Neha Gupta",
      rollNo: 104,
      pnNo: 654321,
      branch: "CSE",
      complaint: "Breakfast is always late",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Vikram Patel",
      rollNo: 105,
      pnNo: 543210,
      branch: "EEE",
      complaint: "Not enough food options for vegetarians",
      status: "In Progress",
    },
    {
      id: 5,
      studentName: "Ananya Reddy",
      rollNo: 106,
      pnNo: 432109,
      branch: "IT",
      complaint: "Water is not clean",
      status: "Resolved",
    },
    {
      id: 6,
      studentName: "Karthik Nair",
      rollNo: 107,
      pnNo: 321098,
      branch: "CSE",
      complaint: "Food is too spicy",
      status: "Pending",
    },
  ]

  const [complaints] = useState(initialComplaints)

  // Filter complaints based on search term and status filter
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.rollNo.toString().includes(searchTerm) ||
      complaint.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.complaint.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || complaint.status.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-800">Student Complaints</h3>

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
              placeholder="Search complaints..."
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roll No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PN No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Complaint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {complaint.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.pnNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.branch}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{complaint.complaint}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No complaints found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
