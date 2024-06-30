import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import axiosI from "../../Axios";
import { useDispatch } from 'react-redux';
import { addEmail, addId } from "../../redux/slices/credentialsSlise";
import {signInWithPopup,FacebookAuthProvider,GoogleAuthProvider} from 'firebase/auth';
import { auth } from "../../firebaseConfig";

const LoginPage = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const [password,setPassword] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        
        if (token && role) {
            navigate(ROUTES.HOME);
        }
    }, [navigate]);

    const login = async (e) => {
        e.preventDefault();

        try {
            const username = user;
            const dealershipName = user;
            const { data } = await axiosI.post('/login/user', { username, dealershipName, password });
            setLoading(true);
           
            localStorage.setItem("token",data.token);
            localStorage.setItem("role",data.data.role); 
            localStorage.setItem("img",data.data.image); 

            dispatch(addEmail(data.data.email));
            dispatch(addId(data.data._id));

            if(data.data.role === 'ADMIN'){
                navigate(ROUTES.ADMIN_HOME);
            }else{
                navigate(ROUTES.HOME);

            }

            } catch (e) {
            setError(e?.response?.data || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
    

    const signUpWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider).then(async (re) => {
            const username = re.user.displayName;
            const email = re.user.email;
            const firstName = re._tokenResponse.firstName;
            const lastName = re._tokenResponse.lastName;
            const password = re.user.uid;
            const image = re.user.photoURL;
            const phoneNumber = re.user.phoneNumber ? re.user.phoneNumber : '+387000000';
    
            if (!user || !email || !firstName || !lastName || !password || !image || !phoneNumber) {
                setError("Some required fields are missing.");
                return;
            }
    
            const register = async () => {
                try {
                    const location = { city: 'Sarajevo' }; 
                    const { data } = await axiosI.post('/register/user', { username, email, firstName, lastName, image, phoneNumber, location, password });
                    console.log(data);

                    localStorage.setItem("token",data.token);
                    localStorage.setItem("role",data.data.role); 
                    localStorage.setItem("img",data.data.image); 

                    dispatch(addEmail(data.data.email));
                    dispatch(addId(data.data._id));
                    navigate(ROUTES.HOME);

                } catch (e) {
                    setError(e?.response?.data || 'Something went wrong');
                }
            }
            register();
        }).catch((err) => {
            alert(err?.message || 'Something went wrong');
        })
    }

    const signUpWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(async (re) =>{
            const username = re.user.displayName;
            const email = re.user.email;
            const firstName = re._tokenResponse.firstName;
            const lastName = re._tokenResponse.lastName;
            const password = re.user.uid;
            const image = re.user.photoURL;
            const phoneNumber = re.user.phoneNumber ? re.user.phoneNumber : '+387000000';
    
            if (!user || !email || !firstName || !lastName || !password || !image || !phoneNumber) {
                setError("Some required fields are missing.");
                return;
            }
    
            const register = async () => {
                try {
                    const location = { city: 'Sarajevo' };
                    const { data } = await axiosI.post('/register/user', { username, email, firstName, lastName, image, phoneNumber, location, password });
                    console.log(data);

                    localStorage.setItem("token",data.token);
                    localStorage.setItem("role",data.data.role); 
                    localStorage.setItem("img",data.data.image); 

                    dispatch(addEmail(data.data.email));
                    dispatch(addId(data.data._id));
                    navigate(ROUTES.HOME);

                } catch (e) {
                    setError(e?.response?.data || 'Something went wrong');
                }
            }
            register();
        }).catch((err)=>{
            alert(err?.message || 'Something went wrong');
        })
    }
    

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-2/5 h-full border-4 border-black box-border custom-shadow rounded-3xl flex flex-col p-6 justify-around">
                <span className="text-center font-bold text-2xl sm:text-3xl">Car Dealership</span>

                <form onSubmit={login} className="flex flex-col gap-4 w-full"> 
                    <TextField value={user} onChange={(e) => setUser(e.target.value)} label="Username or Dealership name" variant="standard" />

                    <FormControl sx={{ width: '100%' }} variant="standard">
                        <InputLabel>Password</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {error ? <span className="text-red-500 font-semibold">{error}</span> : null}
                    <Button onClick={login} type='submit' variant="contained" color="secondary" className="!rounded-2xl !self-center w-1/5">
                        {!!loading ? <CircularProgress /> : <>Log in <LoginIcon /></>}
                    </Button>

                </form>

                <span className='text-center font-extrabold text-slate-400 text-2xl'>OR</span>

                <div className='flex flex-col items-center gap-4'>
                    <div onClick={signUpWithFacebook} className='w-1/2 font-bold flex whitespace-pre cursor-pointer border-2 border-black box-border rounded-xl hover:bg-gray-300 items-center justify-between p-4'>
                        Continue with FACEBOOK <FacebookIcon size='large' color='primary' />
                    </div>
                    <div onClick={signUpWithGoogle} className='w-1/2 font-bold flex whitespace-pre cursor-pointer border-2 border-black box-border rounded-xl hover:bg-gray-300 items-center justify-between p-4'>
                        Continue with GMAIL <GoogleIcon size='large' sx={{ color: "orange" }} />
                    </div>
                    <div onClick={() => navigate(ROUTES.HOME)} className='w-1/2 font-bold flex whitespace-pre cursor-pointer border-2 border-black box-border rounded-xl hover:bg-gray-300 items-center justify-between p-4'>
                        Continue as GUEST <PersonIcon size='large' sx={{ color: "black" }} />
                    </div>
                </div>

                <div className="flex flex-row gap-2 w-full justify-center text-lg font-semibold">
                    <span>Doesn't have account?</span>
                    <span onClick={() => navigate(ROUTES.REGISTER)} className="cursor-pointer hover:underline text-blue-400">Register now</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
