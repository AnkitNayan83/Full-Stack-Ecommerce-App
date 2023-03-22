import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      const index = state.products.findIndex(
        (prod) => prod._id === action.payload.id
      );
      if (index >= 0) {
        state.products.splice(index, 1);
        state.totalPrice -= action.payload.price * action.payload.quantity;
      } else {
        console.warn(
          `Item not found of id: ${action.payload.id} as it is no longer in the basket`
        );
      }
    },
    reset: (state) => {
      state.quantity = 0;
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
