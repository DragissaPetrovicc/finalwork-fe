import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: "user",
    initialState: {
        items: ""
    },
    reducers: {
        userId: (state, action) => {
            state.items = action.payload
        }
    }
});

export const { userId } = user.actions;

export default user.reducer;
