import React from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import styles from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'

interface LoginPageProps {
  onLoginSuccess: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLoginSuccess()
    navigate('/dashboard')
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
            required
          />
          <Input
            label={passwordLabelText}
            type="password"
            placeholder={passwordPlaceholderText}
            required
          />
          <Button type="submit" className={styles.loginButton}>
            Login
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
