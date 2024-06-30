import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import axiosI from '../../Axios';
import {useNavigate} from 'react-router-dom'
import {ROUTES} from '../../routes';

const RegisterModal = ({ open, onClose, setRegisterClicked, email }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosI.post('/register/verify', { email, code });
      alert(data);
      setRegisterClicked(true);
      onClose();
      navigate(ROUTES.HOME);
    } catch (e) {
      setError(e?.response?.data || "Verification failed");
    }
  };

  const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
    display: 'flex',
    flexDirection: "column",
    gap: "15px",
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyle}>
        <span className='font-bold text-xl'>Check your email to verify account</span>
        {error && <span className='font-bold text-lg text-red-600'>{error}</span>}
        <div className='flex flex-col gap-2 w-full'>
          <strong>Code:</strong>
          <TextField value={code} onChange={(e) => setCode(e.target.value)} variant='outlined'></TextField>
        </div>
        <div className='flex flex-row w-full justify-between'>
          <Button onClick={onClose} variant='contained' color='error'> <CloseIcon /> Close</Button>
          <Button onClick={handleRegister} variant='contained' color='success'>Register</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
