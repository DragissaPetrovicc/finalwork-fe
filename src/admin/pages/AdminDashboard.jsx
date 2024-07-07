import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Button } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import UserSection from "../components/UsersSection";
import CarReports from "../components/ReportedCarsSection";
import UserReports from "../components/ReportedUsersSection";
import AdminRoute from "../../AdminRoute";
import Ratings from "../components/Ratings";
import Problems from "../components/Problems";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <AdminRoute>
      <div className="flex flex-col w-full h-full justify-between gap-3">
        <div className="flex flex-row justify-between">
          <span className="text-2xl font-bold">Admin Dashboard</span>
          <Button
            onClick={() => navigate(ROUTES.ADMIN_HOME)}
            color="success"
            variant="contained"
            className="!w-fit !whitespace-nowrap !self-end"
          >
            Go to home <HomeIcon />
          </Button>
        </div>

        <div className="flex-grow flex flex-col md:flex-row gap-4 items-center w-full h-full">
          <UserReports />
          <CarReports />
          <UserSection />
        </div>

        <Ratings />
        <Problems />

        <div className="flex flex-row justify-between items-center w-full">
          <Button
            variant="contained"
            className="!self-end !whitespace-nowrap"
            onClick={() => navigate(ROUTES.ADD_USER)}
          >
            Add user <AddIcon />
          </Button>
          <Button
            variant="contained"
            className="!self-end !whitespace-nowrap"
            onClick={() => navigate(ROUTES.ADD_CAR)}
          >
            Add car <AddIcon />
          </Button>
        </div>
      </div>
    </AdminRoute>
  );
};
export default AdminDashboard;
