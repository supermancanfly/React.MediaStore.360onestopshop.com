import { combineReducers } from 'redux';
import AuthReducer from './Modules/Auth/Reducers/Reducer';
import MegaReducer from './Modules/Admin/CloudStorage/Reducers/cloudStorageReducer'
import HomeReducer from './Modules/Home/Reducers/HomeReducer'
import SearchReducer from "./Modules/Search/SearchReducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Mega: MegaReducer,
  Home: HomeReducer,
  Search: SearchReducer,
});

export default rootReducer;
