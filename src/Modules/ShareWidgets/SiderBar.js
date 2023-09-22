import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isButtonToggled, setIsButtonToggled] = useState(false);
    const [isHoverOpen, setIsHoverOpen] = useState(false);

    const sidebarRef = useRef(); // Ref for the sidebar div

    useEffect(() => {
        const mouseMoveHandler = (e) => {
            const sidebarRect = sidebarRef.current.getBoundingClientRect(); // Get sidebar dimensions and position
            setIsHoverOpen(e.clientX <= (sidebarRect.right)); // Show sidebar if the mouse is within the bounds of the sidebar
        };

        window.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    const isOpen = isButtonToggled || isHoverOpen; // Sidebar is open if the button has been clicked or the mouse is hovering over the sidebar

    return (
        <div ref={sidebarRef} className={`max-h-full bg-indigo-950 text-white space-y-6 py-7 absolute inset-y-0 left-0 transform transition-all duration-200 ease-in-out overflow-x-hidden h-screen z-50 ${isOpen ? 'translate-x-0 w-64' : 'translate-x-0 w-16'}`}>
            <div className="flex items-center justify-between">
                <h2 className={`text-2xl md:pl-4 pl-4 font-extrabold ${isOpen ? 'inline' : 'hidden'}`}>Admin Panel</h2>
                <button onClick={() => setIsButtonToggled(!isButtonToggled)} className='md:pr-5 pl-4 pr-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <nav>
                <Link to="/admin" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v10a2 2 0 01-2 2h-5.5a1.5 1.5 0 00-1.5 1.5v.5a1 1 0 01-1 1H6a3 3 0 01-3-3V3a1 1 0 011-1h13.5a1.5 1.5 0 011.5 1.5v3.5a1 1 0 01-1 1H13" />
                    </svg>
                    <span className={`ml-4 ${isOpen ? 'inline' : 'hidden'}`}>User Management</span>
                </Link>
                <Link to="/homepagedetailmanage" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v2H2v-2h5m5-14a5 5 0 110 10a5 5 0 010-10zm12 14a2 2 0 10-4 0v1h4v-1z" />
                    </svg>
                    <span className={`ml-4 ${isOpen ? 'inline' : 'hidden'}`}>HomePageDetailTiltle</span>
                </Link>
                <Link to="/cloud-storage" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v2m0 10v2m-6-2v-2a4 4 0 018 0v2m6 0a2 2 0 002-2v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v1m-4 3H2a2 2 0 00-2 2v2a2 2 0 002 2h8v-2m8-2h8a2 2 0 002-2v-2a2 2 0 00-2-2h-8v2z" />
                    </svg>
                    <span className={`ml-4 ${isOpen ? 'inline' : 'hidden'}`}>Cloud Storage</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;



