import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Analytics({ jobs }) {
  const data = [
    { status: 'Applied', count: jobs.filter(job => job.status === 'Applied').length },
    { status: 'Interview', count: jobs.filter(job => job.status === 'Interview').length },
    { status: 'Offer', count: jobs.filter(job => job.status === 'Offer').length },
    { status: 'Rejected', count: jobs.filter(job => job.status === 'Rejected').length },
  ]

  return (
    <div style={{ margin: '24px 0' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>Analytics</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="status" fontSize={12} />
          <YAxis fontSize={12} allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#378ADD" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Analytics