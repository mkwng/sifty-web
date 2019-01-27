import * as actionTypes from "./types";

/* User Actions */
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      user: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

/* Collection Actions */
export const setCollection = collection => {
  return {
    type: actionTypes.SET_COLLECTION,
    payload: {
      collection: collection
    }
  }
}

export const clearCollection = () => {
  return {
    type: actionTypes.CLEAR_COLLECTION
  };
};
