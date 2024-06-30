import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { addImages } from "../../redux/slices/carImageSlice";

const CarImageTab = () => {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [price,setPrice] = useState(0);
    const dispatch = useDispatch();

    const imgUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevImages => [...prevImages, reader.result]);
            };
              reader.readAsDataURL(file);
        }
    };

    const imageDescription = () => {
        const imgDesc = {
            images,
            description,
            price
        };
        dispatch(addImages(imgDesc));
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className='flex flex-col md:flex-row w-full h-full items-center'>
                <div className='flex flex-col gap-3 w-full h-full border-r-4 border-gray-400 p-3 justify-between overflow-auto'>
                    <span className="font-bold text-center text-xl">Car Images</span>
                    <div className="flex flex-col justify-between w-full h-full overflow-auto">
                        <div className="w-full h-[80%] grid grid-cols-3 gap-2 p-2">
                            {images.map((image, index) => (
                                <img key={index} className="w-full h-full rounded-md object-cover border-4 border-black" src={image} alt='' />
                            ))}
                        </div>
                        
                        {images.length < 6 && (
                            <Button color="success" className="!whitespace-nowrap !self-center" component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                                Choose Image
                                <VisuallyHiddenInput type="file" onChange={imgUpload} />
                            </Button>
                        )}
                        {images.length === 5 && (
                            <Alert icon={<WarningAmberOutlinedIcon fontSize="inherit" />} severity="warning">
                                Maximum number of images is 6
                            </Alert>
                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-3 w-full h-full p-3 justify-between'>
                    <span className="font-bold text-center text-xl">Car Description</span>
                    <textarea
                        aria-multiline
                        className="w-full h-full border-2 border-black bg-transparent rounded-md p-3 text-lg font-medium overflow-auto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField value={price} onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" className="!w-full"/>
                </div>
            </div>
            <Button className="!self-center w-[100px]" onClick={imageDescription} variant="contained" color="success">Submit</Button>
        </div>
    );
};

export default CarImageTab;
