import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Import reducers
import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import notificationReducer from './reducers/notificationReducer';
import chatReducer from './reducers/chatReducer';
import socketReducer from './reducers/socketReducer';
import employeeReducer from './reducers/employeeReducer';

// Combine reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  employeeId: employeeReducer,
  notifications: notificationReducer,
  chat: chatReducer,
  socket: socketReducer,
});

// Retrieve user info from local storage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Set initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

// Define middleware
const middleware = [thunk];

// Create the Redux store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
