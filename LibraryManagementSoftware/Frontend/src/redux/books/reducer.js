export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';

export const SEARCH_BOOKS_INITIATED = '[Books] Search Books Initiated';
export const SEARCH_BOOKS_SUCCESS = '[Books] Search Books Success';
export const SEARCH_BOOKS_ERROR = '[Books] Search Books Error';
export const UNSET_SEARCH_BOOKS = '[Books] Unset Search Books';



const initialState = {
    books: [],
    searchBooks: [],
    error: null,
    loading: true
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS: return { ...state, books: action.payload, loading: false };

        case FETCH_BOOKS_ERROR: return { ...state, error: action.payload, loading: false }

        case SEARCH_BOOKS_INITIATED: return { ...state, loading: true, searchBooks: [] };

        case SEARCH_BOOKS_SUCCESS: return { ...state, loading: false, searchBooks: action.payload };

        case SEARCH_BOOKS_ERROR: return { ...state, loading: false, error: action.payload, searchBooks: [] };

        case UNSET_SEARCH_BOOKS: return { ...state, error: null, loading: false, searchBooks: [] }

        default: return state;
    }
};