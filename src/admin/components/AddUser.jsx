import React,{useState} from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import RegisterUser from "../../guest/components/RegisterUserComponent";
import RegisterCarDealer from "../../guest/components/RegisterCarDealer";


const AddUser = () => {

    const [value, setValue] = useState('1');

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return <div className="flex items-center justify-center w-full h-full">
    <div className="w-2/5 h-full border-4 border-black box-border custom-shadow rounded-xl flex flex-col p-6 overflow-auto">
    <span className="text-center font-bold text-2xl sm:text-3xl">Add User</span>

        <TabContext value={value}>
            <TabList sx={{alignSelf:"center"}} textColor="secondary" indicatorColor="secondary" onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="As User" value="1" />
                <Tab label="As Car Dealer" value="2" />
            </TabList>
            <TabPanel value="1"><RegisterUser/></TabPanel>
            <TabPanel value="2"><RegisterCarDealer/></TabPanel>
        </TabContext>                
        

    </div>
</div>
}

export default AddUser;