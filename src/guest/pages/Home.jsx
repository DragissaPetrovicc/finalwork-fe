import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, CircularProgress, Button, Fab } from '@mui/material/';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import RatingModal from '../modals/RatingModal';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes';
import SortModal from '../modals/SortModal';
import FilterModal from '../modals/FilterModal';
import axiosI from '../../Axios';
import { useSelector } from 'react-redux';
import AllCars from '../components/AllCars';
import MyCars from '../components/MyCars';
import { useDispatch } from 'react-redux';
import { carId } from '../../redux/slices/selectedCarSlice';


const HomePage = () => {

    const id = useSelector(state => state.credentials.items[1]);
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");
    const [filteredCars, setFilteredCars] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [openRatingModal, setOpenRatingModal] = useState(false);
    const [filters, setFilters] = useState([]);
    const [openSortModal, setOpenSortModal] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [myCars,setMyCars] = useState([]);

    const [sortOptions, setSortOptions] = useState({});

    useEffect(() => {
        const loggedUser = localStorage.getItem("token");
        if (loggedUser) {
            setLoggedIn(true);
            const timer = setTimeout(() => {
                setOpenRatingModal(true);
            }, 20000);

            return () => clearTimeout(timer);
        } else {
            setLoggedIn(false);
        }
    }, []);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const addToFavSearchs = async () => {
        try {
            const carIds = filteredCars.map(car => car._id);
            const { data } = await axiosI.post(`/favoriteSearch/${id}`, { carIds }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        }
    };

    const addToFavArticles = async (carId) => {
        try {
            const { data } = await axiosI.post(`favoriteCar/${id}`, { carId }, { headers: { authorization: `Bearer ${token}` } });
            alert(data);
        } catch (e) {
            alert(e?.response?.data || "Something went wrong");
        }
    }

    const [clicked, setClicked] = useState(false);

    const showMyCars = () => {
        setClicked(!clicked);
        if(!!clicked) {
            getMyCars();    
            if(myCars.length === 0) setClicked(false);
        }

    };

    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(false);

    const role = localStorage.getItem("role");

      useEffect(()=>{
        if(role === 'ADMIN'){
        navigate(ROUTES.ADMIN_HOME);
      }else{
        navigate(ROUTES.HOME);
      }
      },[role,navigate]);

    useEffect(() => {
        const getCars = async () => {
            try {
                const { data } = await axiosI.get('/car/getCars');
                setLoading(true);
                setCars(data);
            } catch (e) {
                alert(e?.response?.data || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        getCars();
    }, []);

        const getMyCars = async () => {
            try {
                const { data } = await axiosI.get(`/cars/myCars/${id}`,{ headers: { authorization: `Bearer ${token}` } });
                setLoading(true);
                setMyCars(data);
            } catch (e) {
                alert(e?.response?.data || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (cars) {
            let results = [...cars];

            results = results.filter(car => {
                const matchesSearch = car.manufactorer.toLowerCase().includes(search.toLowerCase()) ||
                    car.model.toLowerCase().includes(search.toLowerCase());
                const matchesFilters = filters.every(filter => {
                    if (filter.type === 'price') {
                        return (!filter.value.from || car.price >= filter.value.from) &&
                            (!filter.value.to || car.price <= filter.value.to);
                    } else if (filter.type === 'year') {
                        return (!filter.value.from || car.year >= filter.value.from) &&
                            (!filter.value.to || car.year <= filter.value.to);
                    } else if (filter.type === 'drivetrain') {
                        return filter.value.includes(car.drivetrain);
                    } else {
                        return !filter.value || car[filter.type] === filter.value;
                    }
                });
                return matchesSearch && matchesFilters;
            });

                if (sortOptions.brand) {
                    results.sort((a, b) => a.manufactorer.localeCompare(b.manufactorer));
                } else if (sortOptions.model) {
                    results.sort((a, b) => a.model.localeCompare(b.model));
                } else if (sortOptions.priceAsc) {
                    results.sort((a, b) => a.price - b.price);
                } else if (sortOptions.priceDesc) {
                    results.sort((a, b) => b.price - a.price);
                } else if (sortOptions.mileageAsc) {
                    results.sort((a, b) => a.mileage - b.mileage);
                } else if (sortOptions.mileageDesc) {
                    results.sort((a, b) => b.mileage - a.mileage);
                } else if (sortOptions.yearAsc) {
                    results.sort((a, b) => a.year - b.year);
                } else if (sortOptions.yearDesc) {
                    results.sort((a, b) => b.year - a.year);
                }
            

            setFilteredCars(results);
        }
    }, [search, cars, filters, sortOptions]);

    const updateSortOptions = (updatedOptions) => {
        setSortOptions(updatedOptions);
    };

    const resetSortOptions = () => {
        setSortOptions({
            brand: false,
            model: false,
            priceAsc: false,
            priceDesc: false,
            mileageAsc: false,
            mileageDesc: false,
            yearAsc: false,
            yearDesc: false,
        });
    };


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
    

    return (
        <div className="h-full gap-10 w-full flex flex-col">
            <div className='w-full flex flex-row justify-between gap-4 items-center'>
                <TextField value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} placeholder="Search..." variant="outlined" className='!w-full' />

                {loggedIn ? <div className='flex flex-row- gap-2'>
                    <Checkbox onClick={addToFavSearchs} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                    <Button className='!w-min !h-full !whitespace-nowrap' onClick={showMyCars} variant='contained' color={clicked ? 'success' : 'primary'}>my cars</Button></div>
                    :
                    <Button onClick={() => navigate(ROUTES.LOG_IN)} variant='contained' color='secondary' className='!h-full !whitespace-nowrap'>Log in<LoginIcon /> </Button>}
            </div>

            {!!loading ? <CircularProgress /> : (
                <div className='flex-grow-1 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 overflow-y-auto'>
                    {clicked ? (
                        myCars.length > 0 ? (
                            myCars.map(car => (
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
                        )
                    ) : (
                        filteredCars.length > 0 ? (
                            filteredCars.map(car => (
                                <AllCars
                                    key={car._id}
                                    img={car.images}
                                    manufactorer={car.manufactorer}
                                    model={car.model}
                                    year={car.year}
                                    condition={car.mileage < 5000 ? 'NEW' : 'USED'}
                                    price={car.price}
                                    mileage={car.mileage}
                                    fuel={car.fuel}
                                    onFavorite={() => addToFavArticles(car._id)}
                                    carId={car._id}
                                    onClick={() => navCarDetails(car._id)}

                                />
                            ))
                        ) : (
                            <span className='font-bold'>There is no cars available</span>
                        )
                    )}
                </div>
            )}

            <Fab onClick={() => setOpenFilterModal(true)} color='secondary' sx={{ position: "fixed", bottom: "127px", left: "7px" }}><FilterAltIcon /></Fab>
            <Fab onClick={() => setOpenSortModal(true)} color='primary' sx={{ position: "fixed", bottom: "127px", left: "67px" }}><SortIcon /></Fab>
            <Fab onClick={() => navigate(ROUTES.ADD_CAR)} color='secondary' sx={{ position: "fixed", bottom: "127px", right: "7px" }}><AddIcon /></Fab>

            <RatingModal open={openRatingModal} onClose={() => setOpenRatingModal(false)} />
            <FilterModal open={openFilterModal} handleClose={() => setOpenFilterModal(false)} setFilters={setFilters} />
            <SortModal open={openSortModal} handleClose={() => setOpenSortModal(false)} sortOptions={sortOptions} updateSortOptions={updateSortOptions} handleSort={resetSortOptions} />

        </div>
    );
}

export default HomePage;