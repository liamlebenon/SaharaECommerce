import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: {},
        totalItems: 0
    },
    reducers: {
        addToCart: (state, action) => {
            console.log(action);
            if (state.cart[action.payload.name]) {
                state.cart[action.payload.name].qty += 1;
            } else {
               state.cart[action.payload.name] = action.payload; 
            }
            state.totalItems++;
        },

        removeItemFromCart: (state, action) => {
            // Remove 1 qty
            state.cart[action.payload.name].qty -= 1;
            state.totalItems--;
            // If there qty is less than 1 remove the item from the cart completely
            if (state.cart[action.payload.name].qty < 1) {
                delete state.cart[action.payload.name];
            } 
        },

        clearCart: (state) => {
            state.cart = {};
            state.totalItems = 0;
        }
    }
});

export const selectCart = state => state.cart.cart;
export const selectTotalItems = state => state.cart.totalItems;
export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
