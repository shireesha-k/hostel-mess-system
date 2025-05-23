"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar({ activeTab, onTabChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tabs = [
    { name: "Home", value: "home", path: "/" },
    { name: "Administrator", value: "administrator", path: "/administrator" },
    { name: "Caretaker", value: "caretaker", path: "/caretaker" },
    { name: "Student", value: "student", path: "/student" },
    { name: "Enquiry", value: "enquiry", path: "/enquiry" },
    { name: "Complaints", value: "complaints", path: "/complaints" },
  ]

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              HMMS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <Link
                key={tab.value}
                href={tab.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.value ? "bg-white text-blue-700" : "text-white hover:bg-blue-600"
                }`}
                onClick={() => onTabChange(tab.value)}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={tab.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab.value ? "bg-white text-blue-700" : "text-white hover:bg-blue-600"
                  }`}
                  onClick={() => {
                    onTabChange(tab.value)
                    setIsMenuOpen(false)
                  }}
                >
                  {tab.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
