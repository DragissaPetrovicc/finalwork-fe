import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {addEquipment} from '../../redux/slices/carEquipment';
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RedoIcon from '@mui/icons-material/Redo';

const CarEquipment = ({onNext,onSkip,onBack}) => {

    const dispatch = useDispatch();

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

    const carEquipment = () => {
        const carEquipment = {
            enterier,
            lights,
            rimSize,
            alarm,
            abs,
            esp,
            turbo,
            airbag,
            parkingCam,
            navigation,
            touchScreen,
            bluetooth,
            startStop,
            parkingCens
        };
    
        dispatch(addEquipment(carEquipment));
        onNext();
    };

    const handleSkip = () => {

        const skipEquipment={};
        dispatch(addEquipment(skipEquipment));
        onSkip();

    }

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <span className="font-bold text-center text-xl">Car Equipment</span>
            <div className="flex flex-col md:flex-row w-full h-full items-center">
                <div className="flex flex-col gap-3 w-full h-full border-r-4 border-gray-400 p-3 justify-center">
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

                <div className="flex flex-col gap-3 w-full h-full p-3 justify-center">
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

            <div className='flex flex-row justify-between items-center mx-3 w-full'>

                <Button className="!self-center w-[100px]" onClick={onBack} color="error" variant="contained" >Back  <ArrowBackIcon/></Button>

                <div className='flex flex-row items-center gap-2 w-max'>

                    <Button className="!self-center w-[100px]" onClick={handleSkip} color="primary" variant="contained" >Skip <RedoIcon/></Button>
                    <Button className="!self-center w-[100px]" onClick={carEquipment} color="success" variant="contained" >Next</Button>

                </div>

            </div>
            

        </div>
    );
};

export default CarEquipment;
