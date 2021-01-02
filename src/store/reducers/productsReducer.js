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
    {
      id: uuidv4(),
      name: 'Sneakers',
      price: 120,
    },
  ],
  selectedProductId: null,
  favouritesProductsId: [],
  cartProductsId: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionTypes.ADD_NEW_PRODUCT: {
      return {...state, products: [...state.products, action.payload]};
    }
    case ProductsActionTypes.UPDATE_PRODUCT: {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );

      const newArray = [...state.products]; //making a new array
      newArray[index].name = action.payload.name;
      newArray[index].price = action.payload.price;
      return {
        ...state,
        products: newArray,
      };
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
    case ProductsActionTypes.ADD_TO_FAVOURITE: {
      return {
        ...state,
        favouritesProductsId: [...state.favouritesProductsId, action.payload],
      };
    }
    case ProductsActionTypes.DELETE_FROM_FAVOURITE: {
      return {
        ...state,
        favouritesProductsId: [
          ...state.favouritesProductsId.filter((id) => id !== action.payload),
        ],
      };
    }
    case ProductsActionTypes.ADD_TO_CART: {
      return {
        ...state,
        cartProductsId: [...state.cartProductsId, action.payload],
      };
    }
    case ProductsActionTypes.DELETE_FROM_CART: {
      return {
        ...state,
        cartProductsId: [
          ...state.cartProductsId.filter((id) => id !== action.payload),
        ],
      };
    }
    default:
      return state;
  }
};

export default productsReducer;
