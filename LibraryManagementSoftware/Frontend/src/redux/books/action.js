import axios from 'axios';
import { FETCH_BOOKS_ERROR, FETCH_BOOKS_SUCCESS } from "./reducer";


export const fetchBooks = async (dispatch) => {
    try {
        const response = await axios.get('https://honolibrary.onrender.com/book');
        console.log(response);
        dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_BOOKS_ERROR, payload: error.message });
    }
};