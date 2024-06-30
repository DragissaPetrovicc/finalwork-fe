import { CardContent,CardActions,Fab } from '@mui/material';
import Card from '@mui/material/Card';
import ReportIcon from '@mui/icons-material/Report';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RepCar from "../modals/ReportCarModal";
import {useNavigate} from "react-router-dom";
import React,{useState,useEffect} from 'react';
import {ROUTES} from '../../routes';

const AllCars = ({carId,img,manufactorer,model,year,condition,price,mileage,fuel,onFavorite,onClick}) => {

    const [loggedIn,setLoggedIn] = useState(false);

    
    useEffect(() => {

        const loggedUser = localStorage.getItem("token");
        if(loggedUser){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
      }, []);
    
      const navigate = useNavigate();

      const addToFavCars = () => {
        if (!loggedIn) {
            navigate(ROUTES.LOG_IN)
        } else {
            onFavorite();
        }
    }

    const handleOnclick = () =>{
        onClick();
    }
    
    const [openRepCar,setOpenRepCar] = useState(false);
    const handleOpenRepCar = () => setOpenRepCar(true);
    const handleCloseRepCar = () => setOpenRepCar(false);

    return ( 
        <Card className='!cursor-pointer' sx={{ width: '100%', minHeight: '400px',height:'max-content', paddingTop: '0.7rem' }} >

            <CardContent onClick={handleOnclick}  sx={{ gap: '2px', display: 'flex', flexDirection: 'column' }}>

                <img className='w-full h-[200px] rounded-lg border-2 border-black transition-transform duration-300 hover:scale-105'src={img[0]} alt="" />

                <span className='font-bold uppercase'>{manufactorer} {model}</span>
                    <span className='font-semibold'>{price} KM</span>
                <div className='w-full h-fit flex flex-col'>
                    <div className='w-1/2 grid grid-cols-2'>

                        <span><b>Year:</b>{year}</span>
                        <span><b>Mileage:</b>{mileage}</span>
                        <span><b>Fuel:</b>{fuel}</span>
                        <span><b>Condition:</b>{condition}</span>

                    </div>
                </div>
            </CardContent>
            <CardActions sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

                <Fab onClick={handleOpenRepCar} className='!h-[40px]' variant="contained" color="error"><ReportIcon/></Fab>
                <Checkbox onClick={addToFavCars} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}}/>} />
      
            </CardActions>
            <RepCar open={openRepCar} carId={carId} onClose={handleCloseRepCar}/>

    </Card>
    )
    

}
 
export default AllCars;