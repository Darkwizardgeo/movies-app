import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getAllMoviesFromStudios } from '../src/helpers.mjs';
import { sony, warner, disney, movieAge } from '../constants/studio_constants.mjs';
import bunyan from 'bunyan';

let log = bunyan.createLogger({
  name: 'movies-app-api',
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: './movies-app-api-error.log'
    }
  ]
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/studios', function (req, res) {
  let disneyTemp = { ...disney }
  delete disneyTemp.movies
  let warnerTemp = { ...warner }
  delete warnerTemp.movies
  let sonyTemp = { ...sony }
  delete sonyTemp.movies
  log.info(res.json([
    disneyTemp,
    warnerTemp,
    sonyTemp
  ]))
});

app.get('/movies', function (req, res) {
  try {
    log.info(res.json(getAllMoviesFromStudios([disney, warner, sony])))
  } catch (e) {
    log.error(res.statusCode(500))
  }
});

app.get('/movieAge', function (req, res) {
  log.info(res.json(movieAge))
});

//TODO: 1 add the capability to sell the movie rights to another studio
app.post('/transfer', function (req, res) {
  const { buyerStudio, movieData } = req.body;

  if (buyerStudio === movieData.studioId) return log.error(res.status(400).json({ message: 'Movie already belong to Studios' }));

  const studios = [disney, warner, sony];

  const currentStudio = studios.find(studio => (studio.id === movieData.studioId));
  const newStudio = studios.find(studio => (studio.id === buyerStudio));

  if (!newStudio) return log.error(res.status(400).json({ message: 'Invalid Studio' }));

  const movieFullData = currentStudio.movies.find(movie => movie.name === movieData.movieName);

  if(newStudio.money > movieFullData.price) {
    currentStudio.movies = currentStudio.movies.filter(movie => movie.name !== movieData.movieName);
    movieData.studioId = newStudio.id;
    newStudio.movies.push(movieFullData);
    currentStudio.money = currentStudio.money + movieFullData.price;
    newStudio.money = newStudio.money - movieFullData.price;

    return log.info(res.json({ 'status': 200, "message": "succesful movie purchase", "data": { studios: studios } }));
  }
  else {
    return log.error(res.status(400).json({message:'Not enough money for transaction'}))
  }
});

// TODO: 2 Add logging capabilities into the movies-app
app.listen(3000)
