import { useEffect } from "react";
import { ROUTES } from "./routes";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const handleNavigation = () => {
            if (!token) {
                alert("Access denied, you have to log in first");
                navigate(ROUTES.LOG_IN);
            } 
        };

        handleNavigation();
    }, [navigate, token]);

    return children;
};

export default PrivateRoute;