import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  user: null,
  isLoading: true,
}

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        user: action.payload.user,
        isLoading: false,
      }
    case actionTypes.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      }
    default:
      return state;
  }
}

const initialCollectionState = {
  collection: null,
  isLoading: false,
};

const collection_reducer = (state = initialCollectionState, action) => {
  switch (action.type) {
    case actionTypes.SET_COLLECTION:
      return {
        ...state,
        collection: action.payload.collection
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  collection: collection_reducer
});

export default rootReducer;