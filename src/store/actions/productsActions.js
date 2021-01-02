import {ProductsActionTypes} from '../reduxConstants';

export const addNewProduct = (payload) => {
  return {
    type: ProductsActionTypes.ADD_NEW_PRODUCT,
    payload,
  };
};

export const deleteProduct = (payload) => {
  return {
    type: ProductsActionTypes.DELETE_PRODUCT,
    payload,
  };
};

export const addToFavourite = (payload) => {
  return {
    type: ProductsActionTypes.ADD_TO_FAVOURITE,
    payload,
  };
};

export const addToCart = (payload) => {
  return {
    type: ProductsActionTypes.ADD_TO_CART,
    payload,
  };
};

export const selectProduct = (payload) => {
  return {
    type: ProductsActionTypes.SELECT_PRODUCT,
    payload,
  };
};

export const goToAddNewProduct = (payload) => {
  return {
    type: ProductsActionTypes.GO_TO_ADD_NEW_PRODUCT,
  };
};
