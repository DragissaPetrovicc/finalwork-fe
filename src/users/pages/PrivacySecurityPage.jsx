import PrivateRoute from '../../PrivateRoute';
import { Button } from '@mui/material';
import { ROUTES } from '../../routes';
import { useNavigate } from 'react-router-dom';

const PrivacyAndSecurity = () => {

    const navigate = useNavigate();

    return <PrivateRoute>
        <div className="flex flex-col w-full h-full justify-center items-start p-4 gap-12">

            <span className="text-3xl font-bold text-center">Privacy and Security</span>

            <div className="flex flex-col text-left justify-start items-start gap-2 overflow-auto">

                <span className="text-lg font-semibold">Privacy Policy</span>
                <span className="text-gray-700">Your privacy is important to us. This privacy statement explains what information we collect from you, how we use it, and how we protect it.</span>
                <span className="text-lg font-semibold">What information do we collect?</span>
                <span className="text-gray-700">We only collect information from you that you voluntarily provide to us during registration or when using our services. This may include your name, email address, phone number, addresses, and similar.</span>
                <span className="text-lg font-semibold">How do we use your information?</span>
                <span className="text-gray-700">We use your information to provide you with a better user experience on our platform, to give you access to certain services and features, and to deliver relevant information about products or services that may interest you.</span>
                <span className="text-lg font-semibold">How do we protect your information?</span>
                <span className="text-gray-700">We are committed to keeping your information secure. We use various technologies and procedures to protect your data from unauthorized access, use, or disclosure.</span>
                <span className="text-lg font-semibold">Sharing information with third parties</span>
                <span className="text-gray-700">We will not share your information with third parties without your permission, except when necessary to provide the services you requested or as required by law.</span>
                <span className="text-lg font-semibold">Changes to our privacy policy</span>
                <span className="text-gray-700">We may occasionally update this privacy statement to reflect changes in our practices or legal requirements. Please check this page periodically for updates.</span>

            </div>

            <Button onClick={() => navigate(ROUTES.HOME)} color='secondary' variant="contained" sx={{ fontWeight: 'bolder', alignSelf:'center', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.1)', bgcolor: '#d946ef', }, }}>Home</Button>

        </div>
    </PrivateRoute>

}
export default PrivacyAndSecurity;