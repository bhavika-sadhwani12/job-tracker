import { useState, useEffect } from 'react'
import JobForm from './components/JobForm'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('jobs')
    console.log('saved from localStorage:', saved)
    if (saved) {
      setJobs(JSON.parse(saved))
    }
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

  return (
    <div>
      <h1>Job Tracker</h1>
      <p>Total applications: {jobs.length}</p>
      <JobForm onAdd={addJob} />
      <JobList jobs={jobs} onDelete={deleteJob} />
    </div>
  )
}

export default App