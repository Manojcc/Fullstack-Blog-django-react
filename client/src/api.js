import axios from 'axios'
import { getToken } from './auth'

export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_BASE}/api`,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
