import axios from 'axios';
import { FETCH_BOOKS_ERROR, FETCH_BOOKS_SUCCESS, SEARCH_BOOKS_ERROR, SEARCH_BOOKS_INITIATED, SEARCH_BOOKS_SUCCESS } from "./reducer";


export const fetchBooks = async (dispatch) => {
    try {
        const response = await axios.get('book');
        // console.log(response);
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data.data });
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