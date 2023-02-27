export const AUTH_INITIATED = '[Auth] Login Started';
export const AUTH_LOGIN_SUCCESS = '[Auth] Login Success';
export const AUTH_LOGIN_FAIL = '[Auth] Login Fail';

const initialState = {
    user: null,
    loading: false,
    error: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_INITIATED: return { ...state, loading: true };

        case AUTH_LOGIN_SUCCESS: return { ...state, user: action.payload, loading: false, error: null };

        case AUTH_LOGIN_FAIL: return { ...state, user: null, error: action.payload, loading: false }

        default: return state;
    }
};