import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { CardContent, CardActions, Fab, Card } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import PrivateRoute from '../../PrivateRoute';
import RepCar from '../../guest/modals/ReportCarModal';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { carId } from '../../redux/slices/selectedCarSlice';

const SavedArticles = () => {

    const dispatch = useDispatch();
    const id = useSelector((state) => state.credentials.items[1]);
    const [openRepCar, setOpenRepCar] = useState(false);
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [owner, setOwner] = useState({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFavoriteCars = async () => {
            try {
                const { data } = await axiosI.get(`/favoriteCar/${id}`, {
                    headers: { authorization: `Bearer ${token}` }
                });
                setCars(data.map(cars => cars.car)); 
                setOwner(data[0]?.owner || {}); 
            } catch (e) {
                alert(e?.response?.data || 'Something went wrong');
            }
        };
        fetchFavoriteCars();
    }, [id, token]);

    const handleOpenRepCar = () => setOpenRepCar(true);
    const handleCloseRepCar = () => setOpenRepCar(false);

    const handleCarDetails = (idCar) => {
        dispatch(carId(idCar));
        navigate(ROUTES.CAR_DETAILS);
    }

    return (
        <PrivateRoute>
            <div className="flex flex-col w-full h-full gap-8 overflow-auto">
                <span className='text-center font-bold text-2xl'>Favorite Articles</span>
                <div className="w-full h-full flex flex-col md:flex-row gap-6">
                    <div className="w-[20%] h-full flex justify-center sticky flex-col box-border cursor-pointer">
                        <div className="flex flex-col gap-10 h-max p-4 border-2 border-black rounded-lg">
                            <span className="text-center text-lg font-bold">{owner?.firstName ? 'User' : 'Car Dealer'}</span>
                            <div className="flex flex-row justify-between items-center h-min">
                                <img className="rounded-full border-black border-2 shadow-md shadow-black w-20 h-20" src={owner?.image} alt="" />
                                <div className="flex flex-col h-fit items-center">
                                    <strong>{owner?.username || owner?.dealershipName}</strong>
                                    {!!owner?.verification ? <VerifiedIcon /> : <VerifiedOutlinedIcon />}
                                </div>
                            </div>
                            <span className='whitespaces-nowrap'><b>Location:</b> {owner?.location?.state}, {owner?.location?.city}</span>
                            <div className="flex flex-col gap-[3px]">
                                <strong className="text-lg">Contact:</strong>
                                <span className="mt-2 whitespace-nowrap"><b>Email:</b> {owner?.email || owner?.contact?.email}</span>
                                {owner?.firstName && <span className='whitespaces-nowrap'><b>First Name:</b> {owner.firstName}</span>}
                                {owner?.lastName && <span className='whitespaces-nowrap'><b>Last Name:</b> {owner.lastName}</span>}
                                <span className='whitespaces-nowrap'><b>Phone Number:</b> {owner?.phoneNumber || owner?.contact?.phoneNumber}</span>
                                <span className='whitespaces-nowrap'><b>ID:</b> {id}</span>
                                <span><b>Role:</b> {owner?.role}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-grow grid grid-cols-2 md:grid-cols-3 pt-8 gap-3'>
                        {cars && cars.length > 0 ? (
                            cars.map(car => (
                                <Card key={car._id} onClick={() => handleCarDetails(car._id)} className='!cursor-pointer' sx={{ width: '100%', height: 'max-content', paddingTop: '0.7rem' }}>
                                    <CardContent sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>
                                        <img className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105' src={car.images} alt="" />
                                        <span className='font-bold'>{car.manufactorer} {car.model}</span>
                                        <span className='font-semibold'><b>Price: </b>{car.price}</span>
                                        <div className='w-full h-fit flex flex-col'>
                                            <div className='w-1/2 grid grid-cols-2'>
                                                <span className='!whitespaces-nowrap'><b>Year: </b>{car.year}</span>
                                                <span className='!whitespaces-nowrap'><b>Mileage:</b>{car.mileage}</span>
                                                <span className='!whitespaces-nowrap'><b>Fuel: </b>{car.fuel}</span>
                                                <span className='!whitespaces-nowrap'><b>Condition:</b>{car.mileage < 5001 ? 'NEW' : 'USED'}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Fab onClick={handleOpenRepCar} className='!h-[40px]' variant="contained" color="error">
                                            <ReportIcon />
                                        </Fab>
                                    </CardActions>
                                    <RepCar open={openRepCar} onClose={handleCloseRepCar} carId={car._id} />
                                </Card>
                            ))
                        ) : (
                            <span className='font-bold text-lg text-center'>No favorite cars available</span>
                        )}
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
};

export default SavedArticles;
