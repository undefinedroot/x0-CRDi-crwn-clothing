import UserActionTypes from './user.types';

// null is a valid value
const INITIAL_STATE = {
  currentUser: null,
  error: null
}

// switch-default to return the state
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        currentUser: action.payload
      }
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        currentUser: action.payload
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;