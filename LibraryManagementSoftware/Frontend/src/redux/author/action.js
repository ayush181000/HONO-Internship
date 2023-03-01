import axios from 'axios';
import { FETCH_AUTHORS_ERROR, FETCH_AUTHORS_SUCCESS, FETCH_AUTHOR_ID_INITIATED, FETCH_AUTHOR_ID_SUCCESS } from "./reducer";


export const fetchAuthors = async (dispatch) => {
    try {
        const response = await axios.get('author');
        ;
        dispatch({ type: FETCH_AUTHORS_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_AUTHORS_ERROR, payload: error.message });
    }
};


export const fetchAuthorById = async (dispatch, id) => {
    dispatch({ type: FETCH_AUTHOR_ID_INITIATED })
    try {
        const response = await axios.get(`author/${id}`);

        dispatch({ type: FETCH_AUTHOR_ID_SUCCESS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: FETCH_AUTHORS_ERROR, payload: 'Not found ' });
    }
};