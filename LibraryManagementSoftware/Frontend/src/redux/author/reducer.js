export const FETCH_AUTHORS_SUCCESS = '[Author] Fetch Authors Success';
export const FETCH_AUTHORS_ERROR = '[Author] Fetch Authors Error';

export const FETCH_AUTHOR_ID_INITIATED = '[Author] Fetch Author Id Initiated';
export const FETCH_AUTHOR_ID_SUCCESS = '[Author] Fetch Author Id Success';

const initialState = {
    authors: [],
    author: null,
    error: null,
    loading: true
};

export const authorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTHORS_SUCCESS: return { ...state, authors: action.payload, loading: false };

        case FETCH_AUTHORS_ERROR: return { ...state, error: action.payload, loading: false }

        case FETCH_AUTHOR_ID_INITIATED: return { ...state, loading: true };

        case FETCH_AUTHOR_ID_SUCCESS: return { ...state, author: action.payload, loading: false };

        default: return state;
    }
};