import PrivateRoute from '../../PrivateRoute';
import React,{useEffect, useState} from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyCars from '../../guest/components/MyCars';
import { useSelector } from 'react-redux';
import axiosI from '../../Axios';
import { carId } from '../../redux/slices/selectedCarSlice';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const MyProfile = () => {

    const [myCars,setMyCars] = useState([]);
    const [value, setValue] = useState('1');
    const id = useSelector(state => state.credentials.items[1]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const [user,setUser] = useState('');
    const [verification,setVerification] = useState(false);
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [email,setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [role,setRole] = useState('');
    const [image,setImage] = useState(null);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };
    useEffect(() =>{

        const getMyCars = async () => {
        try {
            const { data } = await axiosI.get(`/cars/myCars/${id}`,{ headers: { authorization: `Bearer ${token}` } });
            setMyCars(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        } 
    };
    getMyCars();

    },[id,token]);
    
    const navCarDetails = async (selectedCarId) => {

        const views = 1;

        try{
            const { data } = await axiosI.patch(`/cars/edit/${selectedCarId}`,{ views }, { headers: { authorization: `Bearer ${token}` } });
            console.log(data);
        }catch(e){
            alert(e?.response?.data || "Something went wrong");

        }
        dispatch(carId(selectedCarId)); 
        navigate(ROUTES.CAR_DETAILS);
    }

    useEffect(() =>{

        const fetchMyProfile = async() =>{

            try{

                const {data} = await axiosI.get(`/car/carOwner/${id}`);
                setUser(data.username ? data.username : data.dealershipName);
                setVerification(data.verification);
                setState(data.location.state);
                setCity(data.location.city);
                setEmail(data.email ? data.email : data.contact.email);
                setPhoneNumber(data.phoneNumber ? data.phoneNumber : data.contact.phoneNumber);
                setFirstName(data.firstName && data.firstName);
                setLastName(data.lastName && data.lastName);
                setRole(data.role);
                setImage(data.image);

            }catch(e){
                alert(e?.response?.data || "Something went wrong");
            }

        }

        fetchMyProfile();

    },[id])

    return <PrivateRoute>
        <div className="flex flex-col w-full h-full gap-8">

    <div className="w-full h-full flex flex-col md:flex-row gap-6">

        <div className="w-[20%] h-full flex justify-start flex-col box-border">
            <div className="flex flex-col gap-10 h-max p-4 border-2 border-black rounded-lg">
                <span className="text-center text-lg font-bold">{!!firstName ? 'USER':'CAR DEALER'}</span>
                <div className="flex flew-row justify-between gap-5 items-center h-min">

                    <img className="rounded-full border-black border-2 shadow-md shadow-black w-20 h-20" src={image} alt="" />
                    <div className="flex flex-col h-fit justify-center items-center">

                        <strong className='text-center'>{user}</strong>  
                        {!!verification ? <VerifiedIcon/> : <VerifiedOutlinedIcon/>}

                    </div>
                </div>

                <span> <b>Location:</b> {state}, {city}</span>
                <div className="flex flex-col gap-[3px]">

                    <strong className="text-lg">Contact:</strong>

                    <span className="mt-2"> <b>Email:</b> {email} </span>
                    {!!firstName && <span> <b>Firstanme:</b> {firstName} </span>}
                    {!!lastName && <span> <b>Lastname:</b> {lastName} </span>}
                    <span> <b>Phone number:</b> {phoneNumber} </span>  
                    <span> <b>Id:</b> {id} </span>
                    <span> <b>Role:</b> {role} </span>

                </div>

            </div>
            

        </div>
        <div className="flex flex-grow flex-col items-start justify-start w-full">
        <TabContext value={value}>
        <TabList sx={{ width: "100%" }}textColor="secondary"indicatorColor="secondary"onChange={handleChange}aria-label="lab API tabs example">
        <Tab label="Active cars" value="1" />
        <Tab label="Sold cars" value="2" />
        </TabList>
        <TabPanel sx={{width: "100%",display: "grid",gridTemplateColumns: { 
            xs: "repeat(2, 1fr)", 
            md: "repeat(3, 1fr)" },gap: 2,overflow: "auto",marginTop: 2, padding: 0}} value="1">{myCars.length > 0 ? (
                myCars.map(car => car.status === 'ACTIVE' && (
                    <MyCars
                        key={car._id}
                        img={car.images}
                        manufactorer={car.manufactorer}
                        model={car.model}
                        year={car.year}
                        id={car._id}
                        price={car.price}
                        mileage={car.mileage}
                        fuel={car.fuel}
                        status={car.status}
                        owner={car.owner}
                        onClick={() => navCarDetails(car._id)}
                    />
                ))
            ) : (
                <span className='font-bold'>You still have not added any cars yet</span>
            )}
            
        </TabPanel>
        <TabPanel sx={{width: "100%",display: "grid",gridTemplateColumns: { 
            xs: "repeat(2, 1fr)", 
            md: "repeat(3, 1fr)" },gap: 2,overflow: "auto",marginTop: 0, padding: 0}} value="2">{myCars.length > 0 ? (
                myCars.map(car => car.status === 'SOLD' && (
                    <MyCars
                        key={car._id}
                        img={car.images}
                        manufactorer={car.manufactorer}
                        model={car.model}
                        year={car.year}
                        id={car._id}
                        price={car.price}
                        mileage={car.mileage}
                        fuel={car.fuel}
                        status={car.status}
                        owner={car.owner}
                        onClick={() => navCarDetails(car._id)}
                    />
                ))
            ) : (
                <span className='font-bold'>You still have not added any cars yet</span>
            )}
        </TabPanel>
    </TabContext> 
        </div>
        

    </div>

</div>
    </PrivateRoute>

}
export default MyProfile;