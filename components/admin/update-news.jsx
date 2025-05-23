"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function UpdateNews() {
  const [newsText, setNewsText] = useState("")
  const [recentNews, setRecentNews] = useState([
    { id: 1, text: "Mess bill for October 2023 has been updated!", date: "2023-10-15" },
    { id: 2, text: "Holiday declared on 2nd November!", date: "2023-10-12" },
    { id: 3, text: "New mess menu updated for breakfast.", date: "2023-10-10" },
  ])

  const handleNewsChange = (e) => {
    setNewsText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newsText.trim()) {
      const newNewsItem = {
        id: Date.now(),
        text: newsText,
        date: new Date().toISOString().slice(0, 10),
      }
      setRecentNews([newNewsItem, ...recentNews])
      setNewsText("")
      alert("News announcement published successfully!")
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Update News & Announcements</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Text</label>
          <textarea
            value={newsText}
            onChange={handleNewsChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter news or announcement text..."
            required
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">This will be displayed in the news ticker on the home page</p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Send size={18} />
          <span>Publish</span>
        </button>
      </form>

      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-3">Recent Announcements</h4>

        <div className="space-y-3">
          {recentNews.map((news) => (
            <div key={news.id} className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <p className="text-gray-800">{news.text}</p>
              <p className="text-xs text-gray-500 mt-1">Published on: {news.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
