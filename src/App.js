import React, { useEffect } from 'react';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
