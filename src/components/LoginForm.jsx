import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (event) => {
    event.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={onLogin} id="login-form">
        <div>
          <label>
            username
            <input type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm