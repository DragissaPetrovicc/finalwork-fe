import PrivateRoute from '../../PrivateRoute';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { format, isValid } from 'date-fns';
import { ROUTES } from '../../routes';
import { useDispatch } from 'react-redux';
import { addCars } from '../../redux/slices/carList';
import {addSearchId} from '../../redux/slices/searchId';

const SavedSearches = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector((state) => state.credentials.items[1]);

    const [searches, setSearches] = useState([]);

    useEffect(() => {
        const fetchFavSearches = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axiosI.get(`/favoriteSearch/${id}`, { headers: { authorization: `Bearer ${token}` } });
                setSearches(data);
            } catch (e) {
                alert(e?.response?.data || 'Could not find you');
            }
        }
        fetchFavSearches();
    }, [id]);

    const handleDelete = async (searchId) =>{
        const token = localStorage.getItem('token');
        try {
            const { data } = await axiosI.delete(`/favoriteSearch/${id}`, {headers: { authorization: `Bearer ${token}` },data: { favSearch: searchId }});           
            alert(data);
            setSearches(prevSearches => prevSearches.filter(search => search._id !== searchId));
        }catch(e){
            alert(e?.response?.data || 'Could not find you');
        }
    };


    const navigateCarList = ({ carList, searchId }) => {
        dispatch(addSearchId(searchId));  
        dispatch(addCars(carList));       
        navigate(ROUTES.CAR_LIST);
    }
    

    const owner = searches.length > 0 ? searches[0].owner : null;

    return (
        <PrivateRoute>
            <div className="flex flex-col w-full h-full gap-8 overflow-auto">
                <span className='text-center font-bold text-2xl'>Favorite Searches</span>
                
                <div className="w-full h-full flex md:flex-row gap-6">
                    {owner && (
                        <div className="w-[20%] h-full flex flex-col box-border cursor-pointer">
                            <div className="flex flex-col gap-10 h-max p-4 border-2 border-black rounded-lg">
                                <span className="text-center text-lg font-bold">{!!owner.firstName ? 'USER' : 'CAR DEALER'}</span>
                                <div className="flex flex-row items-center justify-between h-min">
                                    <img className="rounded-full border-black border-2 shadow-md shadow-black w-20 h-20" src={owner.image} alt="" />
                                        <strong>{owner.username ? owner.username : owner.dealershipName}</strong>
                                </div>
                                <span><b>Location:</b> {owner.location.state}, {owner.location.city}</span>
                                <div className="flex flex-col gap-[3px]">
                                    <strong className="text-lg">Contact:</strong>
                                    <span className="mt-2"><b>Email:</b> {owner.email ? owner.email : owner.contact.email}</span>
                                    {!!owner.firstName && <span><b>First Name:</b> {owner.firstName}</span>}
                                    {!!owner.lastName && <span><b>Last Name:</b> {owner.lastName}</span>}
                                    <span><b>Phone Number:</b> {owner.phoneNumber ? owner.phoneNumber : owner.contact.phoneNumber}</span>
                                    <span><b>ID:</b> {id}</span>
                                    <span><b>Role:</b> {owner.role}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex-grow flex flex-col gap-6">
                        {searches.map((search, index) => {
                            const formattedDate = isValid(new Date(search.createdAt)) ? format(new Date(search.createdAt), 'dd-MM-yyyy') : 'Invalid date';
                            
                            return (

                                <div key={index} className='w-full h-min flex flex-col'>
                                    <Box component="section" sx={{ height:'min-content',p: 2, border: '2px solid black', borderRadius: "8px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <div className='flex flex-col justify-center gap-2'>
                                            <span className='text-lg'><b>Id:</b> {search._id}</span>
                                            <span className='text-lg'><b>Created at:</b> {formattedDate}</span>
                                        </div>
                                        <div className='flex flex-col justify-center gap-2'>
                                        <Button onClick={() => navigateCarList({ carList: search.carList, searchId: search._id })} variant='contained'>Visit saved car list</Button>
                                        <Button onClick={() => handleDelete(search._id)} variant='contained' color='error'>Delete this search</Button>
                                        </div>
                                    </Box>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}
export default SavedSearches;
