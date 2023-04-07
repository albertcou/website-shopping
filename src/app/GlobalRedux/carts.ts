import { Cart, cartItems } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState: Cart = {
  cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')!) : { cartItems: [] },
};

export const Carts = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_ADD_ITEM: (state, action: PayloadAction<cartItems>) => {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    },
    CART_REMOVE_ITEM: (state, action: PayloadAction<cartItems>) => {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    },
  },
});

export const { CART_ADD_ITEM, CART_REMOVE_ITEM } = Carts.actions;

export default Carts.reducer;
