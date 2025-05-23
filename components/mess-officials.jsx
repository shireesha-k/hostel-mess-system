import Image from "next/image"

export default function MessOfficials() {
  const officials = [
    {
      name: "Dr. K. Supreethi",
      role: "Warden & Head of Hostel",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Mr. Ramesh Kumar",
      role: "Caretaker",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Ms. Priya Sharma",
      role: "Mess Incharge",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-8">Mess Officials</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {officials.map((official, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-blue-500">
              <Image src={official.image || "/placeholder.svg"} alt={official.name} fill className="object-cover" />
            </div>
            <h3 className="text-lg font-medium text-gray-800">{official.name}</h3>
            <p className="text-sm text-gray-600">{official.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
