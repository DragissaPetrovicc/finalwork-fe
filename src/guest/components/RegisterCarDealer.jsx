import React, { useState } from "react";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { countries } from "./countries&cities";
import axiosI from "../../Axios";
import { CircularProgress } from "@mui/material";
import './input.css';
import { useDispatch } from 'react-redux';
import { addEmail, addId } from "../../redux/slices/credentialsSlise";
import RegisterModal from "../modals/RegisterModal";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";

const RegisterCarDealer = () => {
  const dispatch = useDispatch();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const role = localStorage.getItem('role'); 

  const handleOpen = () => setOpenRegisterModal(true);
  const handleClose = () => setOpenRegisterModal(false);

  const handleCountryChange = (e, value) => {
    setSelectedCountry(value ? value.label : "");
    setSelectedCity("");
  };

  const handleCityChange = (e, value) => {
    setSelectedCity(value ? value : "");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const imgUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dealershipName, setDealershipName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [registerClicked, setRegisterClicked] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const state = selectedCountry;
      const city = selectedCity;

      const { data } = await axiosI.post('/register/carDealer', {
        dealershipName,
        password,
        location: { state, city },
        image,
        contact: { email, phoneNumber }
      });

      
      
      if(role === 'ADMIN'){
        return navigate(ROUTES.ADMIN_HOME);
      }else{

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.data.role);
      localStorage.setItem("img", data.data.image);

      dispatch(addEmail(data.data.email));
      dispatch(addId(data.data._id));


        handleOpen();

      const modalCloseChecker = () => new Promise((resolve) => {
        const interval = setInterval(() => {
          if (registerClicked) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

      await modalCloseChecker();
      }
      
    } catch (e) {
      setError(e?.response ? e.response.data : e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={register} className="w-full h-fit flex flex-col gap-4 ">
      {error ? <span className="text-red-500 font-semibold">{error}</span> : null}
      <TextField value={dealershipName} onChange={(e) => setDealershipName(e.target.value)} label="Dealership name" variant="standard" />
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" />

      <FormControl variant="standard" fullWidth>
        <InputLabel shrink htmlFor="phone-input">
          Phone number
        </InputLabel>
        <PhoneInput
          id="phone-input"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          className="custom-phone-input"
        />
      </FormControl>

      <Autocomplete
        id="country-select-demo"
        sx={{ width: '100%' }}
        options={countries}
        autoHighlight
        getOptionLabel={(option) => option.label}
        onChange={handleCountryChange}
        value={countries.find(c => c.label === selectedCountry) || null}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <img loading="lazy" width="20" srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`} src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`} alt="" />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Choose a country"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />

      <Autocomplete
        id="city-select-demo"
        sx={{ width: '100%' }}
        options={selectedCountry ? countries.find(c => c.label === selectedCountry)?.cities : []}
        autoHighlight
        getOptionLabel={(option) => option}
        onChange={handleCityChange}
        value={selectedCity}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Choose a city"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
          />
        )}
      />

      <FormControl sx={{ width: '100%' }} variant="standard">
        <InputLabel>Password</InputLabel>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className='flex flex-row justify-between items-center'>
        <Button
          color="success"
          className="!whitespace-nowrap !self-center"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Choose Image
          <VisuallyHiddenInput type="file" onChange={imgUpload} />
        </Button>

        {image && <img className="w-24 h-24 rounded-full object-cover border-4 border-white custom-image-shadow" src={image} alt='' />}
      </div>

      <Button
        onClick={register}
        type="submit"
        variant="contained"
        color="secondary"
        className="!rounded-2xl !self-center"
      >
        {!!loading ? <CircularProgress /> : (role === 'ADMIN' ? 'Add User' : 'Register')}
      </Button>

      <RegisterModal open={openRegisterModal} onClose={handleClose} setRegisterClicked={setRegisterClicked} email={email} />
    </form>
  );
};

export default RegisterCarDealer;
