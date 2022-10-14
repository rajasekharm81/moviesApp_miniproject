import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import {format} from 'date-fns'
import Header from '../Header'
import Footer from '../Footer'
import FileNotFound from '../FileNotFound'
import FailureView from '../FailureView'

import './index.css'

class MovieDetails extends Component {
  state = {
    status: 'INITIAL',
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
    this.setState({status: 'LOADING'})
    const {updatedId} = this.state
    const jwtToken = Cookies.get('jwtToken')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${updatedId}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    try {
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
          status: 'SUCCESS',
        })
      } else if (response.status === 400) {
        this.setState({status: 'NOFILE'})
      }
    } catch {
      this.setState({status: 'FAILED'})
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

  renderContentView = () => {
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
    return (
      <>
        <div
          className="movieDetailsMainContainer"
          style={{backgroundImage: `url('${data.backdrop_path}')`}}
        >
          <Header className="header" />
          <div className="mainMovieDescriptionContainer">
            <h1>{data.title}</h1>
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
            <h2>Genres</h2>
            {genres.map(each => (
              <li id={each.id}>{each.name}</li>
            ))}
          </ul>
          <ul>
            <h2>Audio Available</h2>
            {audioAvailable.map(each => (
              <li id={each.id}>{each.english_name}</li>
            ))}
          </ul>
          <div>
            <div>
              <h2>Rating Count</h2>
              <p>{data.vote_count}</p>
            </div>
            <div>
              <h2>Rating Average</h2>
              <p>{data.vote_average}</p>
            </div>
          </div>
          <div>
            <div>
              <h2>Budget</h2>
              <p>{data.budget}</p>
            </div>
            <div>
              <h2>Release Date</h2>
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
          <Footer />
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loadingViewContainer">
      <Loader type="TailSpin" color="red" />
    </div>
  )

  render() {
    const {status} = this.state
    switch (status) {
      case 'LOADING':
        return this.renderLoadingView()
      case 'SUCCESS':
        return this.renderContentView()
      case 'FAILED':
        return <FailureView path={this.getMovieDetails} />
      case 'NOFILE':
        return <FileNotFound />
      default:
        return null
    }
  }
}

export default MovieDetails
