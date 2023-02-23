export const FETCH_AUTHORS_SUCCESS = 'FETCH_AUTHORS_SUCCESS';
export const FETCH_AUTHORS_ERROR = 'FETCH_AUTHORS_ERROR';

const initialState = {
    authors: [],
    error: null,
    loading: true
};

export const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTHORS_SUCCESS: return { ...state, authors: action.payload, loading: false };

        case FETCH_AUTHORS_ERROR: return { ...state, error: action.payload, loading: false }

        default: return state;
    }
};