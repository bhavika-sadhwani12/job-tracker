import { useState, useEffect } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'
import KanbanBoard from './components/KanbanBoard'
import Analytics from './components/Analytics'

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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Job Tracker</h1>
            <p className="text-sm text-gray-400 mt-0.5">Track your applications in one place</p>
          </div>
          <button
            onClick={() => setView(view === 'list' ? 'kanban' : 'list')}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:shadow-sm transition-all"
          >
            {view === 'list' ? '⊞ Kanban' : '☰ List'}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', value: totalJobs, color: 'text-gray-900' },
            { label: 'Applied', value: applied, color: 'text-blue-600' },
            { label: 'Interviews', value: interviews, color: 'text-amber-600' },
            { label: 'Offers', value: offers, color: 'text-green-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <Analytics jobs={jobs} />

        <JobForm onAdd={addJob} />

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  filterStatus === status
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <input
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-48"
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {view === 'list' ? (
          <JobList jobs={filteredJobs} onDelete={deleteJob} />
        ) : (
          <KanbanBoard jobs={filteredJobs} onDelete={deleteJob} onUpdateStatus={updateJobStatus} />
        )}

      </div>
    </div>
  )
}

export default App