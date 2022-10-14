import './index.css'
// import {Link} from 'react-router-dom'

const FailureView = props => {
  const refresh = () => {
    const {path} = props
    path()
  }

  return (
    <div className="failureViewContainer">
      <img
        className="failureImage"
        alt="failureImage"
        src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665729621/caution_liozdw.png"
      />
      <h1>Sorry Something went Wrong</h1>

      <button onClick={refresh} className="TryAgainButton" type="button">
        Try Again
      </button>
    </div>
  )
}

export default FailureView
