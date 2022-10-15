import {Component} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

import {BsSearch} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'

class Header extends Component {
  state = {hovered: false}

  toggleSearchBar = () => {
    this.setState(prevState => ({hovered: !prevState.hovered}))
  }

  searchInput = event => {
    const {getSearchInput} = this.props
    getSearchInput(event.target.value)
  }

  logOut = () => {
    Cookies.remove('jwtToken')
    console.log(this.props)
  }

  render() {
    const {hovered} = this.state
    const searchBar = hovered ? (
      <input
        onChange={this.searchInput}
        className="searchInputEl"
        type="search"
      />
    ) : null
    return (
      <div className="headerContainer">
        <div className="headerLogoContainer">
          <Link className="link" to="/">
            <img
              className="headerLogo"
              alt="login website logo"
              src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665642655/movies_logo_yx6msq.png"
            />
          </Link>
          <Link className="link" to="/">
            <h1 className="lg">Home</h1>
          </Link>
          <Link className="link" to="/popular">
            <h1 className="lg">Popular</h1>
          </Link>
          <Link className="link" to="/about">
            <h1 className="lg">About</h1>
          </Link>
        </div>
        <div className="avatarContainer">
          <div className="searchBarContainer">
            {searchBar}
            <Link className="link" to="/movies-app/movies">
              <BsSearch
                onClick={this.toggleSearchBar}
                className="magnifierIcon"
              />
            </Link>
          </div>
          <div className="avatarImageContainer">
            <button className="dropdownButton" type="button">
              <img
                alt="avatar"
                className="avatarImage"
                src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665644286/avatar_gfiqeh.png"
              />
            </button>
            <div className="dropdownContent">
              <Link className="link" to="/login">
                <p onClick={this.logOut}>Logout</p>
              </Link>
            </div>
          </div>

          <div className="hambergerIcon">
            <GiHamburgerMenu />
            <div className="hambergerDropdown">
              <Link className="link" to="/">
                <h1>Home</h1>
              </Link>
              <Link className="link" to="/popular">
                <h1>Popular</h1>
              </Link>
              <Link className="link" to="/about">
                <h1>About</h1>
              </Link>
              <Link className="link" to="/login">
                <h1 onClick={this.logOut}>Logout</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
