export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';

const initialState = {
    books: [],
    error: null,
    loading: true
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS: return { ...state, books: action.payload, loading: false };

        case FETCH_BOOKS_ERROR: return { ...state, error: action.payload, loading: false }

        default: return state;
    }
};