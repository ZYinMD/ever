import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const initialState = { providerProfile: { providerGeneralInfo: {} } };

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(),
);
