import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ToggleButton from '@mui/material/ToggleButton';

const FilterModal = ({ open, handleClose ,setFilters}) => {
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

    const generateYears = (startYear) => {
        const currentYear = new Date().getFullYear();
        let years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    const [selected, setSelected] = useState(false);
    const handleToggle = () => setSelected(!selected);
    const [selected1, setSelected1] = useState(false);
    const handleToggle1 = () => setSelected1(!selected1);
    const [selected2, setSelected2] = useState(false);
    const handleToggle2 = () => setSelected2(!selected2);

    const allYears = generateYears(1970);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [fuel, setFuel] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    const filteredYears = fromYear ? allYears.filter(year => year >= fromYear) : allYears;

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
        Audi: ['A1','A2','A3', 'A4', 'A5', 'A6', 'A7', 'A8','Q1','Q2','Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8','R8','e-Tron'],
        BMW: ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5', 'Series 6', 'Series 7','Z4','X1','X2','X3','X4','X5','X6','X7'],
        Ferrari: ['488', '812', 'California', 'F8', 'Portofino','F90','LaFerrari','296','Roma'],
        Ford: ['Fiesta', 'Focus', 'Mustang', 'Explorer','Mondeo','Kuga'],
        Honda: ['Accord', 'Civic', 'CR-V', 'Fit','Accura','2000','NSX-R'],
        Mazda: ['Mazda3', 'Mazda6', 'CX-3', 'CX-5','RX-3','RX-5','RX-7'],
        Mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class','CLS','GLC','GLE','GT-Series','B-Class','CLA','CLK'],
        Nissan: ['Altima', 'Maxima', 'Pathfinder', 'Rogue','GT-R','Qashquai','Z 350','Z 370'],
        Toyota: ['Camry', 'Corolla', 'Highlander', 'RAV4','Supra'],
        Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Touareg','Arteon','Scirocco','Polo'],
        Lamborghini:['Huracan','Aventador','Veneno','Miura','Diablo','Gallardo','Murcielago'],
        Skoda:['Fabia','Octavia','Kodiaq','Karoq','Superb','Rapid']
    };

    const closeFilterModal = () => {
        setFilters([]);
        setBrand('');
        setModel('');
        setFuel('');
        setTransmission('');
        setFromYear('');
        setToYear('');
        setPriceFrom('');
        setPriceTo('');
        setSelected(false);
        setSelected1(false);
        setSelected2(false);
        handleClose();
    };
    

    const handleApplyFilters = () => {
        const newFilters = [
            { type: 'manufactorer', value: brand },
            { type: 'model', value: model },
            { type: 'fuelType', value: fuel },
            { type: 'transmissionType', value: transmission },
            { type: 'year', value: { from: fromYear, to: toYear } },
            { type: 'price', value: { from: priceFrom, to: priceTo } },
        ];
        setFilters(newFilters);
        handleClose();
    };
    
    return (
        <Modal open={open} onClose={closeFilterModal}>
            <Box sx={style}>
                <div className="flex w-[300px] flex-col gap-10 p-10 justify-center items-center">
                    <div className="flex flex-col gap-2 w-full">
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

                        {brand && (
                            <FormControl fullWidth>
                                <InputLabel>Model</InputLabel>
                                <Select value={model} label="Model" onChange={(e) => setModel(e.target.value)}>
                                    {models[brand].map((model, index) => (
                                        <MenuItem key={index} value={model}>{model}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <Accordion className="!bg-transparent">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                Price
                            </AccordionSummary>
                            <AccordionDetails className="!bg-gray-300 !flex !flex-row !gap-2">
                                <TextField label='From' value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />
                                <TextField label='To' value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />
                            </AccordionDetails>
                        </Accordion>

                        <FormControl fullWidth>
                            <InputLabel>Fuel</InputLabel>
                            <Select value={fuel} label="Fuel" onChange={(e) => setFuel(e.target.value)}>
                                <MenuItem value={'Petrol'}>Petrol</MenuItem>
                                <MenuItem value={'Diesel'}>Diesel</MenuItem>
                                <MenuItem value={'Electric'}>Electric</MenuItem>
                                <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                            </Select>
                        </FormControl>

                        <Accordion className="!bg-transparent">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                Year
                            </AccordionSummary>
                            <AccordionDetails className="!bg-gray-300 !flex !flex-row !gap-2">
                                <FormControl fullWidth>
                                    <InputLabel>From</InputLabel>
                                    <Select value={fromYear} label="From" onChange={(e) => setFromYear(e.target.value)}>
                                        {allYears.map((year, index) => (
                                            <MenuItem key={index} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>To</InputLabel>
                                    <Select value={toYear} label="To" onChange={(e) => setToYear(e.target.value)}>
                                        {filteredYears.map((year, index) => (
                                            <MenuItem key={index} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </AccordionDetails>
                        </Accordion>

                        <FormControl fullWidth>
                            <InputLabel>Transmission</InputLabel>
                            <Select value={transmission} label="Transmission" onChange={(e) => setTransmission(e.target.value)}>
                                <MenuItem value={'Manual'}>Manual</MenuItem>
                                <MenuItem value={'Automatic'}>Automatic</MenuItem>
                                <MenuItem value={'Semi-automatic'}>Semi-automatic</MenuItem>
                            </Select>
                        </FormControl>

                        <Accordion className="!bg-transparent">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                Drivetrain
                            </AccordionSummary>
                            <AccordionDetails className="!bg-gray-300 !flex !flex-col !items-center !gap-2">
                                <div className="flex flex-row gap-2">
                                    <ToggleButton value="AWD" selected={selected} onChange={handleToggle} sx={{ border: '2px solid black', color: 'black', fontWeight: selected ? 'bold' : 'normal' }}>
                                        AWD
                                    </ToggleButton>
                                    <ToggleButton selected={selected1} onChange={handleToggle1} sx={{ border: '2px solid black', color: 'black', fontWeight: selected1 ? 'bold' : 'normal' }} value="FWD">
                                        FWD
                                    </ToggleButton>
                                </div>
                                <ToggleButton selected={selected2} onChange={handleToggle2} sx={{ border: '2px solid black', color: 'black', fontWeight: selected2 ? 'bold' : 'normal' }} value="RWD">
                                    RWD
                                </ToggleButton>
                            </AccordionDetails>
                        </Accordion>

                    </div>
                    <div className="flex flex-row gap-4">
                        <Button onClick={closeFilterModal} variant="contained" color="error" sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                            Close
                        </Button>
                        <Button onClick={handleApplyFilters} variant="contained" color="success" sx={{ transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)' } }}>
                            Filter
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default FilterModal;
