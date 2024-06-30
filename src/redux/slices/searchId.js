import { createSlice } from '@reduxjs/toolkit';

const searchIdSlice = createSlice({
    name: "searchId",
    initialState: {
        items: ''
    },
    reducers: {
        addSearchId: (state, action) => ({
            ...state,
            items: action.payload // Ispravljeno ažuriranje stanja za searchId
        })
    }
});

export const { addSearchId } = searchIdSlice.actions;

export default searchIdSlice.reducer;
