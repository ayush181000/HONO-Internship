export const AUTH_INITIATED = '[Auth] Login Started';
export const AUTH_LOGIN_SUCCESS = '[Auth] Login Success';
export const AUTH_LOGIN_FAIL = '[Auth] Login Fail';
export const AUTH_LOADED = '[Auth] Loaded';
export const AUTH_LOGOUT = '[Auth] Logout';

export const UPDATE_USER_INITIATED = '[Auth] Update User Started';
export const UPDATE_USER_SUCCESS = '[Auth] Update User Success';
export const UPDATE_USER_FAIL = '[Auth] Update User Fail';

const initialState = {
    token: null,
    user: null,
    myIssuedBooks: [],
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INITIATED: return { ...state, loading: true };

        case AUTH_LOGIN_SUCCESS: return { ...state, user: action.payload.user, loading: false, error: null, token: action.payload.token };

        case AUTH_LOGIN_FAIL: return { ...state, user: null, error: action.payload, loading: false, token: null }

        case AUTH_LOADED: return { ...state, user: action.payload.user, loading: false, error: null, token: action.payload.token };

        case UPDATE_USER_INITIATED: return { ...state, loading: true }

        case UPDATE_USER_SUCCESS: return { ...state, user: action.payload.user, loading: false, error: null, token: action.payload.token };

        case UPDATE_USER_FAIL: return { ...state, error: action.payload, loading: false };

        case AUTH_LOGOUT: return { ...state, user: null, loading: false, error: null, token: null };

        default: return state;
    }
};