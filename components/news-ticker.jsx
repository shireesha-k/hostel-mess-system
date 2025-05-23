"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"

export default function NewsTicker() {
  const [newsItems] = useState([
    "Mess bill for October 2023 has been updated!",
    "Holiday declared on 2nd November!",
    "New mess menu updated for breakfast.",
    "Special dinner planned for this weekend.",
    "Maintenance work scheduled for kitchen area on Sunday.",
  ])

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [newsItems.length])

  return (
    <div className="bg-red-600 text-white py-3 px-4 rounded-lg shadow-md">
      <div className="flex items-center">
        <Bell className="mr-3 animate-pulse" size={20} />
        <div className="overflow-hidden relative h-6">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-medium">{newsItems[currentNewsIndex]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
