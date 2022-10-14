import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    errorMsg: '',
  }

  updateUserName = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  submitLogin = async event => {
    const {history} = this.props
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({errorMsg: ''})
      Cookies.set('jwtToken', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg})
    }
    this.setState({username: '', password: ''})
  }

  render() {
    const {showPassword, username, password, errorMsg} = this.state
    const passInputType = showPassword ? 'text' : 'password'
    const errormsg =
      errorMsg !== '' ? <p className="errorMsg">{errorMsg}</p> : null

    const jwtToken = Cookies.get('jwtToken')

    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }
    return (
      <div className="LoginMainContainer">
        {/* <h1 className="LoginMoviesHeading">Movies</h1> */}
        <img
          alt="login website logo"
          className="MoviesLogo"
          src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665642655/movies_logo_yx6msq.png"
        />
        <form onSubmit={this.submitLogin} className="loginContainer">
          <h2>Login</h2>
          <label className="loginLabel" htmlFor="loginUsername">
            USERNAME
          </label>
          <input
            value={username}
            onChange={this.updateUserName}
            className="loginInput"
            id="loginUsername"
            type="text"
          />
          <label className="loginLabel" htmlFor="loginPassword">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={this.updatePassword}
            className="loginInput"
            type={passInputType}
            id="loginPassword"
          />
          <div className="loginLabel">
            <input
              onChange={this.toggleShowPassword}
              id="loginShowPassword"
              type="checkbox"
            />
            <label htmlFor="loginShowPassword">Show Password</label>
          </div>
          {errormsg}
          <button type="submit" className="LoginButton">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
