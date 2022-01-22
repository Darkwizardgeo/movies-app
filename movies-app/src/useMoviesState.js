import { useState, useEffect } from 'react';
import { getStudios, getMovies } from './services/dataProvider';

const useMoviesState = (initialState) => {
    const [generalState, setGeneralState] = useState(initialState);

    useEffect(() => {
        getStudios(studios => setGeneralState(prevState => ({ ...prevState, studios: studios })));
        getMovies(movies => setGeneralState(prevState => ({ ...prevState, movies: movies })));
    }, []);

    return [generalState, setGeneralState];
}

export default useMoviesState;