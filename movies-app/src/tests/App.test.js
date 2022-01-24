import { render, fireEvent, act } from "@testing-library/react";
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
  id: "1",
  name: "Disney studios",
  shortName: "Disney",
  logo: "https://cdn.mos.cms.futurecdn.net/qfFFFhnM8LwZnjpTECN3oB.jpg",
  money: 1000
},
{
  id: '2',
  name: 'Warner Bros.',
  shortName: 'Warner',
  logo: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12c6f684-d447-4457-84fa-12033cfd581e/d9z4nxu-626ae303-e830-4b4f-ab8b-4aff7f1bef0f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzEyYzZmNjg0LWQ0NDctNDQ1Ny04NGZhLTEyMDMzY2ZkNTgxZVwvZDl6NG54dS02MjZhZTMwMy1lODMwLTRiNGYtYWI4Yi00YWZmN2YxYmVmMGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gtKaGVrDg8gzU7QFThusbHJw2d6bKgnDauezUcZo-1A',
  money: 900,
}];

window.alert = jest.fn();

jest.mock( ('../services/dataProvider'), () => ({
  getStudios: (cb) => cb(mockStudios),
  getMovies: (cb) => cb(mockMovies),
  transferMovie: jest.fn(),
}));

import {transferMovie} from '../services/dataProvider';

describe('<App /> Component Tests: ', () => {

  it('renders App component properly with content and call custom hook: ', () => {
    render(<App />);
  })

  it('trigger succesfull purchase event: ', () => {
    transferMovie.mockImplementation((params) => Promise.resolve({status:200,message:'succesful purchase'}))
    const content = render(<App />);

    const select = content.getAllByDisplayValue('Submit')
    fireEvent.click(select[0])
  })

  it('trigger failed purchase event: ', () => {
    transferMovie.mockImplementation((params) => Promise.resolve({status:400,message:'failed purchase'}))
    const content = render(<App />);

    const select = content.getAllByDisplayValue('Submit')
    fireEvent.click(select[0])
  })


})