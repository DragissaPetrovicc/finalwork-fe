import { Button, Box } from '@mui/material/';
import UniversalModal from '../../users/models/UniversalModal';
import { useEffect, useState } from 'react';
import ArticleModal from '../modals/ReportedArticle';
import axiosI from '../../Axios';
import { format, isValid } from 'date-fns';

const CarReports = () => {
    
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [openCar, setOpenCar] = useState(false);

    const handleOpenCar = () => setOpenCar(true);
    const handleCloseCar = () => setOpenCar(false);

    const handleOpen = () => {
        setOpen(true);
        setTitle("delete this car report");
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = async (repId) => {
        try {
            const { data } = await axiosI.delete(`/admin/carRep/${repId}`, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
            handleClose();
        } catch (e) {
            alert(e?.response?.data || 'Something went wrong');
        }
    };

    const token = localStorage.getItem('token');
    const [carReps, setCarReps] = useState([]);

    useEffect(() => {
        const fetchCarReports = async () => {
            try {
                const { data } = await axiosI.get(`/admin/carReps`, { headers: { authorization: `Bearer ${token}` } });
                console.log(data);
                setCarReps(data);
            } catch (e) {
                alert(e?.response?.data || 'Something went wrong');
            }
        };
        fetchCarReports();
    }, [token]);

    return (
        <div className='flex flex-col overflow-auto w-1/3 h-full border-4 border-black p-3 rounded-lg gap-3'>
            <span className='font-bold text-xl text-center'>Car reports</span>
            {carReps.length > 0 ? (
                carReps.map(rep => (
                    <Box
                        key={rep._id}
                        component="section"
                        sx={{ p: 2, border: '2px solid grey', display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', cursor: "pointer" }}
                    >
                        <div className='flex flex-col gap-2 items-start justify-center'>
                            <span className='font-bold text-lg'>Reported car: {rep.reportedArticle?._id}</span>
                            <span className='font-bold text-lg'>Reported by: {rep.reportedBy?.username ? rep.reportedBy?.username : rep.reportedBy?.dealershipName}</span>
                        </div>
                        <div className='flex flex-col gap-2 items-end justify-between'>
                            <span className='font-bold text-slate-500 text-lg !whitespace-nowrap'>
                                {isValid(new Date(rep.createdAt)) ? format(new Date(rep.createdAt), 'dd-MM-yyyy') : 'Invalid date'}
                            </span>

                            <Button onClick={handleOpen} variant='contained' color='error'>Delete</Button> 
                            <Button variant='contained' onClick={handleOpenCar}>Details</Button>

                            <UniversalModal open={open} onClose={handleClose} title={title} handleYes={() => handleYes(rep._id)} handleNo={handleClose} />
                            <ArticleModal open={openCar} onClose={handleCloseCar} report={rep._id} reason={rep.reason} addMessage={rep.additionalMessage} reportedBy={rep.reportedBy?.username ? rep.reportedBy?.username : rep.reportedBy?.dealershipName} reportedByImg={rep.reportedBy?.image} reportedCar={rep.reportedArticle?._id} image={rep.reportedArticle?.images} />
                        </div>
                    </Box>
                ))
            ) : (
                <span className='font-bold text-lg'>No available car reports</span>
            )}
        </div>
    );
};

export default CarReports;
