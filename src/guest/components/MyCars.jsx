import { CardContent, CardActions, Button, Fab } from '@mui/material';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UniversalModal from '../../users/models/UniversalModal'; 
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import axiosI from '../../Axios';
import { carId } from '../../redux/slices/selectedCarSlice';

const MyCars = ({img,manufactorer,model,year,id,price,mileage,fuel,status,onClick}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [title,setTitle] = useState('');
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false); 

    const handleOnclick = () =>{
        onClick();
    }

    const handleOpenDelete = () => {
        setTitle('Delete this car');
        handleOpenModal();
    };


    const handleYesDelete = async () => {
        const carId = id;
        const token = localStorage.getItem('token');
        try{
            const { data } = await axiosI.delete(`/cars/deleteCar/${carId}`, { headers: { authorization: `Bearer ${token}` } });
            navigate(ROUTES.HOME);
            alert(data);
        }catch(e){
            alert(e?.response?.data || "Something went wrong");
        }
        handleCloseModal();
    }


    const handleOpenSetAsSold = () => {
        setTitle('Set this car as sold');
        handleOpenModal();
    }

    const handleYesSetAsSold = async () => {
        const carId = id;
        const status = "SOLD";
        const token = localStorage.getItem('token');
        try{
            const { data } = await axiosI.patch(`/cars/edit/${carId}`,{ status }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        }catch(e){
            alert(e?.response?.data || "Something went wrong");

        }      
        handleCloseModal();
    }

    const handleNo = () => {
        handleCloseModal(); 
    };

    const handleYes = () => {
        if (title === 'delete this car') {
            handleYesDelete();
        } else if (title === 'set this car as sold') {
            handleYesSetAsSold();
        } 
    };

    const navigateEditCar = (id) => {
        dispatch(carId(id)); 
        navigate(ROUTES.EDIT_CAR);
    }

    return (
         <Card className='!cursor-pointer' sx={{ width: '100%', height: 'max-content', paddingTop: '0.7rem' }}>
            <CardContent sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>
                <img className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105' src={img[0]} alt="" />
                <span className='font-bold uppercase'>{manufactorer} {model}</span>
                <span className='font-semibold'>{price} KM</span>
                <div className='w-full h-fit flex flex-col'>
                    <div className='w-1/2 grid grid-cols-2'>
                        <span><b>Year:</b> {year}</span>
                        <span><b>Mileage:</b>{mileage}</span>
                        <span><b>Fuel:</b> {fuel}</span>
                        <span><b>Status:</b>{status}</span>
                    </div>
                </div>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div className='flex flex-row gap-2'>
                    <Fab onClick={handleOpenDelete} className='!h-[35px]' variant="contained" color="error"><DeleteIcon /></Fab>
                    {status === 'ACTIVE' && <Fab onClick={() => navigateEditCar(id)} className='!h-[35px]' variant="contained" color="secondary"><EditIcon /></Fab>}
                </div>                 
                
                <Button onClick={handleOnclick} variant='contained'>Details</Button>

                {status === 'ACTIVE' && <Button onClick={handleOpenSetAsSold} variant="contained" color="success">Set as sold</Button>}  
      </CardActions>
            <UniversalModal open={openModal} handleNo={handleNo} handleYes={handleYes} title={title} onClose={handleCloseModal} />
        </Card>
    );
}

export default MyCars;
