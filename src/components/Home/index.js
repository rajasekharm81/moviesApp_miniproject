import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Home extends Component {
  state = {
    results: [],
    topRatedMovies: [],
    originals: [],
    status: 'INITIAL',
  }

  componentDidMount() {
    this.movieDetails()
  }

  movieDetails = async () => {
    this.setState({status: 'LOADING'})
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({results: data.results})
      }

      const topRatedMoviesUrl =
        'https://apis.ccbp.in/movies-app/top-rated-movies'
      const topRatedMoviesresponse = await fetch(topRatedMoviesUrl, options)
      const topRatedMoviesdata = await topRatedMoviesresponse.json()
      if (topRatedMoviesresponse.ok) {
        this.setState({topRatedMovies: topRatedMoviesdata.results})
      }
      const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
      const originalsresponse = await fetch(originalsUrl, options)
      const originalsdata = await originalsresponse.json()
      if (originalsresponse.ok) {
        this.setState({originals: originalsdata.results, status: 'SUCCESS'})
      }
    } catch (e) {
      this.setState({status: 'FAILED'})
    }
  }

  renderContentView = () => {
    const posters = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 200,
      autoplaySpeed: 2000,
      cssEase: 'linear',
    }
    const trending = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 200,
    }
    const {results, topRatedMovies, originals} = this.state
    // console.log(results)
    return (
      <div className="homeMainContainer">
        <div className="corCont">
          <Slider {...posters}>
            {results.map(each => (
              <div key={each.id}>
                <div
                  className="CorosolContainer"
                  style={{
                    backgroundImage: `url("${each.backdrop_path}")`,
                  }}
                >
                  <Header />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="bottomContainer">
          <h1 className="Contentheadings">Trending</h1>
          <Slider className="treningCorosol" {...trending}>
            {topRatedMovies.map(each => (
              <div key={each.id} id={each.id} className="trendingCorosolItem">
                <Link to={`/movies-app/movies/${each.id}`}>
                  <img
                    className="PosterImage"
                    src={each.poster_path}
                    alt="title"
                  />
                </Link>
              </div>
            ))}
          </Slider>
          <h1 className="Contentheadings">Originals</h1>
          <Slider className="treningCorosol" {...trending}>
            {originals.map(each => (
              <div key={each.id} className="trendingCorosolItem">
                <Link to={`/movies-app/movies/${each.id}`}>
                  <img
                    className="PosterImage"
                    src={each.poster_path}
                    alt="title"
                  />
                </Link>
              </div>
            ))}
          </Slider>
          <Footer />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loadingViewContainer">
      <Loader type="TailSpin" color="red" />
    </div>
  )

  renderInitialView = () => (
    <div className="welcomeMsgContainer">
      <h1>Welcome to Movies</h1>
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case 'INITIAL':
        return this.renderInitialView()
      case 'SUCCESS':
        return this.renderContentView()
      case 'LOADING':
        return this.renderLoadingView()
      case 'FAILED':
        return <FailureView path={this.movieDetails} />
      default:
        return null
    }
  }
}

export default Home
