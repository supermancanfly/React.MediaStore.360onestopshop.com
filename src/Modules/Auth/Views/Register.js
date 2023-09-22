import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { Register } from '../Actions/Action';

const RegisterView = () => {
  const dispatch = useDispatch();
  const Result = useSelector((Reducer) => Reducer.Auth);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState(null);
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  function registerHandler() {
    const data = {
      name: name,
      email: email,
      phone: phone,
      password: password
    }

    if (password == confirmPassword) {
      dispatch(Register(data, navigate));
    } else {
      toast.warn("Password dismatch")
    }
  }
  
  const toggleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-red-500">
            User Registration
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  onChange={(e) => { setname(e.target.value) }}
                  placeholder="Name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  type="tel"
                  name="phone"
                  onChange={(e) => { setphone(e.target.value) }}
                  placeholder="Phone Number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
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

              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => { setpassword(e.target.value) }}
                      placeholder="Password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={(e) => { setconfirmPassword(e.target.value) }}
                      placeholder="Confirm Password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className='flex item-center py-2 justify-between'>
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    checked={isChecked}
                    onChange={toggleCheckboxChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="comments" className="block px-2 text-sm font-medium leading-6 text-red-500">
                    I accept the 
                  </label>
                  <Link to="/read-more" className='text-blue-600 hover:text-red-500'>Terms and Privacy Policy</Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                disabled={!isChecked}  // button is disabled if checkbox is not checked
                onClick={registerHandler}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                            ${isChecked ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-500 cursor-not-allowed'} 
                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Register
              </button>
            </div>
          </div>

          <p className="mt-10 text-left text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/signin" className="font-semibold leading-6 text-red-500 hover:text-indigo-500">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
