import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  Applied: '#378ADD',
  Interview: '#F59E0B',
  Offer: '#22C55E',
  Rejected: '#F87171',
}

function Analytics({ jobs }) {
  const data = [
    { status: 'Applied', count: jobs.filter(job => job.status === 'Applied').length },
    { status: 'Interview', count: jobs.filter(job => job.status === 'Interview').length },
    { status: 'Offer', count: jobs.filter(job => job.status === 'Offer').length },
    { status: 'Rejected', count: jobs.filter(job => job.status === 'Rejected').length },
  ]

  if (jobs.length === 0) return null

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-6">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Overview</h2>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barSize={32}>
          <XAxis dataKey="status" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: '#9ca3af' }} />
          <YAxis fontSize={11} allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#9ca3af' }} />
          <Tooltip
            contentStyle={{ fontSize: '12px', borderRadius: '8px', border: '1px solid #f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            cursor={{ fill: '#f9fafb' }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map(entry => (
              <Cell key={entry.status} fill={COLORS[entry.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Analytics