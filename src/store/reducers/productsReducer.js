import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {ProductsActionTypes} from '../reduxConstants';

const initialState = {
  products: [
    {
      id: uuidv4(),
      name: 'T-Shirt',
      price: 50,
    },
    {
      id: uuidv4(),
      name: 'Pen',
      price: 10,
    },
    {
      id: uuidv4(),
      name: 'Orange',
      price: 5,
    },
  ],
  selectedProductId: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionTypes.ADD_NEW_PRODUCT: {
      return {...state, products: [...state.products, action.payload]};
    }
    case ProductsActionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        products: [
          ...state.products.filter((product) => product.id !== action.payload),
        ],
      };
    }
    case ProductsActionTypes.SELECT_PRODUCT: {
      return {...state, selectedProductId: action.payload};
    }
    default:
      return state;
  }
};

export default productsReducer;
