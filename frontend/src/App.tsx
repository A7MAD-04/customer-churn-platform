import { useState } from 'react'
import Dashboard from './components/Dashboard'
import PredictForm from './components/PredictForm'
import { BarChart2, Users } from 'lucide-react'
import './App.css'

type Tab = 'dashboard' | 'predict'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9' }}>
      {/* Header */}
      <header style={{
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BarChart2 size={28} color="#6366f1" />
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>
              Churn Intelligence Platform
            </h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
              Telecom Customer Analytics
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          {(['dashboard', 'predict'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                background: activeTab === tab ? '#6366f1' : 'transparent',
                color: activeTab === tab ? '#fff' : '#94a3b8',
                transition: 'all 0.2s'
              }}
            >
              {tab === 'dashboard' ? '📊 Dashboard' : '🔮 Predict Churn'}
            </button>
          ))}
        </nav>
      </header>

      {/* Content */}
      <main style={{ padding: '32px' }}>
        {activeTab === 'dashboard' ? <Dashboard /> : <PredictForm />}
      </main>
    </div>
  )
}

export default App