import {
    ADD_MEGA_LIST_SUCCESS,
    ADD_MEGA_LIST_FAILURE,
    GET_MEGA_LIST_FAILURE,
    GET_MEGA_LIST_SUCCESS,
    DELETE_MEGA_FILE_FAILURE,
    DELETE_MEGA_FILE_SUCCESS,
    EDIT_MEGA_FILE_FAILURE,
    EDIT_MEGA_FILE_SUCCESS,
  } from '../Actions/action';
  
  const initialState = {
    megaList: [],
    success: false,
    error: ""
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_MEGA_LIST_SUCCESS:
        return {
          ...state,
          megaList: action.payload.data,
          success: true,
          error: ""
        };
      case GET_MEGA_LIST_SUCCESS:
        return {
          ...state,
          megaList: action.payload.data,
          success: true,
          error: ""
        };
      case DELETE_MEGA_FILE_SUCCESS:
        return {
          ...state,
          megaList: action.payload.data,
          success: true,
          error: ""
        };
      case EDIT_MEGA_FILE_SUCCESS:
        return {
          ...state,
          megaList: action.payload.data,
          success: true,
          error: ""
        };
      case ADD_MEGA_LIST_FAILURE:
        return {
          ...state,
          megaList: null,
          success: false,
          error: ''
        };
      case GET_MEGA_LIST_FAILURE:
        return {
          ...state,
          megaList: null,
          success: false,
          error: ''
        };
      case DELETE_MEGA_FILE_FAILURE:
        return {
          ...state,
          megaList: null,
          success: false,
          error: ''
        };
      case EDIT_MEGA_FILE_FAILURE:
        return {
          ...state,
          megaList: null,
          success: false,
          error: ''
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  