import React,{useState,useEffect} from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RegisterUser from "../components/RegisterUserComponent";
import RegisterCarDealer from "../components/RegisterCarDealer";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        
        if (token && role) navigate(ROUTES.HOME);
        
    }, [navigate]);


    const [value, setValue] = useState('1');
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("role");
    
      },[])

    return <div className="flex items-center justify-center w-full h-full ">
    <div className="w-2/5 h-full border-4 border-black box-border custom-shadow rounded-xl flex flex-col p-6 overflow-auto ">
    <span className="text-center font-bold text-2xl sm:text-3xl">Car Dealership</span>

        <TabContext value={value}>
            <TabList sx={{alignSelf:"center"}} textColor="secondary" indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="As User" value="1" />
                <Tab label="As Car Dealer" value="2" />
            </TabList>
            <TabPanel value="1"><RegisterUser/></TabPanel>
            <TabPanel value="2"><RegisterCarDealer/></TabPanel>
        </TabContext>                
        
        <div className="flex flex-row gap-2 pt-3 w-full justify-center text-lg font-semibold">
            <span>Already have account?</span>
            <span onClick={() => navigate(ROUTES.LOG_IN)} className="cursor-pointer hover:underline text-blue-400">Login now</span>
        </div>                
    </div>
</div>
}
export default RegisterPage;