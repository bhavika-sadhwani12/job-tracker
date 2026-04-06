import { useState } from 'react'

function JobForm({ onAdd }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [date, setDate] = useState('')

  function handleSubmit() {
    if (!company || !role || !date) return
    onAdd({ id: Date.now(), company, role, status, date })
    setCompany('')
    setRole('')
    setStatus('Applied')
    setDate('')
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6 p-4">
      <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">Add Application</p>
      <div className="flex gap-3 items-center">
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button
          onClick={handleSubmit}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          + Add
        </button>
      </div>
    </div>
  )
}

export default JobForm