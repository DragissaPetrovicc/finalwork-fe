import { createSlice } from '@reduxjs/toolkit';

const car = createSlice({
    name: "car",
    initialState: {
        items: ""
    },
    reducers: {
        carId: (state, action) => {
            state.items = action.payload
        }
    }
});

export const { carId } = car.actions;

export default car.reducer;
