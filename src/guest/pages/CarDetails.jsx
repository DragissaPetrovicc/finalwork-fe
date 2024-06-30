import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import CarImageModal from "../modals/CarImagesModal";
import RepCar from "../modals/ReportCarModal";
import RepUser from "../modals/ReportUserModal";
import { useSelector } from 'react-redux';
import axiosI from "../../Axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userId } from '../../redux/slices/selectedUserSlice';
import { ROUTES } from "../../routes";
import { format } from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cars from '../../admin/components/Cars';

const CarDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [carDetails, setCarDetails] = useState({
        carImages: [],
        brand: '',
        model: '',
        fuel: '',
        transmission: '',
        mileage: '',
        cubicasis: '',
        eP: 0,
        music: '',
        doorsNumber: '',
        year: 0,
        hp: 0,
        drivetrain: '',
        gearsNumber: 0,
        registration: '',
        emission: '',
        type: '',
        rimSize: 0,
        enterier: '',
        lights: '',
        alarm: false,
        abs: false,
        esp: false,
        turbo: false,
        airbag: false,
        parkingCam: false,
        parkingCens: false,
        navigation: false,
        touch: false,
        bluetooth: false,
        startStop: false,
        createdAt: '',
        state: '',
        city: '',
        views: 0,
        description: '',
        owner: '',
        email: '',
        phoneNumber: '',
        ownerImg: null,
        ownerId: '',
        carId: ''
    });

    let formattedDate = 'Invalid date';
    if (carDetails.createdAt) {
        const date = new Date(carDetails.createdAt);
        if (!isNaN(date.getTime())) {
            formattedDate = format(date, 'dd.MM.yyyy');
        }
    }

    const car = useSelector(state => state.car.items);

    const navUserDetails = async (user) => {
        dispatch(userId(user)); 
        navigate(ROUTES.USER_DETAILS);
    } 

    useEffect(() => {
        const getCarDetails = async () =>{
            try{
                const { data } = await axiosI.get(`/car/${car}`);
                setCarDetails(prevDetails => ({
                    ...prevDetails,
                    carImages: data.images,
                    brand: data.manufactorer,
                    model: data.model,
                    fuel: data.fuel,
                    transmission: data.transmission,
                    mileage: data.mileage,
                    cubicasis: data.cubicasis,
                    eP: data.enginePower,
                    music: data.music,
                    doorsNumber: data.numberOfDoors,
                    year: data.year,
                    hp: data.horsePower,
                    drivetrain: data.drivetrain,
                    gearsNumber: data.numberOfGears,
                    registration: data.registration,
                    emission: data.emisionStandard,
                    type: data.type,
                    rimSize: data.carEquipment.rimSize,
                    alarm: data.carEquipment.alarm,
                    abs: data.carEquipment.ABS,
                    esp: data.carEquipment.ESP,
                    turbo: data.carEquipment.turbo,
                    airbag: data.carEquipment.airbag,
                    enterier: data.carEquipment.enterier,
                    parkingCam: data.carEquipment.parkingCamera,
                    parkingCens: data.carEquipment.parkingCensors,
                    lights: data.carEquipment.lights,
                    navigation: data.carEquipment.navigation,
                    touch: data.carEquipment.touchScreen,
                    bluetooth: data.carEquipment.bluetooth,
                    startStop: data.carEquipment.startStopSystem,
                    createdAt: data.createdAt,
                    description: data.description,
                    views: data.views,
                    carId: data._id
                }));

                const fetchCarOwner = async() =>{
                    try{
                        const ownerData = await axiosI.get(`/car/carOwner/${data.owner}`);
                        setCarDetails(prevDetails => ({
                            ...prevDetails,
                            state: ownerData.data.location.state,
                            city: ownerData.data.location.city,
                            owner: ownerData.data.username ? ownerData.data.username : ownerData.data.dealershipName,
                            email: ownerData.data.email ? ownerData.data.email : ownerData.data.contact.email,
                            phoneNumber: ownerData.data.phoneNumber ? ownerData.data.phoneNumber : ownerData.data.contact.phoneNumber,
                            ownerImg: ownerData.data.image,
                            ownerId: ownerData.data._id
                        }));
                    }catch(e){
                        alert(e?.response?.data || 'Could not fetch car owner');
                    }
                }

                fetchCarOwner();

            }catch(e){
                alert(e?.response?.data || "Something went wrong");
            }
        }
        getCarDetails();
    }, [car]);

    const [openRepCar, setOpenRepCar] = useState(false);
    const handleOpenRepCar = () => setOpenRepCar(true);
    const handleCloseRepCar = () => setOpenRepCar(false);

    const [openCarImg, setOpenCarImg] = useState(false);
    const handleOpenCarImg = () => setOpenCarImg(true);
    const handleCloseCarImg = () => setOpenCarImg(false);

    const [openRepUser, setOpenRepUser] = useState(false);
    const handleOpenRepUser = () => setOpenRepUser(true);
    const handleCloseRepUser = () => setOpenRepUser(false);

    return <div className="flex flex-col h-full w-full gap-5">
        <div className="w-full h-full flex gap-2 flex-col md:flex-row">
            <div className="w-[80%] border-4 p-2 md:p-5 border-black h-full flex flex-col box-border gap-4 rounded-lg overflow-auto">
                <div className="flex flex-row items-center justify-between w-full px-2">
                    <span className="font-bold text-2xl self-center">{carDetails.brand} {carDetails.model}</span>
                    <div className="flex flex-row gap-3">
                        <span className="fony-bold text-lg text-gray-500 flex items-center gap-2">{carDetails.views} <VisibilityIcon/></span>
                        <Button variant="disabled">
                            <FiberManualRecordIcon sx={{width:"15px",height:"15px"}}/>{carDetails.mileage < 5001 ? 'NEW' : 'USED'}
                        </Button>
                        <Button variant="disabled">
                            <AccessTimeIcon/> {formattedDate}
                        </Button>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col md:flex-row">
                    <div className="w-2/5 h-full flex flex-col p-3 gap-3 text-lg">
                        <img
                            onClick={handleOpenCarImg}
                            className="w-full h-[250px] border-4 cursor-pointer border-white shadow-md shadow-black rounded-xl box-border"
                            src={carDetails.carImages[0]}
                            alt=""
                        />
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col w-1/2 h-full">
                                <span><b>Fuel:</b>{carDetails.fuel}</span>
                                <span><b>Transmision:</b> {carDetails.transmission} </span>
                                <span><b>Mileage:</b >{carDetails.mileage} </span>
                                <span><b>Cubicasis:</b> {carDetails.cubicasis} </span>
                                <span><b>Engine power:</b> {carDetails.eP} </span>
                                <span><b>Music:</b> {carDetails.music} </span>
                                <span><b>Number of doors:</b> {carDetails.doorsNumber} </span>
                            </div>
                            <div className="flex flex-col w-1/2 h-full">
                                <span><b>Year:</b> {carDetails.year} </span>
                                <span><b>Horse power:</b> {carDetails.hp} </span>
                                <span><b>Drivetrain:</b> {carDetails.drivetrain} </span>
                                <span><b>Number of gears:</b> {carDetails.gearsNumber} </span>
                                <span><b>Registration:</b> {carDetails.registration} </span>
                                <span><b>Emission standard:</b> {carDetails.emission} </span>
                                <span><b>Type:</b> {carDetails.type} </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/5 h-full p-3 flex flex-col gap-3">
                        <span className="text-center text-lg font-bold">Car Equipment:</span>
                        <div className="w-full h-fit flex flex-row">
                            <div className="w-1/2 h-full flex flex-col items-center">
                                <span className="flex flex-row w-full justify-between px-2 mx-2"><b>Rim size:</b> {carDetails.rimSize} </span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Alarm:</b> {carDetails.alarm === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>ABS:</b> {carDetails.abs === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>ESP:</b> {carDetails.esp === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Turbo:</b> {carDetails.turbo === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Airbag:</b> {carDetails.airbag === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2 mx-2"><b>Enterier:</b> {carDetails.enterier} </span>
                        </div>
                            <div className="w-1/2 h-full flex flex-col items-center">
                                <span className="flex flex-row w-full justify-between px-2"><b>Parking camera:</b> {carDetails.parkingCam === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Parking cens:</b> {carDetails.parkingCens === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Lights:</b> {carDetails.lights} </span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Navigation:</b> {carDetails.navigation === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Touch screen:</b> {carDetails.touch === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Bluetooth:</b> {carDetails.bluetooth === true ? <CheckIcon /> : <CloseIcon />}</span>
                                <span className="flex flex-row w-full justify-between px-2"><b>Start stop system:</b> {carDetails.startStop === true ? <CheckIcon /> : <CloseIcon />}</span>
                            </div>
                        </div>


                        <div className="flex flex-col h-full gap-2 p-2">
                            <span className="w-full text-left text-lg font-bold">Description:</span>
                            <span className="h-full overflow-auto p-2 border-2 border-black rounded-md">{carDetails.description}</span>
                        </div>

                    </div>
                </div>
                
            </div>
            <div className="w-[20%] p-2 border-4 border-black h-full flex flex-col gap-4 rounded-lg">
                <div className="flex flex-col items-center">
                    <img className="w-[100px] h-[100px] rounded-full shadow-md shadow-black border-4 border-black"
                    src={carDetails.ownerImg} alt=""/>
                    <span className="font-bold">{carDetails.owner}</span>
                    <span>Location: {carDetails.state},{carDetails.city}</span>

                    <span className="font-bold">Contact:</span>

                    <span>Email: {carDetails.email} </span>
                    <span>Phone: {carDetails.phoneNumber} </span>
                    <div className="flex flex-col gap-3 w-full px-3 py-2">
                        <Button onClick={() => navUserDetails(carDetails.ownerId)} className="w-full" color="info" variant="contained">
                            <VisibilityIcon/> SEE OWNER
                        </Button>
                        <Button onClick={handleOpenRepCar} className="w-full" color="error" variant="contained">
                            <ReportGmailerrorredOutlinedIcon/> REPORT CAR
                        </Button>
                        <Button onClick={handleOpenRepUser} className="w-full" color="error" variant="contained">
                            <ReportGmailerrorredOutlinedIcon/> REPORT OWNER
                        </Button>
                    </div>
                </div>
            </div>


            

            <RepCar carId={carDetails.carId} open={openRepCar} onClose={handleCloseRepCar}/>
            <CarImageModal images={carDetails.carImages} open={openCarImg} onClose={handleCloseCarImg}/>
            <RepUser userId={carDetails.ownerId} open={openRepUser} onClose={handleCloseRepUser}/>
        </div>

        <div className="w-full h-fit gap-2 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                <Cars/>

            </div>
    </div>
};

export default CarDetails;
