import './App.css'
import useMoviesState from './useMoviesState';
import { Avatar, Card, Grid, Typography, withStyles } from '@material-ui/core';
import movieAppStyles from './styles/movieAppStyle';
import BuyRights from './BuyRights';
import { getStudios, getMovies } from './services/dataProvider';
import SearchMovie from './SearchMovie'

const App = (props) => {
  const [generalState, setGeneralState] = useMoviesState({
    studios: [],
    movies: [],
    searchMovie: ""
  });

  const { classes } = props;
  const { movies, studios, searchMovie } = generalState;

  const handleChange = () => {
    getStudios(studios => setGeneralState(prevState => ({ ...prevState, studios: studios })));
    getMovies(movies => setGeneralState(prevState => ({ ...prevState, movies: movies })));
  }

  const handleSearch = event => (
    setGeneralState(prevState => ({ ...prevState, searchMovie: event.target.value }))
  );

  const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchMovie.toLowerCase()))

  return (
    <div className="App">
      <div className="App-studios App-flex">
        <SearchMovie search={searchMovie} onSearch={handleSearch} />
        <h3>Images:</h3>
        <Grid container className={classes.gridContainer}>
          {filteredMovies.map((movie, index) =>
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Card className={classes.movieCard}>

                <Avatar alt={movie.name} src={movie.img ? movie.img : classes.defaultAvatar}
                  className={classes.movieAvatar} />
                <div>
                  <Typography className={classes.movieNameStyle}>
                    {movie.name + ' '}
                    <Typography component={'span'} className={classes.positionStyle}>
                      {movie.position}
                    </Typography>
                  </Typography>
                </div>
                <Typography>{
                  // eslint-disable-next-line
                  studios.map(studio => {
                    if (movie.studioId === studio.id) {
                      return studio.name
                    }
                  })}</Typography>
                <div className={classes.transferContainer}>
                  <BuyRights
                    onMoviePurchase={handleChange}
                    movie={movie}
                    availableStudios={studios.filter(studio => (studio.id !== movie.studioId))} />
                </div>
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(movieAppStyles)(App)
