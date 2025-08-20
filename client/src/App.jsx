import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import CreateEditBlog from './pages/CreateEditBlog'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { getToken, clearAuth } from './auth'

const Nav = () => {
  const navigate = useNavigate()
  const loggedIn = !!getToken()
  return (
    <nav className="nav">
      <Link to="/">Blogs</Link>
      {loggedIn ? (
        <>
          <Link to="/create">Create</Link>
          <button onClick={() => { clearAuth(); navigate('/'); }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  )
}

export default function App() {
  return (
    <div>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create" element={<CreateEditBlog />} />
          <Route path="/edit/:id" element={<CreateEditBlog editMode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  )
}
