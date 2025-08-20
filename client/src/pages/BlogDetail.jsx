import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { getToken } from '../auth'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    api.get(`/blogs/${id}/`).then(res => setBlog(res.data))
  }, [id])

  if (!blog) return <p>Loading…</p>

  const canEdit = !!getToken() && blog

  const onDelete = async () => {
    if (!confirm('Delete this blog?')) return
    await api.delete(`/blogs/${id}/`)
    navigate('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>by <b>{blog.author_name}</b> • {new Date(blog.created_at).toLocaleString()}</p>
      <p style={{whiteSpace: 'pre-wrap'}}>{blog.content}</p>
      {canEdit && (
        <div className="actions">
          <Link to={`/edit/${blog.id}`}><button>Edit</button></Link>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  )
}
