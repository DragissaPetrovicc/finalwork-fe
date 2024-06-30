import { useEffect } from "react";
import { ROUTES } from "./routes";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {
        const handleNavigation = () => {
            if (!token) {
                alert("Access denied, you have to log in first");
                navigate(ROUTES.LOG_IN);
            }else if(token && role !== "ADMIN"){
                alert("Access denied, only administrators are allower");
                navigate(ROUTES.LOG_IN);
            }
        };

        handleNavigation();
    }, [navigate, token,role]);

    return children;
};

export default AdminRoute;