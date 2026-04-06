import { useState, useEffect } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import KanbanBoard from './components/KanbanBoard'

function App() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [view, setView] = useState('list')

  useEffect(() => {
    const saved = localStorage.getItem('jobs')
    if (saved) setJobs(JSON.parse(saved))
  }, [])

  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem('jobs', JSON.stringify(jobs))
    }
  }, [jobs])

  function addJob(job) {
    setJobs([...jobs, job])
  }

  function deleteJob(id) {
    setJobs(jobs.filter(job => job.id !== id))
  }

  function updateJobStatus(id, newStatus) {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    ))
  }

  const totalJobs = jobs.length
  const applied = jobs.filter(job => job.status === 'Applied').length
  const interviews = jobs.filter(job => job.status === 'Interview').length
  const offers = jobs.filter(job => job.status === 'Offer').length

  const filteredJobs = jobs
    .filter(job => job.company.toLowerCase().includes(search.toLowerCase()))
    .filter(job => filterStatus === 'All' ? true : job.status === filterStatus)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Job Tracker</h1>
        <button onClick={() => setView(view === 'list' ? 'kanban' : 'list')}>
          {view === 'list' ? 'Switch to Kanban' : 'Switch to List'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '16px', margin: '16px 0' }}>
        <div style={{ background: '#f5f5f5', padding: '12px 20px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Total</p>
          <p style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>{totalJobs}</p>
        </div>
        <div style={{ background: '#f5f5f5', padding: '12px 20px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Applied</p>
          <p style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>{applied}</p>
        </div>
        <div style={{ background: '#f5f5f5', padding: '12px 20px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Interviews</p>
          <p style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>{interviews}</p>
        </div>
        <div style={{ background: '#f5f5f5', padding: '12px 20px', borderRadius: '8px' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Offers</p>
          <p style={{ fontSize: '24px', fontWeight: '500', margin: 0 }}>{offers}</p>
        </div>
      </div>

      <JobForm onAdd={addJob} />

      <div style={{ display: 'flex', gap: '10px', margin: '16px 0' }}>
        <input
          type="text"
          placeholder="Search by company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      {view === 'list' ? (
        <JobList jobs={filteredJobs} onDelete={deleteJob} />
      ) : (
        <KanbanBoard jobs={filteredJobs} onDelete={deleteJob} onUpdateStatus={updateJobStatus} />
      )}
    </div>
  )
}

export default App