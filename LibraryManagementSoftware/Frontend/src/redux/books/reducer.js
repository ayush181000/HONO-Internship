export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';

export const SEARCH_BOOKS_INITIATED = '[Books] Search Books Initiated';
export const SEARCH_BOOKS_SUCCESS = '[Books] Search Books Success';
export const SEARCH_BOOKS_ERROR = '[Books] Search Books Error';
export const UNSET_SEARCH_BOOKS = '[Books] Unset Search Books';

export const ISSUE_BOOK_INITIATED = '[Books] Issue Book Initiated';
export const ISSUE_BOOK_SUCCESS = '[Books] Issue Book Success';
export const ISSUE_BOOK_ERROR = '[Books] Issue Book Error';
export const UNSET_ISSUE_BOOK = '[Books] Unset Issue Book';

export const GET_MY_ISSUED_BOOK_INITIATED = '[Books] Get My Issued Book Initiated';
export const GET_MY_ISSUED_BOOK_SUCCESS = '[Books] Get My Issued Book Success';
export const GET_MY_ISSUED_BOOK_ERROR = '[Books] Get My Issued Book Error';
export const UNSET_MY_ISSUED_BOOK = '[Books] Unset My Issued Book';



const issueBookInitialState = { bookIssued: null, error: null, loading: false }

const initialState = {
    books: [],
    searchBooks: [],
    myBooks: [],
    issueBook: issueBookInitialState,
    error: null,
    loading: true
};

export const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKS_SUCCESS: return { ...state, books: action.payload, loading: false };

        case FETCH_BOOKS_ERROR: return { ...state, error: action.payload, loading: false }

        case SEARCH_BOOKS_INITIATED:
        case GET_MY_ISSUED_BOOK_INITIATED: return { ...state, loading: true, searchBooks: [], myBooks: [] };

        case SEARCH_BOOKS_SUCCESS: return { ...state, loading: false, searchBooks: action.payload };

        case SEARCH_BOOKS_ERROR: return { ...state, loading: false, error: action.payload, searchBooks: [] };

        case UNSET_SEARCH_BOOKS: return { ...state, error: null, loading: false, searchBooks: [] }

        case ISSUE_BOOK_INITIATED: return {
            ...state,
            issueBook: { bookIssued: null, error: null, loading: true }
        };

        case ISSUE_BOOK_SUCCESS: return {
            ...state,
            issueBook: { bookIssued: action.payload, error: null, loading: false }
        };

        case ISSUE_BOOK_ERROR: return {
            ...state,
            issueBook: { bookIssued: null, error: action.payload, loading: false }
        };

        case UNSET_ISSUE_BOOK: return {
            ...state,
            issueBook: issueBookInitialState
        }

        case GET_MY_ISSUED_BOOK_SUCCESS: return { ...state, loading: false, error: null, myBooks: action.payload }

        case GET_MY_ISSUED_BOOK_ERROR: return { ...state, loading: false, error: action.payload, myBooks: [] }

        case UNSET_MY_ISSUED_BOOK: return { ...state, loading: false, error: null, myBooks: [] }

        default: return state;
    }
};