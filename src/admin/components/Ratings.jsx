import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import './ratings.css';
import axiosI from '../../Axios';
import {format,isValid} from 'date-fns';

const Ratings = () => {
    const [ratings,setRatings] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {

        const fetchRatings = async() =>{

            try{
                const {data} = await axiosI.get('/admin/getRatings',{headers:{authorization:`Bearer ${token}`}});
                setRatings(data);
                console.log(data);
            }catch(e){
                alert(e?.response?.data || 'Something went wrong');
            }
        }
        fetchRatings();

    },[token]);

    return (
        <div className='flex flex-col w-full gap-2 p-2'>
            <span className='text-xl text-center font-bold'>Application ratings</span>
            <div className='slider-container'>
                <div
                    className='slider-track'
                    style={{ '--item-count': ratings.length }}
                >
                    {ratings.map((rating) => (
                        <div key={rating._id} className='slider-item'>
                            <span className='text-lg'>
                                User: <b>{rating.ratedBy?.username ? rating.ratedBy?.username : rating.ratedBy?.dealershipName }</b>
                            </span>
                            <b className='text-lg'>
                                Rated your application with {rating.stars} <StarIcon sx={{color: "orange"}} />
                            </b>
                            {isValid(new Date(rating.ratedAt)) ? format(new Date(rating.ratedAt), 'dd-MM-yyyy') : 'Invalid date'}
                            </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ratings;
