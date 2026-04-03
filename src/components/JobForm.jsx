import { useState } from 'react'

function JobForm({ onAdd }) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [date, setDate] = useState('')

  function handleSubmit() {
    if (!company || !role || !date) return

    const newJob = {
      id: Date.now(),
      company,
      role,
      status,
      date,
    }

    onAdd(newJob)

    setCompany('')
    setRole('')
    setStatus('Applied')
    setDate('')
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button onClick={handleSubmit}>+ Add Job</button>
    </div>
  )
}

export default JobForm