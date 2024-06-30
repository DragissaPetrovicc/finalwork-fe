import { Button } from "@mui/material";
import RepUser from "../modals/ReportUserModal";
import React,{useEffect, useState} from "react";
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ActiveCars from "../components/ActiveCars";
import SoldCars from "../components/SoldCars";
import { useSelector } from 'react-redux';
import axiosI from "../../Axios";
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

const UserDetails = () => {

    const [value, setValue] = useState('1');
    const [user,setUser] = useState('');
    const [verification,setVerification] = useState('');
    const [state,setState] = useState('');
    const [city,setCity] = useState('');
    const [email,setEmail] = useState('');
    const [firstName,setFirstname] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [role,setRole] = useState('');
    const [image,setImage] = useState("");

    const userId = useSelector(state => state.user.items);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(() =>{
        const fetchUser = async () => {
            try{
                const { data } = await axiosI.get(`/car/carOwner/${userId}`);
                setUser(data.username ? data.username : data.dealershipName);
                setVerification(data.verification);
                setState(data.location.state);
                setCity(data.location.city);
                setEmail(data.email ? data.email : data.contact.email);
                setPhoneNumber(data.phoneNumber ? data.phoneNumber : data.contact.phoneNumber);
                setImage(data.image);
                setFirstname(!!data.firstName && data.firstName );
                setLastName(!!data.lastName && data.lastName);
                setRole(data.role);
            }catch(e){
                alert(e?.response?.data || "Something went wrong");
            }
        }

        fetchUser();
    },[userId])
        

    const [openRepUser,setOpenRepUser] = useState(false);
    const handleOpenRepUser = () => setOpenRepUser(true);
    const handleCloseRepUser = () => setOpenRepUser(false);

    return <div className="flex flex-col w-full h-full gap-8">

    <Button className="!self-end " onClick={handleOpenRepUser} variant="contained" color="error"><ReportGmailerrorredOutlinedIcon/>Report user</Button>

    <div className="w-full h-full flex flex-col md:flex-row gap-6">

        <div className="w-[20%] h-full flex justify-start flex-col box-border">
            <div className="flex flex-col gap-10 h-max p-4 border-2 border-black rounded-lg">
                <span className="text-center text-lg font-bold">{!!firstName ? 'User :' : 'Car Dealer'}</span>
                <div className="flex flew-row items-center justify-between h-min">

                    <img className="rounded-full border-black border-2 shadow-md shadow-black w-20 h-20" src={image} alt="" />
                    <div className="flex flex-col h-fit items-center">

                        <strong>{user}</strong>  
                        {!!verification ? <VerifiedIcon/> : <VerifiedOutlinedIcon/>}

                    </div>
                </div>

                <span> <b>Location:</b>{state},{city}</span>
                <div className="flex flex-col gap-[3px]">

                    <strong className="text-lg">Contact:</strong>

                    <span className="mt-2"> <b>Email:</b>{email}</span>
                    {!!firstName && <span> <b>Firstanme:</b> {firstName} </span>}
                    {!!lastName && <span> <b>Lastname:</b> {lastName} </span>}
                    <span> <b>Phone number:</b> {phoneNumber} </span>  
                    <span> <b>Id:</b> {userId}</span>
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
              md: "repeat(3, 1fr)" },gap: 2,overflow: "auto",marginTop: 2, padding: 0}} value="1"><ActiveCars userId={userId}/>
        </TabPanel>
        <TabPanel sx={{width: "100%",display: "grid",gridTemplateColumns: { 
              xs: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)" },gap: 2,overflow: "auto",marginTop: 0, padding: 0}} value="2"><SoldCars userId={userId}/>
        </TabPanel>
      </TabContext> 
        </div>
         

    </div>

    <RepUser open={openRepUser} onClose={handleCloseRepUser} userId={userId}/>
    </div>
}

export default UserDetails;