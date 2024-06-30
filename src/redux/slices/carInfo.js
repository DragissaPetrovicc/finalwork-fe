import { createSlice } from '@reduxjs/toolkit';

const carInfo = createSlice({
    name: "carInfo",
    initialState: {
        items: {}
    },
    reducers: {
        addInfo: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { addInfo } = carInfo.actions;

export default carInfo.reducer;
