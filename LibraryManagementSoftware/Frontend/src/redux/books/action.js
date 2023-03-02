import axios from 'axios';
import { FETCH_BOOKS_ERROR, FETCH_BOOKS_SUCCESS, SEARCH_BOOKS_ERROR, SEARCH_BOOKS_INITIATED, SEARCH_BOOKS_SUCCESS } from "./reducer";


export const fetchBooks = async (dispatch, limit) => {
    try {
        const response = await axios.get('book');

        let payload;
        if (limit !== -1) {
            payload = response.data.data.slice(0, limit);
        } else {
            payload = response.data.data;
        }

        dispatch({ type: FETCH_BOOKS_SUCCESS, payload });
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_BOOKS_ERROR, payload: error.message });
    }
};

export const searchBooks = async (dispatch, search) => {
    console.log(search);
    dispatch({ type: SEARCH_BOOKS_INITIATED })
    try {
        const response = await axios.get(`book/search?options=${search.option}&search=${search.searchText}`);

        dispatch({ type: SEARCH_BOOKS_SUCCESS, payload: response.data.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: SEARCH_BOOKS_ERROR, payload: error.message });
    }
}