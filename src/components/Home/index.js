import {Component} from 'react'
import Cookies from 'js-cookie'

import Slider from 'react-slick'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Home extends Component {
  state = {results: [], topRatedMovies: [], originals: []}

  componentDidMount() {
    this.movieDetails()
  }

  movieDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({results: data.results})
    }

    const topRatedMoviesUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const topRatedMoviesresponse = await fetch(topRatedMoviesUrl, options)
    const topRatedMoviesdata = await topRatedMoviesresponse.json()
    if (topRatedMoviesresponse.ok) {
      this.setState({topRatedMovies: topRatedMoviesdata.results})
    }
    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const originalsresponse = await fetch(originalsUrl, options)
    const originalsdata = await originalsresponse.json()
    if (originalsresponse.ok) {
      this.setState({originals: originalsdata.results})
    }
  }

  render() {
    const posters = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 200,
      autoplaySpeed: 3000,
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
    console.log(results)
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
                  {/* <div>
                    <h1 className="title">{each.title}</h1>
                    <p>{each.overview}</p>
                  </div> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="bottomContainer">
          <h1 className="Contentheadings">Trending</h1>
          <Slider className="treningCorosol" {...trending}>
            {topRatedMovies.map(each => (
              <div key={each.id} className="trendingCorosolItem">
                <img
                  className="PosterImage"
                  src={each.poster_path}
                  alt="title"
                />
              </div>
            ))}
          </Slider>
          <h1 className="Contentheadings">Originals</h1>
          <Slider className="treningCorosol" {...trending}>
            {originals.map(each => (
              <div key={each.id} className="trendingCorosolItem">
                <img
                  className="PosterImage"
                  src={each.poster_path}
                  alt="title"
                />
              </div>
            ))}
          </Slider>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
