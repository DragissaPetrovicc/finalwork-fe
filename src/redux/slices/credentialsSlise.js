import { createSlice } from '@reduxjs/toolkit';

const credentials = createSlice({

    name:"credentials",
    initialState:{
        items:[]
    },
    reducers:{
        addEmail:(state,action) => ({
            ...state,
            items:[action.payload]
        }),
        addId:(state,action) => ({
            ...state,
            items:[...state.items,action.payload]
        }),
        removeCredentials:() => ({
            items:[]
        })
    }


});  

export const {addEmail,addId,removeCredentials} = credentials.actions;

export default credentials.reducer;