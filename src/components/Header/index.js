import {Link} from 'react-router-dom'

import './index.css'

import {BsSearch} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'

const Header = () => (
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
    </div>
    <div className="avatarContainer">
      <BsSearch className="magnifierIcon" />
      <div className="avatarImageContainer">
        <img
          alt="avatar"
          className="avatarImage"
          src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665644286/avatar_gfiqeh.png"
        />
      </div>
      <div className="hambergerIcon">
        <GiHamburgerMenu />
      </div>
    </div>
  </div>
)

export default Header
