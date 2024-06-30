import { Button,Box } from '@mui/material/';
import UniversalModal from '../../users/models/UniversalModal';
import { useEffect, useState } from 'react';
import UserModal from '../modals/ReportedUser';
import axiosI from '../../Axios';
import { format, isValid } from 'date-fns';

const UserSection = () => {

    const [title,setTitle] = useState("");
    const [open,setOpen] = useState(false);
    const [openUser,setOpenUser] = useState(false);

    const handleOpenUser = () => setOpenUser(true);
    const handleCloseUser = () => setOpenUser(false);
    const handleOpen = () =>{
        setOpen(true);
        setTitle("delete this user report");
    } 
    const handleClose = () =>{
        setOpen(false);
    }

    const handleYes = async (repId) => {
        try {
            const { data } = await axiosI.delete(`/admin/userRep/${repId}`, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
            handleClose();
        } catch (e) {
            alert(e?.response?.data || 'Something went wrong');
        }
    };

    const token = localStorage.getItem('token');
    const [userReps, setUserReps] = useState([]);

    useEffect(() => {
        const fetchCarReports = async () => {
            try {
                const { data } = await axiosI.get(`/admin/userReps`, { headers: { authorization: `Bearer ${token}` } });
                setUserReps(data);
            } catch (e) {
                alert(e?.response?.data || 'Something went wrong');
            }
        };
        fetchCarReports();
    }, [token]);

    return <div className='flex flex-col overflow-auto w-1/3 h-full border-4 border-black p-3 rounded-lg gap-3'>

    <span className='font-bold text-xl text-center'>User reports</span>
    {userReps.length > 0 ? (
                userReps.map(rep => (
                    <Box
                        key={rep?._id}
                        component="section"
                        sx={{ p: 2, border: '2px solid grey', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', cursor: "pointer" }}
                    >
                        <div className='flex flex-col gap-2 items-start justify-center'>
                            <span className='font-bold text-lg'>Reported user: {rep.reportedUser?.dealershipName ? rep.reportedUser?.dealershipName : rep.reportedUser?.username}</span>
                            <span className='font-bold text-lg'>Reported by: {rep.reportedBy?.dealershipName ? rep.reportedBy?.dealershipName : rep.reportedBy?.username}</span>
                        </div>
                        <div className='flex flex-col gap-2 items-end justify-between'>
                            <span className='font-bold text-slate-500 text-lg'>
                                {isValid(new Date(rep.createdAt)) ? format(new Date(rep?.createdAt), 'dd-MM-yyyy') : 'Invalid date'}
                            </span>

                            <Button onClick={handleOpen} variant='contained' color='error'>Delete</Button> 
                            <Button variant='contained' onClick={handleOpenUser}>Details</Button>

                            <UniversalModal open={open} onClose={handleClose} title={title} handleYes={() => handleYes(rep._id)} handleNo={handleClose} />
                            <UserModal open={openUser} onClose={handleCloseUser} report={rep?._id} reason={rep?.reason} addMessage={rep?.additionalMessage} reportedBy={rep.reportedBy?.username ? rep.reportedBy?.username : rep.reportedBy?.dealershipName} reportedByImg={rep.reportedBy?.image} reportedUser={rep.reportedUser?.username ? rep.reportedUser?.username : rep.reportedUser?.dealershipName} image={rep.reportedUser?.image} />
                        </div>
                    </Box>
                ))
            ) : (
                <span className='font-bold text-lg'>No available user reports</span>
            )}
    </div>
}

export default UserSection;