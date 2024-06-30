import { configureStore } from '@reduxjs/toolkit';
import credentialsSlise from './slices/credentialsSlise';
import selectedCarSlice from './slices/selectedCarSlice';
import selectedUserSlice from './slices/selectedUserSlice';
import carInfo from './slices/carInfo';
import carImageSlice from './slices/carImageSlice';
import carEquipment from './slices/carEquipment';
import carList from './slices/carList';
import searchId from './slices/searchId';

 const store = configureStore({
    reducer:{
        credentials: credentialsSlise,
        car:selectedCarSlice,
        user:selectedUserSlice,
        carInfo:carInfo,
        carEquipment:carEquipment,
        carImages:carImageSlice,
        carList:carList,
        searchId:searchId,
    }
});

export default store;