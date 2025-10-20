import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <>
      {isLogin ? (
        <LoginForm onToggleMode={toggleMode} />
      ) : (
        <SignupForm onToggleMode={toggleMode} />
      )}
    </>
  )
}

export default AuthPage
