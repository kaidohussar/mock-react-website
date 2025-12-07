import React from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import styles from './LoginPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { useIntl, FormattedMessage } from 'react-intl'

interface LoginPageProps {
  onLoginSuccess: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate()
  const intl = useIntl()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLoginSuccess()
    navigate('/dashboard')
  }

  const emailLabelText = intl.formatMessage({ id: 'Login.Labels.Email' })
  const passwordLabelText = intl.formatMessage({ id: 'Login.Labels.Password' })
  const emailPlaceholderText = intl.formatMessage({
    id: 'Login.Labels.EmailPlaceholder',
  })
  const passwordPlaceholderText = intl.formatMessage({
    id: 'Login.Labels.PasswordPlaceholder',
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
            <FormattedMessage id="Login.Labels.LoginButtonText" />
          </Button>
        </form>
        <a href="#" className={styles.forgotPassword}>
          <FormattedMessage id="Login.Labels.ForgotPassword" />
        </a>
      </Card>
    </div>
  )
}

export default LoginPage
