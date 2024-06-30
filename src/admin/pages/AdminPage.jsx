import {TextField,InputAdornment, Button } from '@mui/material/';
import Cars from '../components/Cars';
import SearchIcon from '@mui/icons-material/Search';
import AdminRoute from '../../AdminRoute';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import React ,{useState} from 'react';

const AdminHome = () => {

    const [search,setSearch] = useState('');   
    
    const navigate = useNavigate();

    return <AdminRoute>
    <div className='h-full w-full flex flex-col justify-between'>
        <span className='text-center text-2xl font-bold'>Admin Home</span>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
                placeholder="Search..." variant="outlined" className='!w-full'/>

        <Button onClick={() => navigate(ROUTES.ADMIN_DASHBOARD)} color='success' variant='contained' className='!w-fit !whitespace-nowrap !self-end'>Go to dashboard <DashboardIcon/></Button>        

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 overflow-auto">
        <Cars searchQuery={search}/>            
            </div>        


    </div>
</AdminRoute>
}

export default AdminHome;