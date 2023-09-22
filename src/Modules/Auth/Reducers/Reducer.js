import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../Actions/Action';

const initialState = {
  user: {},
  success: false,
  error: ""
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        success: true,
        error: ""
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        success: true,
        error: ''
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        success: false,
        error: ''
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        success: false,
        error: ''
      };
    default:
      return state;
  }
};

export default Reducer;
