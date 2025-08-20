import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api'
import { getToken } from '../auth'

export default function CreateEditBlog({ editMode }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(true)
  /* auth-guard */

// auth guard
useEffect(() => {
  const token = getToken()
  if (!token) {
    navigate('/login')
  }
}, [navigate])

  useEffect(() => {
    if (editMode && id) {
      api.get(`/blogs/${id}/`).then(res => {
        setTitle(res.data.title)
        setContent(res.data.content)
        setPublished(!!res.data.published)
      })
    }
  }, [editMode, id])

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { title, content, published }
    if (editMode) {
      await api.put(`/blogs/${id}/`, payload)
    } else {
      await api.post('/blogs/', payload)
    }
    navigate('/')
  }

  return (
    <div>
      <h2>{editMode ? 'Edit Blog' : 'Create Blog'}</h2>
      <form onSubmit={onSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <textarea rows={10} value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <label style={{display:'block', margin:'8px 0'}}>
  <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
  {' '}Published
</label>
<button type="submit">{editMode ? 'Update' : 'Publish'}</button>
      </form>
    </div>
  )
}
