import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './.server/db'

function Login({ signup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const h1text = (signup == true ? "Sign Up" : "Log In");
  const buttontext = (signup == true ? "Create Account" : "Log In")

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error: userError }) => {
      if (!userError) {
        console.log("user is good");
        navigate("/");
      }
    })
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Logged In Successfully!')
      navigate('/')
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the confirmation link!')
      // navigate('/')
    }
  }

  const funct = (signup == true ? handleSignUp : handleLogin)

  return (
    <div>
      <h1>{h1text}</h1>
      <form onSubmit={funct}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{buttontext}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login