import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from "@mui/material";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const SortModal = ({ open, handleClose, sortOptions, updateSortOptions, handleSort }) => {
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

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;

        let updatedOptions = { ...sortOptions, [name]: checked };

        if (name === 'priceAsc' && checked) {
            updatedOptions.priceDesc = false;
        } else if (name === 'priceDesc' && checked) {
            updatedOptions.priceAsc = false;
        } else if (name === 'mileageAsc' && checked) {
            updatedOptions.mileageDesc = false;
        } else if (name === 'mileageDesc' && checked) {
            updatedOptions.mileageAsc = false;
        } else if (name === 'yearAsc' && checked) {
            updatedOptions.yearDesc = false;
        } else if (name === 'yearDesc' && checked) {
            updatedOptions.yearAsc = false;
        }

        updateSortOptions(updatedOptions);
    };

    const handleCloseModal = () => {
        handleClose();
    };

    const handleSortClick = () => {   
        handleSort(sortOptions);     
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <div className="flex w-[300px] flex-col gap-10 p-10 justify-center items-center">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <FormControlLabel
                            control={<Switch checked={sortOptions.brand} onChange={handleSwitchChange} name="brand" />}
                            label="Sort by manufacturer (A > Z)"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.model} onChange={handleSwitchChange} name="model" />}
                            label="Sort by model (A > Z)"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.priceAsc} onChange={handleSwitchChange} name="priceAsc" />}
                            label="Sort by price ↑"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.priceDesc} onChange={handleSwitchChange} name="priceDesc" />}
                            label="Sort by price ↓"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.mileageAsc} onChange={handleSwitchChange} name="mileageAsc" />}
                            label="Sort by mileage ↑"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.mileageDesc} onChange={handleSwitchChange} name="mileageDesc" />}
                            label="Sort by mileage ↓"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.yearAsc} onChange={handleSwitchChange} name="yearAsc" />}
                            label="Sort by year ↑"
                        />
                        <FormControlLabel
                            control={<Switch checked={sortOptions.yearDesc} onChange={handleSwitchChange} name="yearDesc" />}
                            label="Sort by year ↓"
                        />
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button onClick={handleSortClick} variant="contained" color="error" sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                            Cancel
                        </Button>
                        <Button onClick={handleCloseModal} variant="contained" sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                            Sort
                        </Button>
                        
                        
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default SortModal;
