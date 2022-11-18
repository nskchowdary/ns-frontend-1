import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setItem, getItem } from '../utilities/common/index'
import '../assets/scss/LoginPage/LoginPage.scss'

const LoginPage = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const user = getItem('loggedIn')
    if (user) {
      navigate('/')
    }
  }, [])
  const handleLoginForm = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setErr('enter User Name & Password')
    }
    if (username === 'reshi' && password === '123') {
      setItem('loggedIn', true)
      navigate('/')
    } else {
      setErr('Invalid Username & Password')
    }
  }
  return (
    <div className="login-MainDiv">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form onSubmit={handleLoginForm} className="login">
              <div className="login__field">
                {err && <p style={{ color: 'red' }}>{err}</p>}
                <i className="login__icon fas fa-user" />
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock" />
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right" />
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4" />
            <span className="screen__background__shape screen__background__shape3" />
            <span className="screen__background__shape screen__background__shape2" />
            <span className="screen__background__shape screen__background__shape1" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
