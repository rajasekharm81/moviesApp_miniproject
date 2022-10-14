import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import Header from '../Header'

import './index.css'

class MovieDetails extends Component {
  state = {
    data: [],
    genres: [],
    audioAvailable: [],
    releaseDate: Date(),
    similarMovies: [],
    updatedId: '',
    runTime: '',
  }

  componentDidMount() {
    this.updatedId()
  }

  updatedId = () => {
    this.goToTop()
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({updatedId: id}, this.getMovieDetails)
  }

  getMovieDetails = async () => {
    // const {match} = this.props
    // const {params} = match
    // const {id} = params

    const {updatedId} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${updatedId}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        data: data.movie_details,
        genres: data.movie_details.genres,
        audioAvailable: data.movie_details.spoken_languages,
        releaseDate: data.movie_details.release_date,
        runTime: data.movie_details.runtime,
        similarMovies: data.movie_details.similar_movies,
      })
    }
  }

  similarMovieDisplay = async event => {
    this.setState(
      {updatedId: event.target.id},
      this.getMovieDetails,
      this.goToTop(),
    )
  }

  goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  render() {
    const {
      data,
      genres,
      audioAvailable,
      releaseDate,
      similarMovies,
      runTime,
    } = this.state
    const rel = format(new Date(`'${releaseDate}'`), 'MM/dd/yyyy')
    const releaseYear = format(new Date(rel), 'yyyy')
    const duriation = `${Math.floor(runTime / 60)}H ${runTime % 60}min`
    const adult = data.adult ? (
      <span className="adult">A</span>
    ) : (
      <span className="adult">U/A</span>
    )
    console.log(releaseYear)
    return (
      <>
        <div
          className="movieDetailsMainContainer"
          style={{backgroundImage: `url('${data.backdrop_path}')`}}
        >
          <Header className="header" />
          <div className="mainMovieDescriptionContainer">
            <h1 className="movieDescriptionHeading">{data.title}</h1>
            <p>
              {duriation} {adult} {releaseYear}
            </p>
            <p>{data.overview}</p>
            <button className="playButton" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="movieDetailDescriptionContainer">
          <ul>
            <h1>Genres</h1>
            {genres.map(each => (
              <li id={each.id}>{each.name}</li>
            ))}
          </ul>
          <ul>
            <h1>Audio Available</h1>
            {audioAvailable.map(each => (
              <li id={each.id}>{each.english_name}</li>
            ))}
          </ul>
          <div>
            <div>
              <h1>Rating Count</h1>
              <p>{data.vote_count}</p>
            </div>
            <div>
              <h1>Rating Average</h1>
              <p>{data.vote_average}</p>
            </div>
          </div>
          <div>
            <div>
              <h1>Budget</h1>
              <p>{data.budget}</p>
            </div>
            <div>
              <h1>Release Date</h1>
              <p>{rel}</p>
            </div>
          </div>
        </div>
        <div className="similarMoviesContainer">
          <h1>More Like this</h1>
          <div className="SimilarMoviesDisplayContainer">
            {similarMovies.map(each => (
              <Link to={`/movies-app/movies/${each.id}`}>
                <img
                  onClick={this.similarMovieDisplay}
                  className="similarMovieImage"
                  key={each.id}
                  id={each.id}
                  alt={each.title}
                  src={each.poster_path}
                />
              </Link>
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default MovieDetails
