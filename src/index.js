import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import './styles.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { LOGIN_SUCCESS } from './Modules/Auth/Actions/Action';

const BaseUrl = "http://localhost:80/api";

const InitApp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;

    const refreshToken = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/refreshToken`);

        if (response.data.status === "success") {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.data,
          });
          toast.info(response.data.message);
        }

        if (response.data.status === "failed") {
          toast.warn(response.data.message);
          localStorage.removeItem("token");
        }
      } catch (error) {
      }
    };

    refreshToken();
  }, [dispatch], []);

  return (
    <React.StrictMode>
                  <GoogleOAuthProvider
              clientId="647859968097-ot0l922ea3s2v3hmb4na24c0ui3ounne.apps.googleusercontent.com"
            >
      <App />
            </GoogleOAuthProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <InitApp />
  </Provider>
);

reportWebVitals();
