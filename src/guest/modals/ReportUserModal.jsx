import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';
import React,{useState} from 'react';

const RepUser = ({open,onClose,userId}) => {
    const id = useSelector(state => state.credentials.items[1]);

    const [reason, setReason] = useState('');
    const [additionalMessage, setAdditionalMessage] = useState('');

    const reasons = [
        'Unwanted content',
        'My article was published',
        'It threatens me',
        'It violates my privacy'
    ];
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
        gap:"8px",
        alignItems:'center',
        justifyContent:'center'
      };

      const reportUser = async () => {
        const token = localStorage.getItem("token");
        const reportedUserId = userId;
        try {
            const { data } = await axiosI.post(`/repUser/${id}`, { reportedUserId, reason, additionalMessage }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
            onClose();
        } catch (e) {
            console.error(e?.response?.data || "Something went wrong");
        }
    };

    return <Modal open={open} onClose={onClose}>
    <Box sx={box}> 
        <span className='font-bold text-lg'>Report user</span>
            <Autocomplete
                value={reason}
                onChange={(e, newValue) => setReason(newValue)}
                disablePortal
                id="combo-box-demo"
                options={reasons}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Reason" />}
                />
                <TextField value={additionalMessage} onChange={(e) => setAdditionalMessage(e.target.value)} sx={{ width: "100%" }} placeholder='Additional message (optional)' />
       
        <div className='flex flex-row-reverse w-full justify-between items-center'>
            <Button onClick={reportUser} variant='contained' color='error'>Send report <SendIcon/></Button>
            <Button onClick={onClose} variant='contained' color='error'><CloseIcon/> Close </Button>
        </div>

  </Box>
</Modal>
}

export default RepUser;