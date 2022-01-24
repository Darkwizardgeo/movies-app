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

const transferMovie = (params) => {
    return fetch(`${domain}/transfer`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

export { getMovies, getStudios, transferMovie };