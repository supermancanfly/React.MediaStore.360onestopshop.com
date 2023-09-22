import { FaFacebookSquare, FaTwitter, FaTiktok, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';


export default function Footer() {
    return (
        <div className="bg-gray-950 py-10 px-3 md:px-40">
            <div className="flex justify-end items-end gap-5 mt-10 text-gray-400">

                © 2023 360onestopshop Ltd. All Rights Reserved.

                <FaYoutube className='w-7 h-7 text-gray-400' />
                <FaFacebook className='w-7 h-7 text-gray-400' />
                <FaInstagram className='w-7 h-7 text-gray-400' />
                <FaTiktok className='w-7 h-7 text-gray-400' />
                <FaTwitter className='w-7 h-7 text-gray-400' />
                <FaLinkedin className='w-7 h-7 text-gray-400' />
            </div>
        </div>
    )
}
