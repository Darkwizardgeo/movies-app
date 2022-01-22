const domain = 'http://localhost:3000';

const getStudios = (callback) => {
    return fetch(`${domain}/studios`)
        .then(response => {
            return response.json();
        }).then(callback);
};

const getMovies = (callback) => {
    return fetch(`${domain}/movies`)
        .then(response => {
            return response.json();
        }).then(callback);
};

export { getMovies, getStudios } ;