import { Button, Box } from '@mui/material/';
import UniversalModal from '../../users/models/UniversalModal';
import { useEffect, useState } from 'react';
import EditUserModal from '../modals/EditUser';
import axiosI from '../../Axios';
import { useDispatch } from 'react-redux';
import {userId} from '../../redux/slices/selectedUserSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

const UserReports = () => {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [openEditUser, setOpenEditUser] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenEditUser = () => setOpenEditUser(true);
    const handleCloseEditUser = () => setOpenEditUser(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const { data } = await axiosI.get('/admin/allUsers', { headers: { authorization: `Bearer ${token}` } });
                setAllUsers(data);
            } catch (e) {
                alert(e?.response?.data || 'Something went wrong');
            }
        };
        fetchAllUsers();
    }, [token]);

    const handleSetAsAdmin = async (userId) => {
        try{
            
            await axiosI.patch(`/admin/${'user' || 'carDealer'}/${userId}`,{role:'ADMIN'}, { headers: { authorization: `Bearer ${token}` } });
            alert('This user is now ADMINISTRATOR');

        }catch(e){
            alert(e?.response?.data || 'Something went wrong');
        }
    };

    const handleOpen = () => {
        setOpen(true);
        setTitle("ban this user");
    };
    const handleClose = () => setOpen(false);

    const handleYes = async (userId) => {
        
        try{

            const {data} = await axiosI.delete(`/admin/${'user' || 'carDealer'}/${userId}`, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
            handleClose();

        }catch(e){
            alert(e?.response?.data || 'Something went wrong');
        }
    };

    const navigateUserDetails = (idUser) => {
        dispatch(userId(idUser));
        navigate(ROUTES.USER_DETAILS);
    }

    return (
        <div className='flex flex-col overflow-auto w-1/3 h-full border-4 border-black p-3 rounded-lg gap-3'>
            <span className='font-bold text-xl text-center'>Users</span>
            {allUsers.length > 0 ? (
                allUsers.map(user => (
                    <Box
                        key={user._id}
                        component="section"
                        sx={{ gap: 2, p: 2, border: '2px solid grey', display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                    >
                        <div className='flex flex-row justify-between items-center'>
                            <span className='font-bold text-lg'>Id: {user._id}</span>
                            <Button onClick={() => handleOpenEditUser(user._id)} variant='contained' color='secondary'>Edit</Button>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <Button onClick={() => handleSetAsAdmin(user._id)} variant='contained' color='success'>Set as admin</Button>
                            <Button onClick={() => navigateUserDetails(user._id)} variant='contained'>Details</Button>
                            <Button onClick={handleOpen} variant='contained' color='error'>Ban</Button>
                        </div>
                        <UniversalModal
                            open={open} 
                            onClose={handleClose}
                            title={title}
                            handleYes={() => handleYes(user._id)}
                            handleNo={handleClose}
                        />  
                        <EditUserModal open={openEditUser} onClose={handleCloseEditUser} userId={user?._id}/>

                    </Box>
                ))
            ) : (
                <span className='font-bold text-lg'>No users available</span>
            )}
        </div>
    );
};

export default UserReports;
