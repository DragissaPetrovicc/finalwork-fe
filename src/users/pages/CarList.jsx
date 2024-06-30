import { CardContent, Card } from '@mui/material';
import PrivateRoute from '../../PrivateRoute';
import { ROUTES } from '../../routes';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axiosI from '../../Axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { carId } from '../../redux/slices/selectedCarSlice';

const CarList = () => {

    const dispatch = useDispatch();

    const searchId = useSelector((state) => state.searchId.items);
    const [carList, setCarList] = useState([]);

    useEffect(() => {
        const fetchCarList = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axiosI.get(`/favoriteSearch/carList/${searchId}`, { headers: { authorization: `Bearer ${token}` } });
                console.log(data);
                setCarList(data);
            } catch (e) {
                alert(e?.response?.data || 'Could not fetch car list');
            }
        }
        fetchCarList();
    }, [searchId]);

    const navigate = useNavigate();

    const navigateToCarDetails = (id) => {
        dispatch(carId(id));
        navigate(ROUTES.CAR_DETAILS);
    }

    return (
        <PrivateRoute>
            <div className="flex flex-col w-full h-full gap-10 overflow-auto">
                <span className='text-center text-2xl'><b>Saved search:</b> {searchId}</span>
                <span className='font-bold text-left text-xl'>Car list</span>
                <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {carList.map(car => (
                        <Card 
                            key={car._id} 
                            className='!cursor-pointer' 
                            sx={{ width: '100%', height: 'max-content', paddingTop: '0.7rem' }}
                            onClick={() => navigateToCarDetails(car._id)}
                        >
                            <CardContent sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>
                                <img 
                                    className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105' 
                                    src={car.images[0]} 
                                    alt='' 
                                />
                                <span className='font-bold'>{car.manufactorer} {car.model}</span>
                                <span className='font-semibold'>{car.price} KM</span>
                                <div className='w-full h-fit flex flex-col'>
                                    <div className='w-1/2 grid grid-cols-2 whitespace-nowrap'>
                                        <span><b>Year: </b>{car.year}</span>
                                        <span><b>Mileage: </b>{car.mileage}</span>
                                        <span><b>Fuel: </b>{car.fuel}</span>
                                        <span><b>Condition: </b>{car.mileage < 5001 ? 'NEW' : 'USED'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </PrivateRoute>
    );
}
export default CarList;
