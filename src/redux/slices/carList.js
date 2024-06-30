import { createSlice } from '@reduxjs/toolkit';

const carListSlice = createSlice({
    name: "carList",
    initialState: {
        items: []
    },
    reducers: {
        addCars: (state, action) => ({
            ...state,
            items: [...state.items, action.payload]
        })
    }
});

export const { addCars } = carListSlice.actions;

export default carListSlice.reducer;
