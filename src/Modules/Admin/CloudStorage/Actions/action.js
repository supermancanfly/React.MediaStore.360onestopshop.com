import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = "http://localhost:443/api"

export const GET_MEGA_LIST_SUCCESS = "GET_MEGA_LIST_SUCCESS";
export const ADD_MEGA_LIST_SUCCESS = "ADD_MEGA_LIST_SUCCESS";
export const GET_MEGA_LIST_FAILURE = "GET_MEGA_LIST_FAILURE";
export const ADD_MEGA_LIST_FAILURE = "ADD_MEGA_LIST_FAILURE";
export const DELETE_MEGA_FILE_SUCCESS = "DELETE_MEGA_FILE_SUCCESS";
export const DELETE_MEGA_FILE_FAILURE = "DELETE_MEGA_FILE_FAILURE";
export const EDIT_MEGA_FILE_SUCCESS = "EDIT_MEGA_FILE_SUCCESS";
export const EDIT_MEGA_FILE_FAILURE = "EDIT_MEGA_FILE_FAILURE";

export const addMegaList = (payload, navigate) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/add-mega-list`, payload);
            dispatch({
                type: ADD_MEGA_LIST_SUCCESS,
                payload: response.data
            });
            if(response.data.status === "addsuccess")toast.success(response.data.message);
            if(response.data.status === "alreadysuccess")toast.warning(response.data.message);
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: ADD_MEGA_LIST_FAILURE,
            });
        }
    };
};

export const getMegaList = () => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/get-mega-list`);
            dispatch({
                type: GET_MEGA_LIST_SUCCESS,
                payload: response.data
            });
            return response.data.data;
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: GET_MEGA_LIST_FAILURE,
            });
        }
    };
};

export const deleteMegaFile = (payload) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/delete-mega-file`, payload);
            dispatch({
                type: DELETE_MEGA_FILE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: DELETE_MEGA_FILE_FAILURE,
            });
        }
    };
};

export const editMegaFile = (payload) => {

    return async (dispatch) => {
        try {
            const response = await axios.post(`${BaseUrl}/edit-mega-file`, payload);
            dispatch({
                type: EDIT_MEGA_FILE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            error.response ? toast.warn(error.response.data.message) : toast.error('Failed');
            dispatch({
                type: EDIT_MEGA_FILE_FAILURE,
            });
        }
    };
};

