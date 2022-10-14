import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import FailureView from '../FailureView'
import FileNotFound from '../FileNotFound'

class SearchedMovies extends Component {
  state = {results: [], userSearchInput: '', isLoading: false}

  componentDidMount() {
    this.movieDetails()
  }

  searchByUserInput = userText => {
    this.setState({userSearchInput: userText}, this.movieDetails)
  }

  movieDetails = async () => {
    this.setState({isLoading: true})
    const {userSearchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${userSearchInput}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        this.setState({results: data.results})
        this.setState({isLoading: false})
      } else if (response.status === 400) {
        return <FileNotFound />
      }
    } catch {
      return <FailureView />
    }
    return null
  }

  renderEmptyView = () => {
    const {userSearchInput} = this.state
    return (
      <div className="emptyListDisplay">
        <img
          className="noDataFoundImage"
          alt="noDataFound"
          src="https://res.cloudinary.com/dcqzidejd/image/upload/v1665747556/no-data-illustration-vector-concept-websites-landing-pages-mobile-applications-posters-banners-209459339_dw5rbi.jpg"
        />
        <h1>No Movie found with text: {userSearchInput}</h1>
      </div>
    )
  }

  renderContentView = () => {
    const {results} = this.state
    return (
      <div className="moviesContainer">
        {results.map(each => (
          <div key={each.id} className="movie">
            <Link to={`/movies-app/movies/${each.id}`}>
              <img
                className="movieImage"
                alt={each.title}
                src={each.poster_path}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  }

  renderLoader = () => <Loader type="TailSpin" color="red" />

  render() {
    const {results, isLoading} = this.state

    const toBeRendered =
      results.length === 0 && isLoading === false
        ? this.renderEmptyView
        : this.renderContentView

    const rend = isLoading ? this.renderLoader : toBeRendered

    return (
      <div className="popularMainContainer">
        <Header getSearchInput={this.searchByUserInput} />
        {rend()}
        <Footer />
      </div>
    )
  }
}
export default SearchedMovies
