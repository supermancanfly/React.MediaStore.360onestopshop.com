import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import $ from "jquery"
import { toast } from 'react-toastify';

import IconMan from '../../../../Assets/Icons/man.png'
import TopBar from "../../TopBar";
import Footer from "../../Footer";
import { saveUserProfile } from "../Actions/userProfileAction";


const UserProfileView = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector((state) => state?.Auth?.user)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [permission, setPermission] = useState("");
    const [country, setCountry] = useState("");
    const [timezone, setTimezone] = useState("");
    const [bio, setBio] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [previewImage, setPreviewImage] = useState(IconMan);
    
    useEffect(() => {
        setName(userData?.name || ""); 
        setEmail(userData?.email || "");
        setPermission(userData?.permission || "");
        setCountry(userData?.country || "");
        setTimezone(userData?.timezone || "");
        setBio(userData?.bio || "");
        setPhotoUrl(userData?.photoUrl || "");
    }, []);

    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setPreviewImage(fileReader.result);
        });
        fileReader.readAsDataURL(file);
    }

    const handleSave = () => {
        const token = localStorage.getItem('token');
        let _id = "";
        if (token) {
            const decodedToken = jwt_decode(token);
            _id = decodedToken._id;
        }

        const image = $('#file-upload').prop('files')[0] ? $('#file-upload').prop('files')[0] : "";

        if (_id && name && email && permission && timezone && country && bio) {
            const data = new FormData();
            data.append("_id", _id);
            data.append("name", name);
            data.append("email", email);
            data.append("permission", permission);
            data.append("country", country);
            data.append("timezone", timezone);
            data.append("bio", bio);
            data.append("photo", image);
            // image ? data.append("photo", image) : data.append("photo", IconMan);
            dispatch(saveUserProfile(data, navigate));
        } else {
            toast.warning("Plese fill reqired fields")
        }
    }

    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
        'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
        'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
        'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Côte d\'Ivoire', 'Cabo Verde',
        'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
        'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
        'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
        'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
        'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
        'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland',
        'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
        'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
        'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
        'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
        'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
        'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama',
        'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
        'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
        'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
        'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
        'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
        'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
        'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
        'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam',
        'Yemen', 'Zambia', 'Zimbabwe'
    ];
    const timezones = [
        'UTC (Coordinated Universal Time)',
        'UTC-12:00 Baker Island, Howland Island',
        'UTC-11:00 Niue, American Samoa',
        'UTC-10:00 Hawaii, Cook Islands',
        'UTC-09:00 Alaska, Gambier Islands',
        'UTC-08:00 Pacific Time, Baja California',
        'UTC-07:00 Mountain Time, Arizona',
        'UTC-06:00 Central Time, Easter Island',
        'UTC-05:00 Eastern Time, Western Caribbean',
        'UTC-04:00 Atlantic Time, Eastern Caribbean',
        'UTC-03:00 Argentina, Greenland',
        'UTC-02:00 South Georgia and the South Sandwich Islands',
        'UTC-01:00 Azores, Cape Verde Island',
        'UTC±00:00 Dublin, Edinburgh, London',
        'UTC+01:00 (no DST) Tangiers, Casablanca',
        'UTC+01:00 Algeria, Lisbon',
        'UTC+02:00 Berlin, Stockholm, Rome, Bern, Brussels, Cairo',
        'UTC+03:00 Moscow, Eastern Africa',
        'UTC+04:00 Dubai, Samara',
        'UTC+05:00 Pakistan, Western Kazakhstan',
        'UTC+06:00 Bangladesh, Bhutan, Omsk',
        'UTC+07:00 Thailand, Western Indonesia, Krasnoyarsk',
        'UTC+08:00 China, Western Australia, Irkutsk',
        'UTC+09:00 Japan, Korea, Chita',
        'UTC+10:00 Eastern Australia, Vladivostok',
        'UTC+11:00 Solomon Islands, Vanuatu, Magadan',
        'UTC+12:00 Fiji, Tuvalu, Kamchatka',
        'UTC+13:00 Tonga, Phoenix Islands, New Zealand (with DST)',
        'UTC+14:00 Line Islands'
    ];

    const optionsCountry = countries.map((country, index) =>
        <option key={index} value={country}>{country}</option>
    );
    const optionsTime = timezones.map((timezone, index) =>
        <option key={index} value={timezone}>{timezone}</option>
    );
    return (
        <div>
            <TopBar />
            <div className="md:px-40 px-5 pb-20 pt-10">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-bold font-semibold leading-4 text-xl text-gray-900">Profile info</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Update your photo and personal details here.
                        </p>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </Link>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                Save
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value) }}
                                        placeholder="Full Name"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>Email Address</div>
                            <div className="col-span-2">
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>
                                Your photo
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This will be displayed on your Profile.
                                </p>
                            </div>
                            <div className="col-span-2 flex">
                                <img
                                    className="h-20 w-20 rounded-full border border-gray-500 mb-4 sm:mb-0 mr-3 mt-12"
                                    src={previewImage ? previewImage : `http://localhost:443/asset${photoUrl}`}
                                    alt=""
                                />
                                <div className="mt-2 flex w-full justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span className="text-red-500">Click to cloud</span>
                                                <input required id="file-upload" name="fileupload" type="file" className="sr-only" onChange={handleSelectImage} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF ( max 800 * 600 )</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>Role</div>
                            <div className="col-span-2">
                                <div className="mt-2">
                                    <select
                                        type="text"
                                        name="role"
                                        value={permission}
                                        onChange={e => setPermission(e.target.value)}
                                        placeholder="Role"
                                        required
                                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        <option>admin</option>
                                        <option>customer</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>Country</div>
                            <div className="col-span-2">
                                <select
                                    id="country"
                                    name="country"
                                    value={country}
                                    required
                                    onChange={e => setCountry(e.target.value)}
                                    autoComplete="countryname"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                >
                                    {optionsCountry}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>Time Zone</div>
                            <div className="col-span-2">
                                <select
                                    id="timezone"
                                    name="timezone"
                                    value={timezone}
                                    required
                                    onChange={e => setTimezone(e.target.value)}
                                    autoComplete="timezone"
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                >
                                    {optionsTime}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                            <div>Bio</div>
                            <div className="col-span-2">
                                <div className="mt-2">
                                    <textarea
                                        required
                                        id="bio"
                                        name="bio"
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        rows={3}
                                        className="pr-2 pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Link to="/" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        onClick={handleSave}
                        className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Save
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );

}


export default UserProfileView;