import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_HOME_FAILURE, GET_HOME_SUCCESS } from '../../Home/Actions/HomeAction';

const BaseUrl = "http://localhost:443/api"



export const updateHome = (payload) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/update-home-list`, payload);
            dispatch({
                type: GET_HOME_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "success") toast.info(response.data.message)
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: GET_HOME_FAILURE,
            });
        }
    };
};




