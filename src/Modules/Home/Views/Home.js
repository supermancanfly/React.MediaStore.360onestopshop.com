import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TopBar from "../../ShareWidgets/TopBar";
import { PaperClipIcon, MusicalNoteIcon, VideoCameraIcon, ArrowDownTrayIcon, StarIcon, PencilSquareIcon, TrashIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { Fragment, useRef } from 'react'
import { File } from 'megajs'
import { getMegaList } from '../../Admin/CloudStorage/Actions/action';
import "./animation.css"
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { getHome, searchaction } from '../Actions/HomeAction';
import { searchAlphabeta, searchPopularity, searchRecent, searchVolume } from '../../Filtering/FilteringAction';
import Footer from "../../ShareWidgets/Footer"
import CountUp from 'react-countup';

Modal.setAppElement('#root');


const View = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1);
  const itemsPerPage = 11;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [animation, setAnimation] = useState("slideInFromRight");

  const [fileType, setFileType] = useState('');
  const [fileSrc, setFileSrc] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState(null);

  const [content, setContent] = useState(null);

  const firstTitleOne = useSelector(state => state.Home.HomeList?.firstTitleOne);
  const secondTitleOne = useSelector(state => state.Home.HomeList?.secondTitleOne);
  const thirdTitleOne = useSelector(state => state.Home.HomeList?.thirdTitleOne);

  const firstTitleTwo = useSelector(state => state.Home.HomeList?.firstTitleTwo);
  const secondTitleTwo = useSelector(state => state.Home.HomeList?.secondTitleTwo);
  const thirdTitleTwo = useSelector(state => state.Home.HomeList?.thirdTitleTwo);

  const forthTitle = useSelector(state => state.Home.HomeList?.forthTitle);

  const totalAssets = useSelector(state => state.Home.HomeList?.totalAssets);
  const totalDownloads = useSelector(state => state.Home.HomeList?.totalDownloads);
  const todayViews = useSelector(state => state.Home.HomeList?.todayViews);
  const todayDownloads = useSelector(state => state.Home.HomeList?.todayDownloads);

  const totalAssetsNumber = useSelector(state => state.Home.HomeList?.totalAssetsNumber);
  const totalDownloadsNumber = useSelector(state => state.Home.HomeList?.totalDownloadsNumber);
  const todayViewsNumber = useSelector(state => state.Home.HomeList?.todayViewsNumber);
  const todayDownloadsNumber = useSelector(state => state.Home.HomeList?.todayDownloadsNumber);

  const megaListFromStore = useSelector(state => state.Mega.megaList);

  const slides = [
    {
      title: firstTitleOne,
      messages: [
        secondTitleOne,
        thirdTitleOne,
      ]
    },
    {
      title: firstTitleTwo,
      messages: [
        secondTitleTwo,
        thirdTitleTwo,
      ]
    }
  ];

  const stats = [
    { name: totalAssets, value: totalAssetsNumber },
    { name: totalDownloads, value: totalDownloadsNumber },
    { name: todayViews, value: todayViewsNumber },
    { name: todayDownloads, value: todayDownloadsNumber },
  ]

  useEffect(() => {
    dispatch(getHome());
  }, []);


  const [megaList, setMegaList] = useState([]);

  useEffect(() => {
    const loadMegaList = async () => {
      const result = await dispatch(getMegaList());

      setMegaList(result);
    };
    loadMegaList();
  }, [dispatch]); // Dependency array



  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(currentSlide % 2 === 0 ? "slideOutToLeft" : "slideOutToRight");
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
      setAnimation((currentSlide + 1) % 2 === 0 ? "slideInFromRight" : "slideInFromLeft");
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide, animation]);

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

  const totalPages = Math.ceil(megaList?.length / itemsPerPage);

  const startIndex = itemsPerPage * (currentPage - 1);
  const endIndex = startIndex + itemsPerPage;
  const currentItems = megaList?.slice(startIndex, endIndex);


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

    // setIsLoading(true);

    // const file = File.fromURL(link);

    // await file.loadAttributes();
    // console.log(file.name);
    // console.log(file.size);

    // const data = await file.downloadBuffer();
    // console.log(data.toString());

    // const blob = new Blob([data]);
    // const url = URL.createObjectURL(blob);

    // setIsLoading(false);

    // setFileSrc(url);
    // setFileType(file.name.split('.').pop().toLowerCase());
    // setIsOpen(true);
  }

  // useEffect(() => {
  //   let content;
  //   switch (fileType) {
  //     case 'mp3':
  //       content = <audio className='flex justify-center items-center' style={{ width: 'auto', height: '100vh' }} controls src={fileSrc} />;
  //       break;
  //     case 'mp4':
  //       content = <video className='flex justify-center items-center' style={{ width: 'auto', height: '100vh' }}  controls src={fileSrc} />;
  //       break;
  //     case 'pdf':
  //       content = <iframe title="pdf viewer" src={fileSrc} style={{ width: '100%', height: '100vh' }} />;
  //       break;
  //     case 'jpg':
  //     case 'jpeg':
  //     case 'png':
  //     case 'gif':
  //       content = <img className='flex justify-center items-center' style={{ width: 'auto', height: '100vh' }}  src={fileSrc} alt="Description" />;
  //       break;
  //     default:
  //       content = <p>Unsupported file type: {fileType}</p>;
  //   }

  //   setContent(content);
  // }, [fileType, fileSrc]); // this useEffect will run whenever fileType or fileSrc change

  // ... rest of your component



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

  const filterByAlphabet = () => {
    dispatch(searchAlphabeta(navigate));
  }
  const filterByPopularity = () => {
    dispatch(searchPopularity(navigate));
  }
  const filterByRecent = () => {
    dispatch(searchRecent(navigate));
  }
  const filterByVolume = () => {
    dispatch(searchVolume(navigate));
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
          <div className="loading-text">Please wait while loading...</div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="File Viewer Modal"
        style={{ overlay: { zIndex: 1000 } }}
      >
        {content}
      </Modal>

      <div className="relative isolate overflow-hidden bg-gray-900 py-10 sm:py-10">
        {/* <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute
         inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      /> */}
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className='md:pr-80 md:pl-80 pl-5 pr-5 mb-20'>
          <div className="relative flex">
            <input
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') searchHandler() }}
              className="block w-full rounded-full border-0 py-1.5 pl-7 pr-10 bg-gray-900 text-gray-300 ring-1 ring-gray-500 placeholder:text-gray-500 focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
            <div className="bg-indigo-800 rounded-full absolute inset-y-0 right-0 flex items-center pr-1.5 mt-1 mb-1 mr-1" onClick={() => searchHandler()} >
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
        <div className="mx-auto px-6 lg:px-8">

          <div className={`${animation}`}>
            <div className="mx-auto flex justify-center items-center">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {slides[currentSlide].title}
              </h2>
            </div>
            {slides[currentSlide].messages.map((message, index) => (
              <div key={index} className="mx-auto sm:flex justify-center items-center">
                <div>
                  <p className="mt-6 md:text-3xl text-xl leading-8 text-blue-300">
                    {message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 md:flex md:justify-center">
            <dl className="mt-16 grid grid-cols-2 gap-8 md:gap-40 sm:mt-20 md:grid-cols-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col-reverse">
                  <dt className="text-base text-xl mt-5 leading-7 text-gray-300">{stat.name}</dt>
                  <dd className="text-5xl leading-9 tracking-tight text-white">
                    <CountUp end={parseInt(stat.value)} duration={2.75} />+
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className='flex justify-center items-center mt-10'>
          <p className='text-blue-400 text-3xl font-bold ml-3'>{forthTitle}</p>
        </div>

        <div className='md:p-40 md:pl-20 md:pt-0 md:grid grid-cols-4'>
          <div className='md:col mr-5 mt-6 mr-0'>
            <div className='flex justify-center itmes-center'>
              <p className='text-gray-300 font-bold text-3xl'>Advanced Filtering</p>
            </div>
            <div className='p-10 pt-0 mt-3 rounded-md'>
              <div className='flex justify-center itmes-center'>
                <button onClick={() => filterByPopularity()} className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  by popularity
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button onClick={() => filterByAlphabet()} className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  by alphabeta
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button onClick={() => filterByVolume()} className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  by volume
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button onClick={() => filterByRecent()} className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  by recent
                </button>
              </div>
            </div>

            <div className='flex justify-center itmes-center mt-5'>
              <p className='text-gray-300 font-bold text-3xl'>Past Achives</p>
            </div>
            <div className='p-10 pt-0 mt-3 rounded-md'>
              <div className='flex justify-center itmes-center'>
                <button className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  2023(35K+)
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  2022(57K+)
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  2021(23K+)
                </button>
              </div>
              <div className='flex justify-center itmes-center'>
                <button className='text-blue-400 font-bold text-2xl border border-blue-900 rounded-full p-10 pt-0 pb-1 mt-5 hover:border-gray-300 hover:text-red-200'>
                  2020(45K+)
                </button>
              </div>
            </div>

          </div>
          <div className="md:col-span-3">
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
                              {/* <span className="flex-shrink-0 text-gray-400">({item.updatedAt})</span> */}
                              <span className="flex-shrink-0 text-blue-400">
                                ({(new Date(item.updatedAt)).toLocaleDateString()})
                              </span>
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

