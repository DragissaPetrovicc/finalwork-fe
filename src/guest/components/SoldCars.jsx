import { CardContent,CardActions,Fab } from '@mui/material';
import Card from '@mui/material/Card';
import ReportIcon from '@mui/icons-material/Report';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RepCar from "../modals/ReportCarModal";
import React,{useState,useEffect} from 'react';
import axiosI from '../../Axios';
import { useSelector } from 'react-redux';

const SoldCars = ({userId}) => {

    const [cars,setCars] = useState([]);
    const [openRepCar,setOpenRepCar] = useState(false);
    const handleOpenRepCar = () => setOpenRepCar(true);
    const handleCloseRepCar = () => setOpenRepCar(false);

      useEffect(()=>{

        const fetchCars = async() =>{
            try{
                const {data} = await axiosI.get(`/car/getCars/${userId}`);
                setCars(data);
            }catch(e){
                alert(e?.response?.data || 'Something went wrong');
            }

        }
        fetchCars();

      },[userId]);

      const id = useSelector(state => state.credentials.items[1]);

      const addToFavArticles = async (carId) => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await axiosI.post(`/favoriteCar/${id}`, { carId }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        }
    }

      
    return <>
    
    {cars && cars.map(car => car.status === 'SOLD' ? (
                <Card key={car._id} className='!cursor-pointer' sx={{ width: '100%', height: 'max-content', margin: 0 }} >
                    <CardContent sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>
                        <img className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105'
                            src={car.images} alt="" />
                        <span className='font-bold'>{car.manufactorer} {car.model}</span>
                        <span className='font-semibold'>{car.price}</span>
                        <div className='w-full h-fit flex flex-col'>
                            <div className='w-1/2 grid grid-cols-2'>
                                <span>{car.year}</span>
                                <span>{car.mileage}</span>
                                <span>{car.fuel}</span>
                                <span>{car.mileage < 5001 ? 'NEW' : 'USED'}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <Fab onClick={handleOpenRepCar} className='!h-[40px]' variant="contained" color="error">
                            <ReportIcon />
                        </Fab>
                        <span className='text-red-500 font-bold'>SOLD</span>
                        <Checkbox onClick={() => addToFavArticles(car._id)} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                    </CardActions>
                    <RepCar open={openRepCar} onClose={handleCloseRepCar} carId={car._id}/>
                </Card>
            ) : (
                <span className='font-bold text-lg'>No sold car available</span>
            ))}
</>
}
 
export default SoldCars;