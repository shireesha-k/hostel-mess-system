"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"

export default function EnquiryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [enquiries, setEnquiries] = useState([])
  const [sampleEnquiries, setSampleEnquiries] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      subject: "Mess Bill Payment",
      message: "When is the last date to pay the mess bill?",
      status: "pending",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@example.com",
      phone: "8765432109",
      subject: "Mess Leave Request",
      message: "Can I take mess leave for 3 days?",
      status: "resolved",
    },
    {
      id: 3,
      name: "Neha Gupta",
      email: "neha@example.com",
      phone: "7654321098",
      subject: "Attendance Issue",
      message: "I was absent, but I'm marked present. What should I do?",
      status: "pending",
    },
    {
      id: 4,
      name: "Vikram Patel",
      email: "vikram@example.com",
      phone: "6543210987",
      subject: "Bill Calculation",
      message: "How is the total mess bill calculated?",
      status: "in progress",
    },
    {
      id: 5,
      name: "Ananya Reddy",
      email: "ananya@example.com",
      phone: "5432109876",
      subject: "Expenses Query",
      message: "What expenses are included in the mess bill?",
      status: "resolved",
    },
    {
      id: 6,
      name: "Karthik Nair",
      email: "karthik@example.com",
      phone: "4321098765",
      subject: "PDF Download",
      message: "Can I download my mess bill as PDF?",
      status: "pending",
          },
    ])

  // Load enquiries from localStorage and combine with sample data
  useEffect(() => {
    const submittedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    const allEnquiries = [...sampleEnquiries, ...submittedEnquiries];
    setEnquiries(allEnquiries);
  }, []);

  // Refresh data when localStorage changes or new enquiry is submitted
  useEffect(() => {
    const handleStorageChange = () => {
      const submittedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const allEnquiries = [...sampleEnquiries, ...submittedEnquiries];
      setEnquiries(allEnquiries);
    };

    const handleEnquirySubmitted = () => {
      const submittedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const allEnquiries = [...sampleEnquiries, ...submittedEnquiries];
      setEnquiries(allEnquiries);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('enquirySubmitted', handleEnquirySubmitted);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('enquirySubmitted', handleEnquirySubmitted);
    };
  }, []);

  // Filter enquiries based on search term and status filter
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const matchesSearch =
      enquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.message?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filter === "all" || enquiry.status?.toLowerCase() === filter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const handleStatusChange = (enquiryId, newStatus) => {
    // Check if it's a sample enquiry or submitted enquiry
    const isSampleEnquiry = sampleEnquiries.some(enquiry => enquiry.id === enquiryId);
    
    if (isSampleEnquiry) {
      // Update sample enquiry in state
      const updatedSampleEnquiries = sampleEnquiries.map(enquiry => 
        enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
      );
      setSampleEnquiries(updatedSampleEnquiries);
      
      // Update combined enquiries
      const submittedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const allEnquiries = [...updatedSampleEnquiries, ...submittedEnquiries];
      setEnquiries(allEnquiries);
    } else {
      // Update the enquiry status in localStorage
      const submittedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const updatedEnquiries = submittedEnquiries.map(enquiry => 
        enquiry.id === enquiryId ? { ...enquiry, status: newStatus } : enquiry
      );
      localStorage.setItem('enquiries', JSON.stringify(updatedEnquiries));
      
      // Update the local state
      const allEnquiries = [...sampleEnquiries, ...updatedEnquiries];
      setEnquiries(allEnquiries);
    }
    
    // Show success message
    alert(`Enquiry status updated to: ${newStatus}`);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold text-gray-800">Student Enquiries</h3>

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
              placeholder="Search enquiries..."
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {enquiry.name}
                    {enquiry.id > 1000000000000 && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        New
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{enquiry.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{enquiry.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{enquiry.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                        enquiry.status === "resolved"
                          ? "bg-green-100 text-green-800"
                          : enquiry.status === "in progress"
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
                  No enquiries found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
