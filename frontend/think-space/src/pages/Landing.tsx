import Logo from '../assets/LetterT.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faBullseye, faFile, faShapes } from '@fortawesome/free-solid-svg-icons';
import {  SignInButton, useClerk } from '@clerk/clerk-react';

const Landing = () => {
    const { redirectToSignIn } = useClerk();
    return (
        <div className='h-screen overflow-hidden'>
            <div className='flex flex-row bg-gray-100'>
                <div className='flex flex-col basis-5/12 p-16'>
                    <div className='basis-1/4'>
                        <FontAwesomeIcon className='text-3xl' icon={faShapes} />
                        <h1 className='text-3xl font-bold inline-block ml-2'>Think Space</h1>
                    </div>
                    <div className='basis-1/3'>
                        <h1 className='text-5xl font-bold mb-10'>Build perfect <br /> docs, together.</h1>
                        <div className='inline-block bg-black text-white rounded-full py-2 px-5 hover:bg-gray-600 hover:scale-x-105 transform transition duration-200'>
                            <SignInButton />
                        </div>
                        <button onClick={()=>redirectToSignIn()} className='block mt-3 hover:text-gray-600 hover:translate-x-4 transform transition duration-300'>Get started -&#62; </button>
                    </div>
                    <div className=' basis-1/3 grid items-end'>
                        <img src={Logo} className="logo w-14 inline-block mr-3" alt="logo" />
                    </div>
                </div>
                <div className='basis-7/12'>
                    <div className='bg-white mt-16 h-screen shadow-2xl'>
                        <div className='flex gap-1 pt-3 ps-3'>
                            <div className='bg-red-500 h-3 w-3 rounded-full'></div>
                            <div className='bg-yellow-500 h-3 w-3 rounded-full'></div>
                            <div className='bg-green-500 h-3 w-3 rounded-full'></div>
                        </div>
                        <div className='grid justify-items-center'>
                            <h1 className='font-extrabold text-3xl text-center mt-14'>Write, Plan, Share. With AI at your side</h1>
                            <p className='text-center font-semibold mt-4'>Think Space is the conntected space where better, faster work happens</p>
                            <div className='bg-red-100 h-28 mb-4 w-1/2 mt-7 p-3'>
                                <FontAwesomeIcon icon={faBookOpen} className='me-2 text-red-600' />
                                <h1 className='font-semibold text-base inline-block'>Wiki</h1>
                                <div className='ps-7'>
                                    <p className='text-sm'>It's hard to move fast if you've not got a clunky and disorganized workspace.
                                        Centralize all your knowledge in Think Space instead.
                                    </p>
                                </div>
                            </div>
                            <div className='bg-sky-100 h-28 mb-4 w-1/2 p-3'>
                                <FontAwesomeIcon icon={faBullseye} className='me-2 text-sky-600' />
                                <h1 className='font-semibold text-base inline-block'>Projects</h1>
                                <div className='ps-7'>
                                    <p className='text-sm'>Projects are complex. Let's Think Space bring speed and clarity
                                        with connected, AI-powered tools to manage any project.
                                    </p>
                                </div>
                            </div>
                            <div className='bg-amber-100 h-28 w-1/2 p-3'>
                                <FontAwesomeIcon icon={faFile} className='me-2 text-amber-600' />
                                <h1 className='font-semibold text-base inline-block'>Docs</h1>
                                <div className='ps-7'>
                                    <p className='text-sm'>Simple, Powerful, Beautiful. Communicate more efficiently with Think Space's
                                        flexible, user-friendly building blocks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
