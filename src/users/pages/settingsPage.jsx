import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import UniversalModal from '../../users/models/UniversalModal';
import PrivateRoute from '../../PrivateRoute';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';
import { ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';

const SettingsPage = ({children}) => {

  const navigate = useNavigate();
  const id = useSelector((state) => state.credentials.items[1]);
  const token = localStorage.getItem('token');
  const [changeUsername, setChangeUsername] = useState('');
  const [changeEmail, setChangeEmail] = useState('');
  const [changePassword, setChangePassword] = useState('');
  const [changeDealershipName,setChangeDealershipName] = useState('');
  const [changeState, setChangeState] = useState('');
  const [changeCity, setChangeCity] = useState('');
  const [changePhoneNumber, setChangePhoneNumber] = useState('');


  useEffect(() => {

    const fetchUser = async() =>{
      try{

        const {data} = await axiosI.get(`/car/carOwner/${id}`);
        setChangeUsername(!!data.username && data.username);
        setChangeEmail(data.email ? data.email : data.contact.email);
        setChangePhoneNumber(data.phoneNumber ? data.phoneNumber : data.contact.phoneNumber);
        setChangeDealershipName(!!data.dealershipName && data.dealershipName);
        setChangeCity(data.location.city);
        setChangeState(data.location.state);
        setChangePassword(data.password);
      }catch(e){
        alert(e?.response?.data || 'Could not fetch specified user');
      }
    }
    fetchUser();

  },[id]);

  
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChangeUsername = () => {
    setTitle('change username');
    handleOpenModal();
  };

  const handleYesChangeUsername = async () => {

    try{

      await axiosI.patch(`/user/${id}`,{username:changeUsername},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
  };

  const handleChangeDealershipName = () => {
    setTitle('dealership name');
    handleOpenModal();
  };

  const handleYesChangeDealershipName = async() => {

    try{

      await axiosI.patch(`/CarDealerUser/${id}`,{dealershipName:changeDealershipName},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleOpenChangePassword = () => {
    setTitle('change password');
    handleOpenModal();
  };

  const handleYesChangePassword = async() => {

    try{

      await axiosI.patch(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{password:changePassword},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleNo = () => {
    handleCloseModal();
  };

  const handleChangeCity = () => {
    setTitle('change location - city');
    handleOpenModal();
  };

  const handleYesChangeCity = async() => {

    try{

      await axiosI.patch(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{city:changeCity},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleChangeState = () => {
    setTitle('change location - state');
    handleOpenModal();
  };

  const handleYesChangeState = async() => {

    try{

      await axiosI.patch(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{state:changeState},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleDeleteAccount = () => {
    setTitle('delete this account');
    handleOpenModal();
  };

  const handleYesDeleteAccout = async() => {
    
    try{

      await axiosI.delete(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{ headers: { authorization: `Bearer ${token}` }});
     
      alert('Account deleted successfully');
      
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('img');

      navigate(ROUTES.LOG_IN);

    }catch(e){

    }

    handleCloseModal();
  };

  const handleChangeEmail = () => {
    setTitle('change email');
    handleOpenModal();
  };

  const handleYesChangeEmail = async() => {

    try{

      await axiosI.patch(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{email:changeEmail},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleChangePhoneNumber = () => {
    setTitle('change phone number');
    handleOpenModal();
  };

  const handleYesChangePhoneNumber = async() => {

    try{

      await axiosI.patch(`${!!changeUsername ? `/user/${id}`: `/CarDealerUser/${id}`}`,{phoneNumber:changePhoneNumber},{ headers: { authorization: `Bearer ${token}` }});
      alert('User updated successfully');
      handleCloseModal();
    }catch(e){
      console.log(e?.response?.data || 'Something went wrong');
    }
    
    handleCloseModal();
  };

  const handleYes = () => {
    if (title === 'change username') {
      handleYesChangeUsername();
    } else if (title === 'change password') {
      handleYesChangePassword();
    } else if (title === 'delete this account') {
      handleYesDeleteAccout();
    } else if (title === 'change email') {
      handleYesChangeEmail();
    } else if (title === 'dealership name'){
      handleYesChangeDealershipName();
    }else if (title === 'change location - city'){
      handleYesChangeCity();
    }else if(title === 'change location - state'){
      handleYesChangeState();
    }else if(title === 'change phone number'){
      handleYesChangePhoneNumber();
    }
  };

  
    return <PrivateRoute>
            <div className='flex flex-col w-full h-full self-center gap-8 overflow-auto justify-center items-center '>
        <span className='font-bold text-2xl'>Settings</span>
        
            {children}

                {!!changeUsername ? <Accordion className="!w-1/2 !mt-16">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change Username
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changeUsername}
                            onChange={(e) => setChangeUsername(e.target.value)}
                            label={"currentUsername"}
                            defaultValue={"currentUsername"}
                        />
                        <Button onClick={handleChangeUsername}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion> : 
                <Accordion className="!w-1/2 !mt-16">
                <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                    Change DealershipName
                </AccordionSummary>
                <AccordionDetails className="!flex flex-col gap-2 items-center">
                    <TextField className='!w-full'
                        value={changeDealershipName}
                        onChange={(e) => setChangeDealershipName(e.target.value)}
                        label={"currentUsername"}
                        defaultValue={"currentUsername"}
                    />
                    <Button onClick={handleChangeDealershipName}
                        variant="contained"
                        color="success"
                        sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                    >
                        Submit
                    </Button>
                </AccordionDetails>
            </Accordion>}
                <Accordion className="!w-1/2">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change Password
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changePassword}
                            onChange={(e) => setChangePassword(e.target.value)}
                            label="Change password"
                            variant="outlined"
                        />
                        <Button onClick={handleOpenChangePassword}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion>
                <Accordion className="!w-1/2">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change Email
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changeEmail}
                            onChange={(e) => setChangeEmail(e.target.value)}
                            label={"currentEmail"}
                            defaultValue={"currentEmail"}
                            variant="outlined"
                        />
                        <Button onClick={handleChangeEmail}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion className="!w-1/2">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change State
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changeState}
                            onChange={(e) => setChangeState(e.target.value)}
                            variant="outlined"
                        />
                        <Button onClick={handleChangeState}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion className="!w-1/2">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change City
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changeCity}
                            onChange={(e) => setChangeCity(e.target.value)}
                            variant="outlined"
                        />
                        <Button onClick={handleChangeCity}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion>

                <Accordion className="!w-1/2">
                    <AccordionSummary expandIcon={<ArrowRightIcon />} aria-controls="panel1-content">
                        Change Phone Number
                    </AccordionSummary>
                    <AccordionDetails className="!flex flex-col gap-2 items-center">
                        <TextField className='!w-full'
                            value={changePhoneNumber}
                            onChange={(e) => setChangePhoneNumber(e.target.value)}
                            variant="outlined"
                        />
                        <Button onClick={handleChangePhoneNumber}
                            variant="contained"
                            color="success"
                            sx={{ width: '30%', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}
                        >
                            Submit
                        </Button>
                    </AccordionDetails>
                </Accordion>

                <Button onClick={handleDeleteAccount} className='!w-[200px]'
                    variant="contained"
                    color="error"
                >
                    Delete account
                </Button>
            </div>

            <UniversalModal open={openModal} onClose={handleCloseModal} title={title} handleYes={handleYes} handleNo={handleNo} />
        </PrivateRoute>
}

export default SettingsPage;