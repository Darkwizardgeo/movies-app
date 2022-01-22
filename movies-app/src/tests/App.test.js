import { render } from "@testing-library/react";
import App from '../App';

const mockMovies = [{
  "name": "Nightmare before christmas",
  "genre": 6,
  "img": "https://www.dimanoinmano.it/img/638590/full/libri-per-ragazzi/infanzia/nightmare-before-christmas.jpg",
  "studioId": "1"
}, {
  "name": "Nightmare before christmas",
  "genre": 6,
  "studioId": "1"
}];

const mockStudios = [{
  "id": "1",
  "name": "Disney studios",
  "shortName": "Disney",
  "logo": "https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg",
  "money": 1000
}];

jest.mock( ('../services/dataProvider'), () => ({
  getStudios: (cb) => cb(mockStudios),
  getMovies: (cb) => cb(mockMovies),
}));

describe('<App /> Component Tests: ', () => {

  it('renders App component properly with content and call custom hook: ', () => {
    render(<App />);
  })
})