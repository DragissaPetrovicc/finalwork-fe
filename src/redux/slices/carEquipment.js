import { createSlice } from '@reduxjs/toolkit';

const carEquipment = createSlice({
    name: "carEquipment",
    initialState: {
        items: {}
    },
    reducers: {
        addEquipment: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { addEquipment } = carEquipment.actions;

export default carEquipment.reducer;
