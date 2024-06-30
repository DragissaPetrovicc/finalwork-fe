import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const UserModal = ({open,onClose,report,reportedBy,image,reportedUser,reportedByImg,addMessage,reason}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height:'fit-content',
        bgcolor: '#e5e7eb',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 3,
        display:'flex',
        flexDirection:'column',
        gap:3,
        p: 3,
    };

    return <Modal open={open} onClose={onClose}>
    <Box sx={style}>

    <span className='font-bold text-lg text-center'>{report}</span>

<div className='w-full h-full flex flex-col'>

    <div className='w-full h-min p-2 flex flex-row justify-between items-center'>
        <span className='font-semibold'>Reported by: {reportedBy}</span>
        <img className='rounded-full object-cover w-20 h-20' src={reportedByImg} alt="" />
    </div>

    <div className='w-full h-min p-2 flex flex-row justify-between items-center'>

        <span className='font-semibold'>Reported user: {reportedUser}</span>
        <img className='rounded-full object-cover w-20 h-20'  src={image} alt="" />

    </div>

    <span className='font-bold text-2xl mb-8 mt-5'>Reason: {reason}</span>
    <textarea className='rounded-lg w-full min-h-[70px] bg-transparent border-2 border-black p-2' readOnly value={addMessage}/>
</div>


            <Button variant="contained" color="error" onClick={onClose}>Close</Button>
    </Box>
</Modal>   

}
export default UserModal;