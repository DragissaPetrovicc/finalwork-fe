import { createSlice } from '@reduxjs/toolkit';

const carImages = createSlice({
    name: "carImages",
    initialState: {
        items: {}
    },
    reducers: {
        addImages: (state, action) => {
            state.items = action.payload
        }
    }
});

export const { addImages } = carImages.actions;

export default carImages.reducer;
