import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import TopBar from '../ShareWidgets/TopBar'
import Footer from '../ShareWidgets/Footer'
import {Link} from "react-router-dom"

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div>
            <TopBar />
            <div className="bg-white">
                <div className="">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                About site service{' '}
                                <Link to="/read-more" className="font-semibold text-indigo-600">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    Read more <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Home to enrich your online life 
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                            We are committed to revolutionizing the way professional DJs access, manage music. Our mission is to streamline the process of music download, helping DJs to save time and focus on what they do best - creating incredible sound experiences.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    to="/choose-plan"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Start your subscription
                                </Link>
                                <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
                                    Go to home <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>

    )
}
