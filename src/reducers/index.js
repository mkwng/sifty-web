import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true,
}

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
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
  currentCollection: null
};

const collection_reducer = (state = initialCollectionState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_COLLECTION:
      return {
        ...state,
        currentCollection: action.payload.currentCollection
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