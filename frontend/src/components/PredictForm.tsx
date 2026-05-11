import { useState } from 'react'
import axios from 'axios'

interface FormData {
  gender: string
  SeniorCitizen: number
  Partner: string
  Dependents: string
  tenure: number
  PhoneService: string
  MultipleLines: string
  InternetService: string
  OnlineSecurity: string
  OnlineBackup: string
  DeviceProtection: string
  TechSupport: string
  StreamingTV: string
  StreamingMovies: string
  Contract: string
  PaperlessBilling: string
  PaymentMethod: string
  MonthlyCharges: number
  TotalCharges: number
}

interface Prediction {
  churn_probability: number
  risk_level: string
  prediction: string
}

const initial: FormData = {
  gender: 'Male',
  SeniorCitizen: 0,
  Partner: 'Yes',
  Dependents: 'No',
  tenure: 12,
  PhoneService: 'Yes',
  MultipleLines: 'No',
  InternetService: 'Fiber optic',
  OnlineSecurity: 'No',
  OnlineBackup: 'No',
  DeviceProtection: 'No',
  TechSupport: 'No',
  StreamingTV: 'Yes',
  StreamingMovies: 'Yes',
  Contract: 'Month-to-month',
  PaperlessBilling: 'Yes',
  PaymentMethod: 'Electronic check',
  MonthlyCharges: 85.0,
  TotalCharges: 1020.0,
}

const card = {
  background: '#1e293b',
  borderRadius: '12px',
  padding: '24px',
  border: '1px solid #334155',
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '8px',
  border: '1px solid #334155',
  background: '#0f172a',
  color: '#f1f5f9',
  fontSize: '14px',
}

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  color: '#94a3b8',
  fontWeight: 600,
}

export default function PredictForm() {
  const [form, setForm] = useState<FormData>(initial)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: ['tenure', 'SeniorCitizen', 'MonthlyCharges', 'TotalCharges'].includes(name)
        ? Number(value)
        : value
    }))
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    setPrediction(null)
    try {
      const res = await axios.post('http://localhost:8000/predict', form)
      setPrediction(res.data)
    } catch {
      setError('Failed to connect to API. Make sure Docker is running.')
    }
    setLoading(false)
  }

  const riskColor = prediction?.risk_level === 'High' ? '#ef4444'
    : prediction?.risk_level === 'Medium' ? '#f59e0b' : '#10b981'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>

      <div style={card}>
        <h2 style={{ marginBottom: '8px', color: '#f1f5f9' }}>🔮 Churn Prediction</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
          Enter customer details to predict churn probability
        </p>

        {/* Personal Info */}
        <h4 style={{ color: '#6366f1', marginBottom: '16px' }}>Personal Information</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>

          <div>
            <label style={labelStyle}>Gender</label>
            <select name="gender" value={form.gender} onChange={handle} style={inputStyle}>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Senior Citizen</label>
            <select name="SeniorCitizen" value={form.SeniorCitizen} onChange={handle} style={inputStyle}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Partner</label>
            <select name="Partner" value={form.Partner} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Dependents</label>
            <select name="Dependents" value={form.Dependents} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tenure (months)</label>
            <input type="number" name="tenure" value={form.tenure} onChange={handle} style={inputStyle} min={0} max={72} />
          </div>

          <div>
            <label style={labelStyle}>Contract</label>
            <select name="Contract" value={form.Contract} onChange={handle} style={inputStyle}>
              <option>Month-to-month</option>
              <option>One year</option>
              <option>Two year</option>
            </select>
          </div>
        </div>

        {/* Services */}
        <h4 style={{ color: '#6366f1', marginBottom: '16px' }}>Services</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>

          <div>
            <label style={labelStyle}>Internet Service</label>
            <select name="InternetService" value={form.InternetService} onChange={handle} style={inputStyle}>
              <option>DSL</option>
              <option>Fiber optic</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Phone Service</label>
            <select name="PhoneService" value={form.PhoneService} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Multiple Lines</label>
            <select name="MultipleLines" value={form.MultipleLines} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No phone service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Online Security</label>
            <select name="OnlineSecurity" value={form.OnlineSecurity} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Online Backup</label>
            <select name="OnlineBackup" value={form.OnlineBackup} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tech Support</label>
            <select name="TechSupport" value={form.TechSupport} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Streaming TV</label>
            <select name="StreamingTV" value={form.StreamingTV} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Streaming Movies</label>
            <select name="StreamingMovies" value={form.StreamingMovies} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Device Protection</label>
            <select name="DeviceProtection" value={form.DeviceProtection} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
              <option>No internet service</option>
            </select>
          </div>
        </div>

        {/* Billing */}
        <h4 style={{ color: '#6366f1', marginBottom: '16px' }}>Billing</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>

          <div>
            <label style={labelStyle}>Payment Method</label>
            <select name="PaymentMethod" value={form.PaymentMethod} onChange={handle} style={inputStyle}>
              <option>Electronic check</option>
              <option>Mailed check</option>
              <option>Bank transfer (automatic)</option>
              <option>Credit card (automatic)</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Paperless Billing</label>
            <select name="PaperlessBilling" value={form.PaperlessBilling} onChange={handle} style={inputStyle}>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Monthly Charges ($)</label>
            <input type="number" name="MonthlyCharges" value={form.MonthlyCharges} onChange={handle} style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Total Charges ($)</label>
            <input type="number" name="TotalCharges" value={form.TotalCharges} onChange={handle} style={inputStyle} />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            background: loading ? '#334155' : '#6366f1',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {loading ? 'Predicting...' : '🔮 Predict Churn'}
        </button>

        {error && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#450a0a', borderRadius: '8px', color: '#fca5a5' }}>
            {error}
          </div>
        )}
      </div>

      {/* Result */}
      {prediction && (
        <div style={{ ...card, border: `2px solid ${riskColor}` }}>
          <h3 style={{ color: '#f1f5f9', marginBottom: '24px' }}>📊 Prediction Result</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>

            <div style={{ textAlign: 'center', padding: '20px', background: '#0f172a', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', fontWeight: 800, color: riskColor }}>
                {(prediction.churn_probability * 100).toFixed(1)}%
              </div>
              <div style={{ color: '#94a3b8', marginTop: '8px' }}>Churn Probability</div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px', background: '#0f172a', borderRadius: '8px' }}>
              <div style={{ fontSize: '40px', fontWeight: 800, color: riskColor }}>
                {prediction.risk_level}
              </div>
              <div style={{ color: '#94a3b8', marginTop: '8px' }}>Risk Level</div>
            </div>

            <div style={{ textAlign: 'center', padding: '20px', background: '#0f172a', borderRadius: '8px' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, color: riskColor }}>
                {prediction.prediction}
              </div>
              <div style={{ color: '#94a3b8', marginTop: '8px' }}>Prediction</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}