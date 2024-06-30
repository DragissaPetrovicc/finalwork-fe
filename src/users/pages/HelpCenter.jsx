import PrivateRoute from '../../PrivateRoute';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const HelpCenter = () => {

    const [show,setShow] = useState(false);

    const handleRepProblem = () => {
        navigate(ROUTES.REPORT_PROBLEM);
    }
    const navigate = useNavigate();


    const handlePrivSec = () => {
        navigate(ROUTES.PRIVACY_AND_SECURITY);
    }

    const handleMyProfile = () => {
        navigate(ROUTES.MY_PROFILE);
    }

    const showPhoneNumber = () => {
        setShow(true);
    }
    
    return <PrivateRoute>
<div className="flex flex-col w-full h-max p-4 justify-center items-center gap-10">

<span className="text-2xl font-bold text-center">Help Center</span>

<div className="flex flex-col w-full gap-2 items-start jutsify-start">

    <span className="text-lg font-bold text-start">Hi,how can we help you?</span>

    <div className='flex flex-row w-full h-max justify-center gap-5 items-center'>

        <div onClick={handleRepProblem} className='cursor-pointer w-1/6 h-full border-2 border-gray-300 rounded-lg p-3 flex flex-row items-center justify-center font-lg font-bold bg-transparent hover:bg-gray-300'>
            Report problem
            <OpenInNewIcon/>
        </div>

        <div onClick={handlePrivSec} className='cursor-pointer w-1/5 h-full border-2 border-gray-300 rounded-lg p-3 flex flex-row items-center justify-center font-lg font-bold bg-transparent hover:bg-gray-300'>
            Privacy and security
            <OpenInNewIcon/>
        </div>

        <div onClick={handleMyProfile} className='cursor-pointer w-1/6 h-full border-2 border-gray-300 rounded-lg p-3 flex flex-row items-center justify-center font-lg font-bold bg-transparent hover:bg-gray-300'>
            My profile
            <OpenInNewIcon/>
        </div>

    </div>    

</div>

<div className="bg-blue-200 flex flex-col gap-2 p-5 justify-center rounded-lg items-center">
    <span className="font-bold text-lg">NOTE!</span>
    <span className="text-sm font-semibold text-center">Do not share personal informations, do not open suspicious links, and communicate via personal E-mail only</span>
</div>

<span className="text-2xl font-bold text-gray-400"> OR </span>

<ButtonGroup sx={{ width: '100%' }} orientation="vertical" aria-label="Vertical button group">
    <Button sx={{ justifyContent: 'space-between', bgcolor: '#d946ef', color: 'white', fontWeight: 'bolder', '&:hover': { bgcolor: '#d946ef' } }}>Contact Us <ArrowDropDownIcon /></Button>
    <Button href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSGLdlpXWZmfwTmrXXbGCPZzhbWtSfZkvXthLqdQShCrDZlDfSqBrplZpnmrnLsLrcBGGDfj"target="_blank" sx={{ justifyContent: 'space-between', bgcolor: 'lightgray', color: 'black', fontWeight: 'bolder' }}>Send Email <EmailIcon /></Button>
    <Button onClick={showPhoneNumber}
        sx={{ justifyContent: 'space-between', bgcolor: 'lightgray', color: 'black', fontWeight: 'bolder' }}>+387 65 079 865 <PhoneForwardedIcon /></Button>
    
    {show && <Alert onClick={() => setShow(false)} sx={{width:"30%",display:"flex",justifyContent:"center",alignSelf:"center",cursor:"pointer"}} variant="filled" severity="info">Call this number for more info: <b>+387 65 079 865 </b></Alert>}
</ButtonGroup>
</div>    

</PrivateRoute>

}
export default HelpCenter;