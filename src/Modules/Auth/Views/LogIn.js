import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { Login, googleBackendLogin } from '../Actions/Action';
import GoogleIcon from '../../../Assets/Icons/google.png';
import { toast } from 'react-toastify';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
const LoginView = () => {

  const dispatch = useDispatch();
  const Result = useSelector((state) => state.Auth);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();

  function loginHandler() {
    const data = {
      email: email,
      password: password
    }
    if (email && password) dispatch(Login(data, navigate));
    else toast.warn("Password dismatch")
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async response => {
      try {
        const googledata = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${response.access_token}` } });
        if (googledata.status === 200) {
          const data = {
            email: googledata.data.email,
            name: googledata.data.name,
            photoUrl: googledata.data.picture,
          }
          dispatch(googleBackendLogin(data, navigate));
        }
      } catch (err) {
      }
    }
  });

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-red-500">
            Welcome back!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <button
              type="submit"
              onClick={googleLogin}
              className="flex w-full justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 font-bold hover:bg-gray-100 border border-gray-400"
            >
              <img src={GoogleIcon} alt="" className='px-2' />
              Sign in with Google
            </button>
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Sign in with your Email</span>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => { setemail(e.target.value) }}
                  placeholder="Email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={(e) => { setpassword(e.target.value) }}
                  onKeyDown={(e) => { if (e.key === 'Enter') loginHandler() }}
                  placeholder="Password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className='flex item-center py-2 justify-between'>
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label className="block px-2 text-sm font-medium leading-6 text-gray-900">
                    Keep me logged in
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-red-500 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={loginHandler}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
            </div>
          </div>

          <p className="mt-10 text-left text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-red-500 hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
