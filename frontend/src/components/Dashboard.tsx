import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts'

const churnData = [
  { name: 'Month-to-month', churnRate: 42 },
  { name: 'One year', churnRate: 11 },
  { name: 'Two year', churnRate: 3 },
]

const internetData = [
  { name: 'Fiber optic', churnRate: 42 },
  { name: 'DSL', churnRate: 19 },
  { name: 'No internet', churnRate: 7 },
]

const paymentData = [
  { name: 'Electronic check', churnRate: 45 },
  { name: 'Mailed check', churnRate: 19 },
  { name: 'Bank transfer', churnRate: 17 },
  { name: 'Credit card', churnRate: 15 },
]

const pieData = [
  { name: 'Stayed', value: 73.5 },
  { name: 'Churned', value: 26.5 },
]

const COLORS = ['#6366f1', '#ef4444']

const card = {
  background: '#1e293b',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid #334155',
}

const statCards = [
  { label: 'Total Customers', value: '7,043', color: '#6366f1', icon: '👥' },
  { label: 'Churn Rate', value: '26.5%', color: '#ef4444', icon: '📉' },
  { label: 'Avg Monthly Charge', value: '$64.76', color: '#10b981', icon: '💰' },
  { label: 'Avg Tenure', value: '32 months', color: '#f59e0b', icon: '📅' },
]

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {statCards.map(stat => (
          <div key={stat.label} style={{ ...card, borderTop: `3px solid ${stat.color}` }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Pie Chart */}
        <div style={card}>
          <h3 style={{ marginBottom: '16px', color: '#f1f5f9' }}>Overall Churn Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90}
                dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Contract Chart */}
        <div style={card}>
          <h3 style={{ marginBottom: '16px', color: '#f1f5f9' }}>Churn Rate by Contract Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={churnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8' }} unit="%" />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="churnRate" fill="#6366f1" radius={[4, 4, 0, 0]} name="Churn Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Internet Chart */}
        <div style={card}>
          <h3 style={{ marginBottom: '16px', color: '#f1f5f9' }}>Churn Rate by Internet Service</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={internetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis tick={{ fill: '#94a3b8' }} unit="%" />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="churnRate" fill="#10b981" radius={[4, 4, 0, 0]} name="Churn Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Chart */}
        <div style={card}>
          <h3 style={{ marginBottom: '16px', color: '#f1f5f9' }}>Churn Rate by Payment Method</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8' }} unit="%" />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="churnRate" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Churn Rate" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div style={card}>
        <h3 style={{ marginBottom: '16px', color: '#f1f5f9' }}>🔍 Key Insights</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { title: 'Contract is the #1 factor', desc: 'Month-to-month customers churn 14x more than two-year contract customers.' },
            { title: 'Fiber optic customers at risk', desc: 'Despite paying more, fiber optic customers churn at 42% — likely due to pricing.' },
            { title: 'Electronic check users', desc: '45% churn rate — highest of all payment methods. Target for loyalty programs.' },
          ].map(insight => (
            <div key={insight.title} style={{
              background: '#0f172a', borderRadius: '8px',
              padding: '16px', border: '1px solid #334155'
            }}>
              <div style={{ fontWeight: 600, color: '#6366f1', marginBottom: '8px' }}>
                {insight.title}
              </div>
              <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                {insight.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}