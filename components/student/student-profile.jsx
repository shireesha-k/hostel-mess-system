import { User, BookOpen, Phone } from "lucide-react"

export default function StudentProfile({ student }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Profile</h2>

      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <User size={20} className="text-red-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{student.name}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <BookOpen size={20} className="text-red-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Roll Number</p>
            <p className="font-medium">{student.rollNo}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <BookOpen size={20} className="text-red-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Branch</p>
            <p className="font-medium">{student.branch}</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Phone size={20} className="text-red-700" />
          </div>
          <div>
            <p className="text-sm text-gray-500">PN Number</p>
            <p className="font-medium">{student.pnNo}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
