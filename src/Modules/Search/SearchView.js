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
import { searchaction } from './SearchAction.';

Modal.setAppElement('#root');


const View = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 20;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animation, setAnimation] = useState("slideInFromRight");

  const [modalIsOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState(null);

  const searchList = useSelector(state => state.Search.searchList);

//   const [megaList, setMegaList] = useState([]);

//   useEffect(() => {
//     const loadMegaList = async () => {
//       const result = await dispatch(getMegaList());
//       setMegaList(result);
//     };
//     loadMegaList();
//   }, [dispatch]); // Dependency array

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

  const totalPages = Math.ceil(searchList?.length / itemsPerPage);

  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = startIndex + itemsPerPage;
  const currentItems = searchList?.slice(startIndex, endIndex);


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

  const searchHandler = () => {
    // console.log(typeof (search))
    // let filtered = megaList;

    // if (search === "") { setMegaList(filtered); return; }
    // if (search) {
    //   filtered = megaList.filter(item => item.name.includes(search));
    // }

    // setMegaList(filtered);

    const data = {
      search: "name",
      subname: search
    }

    dispatch(searchaction(data, navigate));

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
        <div className='md:pr-80 md:pl-80 pl-5 pr-5 mb-20'>
          <div className="relative flex">
            <input
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') searchHandler() }}
              className="block w-full rounded-full border-0 py-1.5 pl-7 pr-10 bg-gray-900 text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
            <div className="bg-purple-800 rounded-full absolute inset-y-0 right-0 flex items-center pr-1.5 mt-1 mb-1 mr-1" >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 19l-3.85-3.85"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className='flex justify-center items-center mt-10'>
          <p className='text-blue-400 text-3xl font-bold ml-3'>Search result is same as below</p>
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
      <Footer/>
    </div>
  );
};

export default View;

