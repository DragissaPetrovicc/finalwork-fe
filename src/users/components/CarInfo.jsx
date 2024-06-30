import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { format, addMonths, eachMonthOfInterval } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addInfo } from '../../redux/slices/carInfo';

const CarInfo = ({ onNext }) => { 

    const dispatch = useDispatch();

    const generateYears = (startYear) => {
        const currentYear = new Date().getFullYear();
        let years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    const allYears = generateYears(1970);

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [fuel, setFuel] = useState('');
    const [transmission, setTransmission] = useState('');
    const [cubicasis, setCubicasis] = useState('');
    const [music, setMusic] = useState('');
    const [enginePower, setEnginePower] = useState('');
    const [mileage, setMileage] = useState('');
    const [horsePower, setHorsePower] = useState('');
    const [numberOfDoors, setNumberOfDoors] = useState('');
    const [year, setYear] = useState('');
    const [drivetrain, setDrivetrain] = useState('');
    const [numberOfGears, setNumberOfGears] = useState('');
    const [registration, setRegistration] = useState('');
    const [emisionStandard, setEmisionStandard] = useState('');
    const [type, setType] = useState('');

    const today = new Date();
    const oneYearFromNow = addMonths(today, 12);
    const months = eachMonthOfInterval({ start: today, end: oneYearFromNow });
    const formattedMonths = months.map(date => format(date, 'MM-yyyy'));

    const brands = [
        { value: 'Audi', label: 'Audi' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Ferrari', label: 'Ferrari' },
        { value: 'Ford', label: 'Ford' },
        { value: 'Honda', label: 'Honda' },
        { value: 'Mazda', label: 'Mazda' },
        { value: 'Mercedes', label: 'Mercedes' },
        { value: 'Nissan', label: 'Nissan' },
        { value: 'Toyota', label: 'Toyota' },
        { value: 'Volkswagen', label: 'Volkswagen' },
        { value: 'Lamborghini', label: 'Lamborghini' },
        { value: 'Skoda', label: 'Skoda' }
    ];

    const models = {
        Audi: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'R8', 'e-Tron'],
        BMW: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5', 'Series 6', 'Series 7', 'Z4', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7'],
        Ferrari: ['488', '812', 'California', 'F8', 'Portofino', 'F90', 'LaFerrari', '296', 'Roma'],
        Ford: ['Fiesta', 'Focus', 'Mustang', 'Explorer', 'Mondeo', 'Kuga'],
        Honda: ['Accord', 'Civic', 'CR-V', 'Fit', 'Accura', '2000', 'NSX-R'],
        Mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5', 'RX-3', 'RX-5', 'RX-7'],
        Mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'CLS', 'GLC', 'GLE', 'GT-Series', 'B-Class', 'CLA', 'CLK'],
        Nissan: ['Altima', 'Maxima', 'Pathfinder', 'Rogue', 'GT-R', 'Qashquai', 'Z 350', 'Z 370'],
        Toyota: ['Camry', 'Corolla', 'Highlander', 'RAV4', 'Supra'],
        Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Arteon', 'Scirocco', 'Polo'],
        Lamborghini: ['Huracan', 'Aventador', 'Veneno', 'Miura', 'Diablo', 'Gallardo', 'Murcielago'],
        Skoda: ['Fabia', 'Octavia', 'Kodiaq', 'Karoq', 'Superb', 'Rapid']
    };

    const emissionStandards = [
        'Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'
    ];

    const types = [
        'Limousine', 'Coupe', 'SUV', 'Combi', 'Avant', 'Off-road'
    ];
    

    const carInfo = () => {
        
        if(!brand || !model || !fuel || !transmission || !cubicasis || !music || !enginePower || !mileage || !horsePower || !numberOfDoors || !year || !drivetrain
            || !numberOfGears || !registration || !emisionStandard || !type) return alert("All fields are required");
        const carData = {
            brand,
            model,
            fuel,
            transmission,
            cubicasis,
            music,
            enginePower,
            mileage,
            horsePower,
            numberOfDoors,
            year,
            drivetrain,
            numberOfGears,
            registration,
            emisionStandard,
            type
        };
    
        dispatch(addInfo(carData));
        onNext(); 
    };

    

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <span className="font-bold text-center text-xl">Car Info</span>
            <div className='flex flex-col md:flex-row w-full h-full items-center'>
                <div className='flex flex-col gap-3 w-full h-full border-r-4 border-gray-400 p-3 justify-center'>
                    <FormControl fullWidth>
                        <InputLabel>Manufacturer</InputLabel>
                        <Select value={brand} label="Manufacturer" onChange={(e) => {
                            setBrand(e.target.value);
                            setModel('');
                        }}>
                            {brands.map((brand) => (
                                <MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Model</InputLabel>
                        <Select value={model} label="Model" onChange={(e) => setModel(e.target.value)}>
                            {models[brand]?.map((model, index) => (
                                <MenuItem key={index} value={model}>{model}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Fuel</InputLabel>
                        <Select value={fuel} label="Fuel" onChange={(e) => setFuel(e.target.value)}>
                            <MenuItem value={'Petrol'}>Petrol</MenuItem>
                            <MenuItem value={'Diesel'}>Diesel</MenuItem>
                            <MenuItem value={'Electric'}>Electric</MenuItem>
                            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Transmission</InputLabel>
                        <Select value={transmission} label="Transmission" onChange={(e) => setTransmission(e.target.value)}>
                            <MenuItem value={'Manual'}>Manual</MenuItem>
                            <MenuItem value={'Automatic'}>Automatic</MenuItem>
                            <MenuItem value={'Semi-automatic'}>Semi-automatic</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField value={mileage} onChange={(e) => setMileage(e.target.value)} label="Mileage" variant="outlined" />

                    <FormControl fullWidth>
                        <InputLabel>Cubicasis</InputLabel>
                        <Select label="Cubicassis" value={cubicasis} onChange={(e) => setCubicasis(e.target.value)}>
                            {[...Array(51)].map((_, index) => {
                                const value = (Math.floor(index / 10) + 1) + '.' + ((index % 10-1) + 1);
                                return (
                                    <MenuItem key={index} value={`${value} `}>{`${value}`} ccm</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>


                    <TextField value={enginePower} onChange={(e) => setEnginePower(e.target.value)} label="Engine power" variant="outlined" />

                    <FormControl fullWidth>
                        <InputLabel>Music</InputLabel>
                        <Select value={music} label="Music" onChange={(e) => setMusic(e.target.value)}>
                            <MenuItem value={'MP3'}>MP3</MenuItem>
                            <MenuItem value={'CD-player'}>CD-player</MenuItem>
                            <MenuItem value={'Radio'}>Radio</MenuItem>
                        </Select>
                    </FormControl>

                </div>

                <div className='flex flex-col gap-3 w-full h-full p-3 justify-center'>

                    <FormControl fullWidth>
                        <InputLabel>Number of doors</InputLabel>
                        <Select value={numberOfDoors} label="Number of doors" onChange={(e) => setNumberOfDoors(e.target.value)}>
                            <MenuItem value={'2/3'}>2/3</MenuItem>
                            <MenuItem value={'4/5'}>4/5</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Year</InputLabel>
                        <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
                            {allYears.map((year, index) => (
                                <MenuItem key={index} value={year}>{year}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField value={horsePower} onChange={(e) => setHorsePower(e.target.value)} label="Horse power" variant="outlined" />

                    <FormControl fullWidth>
                        <InputLabel>Drivetrain</InputLabel>
                        <Select value={drivetrain} label="Drivetrain" onChange={(e) => setDrivetrain(e.target.value)}>
                            <MenuItem value={'AWD'}>AWD</MenuItem>
                            <MenuItem value={'FWD'}>FWD</MenuItem>
                            <MenuItem value={'RWD'}>RWD</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField value={numberOfGears} onChange={(e) => setNumberOfGears(e.target.value)} label="Number of gears" variant="outlined" />

                    <FormControl fullWidth>
                        <InputLabel>Registration</InputLabel>
                        <Select value={registration} label="Registration" onChange={(e) => setRegistration(e.target.value)}>
                            {formattedMonths.map((month, index) => (
                                <MenuItem key={index} value={month}>{month}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Emission standard</InputLabel>
                        <Select value={emisionStandard} label="Emission standard" onChange={(e) => setEmisionStandard(e.target.value)}>
                            {emissionStandards.map((standard, index) => (
                                <MenuItem key={index} value={standard}>{standard}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Types</InputLabel>
                        <Select value={type} label="Types" onChange={(e) => setType(e.target.value)}>
                            {types.map((type, index) => (
                                <MenuItem key={index} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </div>
            </div>

                <Button className="!self-end !mr-3 w-[100px]" onClick={carInfo} color="success" variant="contained" >Next</Button>
                


        </div>
    );
};

export default CarInfo;
