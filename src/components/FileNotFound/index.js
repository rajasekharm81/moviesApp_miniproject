import './index.css'
import {Link} from 'react-router-dom'

const FileNotFound = () => (
  <div className="fileNotFoundContainer">
    <h1>File not found</h1>
    <h3>Go to the Home Page</h3>
    <Link to="/">
      <button className="homeButton" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default FileNotFound
