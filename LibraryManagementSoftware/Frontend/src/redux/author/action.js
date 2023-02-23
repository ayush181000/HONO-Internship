import axios from 'axios';
import { FETCH_AUTHORS_ERROR, FETCH_AUTHORS_SUCCESS } from "./reducer";


export const fetchAuthors = async (dispatch) => {
    try {
        const response = await axios.get('https://honolibrary.onrender.com/author');
        console.log(response);
        dispatch({ type: FETCH_AUTHORS_SUCCESS, payload: response.data.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: FETCH_AUTHORS_ERROR, payload: error.message });
    }
};