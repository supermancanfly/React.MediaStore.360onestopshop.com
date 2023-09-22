import {
    GET_HOME_FAILURE,
    GET_HOME_SUCCESS,
  } from '../Actions/HomeAction';
  
  const initialState = {
    HomeList: {
        firstTitleOne: null,
        secondTitleOne: null,
        thirdTitleOne: null,
        firstTitleTwo: null,
        secondTitleTwo: null,
        thirdTitleTwo: null,
        forthTitle: null,
        totalAssets: null,
        totalDownloads: null,
        todayViews: null,
        todayDownloads: null,
        totalAssetsNumber: null,
        totalDownloadsNumber: null,
        todayViewsNumber: null,
        todayDownloadsNumber: null,
    },
    success: false,
    error: ""
  };
  
  const Reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_HOME_SUCCESS:
        return {
          ...state,
          HomeList: action.payload.data,
          success: true,
          error: ""
        };
      case GET_HOME_FAILURE:
        return {
          ...state,
          HomeList: null,
          success: false,
          error: ''
        };
      default:
        return state;
    }
  };
  
  export default Reducer;
  