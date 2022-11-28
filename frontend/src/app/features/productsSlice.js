const { createAsyncThunk, createSlice } = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('http://localhost:4000/products');
        const data = await response.json();
        console.log(data)
        return data;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: {},
        isLoadingProducts: true,
        failedToLoadProducts: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoadingProducts = true;
            state.failedToLoadProducts = false;
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoadingProducts = false;
            state.failedToLoadProducts = false;
            state.products = action.payload;
        });

        builder.addCase(fetchProducts.rejected, (state) => {
            state.isLoadingProducts = false;
            state.failedToLoadProducts = true;
        });
    }
});

export const selectProducts = state => state.products.products;
export const selectIsLoadingProducts = state => state.products.isLoadingProducts;
export const { loadProducts } = productsSlice.actions;
export default productsSlice.reducer;