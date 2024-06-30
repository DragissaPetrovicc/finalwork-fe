import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { useNavigate } from 'react-router-dom';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { ROUTES } from '../routes';
import { useDispatch } from 'react-redux';
import { removeCredentials } from "../redux/slices/credentialsSlise";

const Header = ({ darkMode }) => {
  
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const image = localStorage.getItem("img");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");  
  const dispatch = useDispatch();
 
  useEffect(() => {
    

    if (token && role && image) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token,role,image]);

  const handleOpen = () => setSpeedDialOpen(true);
  const handleClose = () => setSpeedDialOpen(false);

  const myProfile = () => navigate(ROUTES.MY_PROFILE);
  const settings = () => navigate(ROUTES.SETTINGS);
  const favArticles = () => navigate(ROUTES.SAVED_ARTICLES);
  const favSearches = () => navigate(ROUTES.SAVED_SEARCHES);
  const help = () => navigate(ROUTES.HELP_PAGE);
  const privAndSec = () => navigate(ROUTES.PRIVACY_AND_SECURITY);
  const helpCenter = () => navigate(ROUTES.HELP_CENTER);
  const repProblem = () => navigate(ROUTES.REPORT_PROBLEM);

  const logOut = () => {

    localStorage.removeItem("img");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(removeCredentials());
    navigate(ROUTES.LOG_IN);

  }

  return (
    <div className={`h-[120px] bg-slate-500 p-2 md:px-7 xl:px-10 sm:py-4 md:py-6 lg:py-8 w-full border-b-4 border-fuchsia-700 flex flex-row items-center justify-between ${darkMode ? 'dark' : 'light'}`}>
      <div className='flex text-lg sm:text-2xl md:text-4xl font-bold flex-row items-center justify-center gap-2 w-max h-min'>
        <span>Car Dealership</span>
      </div>
      {!loggedIn ? (
        <Button onClick={() => navigate(-1)} size='small' variant='contained' color='secondary'>
          Back <ArrowBackIcon />
        </Button>
      ) : ( <div className='flex flex-row self-start justify-self-center gap-4'>

<Button onClick={() => navigate(-1)} size='small' variant='contained' color='secondary' className='h-min !mt-3'> 

          Back <ArrowBackIcon />
        </Button>

        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ alignSelf: "self-center", justifySelf: "self-center" }}
          icon={<img src={image} alt="" className='w-full h-full self-center items-center justify-center rounded-full object-cover' />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={speedDialOpen}
          direction='down'
        >
          
            <SpeedDialAction onClick={myProfile} sx={{ whiteSpace: 'nowrap' }} icon={<AccountCircleIcon/>} tooltipTitle='My Profile' tooltipOpen />
            <SpeedDialAction onClick={settings} sx={{ whiteSpace: 'nowrap' }} icon={<SettingsIcon/>} tooltipTitle='Settings' tooltipOpen />
            {role === 'USER' ? <SpeedDialAction onClick={favArticles} sx={{ whiteSpace: 'nowrap' }} icon={<FavoriteIcon/>} tooltipTitle='Favorite Articles' tooltipOpen /> : null}
            {role === 'USER' ? <SpeedDialAction onClick={favSearches} sx={{ whiteSpace: 'nowrap' }} icon={<SavedSearchIcon/>} tooltipTitle='Favorite Searches' tooltipOpen />: null}
            <SpeedDialAction onClick={help} sx={{ whiteSpace: 'nowrap' }} icon={<HelpOutlineOutlinedIcon/>} tooltipTitle='Help' tooltipOpen />
            {role === 'USER' ? <SpeedDialAction onClick={privAndSec} sx={{ whiteSpace: 'nowrap' }} icon={<SecurityIcon/>} tooltipTitle='Privaci & Security' tooltipOpen /> : null}
            <SpeedDialAction onClick={helpCenter} sx={{ whiteSpace: 'nowrap' }} icon={<HelpCenterIcon/>} tooltipTitle='Help Center' tooltipOpen />
            {role === 'USER' ? <SpeedDialAction onClick={repProblem} sx={{ whiteSpace: 'nowrap' }} icon={<ReportProblemIcon/>} tooltipTitle='Report Problem' tooltipOpen />: null}
            <SpeedDialAction onClick={logOut} sx={{ whiteSpace: 'nowrap' }} icon={<LogoutIcon/>} tooltipTitle='Logout' tooltipOpen />

        </SpeedDial>
        </div>
      )}
    </div>
  );
}

export default Header;
