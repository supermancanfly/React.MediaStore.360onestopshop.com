import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import TopBar from '../ShareWidgets/TopBar'
import Footer from '../ShareWidgets/Footer'

export default function Example() {

    return (
        <div>
            <TopBar />
            <div className="bg-stone-300" style={{height: "1000px"}}>
                <div className="">
                    <div className="mx-auto max-w-7xl py-10">

                        <div className="">
                            {/* <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Home to enrich your online life 
                            </h1> */}
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            Mission Statement: "We are committed to revolutionizing the way professional DJs access manage music. Our mission is to streamline the process of music download, helping DJs to save time and focus on what they do best - creating incredible sound experiences."
                            </p>
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            Why Us: "With the myriad of music platforms available, finding and downloading your preferred tracks can turn into a time-consuming ordeal. We believe it doesn't have to be that way. By offering exclusive access to a vast selection of MP3s and videos, we're making it easier for DJs to source their music. Say goodbye to spending hours sorting through terabytes of content - with our service, you download less but gain more."
                            </p>
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            Our Services: "We offer flexible subscription models designed to meet your unique needs. Subscribe to access MP3s, videos, or both, with packages available for weekly or monthly periods. Our automatic roll-on system ensures uninterrupted access to our music library, so you can focus on your music, not administrative tasks."
                            </p>
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            Our Team: "Our dedicated team is made up of music enthusiasts who understand the industry's intricacies. We are committed to providing you with the best possible service, ensuring that our platform remains efficient, user-friendly, and updated with the latest tracks."
                            </p>
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            The Idea Behind the Site: "Born out of a desire to simplify music downloading for professional DJs, our platform is designed to save you time and effort. Instead of navigating through various sites and downloading terabytes of music each week, you get to select from our carefully curated packs of files. Just set your downloads before you hit the bed, and wake up to a personalized selection of music. We're all about making your life easier."
                            </p>
                            <p className="mt-6 text-lg leading-8 text-indigo-950">
                            Customer Testimonials/Wishes: Here, you can include any reviews or positive comments from users. If you don't have any yet, consider writing something like "We're thrilled to be part of many professional DJs' journey, and we can't wait to help you simplify your music experience."
                            </p>

                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>

    )
}
