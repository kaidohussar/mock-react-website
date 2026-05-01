import React, { useState } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import styles from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await login(email, password)
    setSubmitting(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error ?? 'Login failed')
    }
  }

  const emailLabelText = 'Your email'
  const passwordLabelText = 'Your password'
  const passwordPlaceholderText = 'Password'
  const emailPlaceholderText = 'Enter your email'

  return (
    <div className={styles.loginPage}>
      <Card className={styles.loginCard}>
        <h1 className={styles.logo}>Insightify</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label={emailLabelText}
            type="email"
            placeholder={emailPlaceholderText}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label={passwordLabelText}
            type="password"
            placeholder={passwordPlaceholderText}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <Button type="submit" className={styles.loginButton} disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
      </Card>
    </div>
  )
}

export default LoginPage
