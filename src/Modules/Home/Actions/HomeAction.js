import axios from 'axios';
import { toast } from 'react-toastify';
import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE 
} from "../../Search/SearchAction."

const BaseUrl = "http://localhost:443/api"

export const GET_HOME_SUCCESS = "GET_HOME_SUCCESS";
export const GET_HOME_FAILURE = "GET_HOME_FAILURE";

export const getHome = () => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/get-home-list`);
            dispatch({
                type: GET_HOME_SUCCESS,
                payload: response.data
            });
            return response.data.data;
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: GET_HOME_FAILURE,
            });
        }
    };
};

export const searchaction = (payload, navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search`, payload);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            navigate("/search");
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};


