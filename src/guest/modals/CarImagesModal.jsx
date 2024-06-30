import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, IconButton } from '@mui/material';

const CarImageModal = ({ open, onClose, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const box = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "45%",
    height:"55%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    alignItems: 'center',
    justifyContent: 'space-around',
    boxSizing:"border-box",
    overflow:'hidden'
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={box}>
        <Button onClick={onClose} sx={{ ':hover': { bgcolor: 'rgba(255, 0, 0, 0.7)' }, height: '35px', alignSelf: 'end' }}>
          <CloseIcon sx={{ color: 'black' }} />
        </Button>
        <Box sx={{ display: 'flex',flexDirection:"row",width:"100%",height:"100%", alignItems: 'center',justifyContent:"space-between" }}>

          <IconButton onClick={handlePrevImage}>
            <ArrowBackIosIcon />
          </IconButton>

          <img src={images[currentImageIndex]} alt="" className='w-full h-[90%] object-cover self-center border-black border-2 rounded-lg'/>

          <IconButton onClick={handleNextImage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default CarImageModal;
