import React from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import styles from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Text, useGetText } from '@contentstorage/react'

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

  const emailLabelText = useGetText({ contentId: 'Login.Labels.Email' })
  const passwordLabelText = useGetText({ contentId: 'Login.Labels.Password' })
  const emailPlaceholderText = useGetText({
    contentId: 'Login.Labels.EmailPlaceholder',
  })
  const passwordPlaceholderText = useGetText({
    contentId: 'Login.Labels.PasswordPlaceholder',
  })

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
            <Text contentId="Login.LoginButtonText" />
          </Button>
        </form>
        <a href="#" className={styles.forgotPassword}>
          <Text contentId="Login.ForgotPassword" />
        </a>
      </Card>
    </div>
  )
}

export default LoginPage
