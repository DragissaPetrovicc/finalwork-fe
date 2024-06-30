import PrivateRoute from '../../PrivateRoute';
import React from "react";
import AddCarStepper from '../components/AddCarStepper';

const AddCar = () => {

    

    return <PrivateRoute>
        <div className='w-full h-full flex flex-col gap-6'>

            <span className='text-center font-bold text-2xl'>Add Car</span>
            <AddCarStepper/>
           
        </div>

    </PrivateRoute>

}
export default AddCar;