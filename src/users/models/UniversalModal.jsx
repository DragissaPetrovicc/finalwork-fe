import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const UniversalModal = ({open,onClose,title,handleYes,handleNo}) => {

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

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <div className="flex flex-col justify-center items-center gap-7">
                    <span className="text-xl text-center">Are you sure you want to <br/> <b>{title}</b> ?</span>
                    <div className="w-full flex justify-center flex-row-reverse gap-2">
                        <Button variant="contained" color="success" onClick={handleYes}>Yes</Button>
                        <Button variant="contained" color="error" onClick={handleNo}>No</Button>
                    </div>
                </div>
            </Box>
        </Modal>   

    );

}
export default UniversalModal;