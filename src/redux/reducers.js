import { combineReducers } from 'redux';

import c from './constants';

const providerProfile = (state = {}, action) => {
  let newState = { ...state };
  if (action.type === c.PUT_DATA_TO_STORE) {
    newState.providerGeneralInfo = newState.providerGeneralInfo || {};
    newState.providerGeneralInfo.data = action.payload;
  }
  return newState;
};


export default combineReducers({ providerProfile });
