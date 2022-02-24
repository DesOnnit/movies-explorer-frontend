import { checkResponse } from "./auth";
const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";
export const searchMovies = () => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(checkResponse)
} 