import { CheckCircle, AlertCircle, Calendar } from "lucide-react"

export default function PaymentStatus({ status, dueDate }) {
  const isPaid = status === "Paid"

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h2>

      <div className="flex items-center mb-4">
        {isPaid ? (
          <CheckCircle size={24} className="text-green-500 mr-2" />
        ) : (
          <AlertCircle size={24} className="text-red-500 mr-2" />
        )}
        <span className={`text-lg font-medium ${isPaid ? "text-green-600" : "text-red-600"}`}>{status}</span>
      </div>

      {!isPaid && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center text-red-800">
            <Calendar size={18} className="mr-2" />
            <span>Due Date: {new Date(dueDate).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-red-600 mt-2">Please pay your mess bill before the due date to avoid late fees.</p>
        </div>
      )}

      {isPaid && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-600">Your payment for this month has been received. Thank you!</p>
        </div>
      )}
    </div>
  )
}
