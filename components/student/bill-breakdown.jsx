"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function BillBreakdown({ currentBill, previousBills }) {
  const [showBreakdown, setShowBreakdown] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill Details</h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium">Current Month: {currentBill.month}</h3>
          <span className="text-lg font-bold text-red-700">₹{currentBill.totalAmount.toLocaleString()}</span>
        </div>

        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          {showBreakdown ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Hide Breakdown
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Show Breakdown
            </>
          )}
        </button>

        {showBreakdown && (
          <div className="mt-3 border-t border-gray-200 pt-3">
            <table className="w-full text-sm">
              <tbody>
                {currentBill.breakdown.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 text-gray-600">{item.item}</td>
                    <td className="py-2 text-right font-medium">₹{item.amount.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="py-2 font-medium">Total</td>
                  <td className="py-2 text-right font-bold">₹{currentBill.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-md font-medium mb-3">Previous Bills</h3>

        <div className="space-y-3">
          {previousBills.map((bill, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
              <div>
                <p className="font-medium">
                  {bill.month} {new Date().getFullYear()}
                </p>
                <p className="text-xs text-gray-500">Paid on {new Date(bill.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">₹{bill.amount.toLocaleString()}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{bill.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
