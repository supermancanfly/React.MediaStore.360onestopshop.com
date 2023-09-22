import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = "http://localhost:443/api"

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = "REGOSTER_FAILURE"

export const Login = (payload, navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/login`, payload);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            response?.data?.user?.permission === "admin" ? navigate('/admin') : navigate('/');
            toast.success('Successfully joined')
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Login failed');
            dispatch({
                type: LOGIN_FAILURE,
            });
        }
    };
};

export const googleBackendLogin = (payload, navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/googleLogin`, payload);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            response?.data?.user?.permission === "admin" ? navigate('/admin') : navigate('/');
            toast.success('Successfully joined')
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Login failed');
            dispatch({
                type: LOGIN_FAILURE,
            });
        }
    };
};

export const Register = (payload, navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/register`, payload);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            toast.info("Created your account");
            navigate('/signin');
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.warn("Register failed.");
            dispatch({
                type: REGISTER_FAILURE,
            });
        }
    };
};

export const resetpassword = (payload, navigate) => {

    return async () => {
        try {
            const response = await axios.post(`${BaseUrl}/reset-password`, payload);
            if(response.data.status === "success")toast.success(response.data.message);
            navigate('/signin');
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.warn("Failed.");
        }
    };
};


export const logout = (navigate) => {
    navigate('/signin');
    toast.info('Log out');
    localStorage.removeItem('token');
    // return (dispatch) => {
    //     dispatch({
    //         type: LOGIN_FAILURE
    //     });
    // }
}