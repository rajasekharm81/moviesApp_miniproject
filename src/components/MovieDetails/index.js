import {Component} from 'react'

import Cookies from 'js-cookie'

class MovieDetails extends Component {
  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    return (
      <div>
        <h1>Movie Details</h1>
      </div>
    )
  }
}

export default MovieDetails
