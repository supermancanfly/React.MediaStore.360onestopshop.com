import React from 'react'
import jwt_decode from "jwt-decode"
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Auth/Actions/Action'
import IconMan from '../../Assets/Icons/man.png'
import GmailIcon from '../../Assets/Icons/google.png'
import { toast } from 'react-toastify'
import { googleLogout } from '@react-oauth/google';

const navigation = [
    { name: 'Home', to: '/', current: false },
    { name: 'Audio', to: '/audio', current: false },
    { name: 'Video', to: '/video', current: false },
    { name: 'Subscribe', to: '/choose-plan', current: false },
    { name: 'About', to: '/about', current: false },
    // { name: 'About', to: '/about', current: false },
    // { name: 'Join Us', to: 'joinus', current: false },
    // { name: 'DMCA', to: 'dmca', current: false },
    // { name: 'Disclaimers', to: 'disclaimers', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TopBar() {

    const dispatch = useDispatch();
    const [customPermission, setCustomPermission] = React.useState('');
    const [avatar, setAvatar] = React.useState(null);
    const authState = useSelector((Reducer) => Reducer.Auth);
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            googleLogout();
            toast.info('Log out');
            localStorage.removeItem('token');
            navigate('/signin');
            // dispatch(logout(navigate));
        } catch (error) {
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setCustomPermission(decodedToken.permission);
        }
        authState.user.from === "local" ? setAvatar(authState.user.photourl ? `http://localhost:443/asset${authState.user.photourl}` : IconMan) : setAvatar(GmailIcon);
    }, [])

    return (
        <Disclosure as="nav" className="bg-indigo-950">

            {({ open }) => (
                <>
                    <div className="mx-auto max-w-9xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start md:justify-center">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button> */}

                                {/* Profile dropdown */}
                                {!authState.success && <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button>
                                            <Link to="/signin" className="bg-indigo-800 hover:bg-red-400 text-white py-1.5 px-4 rounded-full">
                                                MEMBER LOGIN
                                            </Link>
                                        </Menu.Button>
                                    </div>
                                </Menu>}
                                {authState.success && <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full ring-2 ring-indigo-800 bg-indigo-800 text-sm focus:outline-none focus:ring-2 focus:ring-purle-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 m-0.5 rounded-full"
                                                src={avatar ? avatar : ""}
                                                alt=""
                                            />
                                            <p className='pt-1 pl-2 pr-3 text-lg text-gray-300 font-bold'>{authState.user.name}</p>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="/profile"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        MyProfile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to=""
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </Link>
                                                )}
                                            </Menu.Item> */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/signin"
                                                        onClick={logoutHandler}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Logout
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    to={item.to}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>

                </>
            )}
        </Disclosure>
    )
}
