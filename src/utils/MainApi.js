import { BASE_URL, checkResponse } from "./auth";
export const getUser = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(checkResponse)
}
export const updateUser = (name, email) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email
        }),
        credentials: 'include'
    })
        .then(checkResponse)
}
export const likeMovie = ({
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId }) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailer,
            nameRU,
            nameEN,
            thumbnail,
            movieId
        })
    })
        .then(checkResponse)
}

export const deleteMovie = (id) => {
    return fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(checkResponse)
}