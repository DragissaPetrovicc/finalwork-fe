import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import {ROUTES} from './routes'

const NotFoundPage = () => {

    const navigate = useNavigate();

    return <div className="w-full h-full flex gap-4 justify-center items-center flex-col">
        <HeartBrokenIcon className='!w-28 !h-28 !text-red-600'/>

        <span className='text-lg font-bold flex flex-col items-center'><b className='text-2xl text-red-500'>404 </b> Page not found</span>

        <div className='flex flex-row gap-3 items-center'>
            <Button onClick={() => navigate(-1)} variant='contained' color='primary'>
                Back <ArrowBackIcon />
            </Button> 
            <Button onClick={() => navigate(ROUTES.HOME)} variant='contained' color='success'>
                Home <HomeIcon />
            </Button> 
        </div>
         
    </div>
    
}

export default NotFoundPage;