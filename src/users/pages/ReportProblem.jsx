import PrivateRoute from '../../PrivateRoute';
import axiosI from '../../Axios';
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import SendIcon from '@mui/icons-material/Send';
import {useNavigate} from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useSelector } from 'react-redux';

const ReportProblem = () =>{

    const userId = useSelector((state) => state.credentials.items[1]);

        const [problem, setProblem] = useState('');
    
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        };

        const navigate = useNavigate();

    
    const ContactNav = () =>{
        navigate(ROUTES.HELP_CENTER);
    }

    const PrivSec = () =>{
        navigate(ROUTES.PRIVACY_AND_SECURITY);
    }
    const HomeNav = () =>{
        navigate(ROUTES.HOME);
    }

    const AddCarNav = () =>{
        navigate(ROUTES.ADD_CAR);
    }

    const sendProblem = async() => {
        const token = localStorage.getItem('token');
        try{
            const {data} = await axiosI.post(`/reportProblem/repProblem/${userId}`,{problem}, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        }catch(e){
            alert(e?.response?.data || 'Somehting went wrong');
        }

    }
    
    return <PrivateRoute>
    

        <div className="flex flex-col w-full h-full justify-center items-center p-4 gap-12">

        <span className="text-3xl font-bold text-center">Report problem</span>

        <div className="flex flex-col w-full gap-2 items-start jutsify-start">

            <span className="text-xl font-bold text-start">Hi,what kind of problem you have?</span>
            <TextField
                    sx={{ width: '100%' }}
                    label="Write your problem here"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (
                            <Button type='submit' onClick={sendProblem} sx={{ color: '#d946ef', minWidth: 'auto' }}>
                                <SendIcon />
                            </Button>
                        )
                    }}
                />        </div>
        <div className="flex flex-col gap-2 w-full text-lg">

                <span onClick={ContactNav} className="font-bold cursor-pointer">Contact</span>
                <span onClick={ContactNav} className="font-bold cursor-pointer">Help Center</span>
                <span onClick={PrivSec} className="font-bold cursor-pointer">Privacy and Security</span>
                <span onClick={HomeNav} className="font-bold cursor-pointer">Home</span>
                <span onClick={AddCarNav} className="font-bold cursor-pointer">Add Car</span>
                <span onClick={() => navigate(ROUTES.MY_PROFILE)} className="font-bold cursor-pointer">My profile</span>
                <span onClick={() => navigate(ROUTES.SETTINGS)} className="font-bold cursor-pointer">Settings</span>
                <span onClick={() => navigate(ROUTES.SAVED_ARTICLES)} className="font-bold cursor-pointer">Favorite Articles</span>
                <span onClick={() => navigate(ROUTES.SAVED_SEARCHES)} className="font-bold cursor-pointer">Favorite Searches</span>

        </div>

        <ButtonGroup variant="text" size='large'>
                <Button sx={{width:"55px",height:"55px"}} size='large' href="https://www.instagram.com/" target="_blank" ><InstagramIcon sx={{width:"100%",height:"100%"}}/></Button>
                <Button sx={{width:"55px",height:"55px"}} size='large' href="https://www.facebook.com/" target="_blank" ><FacebookIcon sx={{width:"100%",height:"100%"}} /></Button>
                <Button sx={{width:"55px",height:"55px"}} size='large' href="https://www.linkedin.com/" target="_blank" ><LinkedInIcon  sx={{width:"100%",height:"100%"}}/></Button>
            </ButtonGroup>
            
        </div>

    </PrivateRoute>
}

export default ReportProblem;