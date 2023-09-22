import React from "react";
import Sidebar from "../../ShareWidgets/SiderBar";
import TopBar from "../../ShareWidgets/TopBar";
import Footer from "../../ShareWidgets/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getHome } from "../../Home/Actions/HomeAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateHome } from "./HomePageDetailAction"


export default function HomePageDetailView() {

    const dispatch = useDispatch();

    const [firstTitleOne, setFirstTitleOne]= useState(useSelector(state => state.Home.HomeList?.firstTitleOne));
    const [secondTitleOne, setSecondTitleOne] = useState(useSelector(state => state.Home.HomeList?.secondTitleOne));
    const [thirdTitleOne, setThirdTitleOne] = useState(useSelector(state => state.Home.HomeList?.thirdTitleOne));
  
    const [firstTitleTwo, setFirstTitleTwo] = useState(useSelector(state => state.Home.HomeList?.firstTitleTwo));
    const [secondTitleTwo, setSecondTitleTwo] = useState(useSelector(state => state.Home.HomeList?.secondTitleTwo));
    const [thirdTitleTwo, setThirdTitleTwo] = useState(useSelector(state => state.Home.HomeList?.thirdTitleTwo));
  
    const [forthTitle, setForthTitle] = useState(useSelector(state => state.Home.HomeList?.forthTitle));
  
    const [totalAssets, setTotalAssets] = useState(useSelector(state => state.Home.HomeList?.totalAssets));
    const [totalDownloads, setTotalDownloads] = useState(useSelector(state => state.Home.HomeList?.totalDownloads));
    const [todayViews, setTodayViews] = useState(useSelector(state => state.Home.HomeList?.todayViews));
    const [todayDownloads, setTodayDownloads] = useState(useSelector(state => state.Home.HomeList?.todayDownloads));
  
    const [totalAssetsNumber, setTotalAssetsNumber] = useState(useSelector(state => state.Home.HomeList?.totalAssetsNumber));
    const [totalDownloadsNumber, setTotalDownloadsNumber] = useState(useSelector(state => state.Home.HomeList?.totalDownloadsNumber));
    const [todayViewsNumber, setTodayViewsNumber] = useState(useSelector(state => state.Home.HomeList?.todayViewsNumber));
    const [todayDownloadsNumber, setTodayDownloadsNumber] = useState(useSelector(state => state.Home.HomeList?.todayDownloadsNumber));

    useEffect(() => {
        dispatch(getHome());

      }, []);

    const handleSave = () => {
        const data = {
            firstTitleOne: firstTitleOne,
            secondTitleOne: secondTitleOne,
            thirdTitleOne: thirdTitleOne,
            firstTitleTwo: firstTitleTwo,
            secondTitleTwo: secondTitleTwo,
            thirdTitleTwo: thirdTitleTwo,
            forthTitle: forthTitle,
            totalAssets: totalAssets,
            totalDownloads: totalDownloads,
            todayViews: todayViews,
            todayDownloads: todayDownloads,
            totalAssetsNumber: totalAssetsNumber,
            totalDownloadsNumber: totalDownloadsNumber,
            todayViewsNumber: todayViewsNumber,
            todayDownloadsNumber: todayDownloadsNumber,
        }
        dispatch(updateHome(data));
    }




    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-grow overflow-auto">
                <TopBar />
                <div className="md:p-40 md:pt-10 p-5 pl-20">
                    <div className="p-6">
                        <div className="pb-5">
                            <h1 className="text-2xl font-semibold">Homepage detail title Panel</h1>
                            <h1 className="text-sm text-gray-400 font-semibold">Create and edit home title detail from here perfectly</h1>
                        </div>

                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
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
                                                First title stream main title
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={firstTitleOne}
                                                onChange={(e) => { setFirstTitleOne(e.target.value) }}
                                                placeholder="First title stream main title"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                First title stream sub title 1
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={secondTitleOne}
                                                onChange={(e) => { setSecondTitleOne(e.target.value) }}
                                                placeholder="First title stream sub title 1"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                First title stream sub title 2
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={thirdTitleOne}
                                                onChange={(e) => { setThirdTitleOne(e.target.value) }}
                                                placeholder="First title stream sub title 2"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Second title stream main title
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={firstTitleTwo}
                                                onChange={(e) => { setFirstTitleTwo(e.target.value) }}
                                                placeholder="Second title stream main title"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Second title stream sub title 1
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={secondTitleTwo}
                                                onChange={(e) => { setSecondTitleTwo(e.target.value) }}
                                                placeholder="Second title stream sub title 1"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Second title stream sub title 2
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={thirdTitleTwo}
                                                onChange={(e) => { setThirdTitleTwo(e.target.value) }}
                                                placeholder="Second title stream sub title 2"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Bottom explanation title
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={forthTitle}
                                                onChange={(e) => { setForthTitle(e.target.value) }}
                                                placeholder="Bottom explanation title"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Total assets
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={totalAssets}
                                                onChange={(e) => { setTotalAssets(e.target.value) }}
                                                placeholder="Total assets"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Total assets number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={totalAssetsNumber}
                                                onChange={(e) => { setTotalAssetsNumber(e.target.value) }}
                                                placeholder="Total assets number"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Total downloads
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={totalDownloads}
                                                onChange={(e) => { setTotalDownloads(e.target.value) }}
                                                placeholder="Total downloads"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Total download number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={totalDownloadsNumber}
                                                onChange={(e) => { setTotalDownloadsNumber(e.target.value) }}
                                                placeholder="Total download number"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                               Today Views 
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={todayViews}
                                                onChange={(e) => { setTodayViews(e.target.value) }}
                                                placeholder="Today Views "
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Today view number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={todayViewsNumber}
                                                onChange={(e) => { setTodayViewsNumber(e.target.value) }}
                                                placeholder="Today view number"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Today downloads
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={todayDownloads}
                                                onChange={(e) => { setTodayDownloads(e.target.value) }}
                                                placeholder="Today downloads"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-900/10 pt-5 mt-5">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                                Today download number
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="name"
                                                value={todayDownloadsNumber}
                                                onChange={(e) => { setTodayDownloadsNumber(e.target.value) }}
                                                placeholder="Today download number"
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
