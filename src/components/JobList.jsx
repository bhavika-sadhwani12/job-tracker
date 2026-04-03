function JobList({ jobs, onDelete }) {
    if (jobs.length === 0) {
      return <p>No applications yet. Add one above!</p>
    }
  
    function getBadgeStyle(status) {
      if (status === 'Applied') return { background: '#E6F1FB', color: '#0C447C' }
      if (status === 'Interview') return { background: '#FAEEDA', color: '#633806' }
      if (status === 'Offer') return { background: '#EAF3DE', color: '#27500A' }
      if (status === 'Rejected') return { background: '#FCEBEB', color: '#791F1F' }
    }
  
    return (
      <div>
        {jobs.map(job => (
          <div key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #eee', borderRadius: '8px', marginBottom: '8px' }}>
            <div>
              <p style={{ fontWeight: '500', margin: 0 }}>{job.company}</p>
              <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>{job.role}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{job.date}</span>
              <span style={{ fontSize: '12px', fontWeight: '500', padding: '3px 10px', borderRadius: '99px', ...getBadgeStyle(job.status) }}>
                {job.status}
              </span>
              <button onClick={() => onDelete(job.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default JobList