import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
  cartList: [],
  total: 0,
};

// Load cart data from localStorage if available
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { cartList: [], total: 0 };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.cartList.find((item) => item.id === action.payload.id);
      if (existingProduct) {
        // If product already in cart, increase the quantity (max 10)
        if (existingProduct.quantity < 10) {
          return {
            ...state,
            cartList: state.cartList.map((item) =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return state;
      } else {
        // If product not in cart, add it with quantity 1
        return {
          ...state,
          cartList: [...state.cartList, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartList: state.cartList.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'CHANGE_QUANTITY': {
      const { id, type } = action.payload;
      return {
        ...state,
        cartList: state.cartList.map((item) => {
          if (item.id === id) {
            let newQuantity = item.quantity;
            if (type === 'increase' && newQuantity < 10) {
              newQuantity++;
            } else if (type === 'decrease' && newQuantity > 1) {
              newQuantity--;
            }
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      };
    }

    case 'UPDATE_TOTAL': {
      const total = state.cartList.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...state, total };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state.cartList]); // Update localStorage whenever the cart changes

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    updateTotal();
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    updateTotal();
  };

  const changeQuantity = (id, type) => {
    dispatch({ type: 'CHANGE_QUANTITY', payload: { id, type } });
    updateTotal();
  };

  const updateTotal = () => {
    dispatch({ type: 'UPDATE_TOTAL' });
  };

  return (
    <CartContext.Provider
      value={{
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        changeQuantity,
        updateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
