import React, { useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import AddIcon from '@mui/icons-material/Add';
import CarInfo from "./CarInfo";
import CarEquipment from "./CarEquipment";
import CarImageTab from "./CarImageTab";
import { useSelector } from 'react-redux';
import axiosI from "../../Axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddCarStepper = () => {

    const steps = ['Car info', 'Car equipment', 'Car images'];

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const navigate = useNavigate();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <CarInfo onNext={handleNext}/>;
            case 1:
                return <CarEquipment onNext={handleNext} onSkip={handleSkip} onBack={handleBack}/>;
            case 2:
                return (
                    <div className='h-full'>
                        <CarImageTab />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="error" onClick={handleBack} >
                                Back <ArrowBackIcon />
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleAddCar} >
                                Add Car <AddIcon />
                            </Button>
                        </Box>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    const carInfo = useSelector((state) => state.carInfo.items);
    const carImages = useSelector((state) => state.carImages.items);
    const carEquipment = useSelector((state) => state.carEquipment.items);
    const owner = useSelector(state => state.credentials.items[1]);

    const handleAddCar = async () => {
        
        const alarm = carEquipment.alarm;
        const ABS = carEquipment.abs;
        const ESP = carEquipment.esp;
        const turbo = carEquipment.turbo;
        const airbag = carEquipment.airbag;
        const enterier = carEquipment.enterier;
        const parkingCamera = carEquipment.parkingCam;
        const parkingCensors = carEquipment.parkingCens;
        const lights = carEquipment.lights;
        const navigation = carEquipment.navigation;
        const touchScreen = carEquipment.touchScreen;
        const bluetooth = carEquipment.bluetooth;
        const startStopSystem = carEquipment.startStop;
        const description = carImages.description;
        const price = carImages.price;
        const images = carImages.images;
        const manufactorer = carInfo.brand;
        const model = carInfo.model;
        const fuel = carInfo.fuel;
        const transmission = carInfo.transmission;
        const mileage = carInfo.mileage;
        const cubicasis = carInfo.cubicasis;
        const enginePower = carInfo.enginePower;
        const music = carInfo.music;
        const numberOfDoors = carInfo.numberOfDoors;
        const year = carInfo.year;
        const horsePower = carInfo.horsePower;
        const drivetrain = carInfo.drivetrain;
        const numberOfGears = carInfo.numberOfGears;
        const registration = carInfo.registration;
        const emisionStandard = carInfo.emisionStandard;
        const type = carInfo.type;
        const rimSize = carEquipment.rimSize;

        try{
            const token = localStorage.getItem('token');
            const { data } = await axiosI.post('cars/addCar',{owner,price,images,manufactorer,model,fuel,transmission,mileage,cubicasis,enginePower,music,numberOfDoors,
                year,horsePower,drivetrain,numberOfGears,registration,emisionStandard,type,carEquipment:{
                rimSize,alarm,ABS,ESP,turbo,airbag,enterier,parkingCamera,parkingCensors,lights,navigation,
                touchScreen,bluetooth,startStopSystem},description},{ headers: { authorization: `Bearer ${token}` } });

            alert(data);    

            navigate(ROUTES.HOME);
        }catch(e){
            alert(e?.response?.data || "Something went wrong");
        }
        
    }

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">(Optional)</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1, fontWeight: "bolder" }}>
                        Car added successfully. Go home to see your car
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button variant='contained' color='success' onClick={() => navigate(ROUTES.HOME)}>Home</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ width:"100%",height:"100%", mt: 2, mb: 1 }}>
                        {getStepContent(activeStep)}
                    </Box>
                    
                </React.Fragment>
            )}
        </>
    );
}

export default AddCarStepper;
