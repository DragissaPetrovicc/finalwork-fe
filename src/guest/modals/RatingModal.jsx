import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useState,useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';

const RatingModal = ({ open, onClose }) => {
  const [value, setValue] = useState(1);
  const [isRated, setIsRated] = useState(false);
  const id = useSelector(state => state.credentials.items[1]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const alreadyRated = localStorage.getItem("ratedApp");
    if (alreadyRated) {
      setIsRated(true); 
    }
  }, []);

  const RateApp = async () => {
      const stars = value;

    try{
      console.log(stars)
      await axiosI.post(`/postRating/${id}`,{stars}, { headers: { authorization: `Bearer ${token}` } });
      alert("Thanks for rating our application");
      onClose();

      localStorage.setItem("ratedApp", "true");
      setIsRated(true);
      
    }catch(e){
      console.log(e?.response.data || "Something went wrong");
    }
    
    
  };

  if (isRated) return null;

  const box = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:"15px",
    display:'flex',
    flexDirection:"column",
    gap:"15px",
    alignItems:'center',
    justifyContent:'center'
  };

  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={box}> 
            
            <span className='font-bold text-xl'>Please rate this app</span>

            <Rating name="simple-controlled"value={value}onChange={(e) => setValue(e.target.value)}/>
            
            <div className='flex flex-row gap-3 items-center'>
                <Button onClick={onClose} variant='contained' color='error'> <CloseIcon/> Close</Button>
                <Button onClick={RateApp} variant='contained' color='secondary'>Send <SendIcon/></Button>
            </div>
      </Box>
    </Modal>
  );
}

export default RatingModal;
