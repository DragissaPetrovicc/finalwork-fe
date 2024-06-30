import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axiosI from '../../Axios';

const EditUserModal = ({open,onClose,userId}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min',
        bgcolor: '#e5e7eb',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    };


    
    const token = localStorage.getItem('token');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [username,setUsername] = useState('');
    const [dealershipName,setDealershipName] = useState('');

    useEffect(() => {
        const fetxhSpecifiedUser = async() =>{

            try{
                const {data} = await axiosI.get(`/car/carOwner/${userId}`);
                setState(data.location.state);
                setCity(data.location.city);
                setUsername(!!data.username && data.username);
                setDealershipName(!!data.dealershipName && data.dealershipName);

            }catch(e){
                alert(e?.response?.data || 'Could not update this user')
            }
        }
        fetxhSpecifiedUser();
    },[userId])

    const applyEdit = async() =>{
        try{
            
            await axiosI.patch(`/admin/${'user' || 'carDealer'}/${userId}`,{location:{state,city},username, dealershipName}, { headers: { authorization: `Bearer ${token}` } });
            alert('User updated successfully');
            onClose();
            
        }catch(e){
            alert(e?.response?.data || 'Could not update this user')
        }
    
    }

    return <Modal open={open} onClose={onClose}>
    <Box sx={style}>
        <div className="flex flex-col justify-center items-center gap-7">

            <span className='font-bold text-xl text-center'>Edit user</span>

            <TextField value={!!username ? username : dealershipName} onChange={(e) => {!!username ? setUsername(e.target.value) : setDealershipName(e.target.value)}} variant='outlined' className='!w-max'/>
            <TextField value={state} onChange={(e) => setState(e.target.value)} variant='outlined' className='!w-max'/>
            <TextField value={city} onChange={(e) => setCity(e.target.value)} variant='outlined' className='!w-max'/>

            <div className='flex flex-row justify-between items-center w-full h-fit'>

            <Button variant="contained" color="error" onClick={onClose}>Close</Button>
            <Button variant="contained" color="success" onClick={applyEdit}>Submit</Button>


            </div>
        </div>
    </Box>
</Modal>   

}
export default EditUserModal;