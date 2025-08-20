import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/auth/register/', { username, email, password })
      navigate('/login')
    } catch (err) {
      setError('Signup failed')
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}
