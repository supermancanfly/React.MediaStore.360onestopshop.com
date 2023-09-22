import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = "http://localhost:443/api"

export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_FAILURE = "SEARCH_FAILURE";


export const searchaction = (payload) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search`, payload);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "failed") toast.warning("No data to match")
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};


