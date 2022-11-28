import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './features/productsSlice';
import cartSlice from './features/cartSlice';
import userSlice from './features/userSlice';
 
export default configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        user: userSlice
    }
});