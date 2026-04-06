import { useState } from 'react'
    const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected']
function KanbanBoard({ jobs, onDelete, onUpdateStatus }) {
const [draggedJob, setDraggedJob] = useState(null)
function handleDragStart(event, job) {
setDraggedJob(job);
    }
function handleDragOver(event) {
event.preventDefault()
    }
    function handleDrop(column) {
        console.log('dropped on column:', column)
        console.log('dragged job:', draggedJob)
        if(!draggedJob) return
        onUpdateStatus(draggedJob.id, column)
        setDraggedJob(null)
      }
return (
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
{COLUMNS.map(column => {
const columnJobs = jobs.filter(job => job.status === column)
return (
<div key={column} style={{ background: '#f5f5f5', borderRadius: '8px', padding: '12px', minHeight: '200px' }} onDragOver={handleDragOver}
onDrop={() => handleDrop(column)}>
<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
<h3 style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{column}</h3>
<span style={{ fontSize: '12px', color: '#888' }}>{columnJobs.length}</span>
</div>
{columnJobs.map(job => (
<div key={job.id} style={{ background: 'white', borderRadius: '6px', padding: '10px 12px', marginBottom: '8px', border: '1px solid #eee' }} draggable onDragStart={(e) => handleDragStart(e, job)} onDragOver={handleDragOver}>
<p style={{ margin: 0, fontWeight: '500', fontSize: '14px' }}>{job.company}</p>
<p style={{ margin: 0, fontSize: '12px', color: '#888' }}>{job.role}</p>
<p style={{ margin: 0, fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{job.date}</p>
<button onClick={() => onDelete(job.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', fontSize: '12px', marginTop: '6px' }}>Delete</button>
</div>
                ))}
{columnJobs.length === 0 && (
<p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '24px' }}>No jobs</p>
                )}
</div>
            )
        })}
</div>
    )
    }
export default KanbanBoard