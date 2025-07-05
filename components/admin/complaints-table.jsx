"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

export default function ComplaintsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [complaints, setComplaints] = useState([])
  const [sampleComplaints, setSampleComplaints] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      rollNo: 103,
      pnNo: 765432,
      branch: "ME",
      complaint_text: "Food quality is poor and not hygienic",
      status: "pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: 102,
      pnNo: 876543,
      branch: "ECE",
      complaint_text: "Mess is not clean",
      status: "resolved",
    },
    {
      id: 3,
      name: "Neha Gupta",
      rollNo: 104,
      pnNo: 654321,
      branch: "CSE",
      complaint_text: "Breakfast is always late",
      status: "pending",
    },
    {
      id: 4,
      name: "Vikram Patel",
      rollNo: 105,
      pnNo: 543210,
      branch: "EEE",
      complaint_text: "Not enough food options for vegetarians",
      status: "in progress",
    },
    {
      id: 5,
      name: "Ananya Reddy",
      rollNo: 106,
      pnNo: 432109,
      branch: "IT",
      complaint_text: "Water is not clean",
      status: "resolved",
    },
    {
      id: 6,
      name: "Karthik Nair",
      rollNo: 107,
      pnNo: 321098,
      branch: "CSE",
      complaint_text: "Food is too spicy",
      status: "pending",
          },
    ])

  // Load complaints from localStorage and combine with sample data
  useEffect(() => {
    const submittedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const allComplaints = [...sampleComplaints, ...submittedComplaints];
    setComplaints(allComplaints);
  }, []);

  // Refresh data when localStorage changes or new complaint is submitted
  useEffect(() => {
    const handleStorageChange = () => {
      const submittedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const allComplaints = [...sampleComplaints, ...submittedComplaints];
      setComplaints(allComplaints);
    };

    const handleComplaintSubmitted = () => {
      const submittedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const allComplaints = [...sampleComplaints, ...submittedComplaints];
      setComplaints(allComplaints);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('complaintSubmitted', handleComplaintSubmitted);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('complaintSubmitted', handleComplaintSubmitted);
    };
  }, []);

  // Filter complaints based on search term and status filter
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.rollNo?.toString().includes(searchTerm) ||
      complaint.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.complaint_text?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || complaint.status?.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleStatusChange = (complaintId, newStatus) => {
    // Check if it's a sample complaint or submitted complaint
    const isSampleComplaint = sampleComplaints.some(complaint => complaint.id === complaintId);
    
    if (isSampleComplaint) {
      // Update sample complaint in state
      const updatedSampleComplaints = sampleComplaints.map(complaint => 
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      );
      setSampleComplaints(updatedSampleComplaints);
      
      // Update combined complaints
      const submittedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const allComplaints = [...updatedSampleComplaints, ...submittedComplaints];
      setComplaints(allComplaints);
    } else {
      // Update the complaint status in localStorage
      const submittedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const updatedComplaints = submittedComplaints.map(complaint => 
        complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
      );
      localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
      
      // Update the local state
      const allComplaints = [...sampleComplaints, ...updatedComplaints];
      setComplaints(allComplaints);
    }
    
    // Show success message
    alert(`Complaint status updated to: ${newStatus}`);
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
                    {complaint.name}
                    {complaint.id > 1000000000000 && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.pnNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.branch}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{complaint.complaint_text}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                        complaint.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "in progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
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
