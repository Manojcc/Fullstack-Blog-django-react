import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../api'

export default function Blogs() {
  const [data, setData] = useState({ results: [], count: 0 })
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || '1')

  useEffect(() => {
    api.get(`/blogs/?page=${page}`).then(res => setData(res.data))
  }, [page])

  const totalPages = Math.ceil(data.count / 5)

  return (
    <div>
      <h2>Blogs</h2>
      {data.results.map(b => (
        <div key={b.id} className="card">
          <h3><Link to={`/blog/${b.id}`}>{b.title}</Link></h3>
          <p>by <b>{b.author_name}</b> • {new Date(b.created_at).toLocaleString()}</p>
          <p>{b.content.length > 200 ? b.content.slice(0, 200) + '…' : b.content}</p>
          <Link to={`/blog/${b.id}`}>Read more</Link>
        </div>
      ))}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setSearchParams({ page: String(page - 1) })}>Prev</button>
        <span>Page {page} / {totalPages || 1}</span>
        <button disabled={page >= totalPages} onClick={() => setSearchParams({ page: String(page + 1) })}>Next</button>
      </div>
    </div>
  )
}
