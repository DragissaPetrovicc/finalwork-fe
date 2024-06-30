import { Button, TextField } from '@mui/material';
import PrivateRoute from '../../PrivateRoute';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { format, addMonths, eachMonthOfInterval } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import axiosI from '../../Axios';
import { ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';

const EditCar = () => {

    const navigate = useNavigate();

    const generateYears = (startYear) => {
        const currentYear = new Date().getFullYear();
        let years = [];
        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }
        return years;
    };

    const [enterier, setEnterier] = useState('');
    const [lights, setLights] = useState('');
    const [rimSize, setRimSize] = useState('');
    const [alarm, setAlarm] = useState(false);
    const [abs, setAbs] = useState(false);
    const [esp, setEsp] = useState(false);
    const [turbo, setTurbo] = useState(false);
    const [airbag, setAirbag] = useState(false);
    const [parkingCam, setParkingCam] = useState(false);
    const [parkingCens, setParkingCens] = useState(false);
    const [navigation, setNavigation] = useState(false);
    const [touchScreen, setTouchScreen] = useState(false);
    const [bluetooth, setBluetooth] = useState(false);
    const [startStop, setStartStop] = useState(false);

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
    const [carImages, setCarImages] = useState([]);
    const [description,setDescription] = useState('');

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

    const carId = useSelector((state) => state.car.items);

    useEffect(() => {
        const fetchCars = async () => {
            const token = localStorage.getItem('token');
        
            try {
                const { data } = await axiosI.get(`/car/${carId}`, { headers: { authorization: `Bearer ${token}` } });
                console.log(data);
                setCarImages(data.images);
                setBrand(data.manufactorer);
                setModel(data.model);
                setFuel(data.fuel);
                setTransmission(data.transmission);
                setMileage(data.mileage);
                setCubicasis(data.cubicasis);
                setEnginePower(data.enginePower);
                setMusic(data.music);
                setNumberOfDoors(data.numberOfDoors);
                setYear(data.year);
                setHorsePower(data.horsePower);
                setDrivetrain(data.drivetrain);
                setNumberOfGears(data.numberOfGears);
                setRegistration(data.registration);
                setEmisionStandard(data.emisionStandard);
                setType(data.type);
                setRimSize(data.carEquipment.rimSize);
                setAlarm(data.carEquipment.alarm);
                setAbs(data.carEquipment.ABS);
                setEsp(data.carEquipment.ESP);
                setTurbo(data.carEquipment.turbo);
                setAirbag(data.carEquipment.airbag);
                setEnterier(data.carEquipment.enterier);
                setParkingCam(data.carEquipment.parkingCamera);
                setParkingCens(data.carEquipment.parkingCensors);
                setLights(data.carEquipment.lights);
                setNavigation(data.carEquipment.navigation);
                setTouchScreen(data.carEquipment.touchScreen);
                setBluetooth(data.carEquipment.bluetooth);
                setStartStop(data.carEquipment.startStopSystem);
                setDescription(data.description);
            } catch(e) {
                alert(e?.response?.data || 'Could not fetch specified car');
            }
        }
        fetchCars();
    }, [carId])

    const submitEdit = async () => {
        const token = localStorage.getItem('token');
        try{
            const {data} = await axiosI.patch(`cars/edit/${carId}`,{

                images:carImages, manufactorer:brand, model, fuel, transmission, mileage, cubicasis, enginePower, music, numberOfDoors,
                year, horsePower, drivetrain, numberOfGears, registration, emisionStandard, type, carEquipment:{
                    rimSize,alarm,ABS:abs,ESP:esp,airbag,bluetooth,enterier,lights,navigation,parkingCamera:parkingCam,parkingCensors:parkingCens,
                    startStopSystem:startStop,touchScreen,turbo
                }, description

            }, { headers: { authorization: `Bearer ${token}` } });

            alert(data);
            navigate(ROUTES.HOME);
        }catch(e){
            alert(e?.response?.data || 'Could not fetch specified car');

        }
    }

    const handleDeleteImage = (imageToDelete) => {
        setCarImages(carImages.filter(image => image !== imageToDelete));
    };

    const handleAddImages = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setCarImages(prevImages => [...prevImages, reader.result]);
            };
              reader.readAsDataURL(file);
        }
    };

    return <PrivateRoute>
        <div className='w-full h-full flex flex-col gap-6'>

    <span className='text-center font-bold text-2xl'>Edit Car</span>
    <div className='flex flex-row w-full h-full gap-4'>

        <div className='flex flex-col w-1/3 p-2 justify-around h-full border-2 border-black rounded-md box-border overflow-auto'>

            <div className='h-2/3 w-full gap-2 grid grid-cols-3 grid-rows-2'>

            {carImages && carImages.map(im => (
                <div className='border-2 flex border-black rounded-md'>
                    <img className='w-full h-full object-cover' src={im} alt="" />
                    <Button sx={{ '&:hover': {bgcolor: 'red', opacity:'50%'}, height: 'min-content', width: 'min-content', top: 0, right: 62                    }} onClick={() => handleDeleteImage(im)} >
                        <DeleteIcon/>
                    </Button>
                </div>
            ))}


            </div>   

            <Button className='!w-1/4 !self-center' variant="contained" component="label" > Add images <input type="file" accept="image/*" multiple hidden onChange={handleAddImages} />
            </Button>  
            
            <textarea defaultValue={description} value={description} onChange={(e) => setDescription(e.target.value)} className='w-full h-fit p-2 bg-transparent border-2 rounded-md border-black' placeholder='defaultna vrijednost description-a'/>

        </div>
        
        <div className='flex flex-col w-1/3 h-full p-2 gap-2 border-2 justify-center items-center border-black rounded-md box-border overflow-auto'>

            <div className='flex flex-col lg:flex-row gap-2 w-full h-full justify-center items-center'>
                <div className='flex flex-col w-1/2 gap-2'>
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
                        <Select label="Cubicassis" defaultValue={cubicasis} value={cubicasis} onChange={(e) => setCubicasis(e.target.value)}>
                            {[...Array(51)].map((_, index) => {
                                const value = (Math.floor(index / 10) + 1) + '.' + ((index % 10-1) + 1);
                                return (
                                    <MenuItem key={index} value={`${value} `}>{`${value}`} ccm</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>


                    <TextField value={enginePower} onChange={(e) => setEnginePower(e.target.value)} label="Engine power" variant="outlined" />

                </div>

                <div className='flex flex-col w-1/2 gap-2'>
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
                </div>

            </div>

            <FormControl fullWidth>
                <InputLabel>Types</InputLabel>
                <Select value={type} label="Types" onChange={(e) => setType(e.target.value)}>
                    {types.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            

        </div>

        <div className='flex flex-col w-1/3 h-full p-2 border-2 justify-center items-center border-black rounded-md box-border overflow-auto'>
        <div className='flex flex-row gap-2 w-full h-full justify-center items-center'>
                <div className='flex flex-col w-1/2 gap-2'>
                <TextField value={rimSize} onChange={(e) => setRimSize(e.target.value)}  variant="outlined" label="Rim size" />
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Alarm:
                        <Checkbox checked={alarm} onChange={(e) => setAlarm(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        ABS:
                        <Checkbox checked={abs} onChange={(e) => setAbs(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        ESP:
                        <Checkbox checked={esp} onChange={(e) => setEsp(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Turbo:
                        <Checkbox checked={turbo} onChange={(e) => setTurbo(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Airbag:
                        <Checkbox checked={airbag} onChange={(e) => setAirbag(e.target.checked)} />
                    </div>
                    <FormControl fullWidth>
                        <InputLabel>Enterier</InputLabel>
                        <Select value={enterier} label="Enterier" onChange={(e) => setEnterier(e.target.value)}>
                            <MenuItem value={'Leather'}>Leather</MenuItem>
                            <MenuItem value={'Alcantara'}>Alcantara</MenuItem>
                            <MenuItem value={'Fabric'}>Fabric</MenuItem>
                            <MenuItem value={'Carbon'}>Carbon</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className='flex flex-col w-1/2 gap-2'>
                <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Parking camera:
                        <Checkbox checked={parkingCam} onChange={(e) => setParkingCam(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Parking censors:
                        <Checkbox checked={parkingCens} onChange={(e) => setParkingCens(e.target.checked)} />
                    </div>
                    <FormControl fullWidth>
                        <InputLabel>Lights</InputLabel>
                        <Select value={lights} label="Lights" onChange={(e) => setLights(e.target.value)}>
                            <MenuItem value={'Xenon'}>Xenon</MenuItem>
                            <MenuItem value={'Led'}>Led</MenuItem>
                            <MenuItem value={'Matrix'}>Matrix</MenuItem>
                            <MenuItem value={'Laser'}>Laser</MenuItem>
                            <MenuItem value={'Halogen'}>Halogen</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Navigation:
                        <Checkbox checked={navigation} onChange={(e) => setNavigation(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Touch screen:
                        <Checkbox checked={touchScreen} onChange={(e) => setTouchScreen(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Bluetooth:
                        <Checkbox checked={bluetooth} onChange={(e) => setBluetooth(e.target.checked)} />
                    </div>
                    <div className="border-2 rounded-md border-gray-300 w-full h-fit p-2 flex flex-row justify-between items-center font-semibold text-lg cursor-default hover:bg-slate-300">
                        Start-stop:
                        <Checkbox checked={startStop} onChange={(e) => setStartStop(e.target.checked)} />
                    </div>
                </div>

            </div>        
            <FormControl fullWidth>
                        <InputLabel>Music</InputLabel>
                        <Select value={music} label="Music" onChange={(e) => setMusic(e.target.value)}>
                            <MenuItem value={'MP3'}>MP3</MenuItem>
                            <MenuItem value={'CD-player'}>CD-player</MenuItem>
                            <MenuItem value={'Radio'}>Radio</MenuItem>
                        </Select>
                    </FormControl>
        </div>

    </div>
    <Button onClick={submitEdit} size='large' variant='contained' color='success' className='!w-fit !self-center !pb-2 !whitespace-nowrap' >Submit edit</Button>
</div>
    </PrivateRoute>

}
export default EditCar;