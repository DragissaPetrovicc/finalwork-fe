import { CardContent, CardActions, Fab, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import UniversalModal from '../../users/models/UniversalModal';
import React, { useState, useEffect } from 'react';
import axiosI from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { carId } from '../../redux/slices/selectedCarSlice';

const Cars = ({ searchQuery }) => {
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await axiosI.get('/car/getCars');
                setLoading(true);
                setCars(data);
            } catch (e) {
                alert(e?.response?.data || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        getCars();
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [title, setTitle] = useState('');
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false); 
    const token = localStorage.getItem('token');

    const handleOpenDelete = () => {
        setTitle('delete this car');
        handleOpenModal();
    };

    const handleYesDelete = async (carId) => {
        try {
            const { data } = await axiosI.delete(`/admin/car/delete/${carId}`, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        } finally {
            handleCloseModal();
        }
    };

    const handleOpenSetAsSold = () => {
        setTitle('set this car as sold');
        handleOpenModal();
    };

    const handleYesSetAsSold = async (carId) => {
        const status = "SOLD";
        try {
            const { data } = await axiosI.patch(`/admin/car/edit/${carId}`, { status }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        } finally {
            handleCloseModal();
        }      
    };

    const handleNo = () => {
        handleCloseModal(); 
    };

    const handleYes = (carId) => {
        if (title === 'delete this car') {
            handleYesDelete(carId);
        } else if (title === 'set this car as sold') {
            handleYesSetAsSold(carId);
        } 
    };

    const handleEdit = (idCar) => {
        dispatch(carId(idCar));
        navigate(ROUTES.EDIT_CAR);
    };

    const handleDetails = (idCar) => {
        dispatch(carId(idCar));
        navigate(ROUTES.CAR_DETAILS);
    };

    const role = localStorage.getItem('role');

    const filteredCars = searchQuery 
        ? cars.filter(car => car.manufactorer.toLowerCase().includes(searchQuery.toLowerCase()) || car.model.toLowerCase().includes(searchQuery.toLowerCase()))
        : cars;

    return (
        <>
            {loading ? <CircularProgress /> : (
                filteredCars.length > 0 ? (
                    filteredCars.map(car => (
                        <Card key={car._id} className='!cursor-pointer' sx={{ width: '100%', height: 'max-content', paddingTop: '0.7rem' }}>
                            <CardContent onClick={() => handleDetails(car._id)} sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>
                                <img className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105' src={car.images[0]} alt="" />
                                <span className='font-bold'>{car.manufactorer} {car.model}</span>
                                <span className='font-semibold'>{car.price}</span>
                                <div className='w-full h-fit flex flex-col'>
                                    <div className='w-1/2 grid grid-cols-2'>
                                        <span className='!whitespaces-nowrap'><b>Year:</b>{car.year}</span>
                                        <span className='!whitespaces-nowrap'><b>Mileage:</b>{car.mileage}</span>
                                        <span className='!whitespaces-nowrap'><b>Fuel:</b>{car.fuel}</span>
                                        <span className='!whitespaces-nowrap'><b>Stanje:</b>{car.mileage < 5001 ? 'NEW' : 'USED'}</span>
                                    </div>
                                </div>
                            </CardContent>
                            {role === 'ADMIN' && (
                                <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <div className='flex flex-row gap-2 items-center justify-center'>
                                        <Fab onClick={handleOpenDelete} className='!h-[40px]' variant="contained" color="error"><DeleteIcon /></Fab>
                                        <Fab onClick={() => handleEdit(car._id)} className='!h-[40px]' variant="contained" color="primary"><ModeEditIcon /></Fab>
                                    </div>
                                    {car.status === 'SOLD' ? (
                                        <span className='text-lg font-bold text-green-500'>SOLD</span>
                                    ) : (
                                        <Button onClick={handleOpenSetAsSold} color='secondary' variant='contained'>Set as sold</Button>
                                    )}
                                </CardActions>
                            )}
                            <UniversalModal open={openModal} handleNo={handleNo} handleYes={() => handleYes(car._id)} title={title} onClose={handleCloseModal} />
                        </Card>
                    ))
                ) : (
                    <span className='font-bold text-xl'>No cars available at the moment!</span>
                )
            )}
        </>
    );
};

export default Cars;
