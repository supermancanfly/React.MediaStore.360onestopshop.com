import React from "react";
import Sidebar from "../../../ShareWidgets/SiderBar";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import Table from '../../../ShareWidgets/Table'
import TopBar from "../../../ShareWidgets/TopBar";
import Footer from "../../../ShareWidgets/Footer";

export default function UserManage() {
  const [date, onDateChange] = React.useState(new Date());

  const columns = [
    { Header: 'Photo', accessor: 'photo' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Subscription date', accessor: 'subscriptionDate' },
    { Header: 'Subscription package', accessor: 'subscriptionPackage' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Action', accessor: 'action' },
    // add more columns as needed
  ];

  const data = [
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    { name: 'John Doe', email: 'john@example.com', subscriptionDate: "Jan 13, 2022", subscriptionPackage: "Music subscription", status: "alive" },
    // add more data as needed
  ];

  function adminPanleHeader() {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <div className="pb-5">
            <h1 className="text-2xl font-semibold">Admin Panel</h1>
            <h1 className="text-sm text-gray-400 font-semibold">View your team's subscription and plans</h1>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            // value={value || ""}
            onChange={e => {
              // setValue(e.target.value);
              // onChange(e.target.value);
            }}
            placeholder="Search for anything"
          />
        </div>
        <div>
          <div className='flex md:justify-end justify-between'>
            <button className='ml-2 flex rounded-md border border-gray-500 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2' ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>Export</button>
            <button className='flex rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ml-2' ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.99984 4.16667V15.8333M4.1665 10H15.8332" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>Add User</button>
          </div>
          <div className='flex md:justify-end justify-between pt-8 items-center'>
            <div className='md:flex'>
              <div><span className='md:inline-block hidden'>From:</span> <DatePicker onChange={onDateChange} value={date} className="ml-2 mr-3" /> </div>
              <span className='md:inline-block hidden'>To:</span> <DatePicker onChange={onDateChange} value={date} className="md:pt-0 pt-5 ml-2 mr-3" />
            </div>
            <button className='flex rounded-md border border-gray-500 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2' ><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
              Filters</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow overflow-auto">
        <TopBar />
        <div className="md:p-40 md:pt-10 p-5 pl-20">
          {adminPanleHeader()}
          <div className="p-6">
            <Table columns={columns} data={data} />
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}
