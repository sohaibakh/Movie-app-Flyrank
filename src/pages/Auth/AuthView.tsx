import { useAuthViewModel } from './useAuthViewModel'
import './AuthView.css'

function AuthView() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  } = useAuthViewModel()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleSubmit()
  }

  const title = mode === 'login' ? 'Login' : 'Create Account'

  return (
    <div className="auth">
      <div className="auth__card">
        <h2 className="auth__title">{title}</h2>

        <form className="auth__form" onSubmit={onSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && <p className="auth__error">{error}</p>}

          <button className="auth__submit" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : title}
          </button>
        </form>

        <button className="auth__toggle" type="button" onClick={toggleMode}>
          {mode === 'login'
            ? 'Create an account instead'
            : 'Login instead'}
        </button>
      </div>
    </div>
  )
}

export default AuthView
