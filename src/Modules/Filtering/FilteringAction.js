import axios from 'axios';
import { toast } from 'react-toastify';
import {
    SEARCH_SUCCESS,
    SEARCH_FAILURE
} from '../Search/SearchAction.'

const BaseUrl = "http://localhost:443/api"


export const searchAlphabeta = (navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search-alphabeta`);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "success")navigate("advanced-filter")
            if(response.data.status === "failed") toast.warning("No data to match")
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};

export const searchPopularity = (navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search-popularity`);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "success")navigate("advanced-filter")
            if(response.data.status === "failed") toast.warning("No data to match")
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};

export const searchRecent = (navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search-recent`);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "success")navigate("advanced-filter")
            if(response.data.status === "failed") toast.warning("No data to match")
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};

export const searchVolume = (navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/search-volume`);
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "success")navigate("advanced-filter")
            if(response.data.status === "failed") toast.warning("No data to match")
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: SEARCH_FAILURE,
            });
        }
    };
};


