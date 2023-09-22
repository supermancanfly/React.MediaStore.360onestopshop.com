import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = "http://localhost:443/api"



export const saveUserProfile = (payload, navigate) => {

    return async () => {
        try {
            const token = localStorage.getItem('token');
            // axios.defaults.headers.common['Authorization'] = token;
            // axios.defaults.headers.common['Content-Type'] =  "multipart/form-data"
        
            const response = await axios.post(`${BaseUrl}/saveuserprofile`, payload, {
                headers: {
                    "Authorization": token,
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success('Successfully joined')
            navigate("/");
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Login failed');
        }
    };
};