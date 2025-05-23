import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { supabase } from './.server/db'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const url = window.location.toString()

  if (!url.includes("login") && !url.includes("signup")) {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login')
      }
    })
  }

  return (
    <Outlet/>
  )
}

export default App
