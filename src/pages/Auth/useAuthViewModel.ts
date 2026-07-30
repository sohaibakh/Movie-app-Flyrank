import { useState } from 'react'
import { AuthModel } from './AuthModel'

const authModel = new AuthModel()

export function useAuthViewModel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleMode() {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'))
    setError('')
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    try {
      if (mode === 'login') {
        await authModel.login(email, password)
      } else {
        await authModel.register(email, password)
      }
      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  }
}
