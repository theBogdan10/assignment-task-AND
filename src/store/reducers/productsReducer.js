import {ProductsActionTypes} from '../reduxConstants';

const initialState = {
  products: [],
};

const createProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionTypes.ADD_NEW_PRODUCT: {
      return {...state, products: action.payload};
    }
    default:
      return state;
  }
};

export default createProjectReducer;
