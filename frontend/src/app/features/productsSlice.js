const { createAsyncThunk, createSlice, current } = require('@reduxjs/toolkit');

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
        searchTerm: '',
        filteredProducts: {},
        isLoadingProducts: true,
        failedToLoadProducts: false
    },
    reducers: {
        fetchFilteredProducts: (state, action) => {
            state.filteredProducts = current(state.products).filter(product => product.name.toLowerCase().includes(action.payload.toLowerCase()));
            console.log(state.filteredProducts)
        },

        setSearchTerm: (state, action) => {
            console.log(action.payload)
            state.searchTerm = action.payload;
        }
    },

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
export const selectSearchTerm = state => state.products.searchTerm;
export const { loadProducts, fetchFilteredProducts, setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;