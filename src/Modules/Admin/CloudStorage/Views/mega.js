import React from "react";
import TopBar from "../../../ShareWidgets/TopBar";
import Footer from "../../../ShareWidgets/Footer";
import SiderBar from "../../../ShareWidgets/SiderBar";
import { File } from 'megajs'
import { useEffect } from "react";
import { PaperClipIcon, MusicalNoteIcon, VideoCameraIcon, ArrowDownTrayIcon, StarIcon, PencilSquareIcon, TrashIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { addMegaList, getMegaList, deleteMegaFile, editMegaFile } from "../Actions/action";

export default function MegaNZView() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [url, setUrl] = useState('');
    const [meganame, setMeganame] = useState('');
    const [megasize, setMegasize] = useState("");
    const [filetype, setFiletype] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [tpId, setTpId] = useState(null);
    const [editName, setEditName] = useState(null);
    const cancelButtonRef = useRef(null);
    const [editPopularity, setEditPopularity] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        setInputPage(currentPage);
    }, [currentPage]);

    const handleChange = (event) => {
        setInputPage(event.target.value);
    };

    const handleGoClick = () => {
        const page = Number(inputPage);
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        } else {
            setInputPage(currentPage);
        }
    };

    useEffect(() => {
        dispatch(getMegaList());
    }, [])

    const megaList = useSelector(state => state.Mega.megaList);

    const importMega = async () => {
        console.log("XXXX")
        if (url) {
            console.log(url)
            const file = File.fromURL(url);
            await file.loadAttributes();
            console.log(file, url)
            const fileExtensionIndex = file.name.lastIndexOf(".");
            const fileExtension = file.name.slice(fileExtensionIndex + 1);
            const justfilename = file.name.slice(0, fileExtensionIndex);
            localStorage.setItem("meganame", justfilename);
            localStorage.setItem("megasize", file.size);
            localStorage.setItem("megalink", url);
            localStorage.setItem("megatype", fileExtension);
            setFiletype(fileExtension);
            setMeganame(justfilename);
            setMegasize(file.size);
            toast.info("Imported from mega.nz. Add to server list.");
        } else {
            toast.warning("Input paste url from mega.nz")
        }
    }

    const addList = async () => {
        if (localStorage.getItem('meganame') && localStorage.getItem('megatype') && localStorage.getItem('megasize') && localStorage.getItem('megalink')) {
            const data = {
                name: localStorage.getItem("meganame"),
                type: localStorage.getItem("megatype"),
                size: localStorage.getItem("megasize"),
                link: localStorage.getItem("megalink")
            }
            dispatch(addMegaList(data, navigate));
        }
    }

    function Popularity({ number }) {
        return (
            <div className="flex">
                {[...Array(number)].map((_, i) => <StarIcon key={i} className="h-7 w-7 text-yellow-500" />)}
            </div>
        );
    }

    const PaginationButton = ({ icon, onClick, disabled }) => (
        <button
            className={`h-10 px-2 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800 ${disabled && "opacity-50 cursor-not-allowed"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </button>
    );

    const totalPages = Math.ceil(megaList?.length / itemsPerPage);

    const startIndex = itemsPerPage * (currentPage - 1);
    const endIndex = startIndex + itemsPerPage;
    const currentItems = megaList?.slice(startIndex, endIndex);

    function megaitemdelete(id) {
        setOpen(true);
        setTpId(id);
    }
    function megaitemdeleteSure() {
        const data = {
            id: tpId
        }
        dispatch(deleteMegaFile(data));
    }
    function megaitemeditSure() {
        const data = {
            id: tpId,
            name: editName,
            popularity: editPopularity
        }
        dispatch(editMegaFile(data));
    }

    function megaitemedit(id) {
        setTpId(id);
        setEditOpen(true);
        const filter = currentItems?.find(item => item._id === id);
        setEditName(filter?.name);
        setEditPopularity(filter?.popularity);
    }

    function deleteModal() {
        return (
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 pb-60 pl-20 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Delete this file?
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete this file here?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => { setOpen(false); megaitemdeleteSure(); }}
                                        >
                                            Sure
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    function editModal() {
        return (
            <Transition.Root show={editOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 pb-60 pl-20 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Edit file name
                                                </Dialog.Title>
                                                <div className="mt-2 mb-2">
                                                    <input
                                                        type="text"
                                                        name="File"
                                                        value={editName}
                                                        onChange={(e) => { setEditName(e.target.value) }}
                                                        placeholder="File"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Edit file popularity
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <input
                                                        type="number"
                                                        name="Popularity"
                                                        value={editPopularity}
                                                        onChange={(e) => { setEditPopularity(e.target.value) }}
                                                        placeholder="Popularity"
                                                        required
                                                        className="block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                            onClick={() => { setEditOpen(false); megaitemeditSure(); }}
                                        >
                                            Sure
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setEditOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SiderBar />
            <div className="flex-grow overflow-auto">
                <TopBar />
                {deleteModal()}
                {editModal()}
                <div className="md:p-20 pl-20 pt-10 pr-5">
                    <div className="">
                        <div className="pb-5">
                            <h1 className="text-2xl font-semibold">Third party Panel</h1>
                            <h1 className="text-sm text-gray-400 font-semibold">Manage backend stored files from mega.nz</h1>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Paste Link here from Mega.nz
                            </label>
                            <div className="mt-2 md:flex">
                                <input
                                    type="url"
                                    name="url"
                                    onChange={(e) => { setUrl(e.target.value) }}
                                    placeholder="URI from mega.nz"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div className="flex">
                                    <button
                                        type="button"
                                        onClick={importMega}
                                        className="md:ml-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Import from Mega
                                    </button>
                                    <button
                                        type="button"
                                        onClick={addList}
                                        className="md:mr-20 ml-3 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        Add to my server
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        localStorage.getItem("meganame") && <div className="mt-5 md:flex">
                            <p className="text-gray-900">Recently imported details</p>
                            <p className="text-indigo-400 flex"><ChevronDoubleRightIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />File: {localStorage.getItem("meganame")}</p>
                            <p className="text-indigo-400 flex"><ChevronDoubleRightIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />{localStorage.getItem("megasize")}</p>
                            <p className="text-indigo-400 flex"><ChevronDoubleRightIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />Type: {localStorage.getItem("megatype")}</p>
                        </div>
                    }

                    <div className="">
                        <div className="py-6 ">
                            <dd className="text-sm text-gray-900 ">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                    {
                                        currentItems?.map((item, idx) => {
                                            return (
                                                <li className="flex items-center justify-between py-2 pl-4 pr-5 text-sm leading-6" key={idx}>
                                                    <div className="flex w-0 flex-1 items-center">
                                                        {item.type === "mp3" && <MusicalNoteIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />}
                                                        {item.type === "mp4" && <VideoCameraIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />}
                                                        {item.type !== "mp4" && item.type !== "mp3" ? <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> : ""}
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">{item.name}</span>
                                                            <span className="flex-shrink-0 text-gray-400">{(item.size / (1024 * 1024)).toFixed(2)}Mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center ml-4 flex-shrink-0">
                                                        {/* <Popularity number={item.popularity} /> */}
                                                        {/* <ArrowDownTrayIcon className="ml-5 h-7 w-7 flex-shrink-0 text-gray-400" aria-hidden="true" /> */}
                                                        <button
                                                            type="button"
                                                            onClick={() => megaitemedit(item._id)}
                                                            className="ml-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                        >
                                                            <PencilSquareIcon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                megaitemdelete(item._id)}
                                                            className="ml-5 flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                        >
                                                            <TrashIcon className="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </dd>
                        </div>
                        <div className="md:flex items-center justify-between">
                            <p className='pb-5'>Page {currentPage} of total {totalPages} pages</p>
                            <div>
                                <PaginationButton
                                    icon={<FaAngleDoubleLeft />}
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                />
                                <PaginationButton
                                    icon={<FaAngleLeft />}
                                    onClick={() => setCurrentPage((old) => Math.max(1, old - 1))}
                                    disabled={currentPage === 1}
                                />
                                <input
                                    className="h-10 px-2 m-2 transition-colors duration-150 rounded-lg focus:shadow-outline"
                                    type="number"
                                    min={1}
                                    max={totalPages}
                                    value={inputPage}
                                    onChange={handleChange}
                                />
                                <button
                                    className="h-10 px-2 m-2 transition-colors duration-150 bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-700"
                                    onClick={handleGoClick}
                                >
                                    Go
                                </button>
                                <PaginationButton
                                    icon={<FaAngleRight />}
                                    onClick={() => setCurrentPage((old) => Math.min(totalPages, old + 1))}
                                    disabled={currentPage === totalPages}
                                />
                                <PaginationButton
                                    icon={<FaAngleDoubleRight />}
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}