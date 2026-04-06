import { useState } from 'react'

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected']

const COLUMN_COLORS = {
  Applied: 'bg-blue-50',
  Interview: 'bg-amber-50',
  Offer: 'bg-green-50',
  Rejected: 'bg-red-50',
}

const COLUMN_BADGE_COLORS = {
  Applied: 'bg-blue-100 text-blue-600',
  Interview: 'bg-amber-100 text-amber-600',
  Offer: 'bg-green-100 text-green-600',
  Rejected: 'bg-red-100 text-red-500',
}

function KanbanBoard({ jobs, onDelete, onUpdateStatus }) {
  const [draggedJob, setDraggedJob] = useState(null)
  const [dragOverColumn, setDragOverColumn] = useState(null)

  function handleDragStart(event, job) {
    setDraggedJob(job)
  }

  function handleDragOver(event, column) {
    event.preventDefault()
    setDragOverColumn(column)
  }

  function handleDrop(column) {
    if (!draggedJob) return
    onUpdateStatus(draggedJob.id, column)
    setDraggedJob(null)
    setDragOverColumn(null)
  }

  function handleDragLeave() {
    setDragOverColumn(null)
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {COLUMNS.map(column => {
        const columnJobs = jobs.filter(job => job.status === column)
        const isOver = dragOverColumn === column

        return (
          <div
            key={column}
            className={`rounded-xl p-3 min-h-64 transition-all ${COLUMN_COLORS[column]} ${isOver ? 'ring-2 ring-blue-300 ring-offset-1' : ''}`}
            onDragOver={(e) => handleDragOver(e, column)}
            onDrop={() => handleDrop(column)}
            onDragLeave={handleDragLeave}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{column}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COLUMN_BADGE_COLORS[column]}`}>{columnJobs.length}</span>
            </div>

            {columnJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-lg p-3 mb-2 border border-gray-100 shadow-sm cursor-grab hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, job)}
                onDragOver={(e) => handleDragOver(e, column)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-400">
                        {job.company.slice(0, 1).toUpperCase()}
                      </div>
                      <p className="font-medium text-sm text-gray-900">{job.company}</p>
                    </div>
                    <p className="text-xs text-gray-400 ml-8">{job.role}</p>
                    <p className="text-xs text-gray-300 ml-8 mt-0.5">{job.date}</p>
                  </div>
                  <button
                    onClick={() => onDelete(job.id)}
                    className="text-gray-200 hover:text-red-400 transition-colors text-xs"
                  >✕</button>
                </div>
              </div>
            ))}

            {columnJobs.length === 0 && (
              <div className={`border-2 border-dashed rounded-lg p-6 text-center mt-2 transition-all ${isOver ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
                <p className="text-xs text-gray-300">Drop here</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default KanbanBoard