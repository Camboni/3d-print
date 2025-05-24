import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { supabase } from './.server/db'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const navigate = useNavigate()
  const url = window.location.toString()

  if (!url.includes("login") && !url.includes("signup")) {
    supabase.auth.getUser().then(({ data: { user }, error: userError }) => {
      if (userError) {
        console.error('Errore nel recupero dell\'utente:', userError);
        navigate("/login");
      }
    })
  }

  return (
    <Outlet/>
  )
}

async function checkUser() {
  
}

export default App
