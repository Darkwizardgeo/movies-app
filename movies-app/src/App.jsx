import './App.css'
import useMoviesState from './useMoviesState';
import { Avatar, Card, Grid, Typography, withStyles } from '@material-ui/core';
import movieAppStyles from './styles/movieAppStyle';

//TODO: 2 Move these calls into a proper api layer
const defaultAvatar = 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-vector-600w-149083895.jpg'

const App = (props) => {
  const [generalState, setGeneralState] = useMoviesState({
    studios: [],
    movies: [],
  });

  const { classes } = props;
  const { movies, studios, } = generalState;

  return (
    <div className="App">
      <div className="App-studios App-flex"> {
        //TODO: 4 Categorize each image with a title and a description
      }
        <h3>Images:</h3>
        <Grid container className={classes.gridContainer}>
          {movies.map((movie, index) =>
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <Card className={classes.movieCard}>

                <Avatar alt={movie.name} src={movie.img ? movie.img : defaultAvatar}
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
              </Card>
            </Grid>)}
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(movieAppStyles)(App)
