import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

class Popular extends Component {
  state = {results: []}

  componentDidMount() {
    this.movieDetails()
  }

  movieDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({results: data.results})
    }
  }

  render() {
    const {results} = this.state
    console.log(results)
    return (
      <div className="popularMainContainer">
        <Header />
        <div className="moviesContainer">
          {results.map(each => (
            <div key={each.id} className="movie">
              <img
                className="movieImage"
                alt={each.title}
                src={each.poster_path}
              />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular
