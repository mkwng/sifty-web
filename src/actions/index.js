import * as actionTypes from "./types";

/* User Actions */
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

/* Collection Actions */
export const setCurrentCollection = collection => {
  return {
    type: actionTypes.SET_CURRENT_COLLECTION,
    payload: {
      currentCollection: collection
    }
  }
}