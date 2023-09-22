import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from "../ShareWidgets/TopBar";
import Footer from "../ShareWidgets/Footer";
import { PaperClipIcon, MusicalNoteIcon, VideoCameraIcon, ArrowDownTrayIcon, StarIcon, PencilSquareIcon, TrashIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { File } from 'megajs'
import "./animation.css"
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { getMegaList } from '../Admin/CloudStorage/Actions/action';

Modal.setAppElement('#root');


const View = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(1);
    const itemsPerPage = 20;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [megaList, setMegaList] = useState([]);

    useEffect(() => {
        const loadMegaList = async () => {
            const result = await dispatch(getMegaList());

            setMegaList(result);
        };
        loadMegaList();
    }, [dispatch], []); //


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

    function Popularity({ number }) {
        return (
            <div className="flex">
                {[...Array(number)].map((_, i) => <StarIcon key={i} className="h-5 w-5 text-yellow-500" />)}
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

    const realAudioData = megaList.filter(item => item.type === "mp3");

    const totalPages = Math.ceil(realAudioData?.length / itemsPerPage);

    const startIndex = itemsPerPage * (currentPage - 1);
    const endIndex = startIndex + itemsPerPage;
    const currentItems = realAudioData?.slice(startIndex, endIndex);

    const download = async (link) => {
        // Start loading
        setIsLoading(true);

        const file = File.fromURL(link);

        if (file) {
            await file.loadAttributes();
            console.log(file.name);
            console.log(file.size);

            const data = await file.downloadBuffer();
            console.log(data.toString());

            const blob = new Blob([data], { type: 'application/octet-stream' });
            saveAs(blob, file.name);

            // End loading
            setIsLoading(false);
        } else {
            toast.warning("Network error");
            // End loading in case of error
            setIsLoading(false);
        }
    };
    let Content;

    const openfile = async (link) => {
        // const file = File.fromURL(link);

        // await file.loadAttributes();
        // console.log(file.name);
        // console.log(file.size);

        // const data = await file.downloadBuffer();
        // console.log(data.toString());

        // const blob = new Blob([data]);
        // const url = URL.createObjectURL(blob);

        // setFileSrc(url);
        // setFileType(file.name.split('.').pop().toLowerCase());
        // setIsOpen(true);

        // switch (fileType) {
        //   case 'mp3':
        //     Content = <audio controls src={fileSrc} />;
        //     break;
        //   case 'mp4':
        //     Content = <video controls src={fileSrc} />;
        //     break;
        //   case 'pdf':
        //     Content = <iframe title="pdf viewer" src={fileSrc} style={{ width: '100%', height: '100vh' }} />;
        //     break;
        //   case 'jpg':
        //   case 'jpeg':
        //   case 'png':
        //   case 'gif':
        //     Content = <img src={fileSrc} alt="Description" />;
        //     break;
        //   default:
        //     Content = <p>Unsupported file type: {fileType}</p>;
        // }

    }

    const closeModal = () => {
        setIsOpen(false);
        // if (onClose) onClose();
    }

    return (
        <div className='bg-violet-900'>
            <TopBar />

            {isLoading && (
                <div className="spinner-wrapper">
                    <div className="spinner"></div>
                    <div className="loading-text">Please wait while downloading...</div>
                </div>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="File Viewer Modal"
                style={{ overlay: { zIndex: 1000 } }}
            >
                {Content}
            </Modal>

            <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-10">
                {/* <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute
         inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      /> */}

                <div className='flex justify-center items-center mt-10'>
                    <p className='text-blue-400 text-3xl font-bold ml-3'>Music Home</p>
                </div>

                <div className='md:p-40 md:pt-0 md:grid grid-cols-4'>
                    <div className="md:col-span-4">
                        <div className="py-6 ">
                            <dd className="text-sm text-gray-900 ">
                                <ul role="list" className="divide-y divide-gray-700 rounded-md">

                                    {
                                        currentItems?.map((item, idx) => {
                                            return (
                                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6" key={idx}>
                                                    <div className="flex w-0 flex-1 items-center">
                                                        {item.type === "mp3" && <MusicalNoteIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />}
                                                        {item.type === "mp4" && <VideoCameraIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />}
                                                        {item.type !== "mp4" && item.type !== "mp3" ? <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> : ""}
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium text-gray-200 hover:text-gray-600" onClick={() => openfile(item.link)}>{item.name}</span>
                                                            <span className="flex-shrink-0 text-gray-400">{(item.size / (1024 * 1024)).toFixed(2)}Mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center ml-4 flex-shrink-0">
                                                        <Popularity number={item.popularity} />
                                                        <ArrowDownTrayIcon className="ml-5 h-5 w-5 flex-shrink-0 text-gray-400 hover:text-gray-600" aria-hidden="true" onClick={() => download(item.link)} />
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </dd>
                        </div>
                        <div className="md:flex items-center justify-between">
                            <p className='pb-5 text-gray-300'>Page {currentPage} of total {totalPages} pages</p>
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
                                    className="bg-gray-600 h-10 px-2 m-2 transition-colors duration-150 rounded-lg focus:shadow-outline"
                                    type="number"
                                    min={1}
                                    max={totalPages}
                                    value={inputPage}
                                    onChange={handleChange}
                                />
                                <button
                                    className="h-10 px-2 m-2 transition-colors duration-150 bg-gray-600 rounded-lg focus:shadow-outline hover:bg-gray-700"
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

            </div>
            <Footer />
        </div>
    );
};

export default View;

