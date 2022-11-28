import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLoggedInUser = createAsyncThunk(
    'users/fetchLoggedInUser',
    async () => {
        const response = await fetch('http://localhost:4000/profile', {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
        },
        isLoadingUser: true,
        failedToLoadUser: false,
        isLoggedIn: false
    },
    reducers: {
    },   
    extraReducers: (builder) => {
        builder.addCase(fetchLoggedInUser.pending, (state) => {
            state.isLoadingUser = true;
            state.failedToLoadUser = false;
            state.isLoggedIn = false;
        });

        builder.addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            state.isLoadingUser = false;
            state.failedToLoadUser = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        });

        builder.addCase(fetchLoggedInUser.rejected, (state) => {
            state.isLoadingUser = false;
            state.failedToLoadUser = true;
            state.isLoggedIn = false;
        });
    }
});

export const selectUser = state => state.user.user;
export const selectIsLoadingUser = state => state.user.isLoadingUser;
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const { signIn } = userSlice.actions;
export default userSlice.reducer;
