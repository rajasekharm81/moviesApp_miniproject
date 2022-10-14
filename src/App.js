import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/popular" component={Popular} />
      <Route exact path="/movies-app/movies/:id" component={MovieDetails} />
      <Route exact path="/movies-app/movies" component={SearchedMovies} />
    </Switch>
  </>
)

export default App
