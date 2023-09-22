import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE
  } from './SearchAction.';
  
  const initialState = {
    searchList: [],
    success: false,
    error: ""
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_SUCCESS:
        return {
          ...state,
          searchList: action.payload.data,
          success: true,
          error: ""
        };
      case SEARCH_FAILURE:
        return {
          ...state,
          searchList: null,
          success: false,
          error: ''
        };

      default:
        return state;
    }
  };
  
  export default Reducer;
  