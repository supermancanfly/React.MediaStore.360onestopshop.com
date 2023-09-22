import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

import { resetpassword } from '../Actions/Action';

const ForgotPasswordView = () => {

    const dispatch = useDispatch();

    const Result = useSelector((Reducer) => Reducer.Auth);
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);
    const [isverified, setIsverified] = useState(false);

    function registerHandler() {
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        if (password == confirmPassword) {
            dispatch(resetpassword(data, navigate));
        } else {
            toast.warn("Password dismatch")
        }
    }

    const toggleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const activeVerifiedEmail = () => {
        setIsverified(true)
    }

    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-40 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-red-500">
                        Password Reset
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {
                        !isverified && <div className="space-y-6" >
                            <div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            onChange={(e) => { setEmail(e.target.value) }}
                                            placeholder="New passowrd"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="button"
                                    disabled={!email}
                                    onClick={activeVerifiedEmail}
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm 
                                ${email ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-500 cursor-not-allowed'} 
                                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                >
                                    Confirm Email
                                </button>
                            </div>
                        </div>
                    }
                    {
                        isverified && <div className="space-y-6" >
                            <div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        New password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            onChange={(e) => { setpassword(e.target.value) }}
                                            placeholder="New passowrd"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirm new password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            onChange={(e) => { setconfirmPassword(e.target.value) }}
                                            placeholder="Confirm password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
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
                                            I accept the Terms and Privacy Policy
                                        </label>
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
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    }

                    <p className="mt-10 text-left text-sm text-gray-500">
                        Click here to go to{'   '}
                        <Link to="/signin" className="font-semibold leading-6 text-red-500 hover:text-indigo-500">
                            LogIn
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordView;
