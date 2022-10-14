import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFoundContainer">
    <h1 className="notFoundText">Not found</h1>
    <h2 className="Text">Please click Below for Back to Home</h2>
    <Link to="/">
      <button type="button" className="homeButon">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
