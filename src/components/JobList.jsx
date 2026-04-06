function JobList({ jobs, onDelete }) {
    if (jobs.length === 0) {
      return (
        <div className="text-center py-16 text-gray-300">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm">No applications yet. Add one above!</p>
        </div>
      )
    }
  
    function getBadgeStyle(status) {
      if (status === 'Applied') return { background: '#E6F1FB', color: '#0C447C' }
      if (status === 'Interview') return { background: '#FAEEDA', color: '#633806' }
      if (status === 'Offer') return { background: '#EAF3DE', color: '#27500A' }
      if (status === 'Rejected') return { background: '#FCEBEB', color: '#791F1F' }
    }
  
    return (
      <div className="space-y-2">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                {job.company.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{job.company}</p>
                <p className="text-xs text-gray-400 mt-0.5">{job.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-300">{job.date}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', padding: '3px 10px', borderRadius: '99px', ...getBadgeStyle(job.status) }}>
                {job.status}
              </span>
              <button className="text-gray-200 hover:text-red-400 transition-colors text-sm" onClick={() => onDelete(job.id)}>✕</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default JobList