const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected']

function KanbanBoard({ jobs, onDelete }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
      {COLUMNS.map(column => {
        const columnJobs = jobs.filter(job => job.status === column)

        return (
          <div key={column} style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{column}</h3>
              <span style={{ fontSize: '12px', color: '#888' }}>{columnJobs.length}</span>
            </div>

            {columnJobs.length === 0 && (
              <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '24px' }}>No jobs</p>
            )}

            {columnJobs.map(job => (
              <div key={job.id} style={{ background: 'white', borderRadius: '6px', padding: '10px 12px', marginBottom: '8px', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '500', fontSize: '14px' }}>{job.company}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{job.role}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{job.date}</p>
                  </div>
                  <button onClick={() => onDelete(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '14px' }}>✕</button>
                </div>
              </div>
            ))}

          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard