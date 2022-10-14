import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute
        exact
        path="/movies-app/movies/:id"
        component={MovieDetails}
      />
      <ProtectedRoute
        exact
        path="/movies-app/movies"
        component={SearchedMovies}
      />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
